import { NextResponse } from 'next/server';
import { list, put } from '@vercel/blob';
import { readDbAsync, writeDbAsync } from '@/lib/db';

export async function GET() {
  const token = process.env.BLOB_READ_WRITE_TOKEN || '';
  const results: Record<string, unknown> = {
    timestamp: new Date().toISOString(),
    env: {
      BLOB_READ_WRITE_TOKEN: token ? '✅ SET (length: ' + token.length + ')' : '❌ NOT SET',
      NODE_ENV: process.env.NODE_ENV,
      VERCEL: process.env.VERCEL || 'not set',
    },
  };

  // Test 1: Blob write
  try {
    const testData = JSON.stringify({ test: true, time: Date.now() });
    const blob = await put('xverse-test.json', testData, {
      access: 'private',
      addRandomSuffix: false,
      allowOverwrite: true,
      token,
    } as any);
    results.blobWrite = { status: '✅ SUCCESS', url: blob.url };
  } catch (e) {
    results.blobWrite = { status: '❌ FAILED', error: String(e) };
  }

  // Test 2: Blob list
  try {
    const { blobs } = await list({ prefix: 'xverse-', token });
    results.blobList = {
      status: '✅ SUCCESS',
      count: blobs.length,
      files: blobs.map(b => ({
        name: b.pathname,
        size: b.size,
        url: b.url,
        downloadUrl: (b as any).downloadUrl || 'N/A',
      })),
    };
  } catch (e) {
    results.blobList = { status: '❌ FAILED', error: String(e) };
  }

  // Test 3: Read DB via readDbAsync
  try {
    const db = await readDbAsync();
    results.dbRead = {
      status: '✅ SUCCESS',
      users: db.users?.length ?? 0,
      services: db.services?.length ?? 0,
      projects: db.projects?.length ?? 0,
      teamMembers: db.teamMembers?.length ?? 0,
      testimonials: db.testimonials?.length ?? 0,
      blogPosts: db.blogPosts?.length ?? 0,
      contactSubmissions: db.contactSubmissions?.length ?? 0,
      heroTitle: db.homepageContent?.heroTitle?.substring(0, 50) || 'N/A',
      companyName: db.homepageContent?.companyName || 'N/A',
    };
  } catch (e) {
    results.dbRead = { status: '❌ FAILED', error: String(e) };
  }

  // Test 4: Write→Read round-trip test
  try {
    const dbBefore = await readDbAsync();
    const testMark = `debug-test-${Date.now()}`;
    const originalBadge = dbBefore.homepageContent.heroBadge;

    // Write test marker
    dbBefore.homepageContent.heroBadge = testMark;
    await writeDbAsync(dbBefore);

    // Read back
    const dbAfter = await readDbAsync();
    const writeSuccess = dbAfter.homepageContent.heroBadge === testMark;

    // Restore original
    dbAfter.homepageContent.heroBadge = originalBadge;
    await writeDbAsync(dbAfter);

    results.writeReadTest = {
      status: writeSuccess ? '✅ ROUND-TRIP SUCCESS' : '❌ ROUND-TRIP FAILED',
      wrote: testMark,
      readBack: dbAfter.homepageContent.heroBadge,
      match: writeSuccess,
      restored: true,
    };
  } catch (e) {
    results.writeReadTest = { status: '❌ FAILED', error: String(e) };
  }

  return NextResponse.json(results, { status: 200 });
}

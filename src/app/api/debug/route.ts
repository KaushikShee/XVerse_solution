import { NextResponse } from 'next/server';
import { list, put } from '@vercel/blob';

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

  // Test blob write
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

  // Test blob list
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

  // Test blob read (xverse-db.json)
  try {
    const { blobs } = await list({ prefix: 'xverse-db.json', token });
    if (blobs.length > 0) {
      const blobUrl = (blobs[0] as any).downloadUrl || blobs[0].url;
      const res = await fetch(blobUrl, {
        cache: 'no-store',
        headers: { Authorization: `Bearer ${token}` },
      });
      const text = await res.text();
      results.blobDbFetch = {
        status: res.ok ? '✅ SUCCESS' : `❌ HTTP ${res.status}`,
        url: blobUrl,
        contentLength: text.length,
        preview: text.substring(0, 300) + '...',
      };
    } else {
      results.blobDbFetch = { status: '⚠️ NO DB BLOB FOUND' };
    }
  } catch (e) {
    results.blobDbFetch = { status: '❌ FAILED', error: String(e) };
  }

  return NextResponse.json(results, { status: 200 });
}

import { NextResponse } from 'next/server';
import { list, put } from '@vercel/blob';

// Diagnostic endpoint to test blob storage connectivity
export async function GET() {
  const results: Record<string, unknown> = {
    timestamp: new Date().toISOString(),
    env: {
      BLOB_READ_WRITE_TOKEN: process.env.BLOB_READ_WRITE_TOKEN ? '✅ SET (length: ' + process.env.BLOB_READ_WRITE_TOKEN.length + ')' : '❌ NOT SET',
      NODE_ENV: process.env.NODE_ENV,
      VERCEL: process.env.VERCEL || 'not set',
    },
  };

  // Test blob write
  try {
    const testData = JSON.stringify({ test: true, time: Date.now() });
    const blob = await put('xverse-test.json', testData, {
      access: 'public',
      addRandomSuffix: false,
    });
    results.blobWrite = { status: '✅ SUCCESS', url: blob.url };
  } catch (e) {
    results.blobWrite = { status: '❌ FAILED', error: String(e) };
  }

  // Test blob read
  try {
    const { blobs } = await list({ prefix: 'xverse-' });
    results.blobList = {
      status: '✅ SUCCESS',
      count: blobs.length,
      files: blobs.map(b => ({ name: b.pathname, size: b.size, url: b.url })),
    };
  } catch (e) {
    results.blobList = { status: '❌ FAILED', error: String(e) };
  }

  // Test blob fetch
  try {
    const { blobs } = await list({ prefix: 'xverse-db.json' });
    if (blobs.length > 0) {
      const res = await fetch(blobs[0].url, { cache: 'no-store' });
      const text = await res.text();
      results.blobDbFetch = {
        status: '✅ SUCCESS',
        url: blobs[0].url,
        contentLength: text.length,
        preview: text.substring(0, 200) + '...',
      };
    } else {
      results.blobDbFetch = { status: '⚠️ NO DB BLOB FOUND - data will use defaults' };
    }
  } catch (e) {
    results.blobDbFetch = { status: '❌ FAILED', error: String(e) };
  }

  return NextResponse.json(results, { status: 200 });
}

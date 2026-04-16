import { NextResponse } from 'next/server';

/**
 * Returns a JSON response with no-cache headers to prevent stale data.
 */
export function jsonResponse(data: unknown, status = 200) {
  return NextResponse.json(data, {
    status,
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
      'Pragma': 'no-cache',
    },
  });
}

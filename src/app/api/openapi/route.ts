// app/api/openapi/route.js

import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const filePath = path.join(process.cwd(), 'public', 'openapi.yml');
  const fileContents = fs.readFileSync(filePath, 'utf8');

  return new NextResponse(fileContents, {
    headers: {
      'Content-Type': 'application/x-yaml',
    },
  });
}

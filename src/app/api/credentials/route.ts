// src/app/api/credentials/route.ts
import { db } from '@/db/db';
import { credentials } from '@/db/schema';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const credentialSchema = z.object({
  provider: z.string().min(1),
  username: z.string().min(1),
  password: z.string().min(1),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = credentialSchema.parse(body);

    const result = await db
      .insert(credentials)
      .values({
        provider: validatedData.provider,
        username: validatedData.username,
        password: validatedData.password,
      })
      .returning();

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('Error creating credential:', error);
    return NextResponse.json(
      { error: 'Error creating credential' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const result = await db.select().from(credentials);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching credentials:', error);
    return NextResponse.json(
      { error: 'Error fetching credentials' },
      { status: 500 }
    );
  }
}

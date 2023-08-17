import * as db from '~/lib/db';
import { type NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const queryParamSchema = z.object({
    storeHash: z.string(),
  });

interface Config {
  storeHash: string
}

export async function GET(req: NextRequest) {
    const parsedParams = queryParamSchema.safeParse(
        Object.fromEntries(req.nextUrl.searchParams)
      );
    
      if (!parsedParams.success) {
        return new NextResponse('Invalid query parameters', { status: 400 });
      }
    const results:Config = await db.getCxConfig(parsedParams.data.storeHash);
    
    return NextResponse.json({ results });
}
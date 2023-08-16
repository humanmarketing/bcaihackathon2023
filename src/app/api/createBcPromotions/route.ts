import * as db from '~/lib/db';
import { type NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createPromotion } from '~/server/bigcommerce-api/client'

const queryParamSchema = z.object({
    storeHash: z.string(),
    token: z.string(),
    body: z.any().optional(),
  });

export async function POST(req: NextRequest) {
  const data: unknown = await req.json();
  console.log(data);
  const parsedParams = queryParamSchema.safeParse(data);

  console.log('createBcPromotions', parsedParams)

  if (!parsedParams.success) {
    return new NextResponse('Invalid query parameters', { status: 400 });
  }

    const results = await createPromotion(
      parsedParams.data.body,
      parsedParams.data.token,
      parsedParams.data.storeHash
    )
    
    return NextResponse.json({ results });
}
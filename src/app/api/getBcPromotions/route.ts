import * as db from '~/lib/db';
import { type NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { fetchPromotions } from '~/server/bigcommerce-api/client'

const queryParamSchema = z.object({
    storeHash: z.string(),
    token: z.string(),
    promoId: z.string().optional(),
  });

export async function GET(req: NextRequest) {
    console.log('getBcPromotions', req.nextUrl.searchParams)
    const parsedParams = queryParamSchema.safeParse(
        Object.fromEntries(req.nextUrl.searchParams)
      );
    
      if (!parsedParams.success) {
        return new NextResponse('Invalid query parameters', { status: 400 });
      }
    console.log('getBcPromotions', parsedParams.data.token, parsedParams.data.storeHash, parsedParams.data.promoId)
    const promoIds = parsedParams.data.promoId ? [parseInt(parsedParams.data.promoId)] : [];

    console.log('promoIds', promoIds)
    
    const results = await fetchPromotions(
      [],
      parsedParams.data.token,
      parsedParams.data.storeHash
    )
    
    return NextResponse.json({ results });
}
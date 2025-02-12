import { type NextRequest, NextResponse } from 'next/server';
import { generatePromotion } from '~/server/google-ai';
import { aiPromotionAddSchema } from './schema';
import { authorize } from '~/lib/authorize';

export async function POST(req: NextRequest) {
  if (!authorize()) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const data: unknown = await req.json();
  const parsedParams = aiPromotionAddSchema.safeParse(data);

  console.log(data);
  console.log(parsedParams);

  if (!parsedParams.success) {
    return new NextResponse('Invalid query parameters', { status: 400 });
  }

  const response = await generatePromotion(parsedParams.data);
  console.log('response', response);
  return NextResponse.json({ response });
}

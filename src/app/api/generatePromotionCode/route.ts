import { type NextRequest, NextResponse } from 'next/server';
import { generatePromotionCode } from '~/server/google-ai';
import { aiPromotionCodeSchema } from './schema';
import { authorize } from '~/lib/authorize';

export async function POST(req: NextRequest) {
  if (!authorize()) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const data: unknown = await req.json();
  const parsedParams = aiPromotionCodeSchema.safeParse(data);

  if (!parsedParams.success) {
    return new NextResponse('Invalid query parameters', { status: 400 });
  }

  const code = await generatePromotionCode(parsedParams.data);

  return NextResponse.json({ code });
}

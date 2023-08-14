import { type NextRequest, NextResponse } from 'next/server';
import { onboardStoreAccount } from '~/server/google-ai';
import { onboardingGuidedSchema } from './schema';
import { authorize } from '~/lib/authorize';

export async function POST(req: NextRequest) {
  if (!authorize()) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const data: unknown = await req.json();
  const parsedParams = onboardingGuidedSchema.safeParse(data);

  console.log(data);
  console.log(parsedParams);

  if (!parsedParams.success) {
    return new NextResponse('Invalid query parameters', { status: 400 });
  }

  const messages = parsedParams?.data?.messages || [];

  console.log('messages', messages)

  const response = await onboardStoreAccount(parsedParams.data, messages);
  console.log('response', response);
  return NextResponse.json({ response });
}

import { env } from '~/env.mjs';
import { type NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const HASURA_GRAPHQL_ADMIN_SECRET = env.HASURA_GRAPHQL_ADMIN_SECRET;

const queryParamSchema = z.object({
    productId: z.string(),
  });

export async function GET(req: NextRequest) {
    console.log('getProductRecommendation', req.nextUrl.searchParams);
    const parsedParams = queryParamSchema.safeParse(
      Object.fromEntries(req.nextUrl.searchParams)
    );
  
    if (!parsedParams.success) {
      return new NextResponse('Invalid query parameters', { status: 400 });
    }

    console.log('parsedParams', parsedParams);

    // const productId = parsedParams.data.productId;
    // TODO: remove this hard coded value
    const productId = "143";


    const recommendations = await getProductRecommendation({ productId: parseInt(productId), secret: HASURA_GRAPHQL_ADMIN_SECRET });
    const data = recommendations.dbt_slarkin2_frequently_bought_together;
    const results = data.map((item) => {
      return {
        productId: item.product_id_b,
      };
    });

    return NextResponse.json({ results });
}

interface HasuraProductProps {
  productId: number;
  secret: string;
}

const getProductRecommendation = async ({
  productId,
  secret,
}: HasuraProductProps) => {
  const response = await fetch(
    `https://crucial-hagfish-44.hasura.app/v1/graphql`,
    {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'x-hasura-admin-secret': secret,
      },
      body: JSON.stringify(getProductRecommendations(productId)),
    }
  );

  const { data, errors } = await response.json();

  if (errors && errors.length > 0) {
    throw new Error(errors[0]?.message);
  }
  return data;
};

const getProductRecommendations = ( productId: number ) => ({
  query: `
  query GetFrequentlyBoughtTogether($productId: Int!) {
    dbt_slarkin2_frequently_bought_together(order_by: {frequency: desc}, limit: 5, where: {product_id_a: {_eq: $productId}}) {
      product_id_b
      frequency
    }
  }`,
  variables: {
    productId: productId,
  },
});
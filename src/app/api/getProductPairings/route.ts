import * as db from '~/lib/db';
import { type NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { fetchPromotions } from '~/server/bigcommerce-api/client'
import { env } from '~/env.mjs';
const HASURA_GRAPHQL_ADMIN_SECRET = env.HASURA_GRAPHQL_ADMIN_SECRET;



export async function GET(req: NextRequest) {
    console.log('getProductPairings', req.nextUrl.searchParams)

    const recommendations = await getProductRecommendations({ secret: HASURA_GRAPHQL_ADMIN_SECRET })

    const results = recommendations.dbt_slarkin2_frequently_bought_together;

    return NextResponse.json({ results });
}

interface HasuraProductProps {
  secret: string;
}

const getProductRecommendations = async ({
  secret
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
      body: JSON.stringify(getProductRecommendationsQuery()),
    }
  );

  const { data, errors } = await response.json();

  if (errors && errors.length > 0) {
    throw new Error(errors[0]?.message);
  }
  return data;
};

const getProductRecommendationsQuery = (  ) => ({
  query: `query GetFrequentlyBoughtTogether {
    dbt_slarkin2_frequently_bought_together(order_by: {frequency: desc}, limit: 25) {
      product_id_a
      product_id_b
      frequency
    }
  }`
});
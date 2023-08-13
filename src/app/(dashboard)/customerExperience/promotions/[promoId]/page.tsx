import { Suspense, useState } from 'react';
import { Box, Button, Flex, FlexItem, Panel, H1, H2, H3, H4, Tabs, Text } from '@bigcommerce/big-design';
import Loader from '~/components/Loader';
import { fetchCustomerWithAttributes, fetchProductWithAttributes } from '~/server/bigcommerce-api';
import generateDescription from '~/server/google-ai';
import { authorize } from '~/lib/authorize';
import * as db from '~/lib/db';
import PromotionEdit from './promotionEdit';


interface PageProps {
  params: { 
    promoId: string 
  };
}

export default async function Page({ params: { promoId } }: PageProps) {
  const authorized = authorize();

  if (!authorized) {
    throw new Error('Token is not valid. Try to re-open the app.');
  }

  const accessToken = await db.getStoreToken(authorized.storeHash);

  if (!accessToken) {
    throw new Error('Access token not found. Try to re-install the app.');
  }

  const config = await db.getCxConfig(authorized.storeHash);




  return (
    <Suspense fallback={<Loader />}>
      <PromotionEdit promoId={promoId} token={accessToken} storeHash={authorized.storeHash} config={config} />
    </Suspense>
  );
}

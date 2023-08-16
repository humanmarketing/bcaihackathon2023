import { Suspense } from 'react';
import Loader from '~/components/Loader';
import { authorize } from '~/lib/authorize';
import * as db from '~/lib/db';
import CustomerExperienceContent from './customerExperienceContent';


interface Config {
  targetGuestShoppers: boolean,
  targetPostPurchase: boolean,
  targetExistingCustomers: boolean,
}

export default async function Page() {
  const authorized = authorize();

  if (!authorized) {
    throw new Error('Token is not valid. Try to re-open the app.');
  }

  const accessToken = await db.getStoreToken(authorized.storeHash);

  if (!accessToken) {
    throw new Error('Access token not found. Try to re-install the app.');
  }

  const config:Config = await db.getCxConfig(authorized.storeHash);

  console.log('config', config);


  return (
    <Suspense fallback={<Loader />}>
      <CustomerExperienceContent token={accessToken} storeHash={authorized.storeHash} config={config} />
    </Suspense>
  );
}

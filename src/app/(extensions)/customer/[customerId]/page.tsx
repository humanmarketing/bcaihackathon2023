import { Suspense } from 'react';
import Loader from '~/components/Loader';
import { fetchCustomerWithAttributes } from '~/server/bigcommerce-api';
import { authorize } from '~/lib/authorize';
import * as db from '~/lib/db';
import Stats from './customerStats';

interface PageProps {
  params: { customerId: string };
  searchParams: { email: string };
}

export default async function Page(props: PageProps) {
  const { customerId } = props.params;
  const { email: email } = props.searchParams;

  const authorized = authorize();

  if (!authorized) {
    throw new Error('Token is not valid. Try to re-open the app.');
  }

  const accessToken = await db.getStoreToken(authorized.storeHash);

  if (!accessToken) {
    throw new Error('Access token not found. Try to re-install the app.');
  }

  const id = Number(customerId);

  // cover case when customer is not found
  const customer =
    id === 0
      ? null
      : await fetchCustomerWithAttributes(id, accessToken, authorized.storeHash);


  return (
    <Suspense fallback={<Loader />}>
      <Stats customer={customer} />
    </Suspense>
  );
}

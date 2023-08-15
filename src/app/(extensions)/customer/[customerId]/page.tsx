import { Suspense } from 'react';
import Loader from '~/components/Loader';
import { env } from '~/env.mjs';
import { fetchCustomerWithAttributes } from '~/server/bigcommerce-api';
import { authorize } from '~/lib/authorize';
import * as db from '~/lib/db';
import Stats from './customerStats';

const HASURA_GRAPHQL_ADMIN_SECRET = env.HASURA_GRAPHQL_ADMIN_SECRET;

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

  // TODO: switch to use dynamic customer id (Currently overridden to pull production store user details)
  const id = Number(customerId);
  const detailsId = Number(78238);

  const customer =
    id === 0
      ? null
      : await fetchCustomerWithAttributes(id, accessToken, authorized.storeHash);

  const customerDetails = await getCustomerInfo({ customerId: detailsId, secret: HASURA_GRAPHQL_ADMIN_SECRET });

  console.log('customerDetails', customerDetails);

  return (
    <Suspense fallback={<Loader />}>
      <Stats customer={customer} details={customerDetails.dbt_hackathon_bigcommerce__customers[0]} />
    </Suspense>
  );
}

interface HasuraCustomerProps {
  customerId: number;
  secret: string;
}

const getCustomerInfo = async ({
  customerId,
  secret,
}: HasuraCustomerProps) => {
  const response = await fetch(
    `https://crucial-hagfish-44.hasura.app/v1/graphql`,
    {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'x-hasura-admin-secret': secret,
      },
      body: JSON.stringify(getCustomerDetails(customerId)),
    }
  );

  const { data, errors } = await response.json();

  if (errors && errors.length > 0) {
    throw new Error(errors[0]?.message);
  }
  return data;
};

const getCustomerDetails = ( customerId: number ) => ({
  query: `
  query MyQuery($customerId: Int!) {
    dbt_hackathon_bigcommerce__customers(limit: 10, where: {customer_id: {_eq: $customerId}}) {
      customer_id
      first_order_date
      first_order_total
      most_recent_order_date
      most_recent_order_total
      most_recent_order_first_touch_medium
      most_recent_order_first_touch_source
      most_recent_order_last_touch_medium
      most_recent_order_last_touch_source
      most_recent_order_session_duration
      number_of_discounted_orders
      order_count
      order_frequency_days
      total_discounts_value
      cltv
      days_between_first_last_order
      date_created
      
    }
  }`,
  variables: {
    customerId: customerId,
  },
});
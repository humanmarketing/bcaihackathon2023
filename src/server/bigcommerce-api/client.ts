import { z } from 'zod';
import { BIGCOMMERCE_API_URL } from '~/constants';

const productSchema = z.object({
  data: z.object({
    name: z.string(),
    type: z.string(),
    condition: z.string(),
    weight: z.number(),
    height: z.number(),
    width: z.number(),
    depth: z.number(),
    videos: z.array(z.object({ description: z.string() })),
    images: z.array(z.object({ description: z.string() })),
    custom_fields: z.array(z.object({ name: z.string(), value: z.string() })),
    brand_id: z.number().optional(),
    categories: z.array(z.number()),
  }),
});

const categorySchema = z.object({
  data: z.array(z.object({ name: z.string() })),
});

const brandSchema = z.object({
  data: z.object({ name: z.string().optional() }),
});

const customerSchema = z.object({
  data: z.array(z.object({
    email: z.string(),
    first_name: z.string(),
    last_name: z.string(),
    company: z.string(),
    phone: z.string(),
    notes: z.string(),
    customer_group_id: z.number(),
    // attributes: z.array(z.object({ attribute_id: z.number(), attribute_value: z.string() })),
  })),
});

const promotionSchema = z.object({
  data: z.array(z.object({
    id: z.number(),
    redemption_type: z.string(),
    name: z.string(),
    rules: z.any(),
    created_from: z.string(),
    status: z.string(),
    can_be_used_with_other_promotions: z.boolean(),
    currency_code: z.string(),
    notifications: z.array(z.object({ type: z.string(), content: z.string(), locations: z.array(z.string()) })),
  })),
});

const fetchFromBigCommerceApi = (
  path: string,
  accessToken: string,
  storeHash: string
) =>
  fetch(`${BIGCOMMERCE_API_URL}/stores/${storeHash}/v3${path}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      'x-auth-token': accessToken,
    },
  });

const postToBigCommerceApi = (
    path: string,
    accessToken: string,
    storeHash: string,
    body: any
  ) =>
    fetch(`${BIGCOMMERCE_API_URL}/stores/${storeHash}/v3${path}`, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'x-auth-token': accessToken,
      },
      body: JSON.stringify(body),
    });

export async function fetchProduct(
  productId: number,
  accessToken: string,
  storeHash: string
) {
  const params = new URLSearchParams({
    include: 'videos,images,custom_fields',
  }).toString();
  const response = await fetchFromBigCommerceApi(
    `/catalog/products/${productId.toString()}?${params}`,
    accessToken,
    storeHash
  );

  if (!response.ok) {
    throw new Error('Failed to fetch product');
  }

  const parsedProductResponse = productSchema.safeParse(await response.json());

  if (!parsedProductResponse.success) {
    console.log(parsedProductResponse.error);
    throw new Error('Failed to parse product');
  }

  const { videos, images, ...restAttr } = parsedProductResponse.data.data;

  return {
    ...restAttr,
    videosDescriptions: videos.map(({ description }) => description).join(','),
    imagesDescriptions: images.map(({ description }) => description).join(','),
  };
}

export async function fetchCategories(
  categories: number[],
  accessToken: string,
  storeHash: string
) {
  const params = new URLSearchParams({
    'id:in': categories.join(','),
  }).toString();
  const response = await fetchFromBigCommerceApi(
    `/catalog/categories?${params}`,
    accessToken,
    storeHash
  );

  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }

  const parsedCategories = categorySchema.safeParse(await response.json());

  if (!parsedCategories.success) {
    throw new Error('Failed to parse categories');
  }

  return parsedCategories.data.data.map(({ name }) => name);
}

export async function fetchBrand(
  brandId: number,
  accessToken: string,
  storeHash: string
) {
  const response = await fetchFromBigCommerceApi(
    `/catalog/brands/${brandId}`,
    accessToken,
    storeHash
  );

  if (!response.ok) {
    throw new Error('Failed to fetch brand');
  }

  const parsedBrand = brandSchema.safeParse(await response.json());

  if (!parsedBrand.success) {
    throw new Error('Failed to parse brand');
  }

  return parsedBrand.data.data.name;
}

export async function fetchCustomers(
  customers: number[],
  accessToken: string,
  storeHash: string
) {
  const params = new URLSearchParams({
    'id:in': customers.join(','),
  }).toString();
  const response = await fetchFromBigCommerceApi(
    `/customers?${params}`,
    accessToken,
    storeHash
  );

  if (!response.ok) {
    throw new Error('Failed to fetch customers');
  }


  const parsedCustomers = customerSchema.safeParse(await response.json());
  // const results = await response.json();
  // console.log(results);
  // const parsedCustomers = customerSchema.safeParse(results);


  if (!parsedCustomers.success) {
    throw new Error('Failed to parse customers');
  }

  return parsedCustomers.data.data;
}

export async function fetchPromotions(
  promotions: number[],
  accessToken: string,
  storeHash: string
) {
  const params = new URLSearchParams({
    'id:in': promotions.join(','),
  }).toString();
  const response = await fetchFromBigCommerceApi(
    `/promotions?${params}`,
    accessToken,
    storeHash
  );

  if (!response.ok) {
    throw new Error('Failed to fetch promotions');
  }

  const parsedPromotions = promotionSchema.safeParse(await response.json());

  if (!parsedPromotions.success) {
    throw new Error('Failed to parse promotions');
  }

  return parsedPromotions.data.data;
}

export async function createPromotion(
  body: any,
  accessToken: string,
  storeHash: string
) {

  console.log('createPromotion', body, accessToken, storeHash)
  const response = await postToBigCommerceApi(
    `/promotions`,
    accessToken,
    storeHash,
    body
  );

  if (!response.ok) {
    console.log(response);
    throw new Error('Failed to create promotion');
  }

  const parsedPromotions = promotionSchema.safeParse(await response.json());

  if (!parsedPromotions.success) {
    throw new Error('Failed to parse promotions');
  }

  return parsedPromotions.data.data;
}
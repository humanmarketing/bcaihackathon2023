import { type Customer, type Product } from 'types';
import { fetchProduct, fetchCategories, fetchCustomers, fetchBrand } from './client';

export const fetchProductWithAttributes = async (
  id: number,
  accessToken: string,
  storeHash: string
): Promise<Product> => {
  const product = await fetchProduct(id, accessToken, storeHash);

  const { categories, brand_id } = product;

  const [categoriesPromise, brandPromise] = await Promise.allSettled([
    fetchCategories(categories, accessToken, storeHash),
    brand_id ? fetchBrand(brand_id, accessToken, storeHash) : null,
  ]);

  const categoriesNames =
    categoriesPromise.status === 'fulfilled'
      ? categoriesPromise.value.join(',')
      : [];
  const brand = brandPromise.status === 'fulfilled' ? brandPromise.value : '';

  return { ...product, id, brand, categoriesNames } as Product;
};

export const fetchCustomerWithAttributes = async (
  id: number,
  accessToken: string,
  storeHash: string
): Promise<Customer | null> => {
  const customers = await fetchCustomers([id], accessToken, storeHash);

  if (customers.length === 0) {
    return null; 
  }

  return { ...customers[0], id } as Customer;
};
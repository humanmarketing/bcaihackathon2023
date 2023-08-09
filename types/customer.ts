export interface NewCustomer {
  id: number;
  email: string;
}
export interface Customer extends NewCustomer {
  first_name: string;
  last_name: string;
  company: string;
  phone: string;
  notes: string;
  customer_group_id: number;
  attributes: { attribute_id: number; attribute_value: string; id: number }[];
}

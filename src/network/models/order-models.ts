import { LineItem } from './product-models';

export type OrderParams = {
  order: {
    credit_card: {
      card_number: string;
      cvc: string;
      exp_month: number;
      exp_year: number;
    };
    shipping_address: Address;
  };
};

export type Order = {
  id: number;
  total_price: string;
  line_items: LineItem[];
  shipping_address: Address;
};

export type Address = {
  city: string;
  country: string;
  line_1: string;
  line_2: string;
  postal_code: string;
  state: string;
};

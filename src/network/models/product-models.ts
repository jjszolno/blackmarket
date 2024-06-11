export type ProductParams = {
  page?: number;
};

export type ProductsResponse = {
  data: Product[];
  pagination: {
    first_url: string;
    prev_url: string;
    page_url: string;
    next_url: string;
    last_url: string;
    count: number;
    page: number;
    items: number;
  };
};

export type Product = {
  id: string;
  title: string;
  description: string;
  state: string;
  stock: number;
  unit_price: string;
  pictures?: string[];
  category?: Category;
};

export type Category = {
  id: string;
  name: string;
  description: string;
  subcategories?: Category[];
};

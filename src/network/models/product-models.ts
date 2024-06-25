export type ProductParams = {
  page?: number;
};

export type ProductsResponse = {
  data: Product[];
  pagination: Pagination;
};

export type Pagination = {
  first_url: string;
  prev_url: string;
  page_url: string;
  next_url: string;
  last_url: string;
  count: number;
  page: number;
  items: number;
};

export type Product = {
  id: number;
  title: string;
  description: string;
  state: string;
  stock: number;
  unitPrice: string;
  pictures?: string[];
  category?: Category;
  subcategories?: Category[];
};

export type Category = {
  id: number;
  name: string;
  description: string;
};

export type ShoppingCart = {
  id: number;
  totalPrice: string;
  lineItems: LineItem[];
  pagination: Pagination;
};

export type LineItem = {
  id: number;
  quantity: number;
  totalPrice: string;
  product: Product;
};

export type LineItemParams = {
  line_item: {
    quantity: number;
    product_id: number | undefined;
  };
};

export type Favorite = {
  id: number;
  product: Product;
};

export type FavoriteResponse = {
  data: Favorite[];
  pagination: Pagination;
};

export type FavoriteParams = {
  favorite_products: {
    product_id: number | undefined;
    user_id: number | undefined;
  };
};

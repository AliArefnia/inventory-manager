export type Product = {
  productId: string;
  name: string;
  sku: string;
  price: number;
  quantity: number;
  category?: string;
  created_at?: string;
  updated_at?: string;
};

export type ProductFormValues = {
  name: string;
  sku: string;
  category: string;
  quantity: number;
  price: number;
};

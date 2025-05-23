import { useQuery } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";

import type { Product } from "../types/product";

import { NUMBER_PER_PAGE } from "../conts";
import { useDebounce } from "./useDebounce";

export const useProducts = () => {
  return useQuery({
    queryKey: ["product"],
    queryFn: async () => {
      const { data, error } = await supabase.from("products").select("*");
      if (error) throw new Error(error.message);
      return data as [Product];
    },
  });
};

export const usePaginatedProducts = (page: number, searchTerm: string) => {
  const debouncedSearch = useDebounce(searchTerm);

  return useQuery({
    queryKey: ["products", page, debouncedSearch],

    queryFn: async () => {
      const from = (page - 1) * NUMBER_PER_PAGE;
      const to = from + NUMBER_PER_PAGE - 1;

      let query = supabase
        .from("products")
        .select("*", { count: "exact" })
        .range(from, to);

      if (debouncedSearch.length >= 2) {
        query = query.or(
          `name.ilike.%${debouncedSearch}%,sku.ilike.%${debouncedSearch}%,category.ilike.%${debouncedSearch}%`
        );
      }

      const { data, error, count } = await query;

      if (error) throw new Error(error.message);

      return {
        data: data.map(({ id, ...product }) => ({
          ...product,
          productId: id,
        })) as Product[],
        count,
      };
    },
  });
};

export const useProductCount = () => {
  return useQuery({
    queryKey: ["productCount"],
    queryFn: async () => {
      const { count, error } = await supabase
        .from("products")
        .select("*", { count: "exact", head: true });

      if (error) throw new Error(error.message);
      return count ?? 0;
    },
  });
};

export const useProductById = (id: string) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw new Error(error.message);
      const { id: productId, ...rest } = data;
      return { productId, ...rest } as Product;
    },
  });
};

export const useProductCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("category");

      if (error) throw new Error(error.message);
      return data;
    },
  });
};

export const usePaginatedProductCategory = (
  categoryName: string,
  page: number,
  searchTerm: string
) => {
  const debouncedSearch = useDebounce(searchTerm);

  return useQuery({
    queryKey: ["category", page, debouncedSearch],

    queryFn: async () => {
      const from = (page - 1) * NUMBER_PER_PAGE;
      const to = from + NUMBER_PER_PAGE - 1;

      let query = supabase
        .from("products")
        .select("*", { count: "exact" })
        .eq("category", `${categoryName}`)
        .range(from, to);

      if (debouncedSearch.length >= 2) {
        query = query.or(
          `name.ilike.%${debouncedSearch}%,sku.ilike.%${debouncedSearch}%,category.ilike.%${debouncedSearch}%`
        );
      }

      const { data, error, count } = await query;

      if (error) throw new Error(error.message);

      return {
        data: data.map(({ id, ...product }) => ({
          ...product,
          productId: id,
        })) as Product[],
        count,
      };
    },
  });
};

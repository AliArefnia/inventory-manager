import { useQuery } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";

import type { Product } from "../types/product";

export const useProducts = () => {
  return useQuery({
    queryKey: ["product"],
    queryFn: async () => {
      const { data, error } = await supabase.from("Products").select("*");
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

      console.log(data);
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
export const useProductCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("category");

      if (error) throw new Error(error.message);

      console.log(data);
      return data;
    },
  });
};
    },
  });
};

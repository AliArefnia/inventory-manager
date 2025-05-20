import { useQuery } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";

import type { Product } from "../types/product";

export const useProducts = () => {
  return useQuery({
    queryKey: ["product"],
    queryFn: async () => {
      const { data, error } = await supabase.from("Products").select("*");
export const usePaginatedProducts = (page: number, searchTerm: string) => {
  return useQuery({
    queryKey: ["products", page],
    queryFn: async () => {
      const from = (page - 1) * NUMBER_PER_PAGE;
      const to = from + NUMBER_PER_PAGE - 1;

      let query = supabase
        .from("products")
        .select("*", { count: "exact" })
        .range(from, to);
      }



      return {
        data: data.map(({ id, ...product }) => ({
          ...product,
          productId: id,
        })) as Product[],
        count,
      };
    },
  });

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
    },
  });
};

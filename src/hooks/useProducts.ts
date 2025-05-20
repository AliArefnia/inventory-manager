import { useQuery } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";

import type { Product } from "../types/product";

export const useProducts = () => {
  return useQuery({
    queryKey: ["product"],
    queryFn: async () => {
      const { data, error } = await supabase.from("Products").select("*");

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

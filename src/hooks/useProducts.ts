import { useQuery } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";

import type { Product } from "../types/product";

export const useProducts = () => {
  return useQuery({
    queryKey: ["product"],
    queryFn: async () => {
      const { data, error } = await supabase.from("Products").select("*");

      console.log(data);
      if (error) throw new Error(error.message);
      return data as [Product];
    },
  });
};

import { useQuery } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";
import { NUMBER_PER_PAGE, LOW_STOCK_NUMBER } from "../const";
export const useLowStockProductCount = () => {
  return useQuery({
    queryKey: ["low-stock-count"],
    queryFn: async () => {
      const { count, error } = await supabase
        .from("products")
        .select("*", { count: "exact", head: true })
        .lte("quantity", LOW_STOCK_NUMBER);
      if (error) throw new Error(error.message);
      return count ?? 0;
    },
  });
};

import { useQuery } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";
import { type Product } from "../types/product";

import { useDebounce } from "../hooks/useDebounce";
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

export const usePaginatedLowStockProducts = (
  page: number,
  searchTerm: string
) => {
  const debouncedSearch = useDebounce(searchTerm);

  return useQuery({
    queryKey: ["low-stock-products", page, debouncedSearch],
    queryFn: async () => {
      const from = (page - 1) * NUMBER_PER_PAGE;
      const to = from + NUMBER_PER_PAGE - 1;

      let query = supabase
        .from("products")
        .select("*", { count: "exact" })
        .lte("quantity", LOW_STOCK_NUMBER)
        .range(from, to)
        .order("quantity", { ascending: true });

      if (debouncedSearch.length >= 2) {
        query = query.or(
          `name.ilike.%${debouncedSearch}%,sku.ilike.%${debouncedSearch}%`
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

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../lib/supabase"; // adjust if needed
import { type Product } from "../types/product";

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (product: Product) => {
      const { productId, ...rest } = product;

      const { error } = await supabase.rpc(
        "update_product_and_category_by_id",
        {
          p_id: productId,
          p_name: rest.name,
          p_price: Number(rest.price),
          p_quantity: Number(rest.quantity),
          p_category: rest.category,
          p_sku: rest.sku ?? null,
        }
      );

      if (error) throw new Error(error.message);
    },
    onSuccess: async (_data, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["product", `${variables.productId}`],
        }),
        queryClient.invalidateQueries({ queryKey: ["products"] }),
        queryClient.invalidateQueries({ queryKey: ["categories"] }),
        queryClient.invalidateQueries({ queryKey: ["categories-number"] }),
        queryClient.invalidateQueries({ queryKey: ["low-stock-products"] }),
        queryClient.invalidateQueries({ queryKey: ["low-stock-count-only"] }),
      ]);
    },
  });
};

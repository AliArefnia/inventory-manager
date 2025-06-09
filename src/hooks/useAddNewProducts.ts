import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";
import { type ProductFormValues } from "../types/product";

export const useAddNewProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newProduct: ProductFormValues) => {
      const { error } = await supabase.rpc("insert_product_with_category", {
        p_name: newProduct.name,
        p_price: newProduct.price,
        p_quantity: newProduct.quantity,
        p_category: newProduct.category,
        p_sku: newProduct.sku ?? null,
      });

      if (error) {
        if (
          error.message.includes(
            "duplicate key value violates unique constraint"
          )
        ) {
          throw new Error("A product with this name already exists.");
        }
        throw new Error(error.message);
      }
    },

    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["products"] }),
        queryClient.invalidateQueries({ queryKey: ["categories"] }),
        queryClient.invalidateQueries({ queryKey: ["categories-number"] }),
        queryClient.invalidateQueries({ queryKey: ["low-stock-products"] }),
        queryClient.invalidateQueries({ queryKey: ["low-stock-count"] }),
      ]);
    },
  });
};

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../lib/supabase"; // adjust if needed
import { type Product } from "../types/product";

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (product: Product) => {
      const { productId, ...rest } = product;

      const updateFields = {
        ...rest,
        price: Number(rest.price),
        quantity: Number(rest.quantity),
      };

      const { error } = await supabase
        .from("products")
        .update(updateFields)
        .eq("id", productId)
        .select();

      if (error) throw new Error(error.message);
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["product", `${variables.productId}`],
      });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { supabase } from "../lib/supabase";
import { toast } from "react-toastify";

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productId: string) => {
      const { error } = await supabase.rpc(
        "delete_product_and_adjust_category_by_id",
        {
          p_id: productId,
        }
      );
      if (error) throw new Error(error.message);
    },
    onSuccess: async () => {
      toast.success("Product deleted successfully");
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["products"],
        }),
        queryClient.invalidateQueries({ queryKey: ["products"] }),
        queryClient.invalidateQueries({ queryKey: ["categories"] }),
        queryClient.invalidateQueries({ queryKey: ["categories-number"] }),
        queryClient.invalidateQueries({ queryKey: ["low-stock-products"] }),
        queryClient.invalidateQueries({ queryKey: ["low-stock-count-only"] }),
      ]);
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete product: ${error.message}`);
    },
  });
};

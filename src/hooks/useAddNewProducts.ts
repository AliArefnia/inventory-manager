import { useMutation } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";
import { type ProductFormValues } from "../types/product";

export const useAddNewProduct = () => {
  return useMutation({
    mutationFn: async (newProduct: ProductFormValues) => {
      const { error } = await supabase
        .from("products")
        .insert([newProduct])
        .select();
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
  });
};

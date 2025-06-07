import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";

import type { Product } from "../types/product";

import { NUMBER_PER_PAGE } from "../const";
import { useDebounce } from "./useDebounce";
import { toast } from "react-toastify";

export const useProducts = () => {
  return useQuery({
    queryKey: ["product"],
    queryFn: async () => {
      const { data, error } = await supabase.from("products").select("*");
      if (error) throw new Error(error.message);
      return data as [Product];
    },
  });
};

export const usePaginatedProducts = (page: number, searchTerm: string) => {
  const debouncedSearch = useDebounce(searchTerm);

  return useQuery({
    queryKey: ["products", page, debouncedSearch],

    queryFn: async () => {
      const from = (page - 1) * NUMBER_PER_PAGE;
      const to = from + NUMBER_PER_PAGE - 1;

      let query = supabase
        .from("products")
        .select("*", { count: "exact" })
        .range(from, to);

      if (debouncedSearch.length >= 2) {
        query = query.or(
          `name.ilike.%${debouncedSearch}%,sku.ilike.%${debouncedSearch}%,category.ilike.%${debouncedSearch}%`
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

export const useProductById = (id: string) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw new Error(error.message);
      const { id: productId, ...rest } = data;
      return { productId, ...rest } as Product;
    },
  });
};

export const useProductCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("category");

      if (error) throw new Error(error.message);
      console.log(data);
      return data as { category: string }[];
    },
  });
};

export const useProductCategoriesCount = () => {
  return useQuery({
    queryKey: ["categories-number"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("category")
        .neq("category", null);

      if (error) throw new Error(error.message);

      const unique = [...new Set(data.map((item) => item.category))];
      return unique.length ?? 0;
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (categoryName: string) => {
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("category", categoryName);
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

export const usePaginatedProductCategory = (
  categoryName: string,
  page: number,
  searchTerm: string
) => {
  const debouncedSearch = useDebounce(searchTerm);

  return useQuery({
    queryKey: ["category", categoryName, page, debouncedSearch],

    queryFn: async () => {
      const from = (page - 1) * NUMBER_PER_PAGE;
      const to = from + NUMBER_PER_PAGE - 1;

      let query = supabase
        .from("products")
        .select("*", { count: "exact" })
        .eq("category", `${categoryName}`)
        .range(from, to);

      if (debouncedSearch.length >= 2) {
        query = query.or(
          `name.ilike.%${debouncedSearch}%,sku.ilike.%${debouncedSearch}%,category.ilike.%${debouncedSearch}%`
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

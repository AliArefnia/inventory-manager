import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useAddNewProduct } from "../hooks/useAddNewProducts";
import { type ProductFormValues } from "../types/product";
import BaseButton from "./BaseButton";

export default function NewProductFormPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFormValues>();

  const { mutate: addProduct, isPending } = useAddNewProduct();

  const onSubmit = (data: ProductFormValues) => {
    addProduct(data, {
      onSuccess: () => {
        toast.success("Product added successfully!");
        reset();
      },
      onError: (err: Error) => {
        toast.error(`Failed: ${err.message}`);
      },
    });
  };

  return (
    <div className="max-w-xl mx-auto my-4 p-6 bg-white dark:bg-neutral-800 shadow-md rounded-md">
      <h1 className="text-2xl font-semibold mb-6 text-center text-neutral-800 dark:text-neutral-100">
        Add New Product
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block mb-1 font-medium text-neutral-700 dark:text-neutral-300">
            Name
          </label>
          <input
            {...register("name", { required: "Name is required" })}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-400 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* SKU */}
        <div>
          <label className="block mb-1 font-medium text-neutral-700 dark:text-neutral-300">
            SKU
          </label>
          <input
            {...register("sku", { required: "SKU is required" })}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-400 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white"
          />
          {errors.sku && (
            <p className="text-red-500 text-sm mt-1">{errors.sku.message}</p>
          )}
        </div>

        {/* Price */}
        <div>
          <label className="block mb-1 font-medium text-neutral-700 dark:text-neutral-300">
            Price
          </label>
          <input
            type="number"
            step="0.1"
            {...register("price", {
              required: "Price is required",
              valueAsNumber: true,
              min: {
                value: 0.1,
                message: "Price must be a positive number",
              },
            })}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-400 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white"
          />
          {errors.price && (
            <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
          )}
        </div>

        {/* Quantity */}
        <div>
          <label className="block mb-1 font-medium text-neutral-700 dark:text-neutral-300">
            Quantity
          </label>
          <input
            type="number"
            {...register("quantity", {
              required: "Quantity is required",
              valueAsNumber: true,
              min: {
                value: 1,
                message: "Quantity must be at least 1",
              },
            })}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-400 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white"
          />
          {errors.quantity && (
            <p className="text-red-500 text-sm mt-1">
              {errors.quantity.message}
            </p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="block mb-1 font-medium text-neutral-700 dark:text-neutral-300">
            Category
          </label>
          <input
            {...register("category", { required: "Category is required" })}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-400 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white"
          />
          {errors.category && (
            <p className="text-red-500 text-sm mt-1">
              {errors.category.message}
            </p>
          )}
        </div>

        <BaseButton
          type="submit"
          disabled={isPending}
          className="w-full bg-neutral-700 hover:bg-blue-700 hover:scale-105 text-white mt-2 py-3 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? "Adding..." : "Add Product"}
        </BaseButton>
      </form>
    </div>
  );
}

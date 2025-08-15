// components/EditProductForm.tsx
import { useForm } from "react-hook-form";
import { type Product } from "../types/product";
import LoadingSpinner from "./loadingSpinner_temp";
import BaseButton from "./baseButton_temp";

type EditProductFormProps = {
  product: Product;
  onSubmit: (data: Product) => void;
  isUpdating: boolean;
};

export default function EditProductForm({
  product,
  onSubmit,
  isUpdating,
}: EditProductFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Product>({ defaultValues: product });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-xl font-semibold dark:text-neutral-300 ">
        Edit Product
      </h2>

      <div>
        <label className="block text-sm font-medium text-gray-600 dark:text-neutral-500">
          Name
        </label>
        <input
          type="text"
          {...register("name", { required: "Name is required" })}
          className="mt-1 w-full border border-gray-300 rounded px-3 py-2 dark:text-neutral-100"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600 dark:text-neutral-500">
          SKU
        </label>
        <input
          type="text"
          {...register("sku")}
          className="mt-1 w-full border border-gray-300 rounded px-3 py-2 dark:text-neutral-100"
        />
        {errors.sku && (
          <p className="text-red-500 text-sm">{errors.sku.message}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-600 dark:text-neutral-500">
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
          className="mt-1 w-full border border-gray-300 rounded px-3 py-2 dark:text-neutral-100"
        />
        {errors.price && (
          <p className="text-red-500 text-sm">{errors.price.message}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-600 dark:text-neutral-500">
          Category
        </label>
        <input
          type="text"
          {...register("category")}
          className="mt-1 w-full border border-gray-300 rounded px-3 py-2 dark:text-neutral-100"
        />
        {errors.category && (
          <p className="text-red-500 text-sm">{errors.category.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600 dark:text-neutral-500">
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
          className="mt-1 w-full border border-gray-300 rounded px-3 py-2 dark:text-neutral-100"
        />
        {errors.quantity && (
          <p className="text-red-500 text-sm">{errors.quantity.message}</p>
        )}
      </div>

      <div className="text-right">
        <BaseButton
          type="submit"
          className="bg-cyan-700 text-white px-4 py-2  rounded hover:bg-cyan-900 w-1/2 md:w-1/3"
        >
          {isUpdating ? (
            <LoadingSpinner size={24}></LoadingSpinner>
          ) : (
            "Save Changes"
          )}
        </BaseButton>
      </div>
    </form>
  );
}

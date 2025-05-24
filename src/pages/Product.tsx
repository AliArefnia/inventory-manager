import { useParams } from "react-router-dom";
// import { useState } from "react";

// import type { Product } from "../types/product";
import { useProductById } from "../hooks/useProducts";
import { useState } from "react";
import { toast } from "react-toastify";

import Modal from "../components/BaseModal";
import EditProductForm from "../components/EditProductForm";
import { useUpdateProduct } from "../hooks/useUpdateProduct";
// type StockLog = {
//   id: string;
//   change: number;
//   note?: string;
//   date: string;
// };

export default function ProductId() {
  const { productId } = useParams<{ productId: string }>();
  const [showEditForm, setShowEditForm] = useState(false);
  const { mutate: updateProduct, isPending: isUpdating } = useUpdateProduct();

  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useProductById(productId!);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {(error as Error).message}</p>;

  if (!product)
    return <p className="text-center mt-10 text-gray-600">No Product found</p>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/*Edit form */}

      <Modal isOpen={showEditForm} onClose={() => setShowEditForm(false)}>
        <EditProductForm
          product={product}
          onSubmit={(updatedData) => {
            updateProduct(
              { ...product, ...updatedData },
              {
                onSuccess: () => {
                  toast.success("Product updated!");
                  setShowEditForm(false);
                },
                onError: (err: Error) => {
                  toast.error(
                    "Update failed: " + err.message + "/n" + "try again!"
                  );
                },
              }
            );
          }}
          isUpdating={isUpdating}
        />
      </Modal>

      {/* Product Header */}

      <button className="block">back button</button>
      <button className="block" onClick={() => setShowEditForm((set) => !set)}>
        Edit button
      </button>
      <button className="block">Delete button</button>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
        <span
          className={`text-sm px-3 py-1 rounded-full font-medium ${
            product.quantity > 0
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-600"
          }`}
        >
          {product.quantity > 0 ? "In Stock" : "Out of Stock"}
        </span>
      </div>

      {/* Product Card Detail */}
      <div className="bg-white shadow-lg rounded-xl p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Detail label="SKU" value={product.sku} />
        <Detail label="Category" value={product.category || "-"} />
        <Detail label="Price" value={`$${product.price.toFixed(2)}`} />
        <Detail label="Quantity" value={`${product.quantity} units`} />
        <Detail label="Created At" value={product.created_at || "-"} />
        <Detail label="Last Updated" value={product.updated_at || "-"} />
      </div>

      {/* Stock History 

  // const [logs, setLogs] = useState<StockLog[]>([]);


      <div className="mt-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">
          📈 Stock Change History
        </h2>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {logs.length === 0 ? (
            <p className="text-gray-500 px-4 py-6 text-center">
              No stock changes found.
            </p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {logs.map((log) => (
                <li
                  key={log.id}
                  className="flex items-center justify-between px-4 py-4 hover:bg-gray-50"
                >
                  <div>
                    <p className="font-medium text-gray-700">
                      {log.change > 0 ? `+${log.change}` : log.change} units
                    </p>
                    <p className="text-sm text-gray-500">{log.note}</p>
                  </div>
                  <p className="text-sm text-gray-400">{log.date}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      */}
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-sm text-gray-500 mb-1">{label}</p>
      <p className="text-lg font-semibold text-gray-800">{value}</p>
    </div>
  );
}

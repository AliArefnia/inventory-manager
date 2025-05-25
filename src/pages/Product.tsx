import { useParams } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

import { useProductById } from "../hooks/useProducts";
import { useUpdateProduct } from "../hooks/useUpdateProduct";

import Modal from "../components/BaseModal";
import EditProductForm from "../components/EditProductForm";
import LoadingSpinner from "../components/LoadingSpinner";
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

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <LoadingSpinner />
      </div>
    );

  if (isError)
    return (
      <div className="text-center mt-10 text-red-600 font-medium">
        Error: {(error as Error).message}
      </div>
    );

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

      {/* Header Controls */}
      <div className="flex justify-between items-center mb-8">
        <button className="text-sm text-blue-600 hover:underline">
          ← Back
        </button>
        <div className="space-x-3">
          <button
            onClick={() => setShowEditForm((prev) => !prev)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Edit
          </button>
          <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
            Delete
          </button>
        </div>
      </div>
      {/* Product Header */}

      <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          {/* <img
            src={product.image || "https://via.placeholder.com/100x100"}
            alt={product.name}
            className="w-24 h-24 rounded border object-cover"
          /> */}
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
            <span
              className={`text-sm mt-1 inline-block px-3 py-1 rounded-full font-medium ${
                product.quantity > 0
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {product.quantity > 0 ? "In Stock" : "Out of Stock"}
            </span>
          </div>
        </div>
      </div>

      {/* Product Card Detail */}
      <div className="bg-white shadow-xl rounded-xl p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Detail label="SKU" value={product.sku} />
        <Detail label="Category" value={product.category || "-"} />
        <Detail label="Price" value={`$${product.price.toFixed(2)}`} />
        <Detail label="Quantity" value={`${product.quantity} units`} />
        <Detail label="Created At" value={formatDate(product.created_at)} />
        <Detail label="Last Updated" value={formatDate(product.updated_at)} />
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
      <p className="text-lg font-semibold text-gray-800 break-words">{value}</p>
    </div>
  );
}
function formatDate(date?: string) {
  if (!date) return "-";
  return new Date(date).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

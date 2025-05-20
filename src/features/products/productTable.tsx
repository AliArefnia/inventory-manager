import { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";
import { usePaginatedProducts } from "../../hooks/useProducts";
import { type Product } from "../../types/product";
import { NUMBER_PER_PAGE } from "../../conts";
import BaseButton from "../../components/baseButton";
export default function ProductTable() {
  const [page, setPage] = useState(1);
  const [sorting, setSorting] = useState<SortingState>([]);
  const {
    data: { data: products, count } = { data: [], count: 0 },
    isLoading,
    isError,
    error,
  } = usePaginatedProducts(page, searchTerm);

  const columns = useMemo<ColumnDef<Product>[]>(
    () => [
      {
        accessorKey: "productId",
        header: "Product ID",
      },
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "sku",
        header: "SKU",
      },
      {
        accessorKey: "price",
        header: "Price",
        cell: ({ getValue }) => `$${getValue()}`,
      },
      {
        accessorKey: "quantity",
        header: "Quantity",
      },
      {
        accessorKey: "category",
        header: "Category",
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="space-x-2">
            <a
              href={`/products/${row.original.productId}`}
              className="text-blue-600 hover:underline"
            >
              View
            </a>
            <button className="text-red-600 hover:underline">Delete</button>
          </div>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: products,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableColumnResizing: true,
    columnResizeMode: "onChange",
  });

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead className="bg-gray-100">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  style={{ width: header.getSize() }}
                  className="text-left p-4 text-sm font-semibold text-gray-600 relative group"
                >
                  <div
                    {...{
                      onClick: header.column.getToggleSortingHandler(),
                      className:
                        "flex items-center justify-between cursor-pointer select-none",
                    }}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {{ asc: " 🔼", desc: " 🔽" }[
                      header.column.getIsSorted() as string
                    ] ?? null}
                  </div>

                  {header.column.getCanResize() && (
                    <div
                      onMouseDown={header.getResizeHandler()}
                      onTouchStart={header.getResizeHandler()}
                      className="absolute right-0 top-0 h-full w-1 bg-blue-500 opacity-0 group-hover:opacity-100 cursor-col-resize"
                    />
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={table.getAllColumns().length}>
                <div className="flex justify-center py-10">
                  <LoadingSpinner
                    size={40}
                    color={"red"}
                    text={"Searching for the peoducts..."}
                  />
                </div>
              </td>
            </tr>
          ) : (
            table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-t hover:bg-gray-50">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="p-4 text-sm text-gray-700">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
      {!isLoading && !isError && (
        <div className="flex items-center justify-between mt-6 text-sm text-gray-600">
          <span>
            Showing {(page - 1) * NUMBER_PER_PAGE + 1}–
            {page * NUMBER_PER_PAGE < count! ? page * NUMBER_PER_PAGE : count}{" "}
            of {count}
          </span>

          <div className="flex items-center gap-2">
            <BaseButton
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              variant="secondary"
            >
              Previous
            </BaseButton>
            <span>
              Page {page} of {Math.ceil(count! / NUMBER_PER_PAGE)}
            </span>
            <BaseButton
              onClick={() => setPage(page + 1)}
              disabled={page === Math.ceil(count! / NUMBER_PER_PAGE)}
            >
              Next
            </BaseButton>
          </div>
        </div>
      )}
    </div>
  );
}

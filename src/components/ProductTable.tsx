import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { type Product } from "../types/product";
import LoadingSpinner from "./LoadingSpinner";
import ErrorContainer from "./ErrorContainer";

type ProductTablesProps = {
  products: Product[];
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
};

function ProductTable({
  products,
  isLoading,
  isError,
  error,
}: ProductTablesProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
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
    <div>
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
                  <LoadingSpinner size={40} color={"red"}>
                    Searching for the peoducts...
                  </LoadingSpinner>
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
          {isError && (
            <tr>
              <td colSpan={table.getAllColumns().length}>
                <div className="flex justify-center py-10">
                  <ErrorContainer>{(error as Error).message}</ErrorContainer>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ProductTable;

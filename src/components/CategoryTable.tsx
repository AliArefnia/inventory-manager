import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { type Category } from "../types/product";

import LoadingSpinner from "./loadingSpinner_temp";
import ErrorContainer from "./ErrorContainer";
import BaseButton from "./baseButton_temp";
import BaseYesNoModule from "./BaseYesNoModule";
import { useDeleteCategory } from "../hooks/useProducts";

type CategoriesTableProps = {
  categories: Category[];
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  count: number;
};

function CategoriesTable({
  categories,
  isLoading,
  isError,
  error,
  count,
}: CategoriesTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [showDeleteModule, setShowDeleteModule] = useState(false);
  const { mutate: deleteCategory, isPending: isDeleting } = useDeleteCategory();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const navigate = useNavigate();
  const columns = useMemo<ColumnDef<Category>[]>(
    () => [
      {
        id: "rowNumber",
        header: "#",
        size: 50,
        cell: ({ row }) => (
          <span className="min-w-[50px] block">{row.index + 1}</span>
        ),
        //         cell: ({ row }) => (
        //   <span className="min-w-[50px] block">
        //     {(currentPage - 1) * pageSize + row.index + 1}
        //   </span>
        // ),
      },
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "numberOfProducts",
        header: "Number Of Products",
        size: 100,
      },

      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="space-x-2 border-l border-neutral-300 dark:border-neutral-600 ">
            <BaseButton
              className="dark:text-neutral-100"
              onClick={() => {
                navigate(`${row.original.name}`);
              }}
            >
              View
            </BaseButton>
            <BaseButton
              className="!text-red-700"
              onClick={() => {
                setSelectedCategory(row.original.name);
                setShowDeleteModule(true);
              }}
            >
              Delete
            </BaseButton>
          </div>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: categories,
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
      <table className="min-w-full bg-white dark:bg-neutral-700  shadow-md rounded-lg">
        <thead className="bg-gray-100 dark:bg-neutral-900 ">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  style={{ width: header.getSize() }}
                  className="text-center align-middle p-4 text-sm font-semibold text-gray-600 dark:text-neutral-400 relative group"
                >
                  <div
                    {...{
                      onClick: header.column.getToggleSortingHandler(),
                      className:
                        "flex items-center justify-center w-full h-full cursor-pointer select-none",
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
                      className="absolute right-0 top-0 h-full w-1 bg-black dark:bg-neutral-300 opacity-0 group-hover:opacity-100 cursor-col-resize"
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
                  <LoadingSpinner size={40}>
                    Searching for the categories...
                  </LoadingSpinner>
                </div>
              </td>
            </tr>
          ) : count > 0 ? (
            table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="border-t hover:bg-neutral-100 dark:hover:bg-neutral-800 dark:bg-[#1e1e20]"
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="text-center align-middle p-4 text-sm text-gray-700 dark:text-neutral-300"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={table.getAllColumns().length}>
                <div className="flex justify-center py-10">
                  <p>No Category found!</p>
                </div>
              </td>
            </tr>
          )}
          {isError && count !== 0 && (
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

      <BaseYesNoModule
        isOpen={showDeleteModule}
        onClose={() => setShowDeleteModule(false)}
        disabled={isDeleting}
        handleYes={() => {
          deleteCategory(selectedCategory!, {
            onSuccess: () => {
              setShowDeleteModule(false);
            },
          });
          setSelectedCategory(null);
        }}
      >
        <h2 className="text-lg text-neutral-800 dark:text-white mb-4 text-center">
          Are you sure you want to delete this Category?
        </h2>
      </BaseYesNoModule>
    </div>
  );
}

export default CategoriesTable;

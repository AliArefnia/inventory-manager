import { usePaginatedProducts } from "../hooks/useProducts";

import { NUMBER_PER_PAGE } from "../const";

import Pagination from "../components/pagination_temp";
import { useState } from "react";
import ProductTable from "../components/ProductTable";

export default function Products() {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: { data: products, count } = { data: [], count: 0 },
    isLoading,
    isError,
    error,
  } = usePaginatedProducts(page, searchTerm);

  return (
    <div className="overflow-auto">
      <div>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-1/2 px-4 py-2 mx-2 mt-3 mb-6 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 placeholder-neutral-400 dark:placeholder-neutral-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-600 transition"
        />
      </div>

      <ProductTable
        key="allProducts"
        products={products}
        count={count!}
        isLoading={isLoading}
        isError={isError}
        error={error}
      ></ProductTable>

      {!isLoading && !isError && count !== 0 && (
        <Pagination
          currentPage={page}
          numberOfItems={NUMBER_PER_PAGE}
          totalItems={count!}
          changePage={setPage}
        ></Pagination>
      )}
    </div>
  );
}

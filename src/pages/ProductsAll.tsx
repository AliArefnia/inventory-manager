import { usePaginatedProducts } from "../hooks/useProducts";

import { NUMBER_PER_PAGE } from "../conts";

import Pagination from "../components/Pagination";
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
    <div className="overflow-x-auto">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 px-4 py-2 border rounded"
      />
      <ProductTable
        key="allProducts"
        products={products}
        count={count!}
        isLoading={isLoading}
        isError={isError}
        error={error}
      ></ProductTable>

      {!isLoading && !isError && (
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

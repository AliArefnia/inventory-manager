import { useState } from "react";
import { useParams } from "react-router-dom";

import { usePaginatedProductCategory } from "../hooks/useProducts";

import ProductTable from "../components/ProductTable";
import Pagination from "../components/Pagination";

import { NUMBER_PER_PAGE } from "../const";

function Category() {
  const { categoryName } = useParams();
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: { data: products, count } = { data: [], count: 0 },
    isLoading,
    isError,
    error,
  } = usePaginatedProductCategory(categoryName!, page, searchTerm);

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-1/2 px-4 py-2 mx-2 mt-3 mb-6 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 placeholder-neutral-400 dark:placeholder-neutral-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-600 transition"
      />
      <ProductTable
        key={categoryName}
        products={products!}
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

export default Category;

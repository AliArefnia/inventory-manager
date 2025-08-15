import { usePaginatedProductCategories } from "../hooks/useProducts";

import CategoriesTable from "../components/CategoryTable";
import { useState } from "react";
import Pagination from "../components/Pagination";
import { NUMBER_PER_PAGE } from "../const";

function Categories() {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const {
    data: { data: searchData, count } = { data: [], count: 0 },
    isLoading,
    isError,
    error,
  } = usePaginatedProductCategories(page, searchTerm);

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-1/2 px-4 py-2 mx-2 mt-3 mb-6 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 placeholder-neutral-400 dark:placeholder-neutral-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-600 transition"
      />

      <CategoriesTable
        key="allCategories"
        categories={searchData!}
        isLoading={isLoading}
        isError={isError}
        error={error}
        count={count!}
      ></CategoriesTable>
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

export default Categories;

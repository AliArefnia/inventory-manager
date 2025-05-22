import { useState } from "react";
import { useParams } from "react-router-dom";

import { usePaginatedProductCategory } from "../hooks/useProducts";

import ProductTable from "../components/ProductTable";
import Pagination from "../components/Pagination";

import { NUMBER_PER_PAGE } from "../conts";

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
        className="mb-4 px-4 py-2 border rounded"
      />
      <ProductTable
        products={products!}
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

export default Category;

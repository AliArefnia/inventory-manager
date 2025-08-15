import BaseButton from "./BaseButton";

type PaginationProps = {
  currentPage: number;
  numberOfItems: number;
  totalItems: number;
  changePage: (currentPage: number) => void;
};

export default function Pagination({
  currentPage,
  numberOfItems,
  totalItems,
  changePage,
}: PaginationProps) {
  const isLastPage = currentPage === Math.ceil(totalItems! / numberOfItems);
  return (
    <div className="flex items-center justify-between mt-6 text-sm text-gray-500 dark:text-white">
      <span>
        Showing {(currentPage - 1) * numberOfItems + 1}–
        {currentPage * numberOfItems < totalItems!
          ? currentPage * numberOfItems
          : totalItems}{" "}
        of {totalItems}
      </span>

      <div className="flex items-center justify-center gap-4">
        <BaseButton
          onClick={() => changePage(currentPage - 1)}
          disabled={currentPage === 1}
          className={`border text-sm ${
            currentPage === 1
              ? "dark:!bg-neutral-700 dark:text-neutral-400 border-transparent !bg-neutral-600 text-neutral-300 !cursor-not-allowed "
              : "bg-gray-100 text-gray-400 cursor-pointer border-gray-200"
          }`}
          variant="secondary"
        >
          ← Previous
        </BaseButton>

        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
          Page <span className="font-semibold">{currentPage}</span> of{" "}
          <span className="font-semibold">
            {Math.ceil(totalItems! / numberOfItems)}
          </span>
        </span>

        <BaseButton
          onClick={() => changePage(currentPage + 1)}
          disabled={isLastPage}
          className={`border text-sm ${
            isLastPage
              ? "dark:!bg-neutral-700 dark:text-neutral-400 border-transparent !bg-neutral-600 text-neutral-300 !cursor-not-allowed "
              : "bg-gray-100 text-gray-400 cursor-pointer border-gray-200"
          }`}
          variant="secondary"
        >
          Next →
        </BaseButton>
      </div>
    </div>
  );
}

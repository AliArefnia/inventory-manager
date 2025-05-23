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
  return (
    <div className="flex items-center justify-between mt-6 text-sm text-gray-600">
      <span>
        Showing {(currentPage - 1) * numberOfItems + 1}–
        {currentPage * numberOfItems < totalItems!
          ? currentPage * numberOfItems
          : totalItems}{" "}
        of {totalItems}
      </span>

      <div className="flex items-center gap-2">
        <BaseButton
          onClick={() => changePage(currentPage - 1)}
          disabled={currentPage === 1}
          variant="secondary"
        >
          Previous
        </BaseButton>
        <span>
          Page {currentPage} of {Math.ceil(totalItems! / numberOfItems)}
        </span>
        <BaseButton
          onClick={() => changePage(currentPage + 1)}
          disabled={currentPage === Math.ceil(totalItems! / numberOfItems)}
        >
          Next
        </BaseButton>
      </div>
    </div>
  );
}

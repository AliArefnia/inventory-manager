import FetchCard from "./FetchCard";

type BaseCategoryProps = {
  catName: string;
  catNumber: number;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  onRetry?: () => void;
  onClick?: () => void;
};
function BaseCategoryCard({
  catName,
  catNumber,
  onClick,
  isLoading,
  isError,
  error,
  onRetry,
}: BaseCategoryProps) {
  return (
    <div
      className="bg-white p-6 rounded-lg shadow"
      onClick={() => {
        if (!isLoading && !isError && onClick) {
          onClick();
        }
      }}
    >
      <FetchCard
        title={catName}
        value={catNumber}
        isLoading={isLoading}
        isError={isError}
        error={error}
        onRetry={onRetry}
      ></FetchCard>
    </div>
  );
}

export default BaseCategoryCard;

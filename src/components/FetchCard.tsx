import LoadingSpinner from "./LoadingSpinner";

function FetchCard({
  title,
  value,
  isLoading,
  isError,
  error,
  onRetry,
}: {
  title: string;
  value: React.ReactNode;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  onRetry?: () => void;
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-sans">{title}</h3>
      {isLoading ? (
        <LoadingSpinner />
      ) : isError ? (
        <div className="text-red-500 text-sm">
          Error loading.
          <p>{error?.message}</p>
          <button
            onClick={(event) => {
              if (onRetry) {
                onRetry();
              }

              event.stopPropagation();
            }}
            className="underline text-blue-600"
          >
            Retry
          </button>
        </div>
      ) : (
        <p className="text-3xl font-bold">{value}</p>
      )}
    </div>
  );
}

export default FetchCard;

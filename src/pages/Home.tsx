import { useProductCount } from "../hooks/useProducts";
import FetchCard from "../components/FetchCard";
import BaseCard from "../components/BaseCard";

export default function DashboardHome() {
  const {
    data: productCounts,
    error,
    isError,
    isLoading,
    refetch,
  } = useProductCount();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <FetchCard
        title={"Total Products"}
        value={productCounts}
        isLoading={isLoading}
        isError={isError}
        error={error}
        onRetry={refetch}
      ></FetchCard>

      <BaseCard title={"Low Stock"} count={6}></BaseCard>
      <BaseCard title={"Recent Activity"}>
        <ul className="text-sm mt-2 list-disc list-inside">
          <li>Added new product: iPhone</li>
          <li>Updated stock: Samsung TV</li>
        </ul>
      </BaseCard>
    </div>
  );
}

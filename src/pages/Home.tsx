import {
  useProductCategoriesCount,
  useProductCount,
} from "../hooks/useProducts";
import FetchCard from "../components/FetchCard";
import BaseCard from "../components/BaseCard";
import { useLowStockProductCount } from "../hooks/useLowProduct";

export default function DashboardHome() {
  const {
    data: productCounts,
    error: productCountsError,
    isError: productCountsIsError,
    isLoading: productCountsIsLoading,
    refetch: productCountsRefetch,
  } = useProductCount();

  const {
    data: lowStockCount,
    error: lowStockCountError,
    isError: lowStockCountIsError,
    isLoading: lowStockCountIsLoading,
    refetch: lowStockCountRefetch,
  } = useLowStockProductCount();
  const {
    data: CategoriesCount,
    error: CategoriesCountError,
    isError: CategoriesCountIsError,
    isLoading: CategoriesCountIsLoading,
    refetch: CategoriesCountRefetch,
  } = useProductCategoriesCount();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <FetchCard
        title={"Total Products"}
        value={productCounts}
        isLoading={productCountsIsLoading}
        isError={productCountsIsError}
        error={productCountsError}
        onRetry={productCountsRefetch}
      ></FetchCard>
      <FetchCard
        title={"Low Stock Products"}
        value={lowStockCount}
        isLoading={lowStockCountIsLoading}
        isError={lowStockCountIsError}
        error={lowStockCountError}
        onRetry={lowStockCountRefetch}
      ></FetchCard>
      <FetchCard
        title={"Number of Categories"}
        value={CategoriesCount}
        isLoading={CategoriesCountIsLoading}
        isError={CategoriesCountIsError}
        error={CategoriesCountError}
        onRetry={CategoriesCountRefetch}
      ></FetchCard>

      <BaseCard title={"Recent Activity"}>
        <ul className="text-sm mt-2 list-disc list-inside">
          <li>Added new product: iPhone</li>
          <li>Updated stock: Samsung TV</li>
        </ul>
      </BaseCard>
    </div>
  );
}

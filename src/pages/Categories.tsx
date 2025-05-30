import { useProductCategories } from "../hooks/useProducts";
import BaseCategoryCard from "../components/BaseCategoryCard";
import { useNavigate } from "react-router-dom";

function Categories() {
  const { data, isLoading, isError, error, refetch } = useProductCategories();
  const navigate = useNavigate();
  const categoriesList =
    data?.map((item) => item.category).filter(Boolean) ?? [];

  const separatedCatList: { catName: string; number: number }[] = [];

  categoriesList.forEach((cat: string) => {
    const existing = separatedCatList.find((entry) => entry.catName === cat);

    if (existing) {
      existing.number += 1;
    } else {
      separatedCatList.push({ catName: cat, number: 1 });
    }
  });

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {separatedCatList.map((cat) => (
          <BaseCategoryCard
            onClick={() => {
              console.log("clicked");
              navigate(`${cat.catName}`);
            }}
            catName={cat.catName}
            catNumber={cat.number}
            isLoading={isLoading}
            isError={isError}
            error={error}
            onRetry={refetch}
            key={cat.catName}
          ></BaseCategoryCard>
        ))}
      </div>
    </div>
  );
}

export default Categories;

import { useGetDashboardMetricsQuery } from "../../state/api";
import PopularProductCard from "../(components)/PopularProducts/PopularProductCard";

const CardPolularProduct = () => {
  const { data: dashboardMetrics, isLoading } = useGetDashboardMetricsQuery();
  return (
    <div className="row-span-3 xl:row-span-6 bg-white shadow-md rounded-2xl pb-16">
      {isLoading ? (
        <div className="m-5">Loading...</div>
      ) : (
        <>
          <h3 className="text-lg font-semibold px-7 py-5 pb-2">
            Popular Products
          </h3>
          <hr className="border-gray-300" />
          <div className="overflow-auto h-full">
            <PopularProductCard dashboardMetrics={dashboardMetrics} />
          </div>
        </>
      )}
    </div>
  );
};

export default CardPolularProduct;

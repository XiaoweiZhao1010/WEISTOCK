import { ShoppingBagIcon } from "lucide-react";
import Rating from "../Rating/Rating";
import { DashboardMetrics } from "../../../state/api";
import Image from "next/image";

type PopularProductCardProps = {
  dashboardMetrics: DashboardMetrics | undefined;
};

const PopularProductCardDetail = ({
  dashboardMetrics,
}: PopularProductCardProps) => {
  return (
    <>
      {dashboardMetrics?.popularProducts.map((product) => (
        <div
          key={product.productId}
          className="flex items-center justify-between gap-3 px-5 py-7 border-b last:border-0"
        >
          <div className="flex items-center gap-3 ">
            <div className="rounded-2xl">
              <Image
                src={`https://s3-inventory-managmentnextjs.s3.us-east-2.amazonaws.com/product${Math.floor(Math.random() * 3) + 1}.png`}
                alt={product.name}
                width={48}
                height={48}
                className="rounded w-14 h-14"
              />
            </div>
            <div className="flex flex-col justify-between gap-1">
              <p className="font-bold text-gray-700">{product.name}</p>
              <p className="flex text-sm items-center">
                <span className="font-bold text-blue-500 text-xs">
                  ${product.price.toFixed(2)}
                </span>
                <span className="mx-2">|</span>
                <Rating rating={product.rating || 0} />
              </p>
            </div>
          </div>
          <div className="text-xs flex items-center">
            <button className="p-2 rounded-full bg-blue-100 text-blue-600">
              <ShoppingBagIcon className="w-4 h-4" />
            </button>
            <span className="ml-2">
              {Math.round(product.stockQuantity / 1000)}k Sold
            </span>
          </div>
        </div>
      ))}
    </>
  );
};

export default PopularProductCardDetail;

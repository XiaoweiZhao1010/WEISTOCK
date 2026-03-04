"use client";
import CardExpenseSummary from "@/app/dashboard/CardExpenseSummary";
import CartPopularProduct from "./CardPolularProduct";
import CardSalesSummary from "./CardSalesSummary";
import CardPurchaseSummary from "@/app/dashboard/CardPurchaseSummary";
import StatCard from "@/app/dashboard/StatCard";
import {
  Package,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  Tag,
} from "lucide-react";
const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:overflow-auto gap-10 pb-4 custom-grid-rows">
      <CartPopularProduct />
      <CardSalesSummary />
      <CardPurchaseSummary />
      <CardExpenseSummary />
      <StatCard
        title="Customer & Expenses"
        primaryIcon={<Package className="text-blue-600 w-6 h-6" />}
        details={[
          {
            title: "Customer Growth",
            amount: "175.00",
            changePercentage: 131,
            IconComponent: TrendingUp,
          },
          {
            title: "Expenses",
            amount: "10.00",
            changePercentage: -56,
            IconComponent: TrendingDown,
          },
        ]}
        dateRange="22 - 29 October 2025"
      />
      <StatCard
        title="Dues & Pending Orders"
        primaryIcon={<CheckCircle className="text-blue-600 w-6 h-6" />}
        details={[
          {
            title: "Dues",
            amount: "250.00",
            changePercentage: 131,
            IconComponent: TrendingUp,
          },
          {
            title: "Pending Orders",
            amount: "147.00",
            changePercentage: -56,
            IconComponent: TrendingDown,
          },
        ]}
        dateRange="22 - 29 October 2025"
      />
      <StatCard
        title="Sales & Discount"
        primaryIcon={<Tag className="text-blue-600 w-6 h-6" />}
        details={[
          {
            title: "Sales",
            amount: "1000.00",
            changePercentage: 20,
            IconComponent: TrendingUp,
          },
          {
            title: "Discount",
            amount: "200.00",
            changePercentage: -10,
            IconComponent: TrendingDown,
          },
        ]}
        dateRange="22 - 29 October 2025"
      />
    </div>
  );
};

export default Dashboard;

//tsrafce

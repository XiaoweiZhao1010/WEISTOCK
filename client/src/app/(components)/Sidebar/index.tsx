"use client";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import Link from "next/link";
import { setIsSidebarCollapsed } from "@/state";
import {
  Archive,
  Layout,
  Menu,
  Clipboard,
  User,
  SlidersHorizontal,
  CircleDollarSign,
  Warehouse,
} from "lucide-react";
import SidebarLink from "@/app/(components)/Sidebar/SidebarLink";

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed,
  );
  const toggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  };
  const sidebarClassName = `fixed flex flex-col ${isSidebarCollapsed ? "w-0 md:w-16" : "w-72 md:w-64"} 
  bg-white transition-all duration-300 overflow-hidden h-full shadow-md z-40`;
  return (
    <div className={sidebarClassName}>
      {/* TOP LOGO */}
      <div
        className={`flex gap-3 justify-center md:justify-normal items-center pt-8 ${isSidebarCollapsed ? "px-5" : "px-8"}`}
      >
        <Link href="/dashboard" className="flex flex-row cursor-pointer gap-3">
          <Warehouse strokeWidth={2.5} />
          <h2
            className={`${isSidebarCollapsed ? "hidden" : "block"} font-extrabold text-2xl`}
          >
            WEISTOCK
          </h2>
        </Link>

        <button
          className="md:hidden px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100"
          onClick={toggleSidebar}
        >
          <Menu className="w-4 h-4" />
        </button>
      </div>

      {/* LINKS */}
      <div className="grow mt-8">
        <SidebarLink
          href="/dashboard"
          icon={Layout}
          label="Dashboard"
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/inventory"
          icon={Archive}
          label="Inventory"
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/products"
          icon={Clipboard}
          label="Products"
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/users"
          icon={User}
          label="Users"
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/settings"
          icon={SlidersHorizontal}
          label="Settings"
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/expenses"
          icon={CircleDollarSign}
          label="Expenses"
          isCollapsed={isSidebarCollapsed}
        />
      </div>
      {/* FOOTER */}
      <div className={`${isSidebarCollapsed ? "hidden" : "block"} px-8 py-4`}>
        <p className="text-center text-xs text-gray-500">&copy; 2026 Wei</p>
      </div>
    </div>
  );
};

export default Sidebar;

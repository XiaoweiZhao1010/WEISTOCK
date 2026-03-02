"use client";
import { usePathname } from "next/navigation";
import { LucideIcon } from "lucide-react";
import Link from "next/link";

interface SidebarLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
  isCollapsed: boolean;
}

export default function SidebarLink({
  href,
  icon: Icon,
  label,
  isCollapsed,
}: SidebarLinkProps) {
  const pathname = usePathname();
  const isActive =
    pathname === href || (pathname === "/" && href === "/dashboard");

  return (
    <Link
      href={href}
      className={
        isActive ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-100"
      }
    >
      <div
        className={`cursor-pointer flex items-center gap-2 ${isCollapsed ? "justify-center py-4" : "justify-start px-8 py-4"} hover:text-blue-500 hover:bg-blue-100 transition-colors ${isActive ? "bg-blue-200 text-white" : ""}`}
      >
        <Icon className="w-6 h-6 text-gray-700" />
        <span
          className={`${isCollapsed ? "hidden" : "block"} font-medium text-gray-700`}
        >
          {label}
        </span>
      </div>
    </Link>
  );
}

"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

import { motion } from "framer-motion";

import { sidebarLinks } from "@/constants/lists";

const SidebarNav = () => {
  const pathname = usePathname();

  return (
    <nav className="space-y-2.5">
      {sidebarLinks.map((item, index) => (
        <Link
          className="relative text-sm font-semibold text-center py-1.5 rounded-md overflow-hidden"
          href={item.href}
          key={index}
        >
          {item.href.pathname === pathname && (
            <motion.span
              className="absolute inset-0 bg-primary"
              layoutId="active-pill"
            />
          )}
          <span
            className={`relative ${
              item.href.pathname === pathname && "text-primary-foreground"
            }`}
          >
            {item.label}
          </span>
        </Link>
      ))}
    </nav>
  );
};

export default SidebarNav;

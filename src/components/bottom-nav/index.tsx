"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import BottomNavIcon from "./BottomNavIcon";
import { BOTTOM_NAV_ROSE_TABS, BOTTOM_NAV_TABS } from "./bottomNav.const";

function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="flex h-[72px] flex-shrink-0 border-t border-border bg-ivory">
      {BOTTOM_NAV_TABS.map((tab) => {
        const active = pathname.startsWith(tab.href);
        const activeColor = BOTTOM_NAV_ROSE_TABS.includes(tab.id)
          ? "text-rose"
          : "text-sage";

        return (
          <Link
            key={tab.id}
            href={tab.href}
            className="flex flex-1 cursor-pointer flex-col items-center justify-center gap-1"
          >
            <BottomNavIcon tabId={tab.id} active={active} />
            <span
              className={`font-sans text-[9px] tracking-[0.3px] ${
                active ? `font-bold ${activeColor}` : "font-normal text-muted"
              }`}
            >
              {tab.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}

export default BottomNav;

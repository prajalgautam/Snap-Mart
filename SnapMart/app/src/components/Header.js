"use client";

import Link from "next/link";
import useAuthStore from "@/stores/authStore";
import {
  CART_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  navMenu,
} from "@/constants/routes";
import { usePathname, useRouter } from "next/navigation";
import usePreferenceStore from "@/stores/preferenceStore";
import { FaMoon, FaSun, FaShoppingCart } from "react-icons/fa";
import useCartStore from "@/stores/cartStore";
import Logo from "./Logo";
import Account from "./Account";

const Header = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const toggleTheme = usePreferenceStore((state) => state.toggleTheme);

  const theme = usePreferenceStore((state) => state.theme);
  const products = useCartStore((state) => state.products);

  const router = useRouter();
  const pathName = usePathname();

  if (pathName.startsWith("/admin")) return;

  return (
    <header className="py-4 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-900 sticky top-0 z-50 transition-all">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between gap-4">
          <Logo />
          <nav className="items-center gap-6 hidden md:flex font-medium text-sm">
            {navMenu.map((menu) => {
              const isActive =
                pathName == menu.route ||
                (menu.route !== HOME_ROUTE && pathName.startsWith(menu.route));

              return (
                <Link
                  key={menu.route}
                  className={`px-1 py-1 transition-all ${
                    isActive
                      ? "text-primary font-bold border-b-2 border-primary"
                      : "text-gray-600 dark:text-gray-300 hover:text-primary"
                  }`}
                  href={menu.route}
                >
                  {menu.label}
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 h-10 w-10 transition-all hover:bg-gray-200 dark:hover:bg-gray-800"
            >
              {theme == "light" ? <FaMoon className="text-sm" /> : <FaSun className="text-sm" />}
            </button>

            <Link
              href={CART_ROUTE}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 transition-all hover:bg-gray-200 dark:hover:bg-gray-800"
            >
              <FaShoppingCart className="text-sm text-primary" />
              <span className="bg-primary px-2 py-0.5 text-[10px] font-bold rounded-full text-white">
                {products.length}
              </span>
            </Link>

            {isAuthenticated ? (
              <Account />
            ) : (
              <Link
                className="bg-primary hover:bg-primary-dark text-white text-xs font-bold uppercase tracking-wider px-6 py-2.5 rounded-full transition-all shadow-lg shadow-primary/10 hover:shadow-primary/20"
                href={LOGIN_ROUTE}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

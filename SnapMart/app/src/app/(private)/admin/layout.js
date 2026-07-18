"use client";

import useAuthStore from "@/stores/authStore";
import { HOME_ROUTE, LOGIN_ROUTE } from "@/constants/routes";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ROLE_ADMIN, ROLE_MERCHANT } from "@/constants/userRoles";
import Sidebar from "./_components/Sidebar";

const MerchantLayout = ({ children }) => {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [mounted, setMounted] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (mounted) {
      if (!isAuthenticated) {
        return router.replace(LOGIN_ROUTE);
      }

      if (
        user &&
        !user.roles?.includes(ROLE_MERCHANT) &&
        !user.roles?.includes(ROLE_ADMIN)
      ) {
        return router.push(HOME_ROUTE);
      }
    }
  }, [mounted, isAuthenticated, user, router]);

  if (!mounted || !isAuthenticated || !user) return null;

  return (
    <>
      <Sidebar />
      <div className="p-6 sm:ml-64 min-h-screen dark:bg-gray-800">{children}</div>
    </>
  );
};

export default MerchantLayout;

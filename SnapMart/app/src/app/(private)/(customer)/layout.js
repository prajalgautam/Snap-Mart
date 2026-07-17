"use client";

import useAuthStore from "@/stores/authStore";
import { HOME_ROUTE, LOGIN_ROUTE } from "@/constants/routes";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ROLE_CUSTOMER } from "@/constants/userRoles";

const CustomerLayout = ({ children }) => {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [mounted, setMounted] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      if (!isAuthenticated) {
        return router.replace(LOGIN_ROUTE);
      }

      if (user && !user.roles?.includes(ROLE_CUSTOMER)) {
        return router.push(HOME_ROUTE);
      }
    }
  }, [mounted, isAuthenticated, user, router]);

  if (!mounted || !isAuthenticated || !user) return null;

  return <>{children}</>;
};

export default CustomerLayout;

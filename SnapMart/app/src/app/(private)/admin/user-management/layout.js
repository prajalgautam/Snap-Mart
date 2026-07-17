"use client";

import useAuthStore from "@/stores/authStore";
import { HOME_ROUTE, LOGIN_ROUTE } from "@/constants/routes";
import { ROLE_ADMIN } from "@/constants/userRoles";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const UserMangementLayout = ({ children }) => {
  const user = useAuthStore((state) => state.user);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      if (!user) {
        return router.replace(LOGIN_ROUTE);
      }

      if (!user.roles?.includes(ROLE_ADMIN)) {
        return router.replace(HOME_ROUTE);
      }
    }
  }, [mounted, user, router]);

  if (!mounted || !user || !user.roles?.includes(ROLE_ADMIN)) return null;

  return <div>{children}</div>;
};

export default UserMangementLayout;

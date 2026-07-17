"use client";

import useAuthStore from "@/stores/authStore";
import { LOGIN_ROUTE } from "@/constants/routes";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const PrivateLayout = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isAuthenticated) {
      router.replace(LOGIN_ROUTE);
    }
  }, [mounted, isAuthenticated, router]);

  if (!mounted || !isAuthenticated) return null;

  return <>{children}</>;
};

export default PrivateLayout;

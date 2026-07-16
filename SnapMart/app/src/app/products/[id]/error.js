"use client";

import { PRODUCTS_ROUTE } from "@/constants/routes";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ErrorPage = ({ error }) => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push(PRODUCTS_ROUTE);
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return <div>{error.message}</div>;
};

export default ErrorPage;

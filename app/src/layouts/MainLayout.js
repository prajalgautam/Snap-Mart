"use client";

import { useEffect } from "react";
import usePreferenceStore from "@/stores/preferenceStore";

const MainLayout = ({ children }) => {
  const theme = usePreferenceStore((state) => state.theme);

  useEffect(() => {
    usePreferenceStore.persist.rehydrate();
  }, []);

  return <div className={`${theme} dark:bg-gray-800`}>{children}</div>;
};

export default MainLayout;

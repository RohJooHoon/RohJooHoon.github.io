"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface CommonStoreProps {
  isOpenMenu: boolean;
  isOpenMenuEnd: boolean;
  toggleMenu: () => void;
  setIsOpenMenu: (value: boolean) => void;
  // 다른 상태와 메서드 여기에 추가
}

const CommonStoreContext = createContext<CommonStoreProps | undefined>(undefined);

export const CommonStoreProvider = ({ children }: { children: ReactNode }) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isOpenMenuEnd, setIsOpenMenuEnd] = useState(false);

  const toggleMenu = () => {
    setIsOpenMenu((prev) => !prev);
    setTimeout(() => {
      setIsOpenMenuEnd((prev) => !prev);
    }, 500);
  };

  return <CommonStoreContext.Provider value={{ isOpenMenu, isOpenMenuEnd, toggleMenu, setIsOpenMenu }}>{children}</CommonStoreContext.Provider>;
};

export const useCommonStore = () => {
  const context = useContext(CommonStoreContext);
  if (!context) {
    throw new Error("useCommonStore must be used within a CommonStoreProvider");
  }
  return context;
};

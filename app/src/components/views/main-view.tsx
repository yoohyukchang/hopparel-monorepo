import MainBody from "../main-body";
import Header from "../header";
import { useStore } from "@/lib/store";
import { useEffect } from "react";

const MainView = () => {
  const clearSelectedProductType = useStore((state) => state.clearSelectedProductType);

  useEffect(() => {
    clearSelectedProductType();
  }, []);

  return (
    <>
      <Header />
      <MainBody />
    </>
  );
};

export default MainView;

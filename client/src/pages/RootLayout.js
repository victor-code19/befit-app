import { Outlet } from "react-router-dom";

import MainNavigation from "../components/Layout/MainNavigation/MainNavigation";
import Footer from "../components/Layout/Footer/Footer";

const RootLayout = () => {
  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default RootLayout;

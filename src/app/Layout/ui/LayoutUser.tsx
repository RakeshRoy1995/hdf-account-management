import Navbar from "@/pages/Navbar/Navbar";
import { FC } from "react";
import LeftSideMenuBar from "@/app/Layout/LeftSideMenuBar";
import LandingPageNavBar from "@/pages/LandingPage/LandingPageNavBar";
import Footer from "@/pages/LandingPage/Footer";
import { Outlet } from "react-router-dom";


const LayoutUser: FC = () => {
  
  return (
    <div className="w-full">
      <LandingPageNavBar />
      <Outlet />
      <Footer />

      {/* <LayoutFooter /> */}
    </div>
  );
};

export default LayoutUser;

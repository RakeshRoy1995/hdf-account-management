import Navbar from "@/pages/Navbar/Navbar";
import { FC } from "react";
import LeftSideMenuBar from "@/app/Layout/LeftSideMenuBar";


const Layout: FC = () => {
  
  return (
    <div className="w-full">
      <Navbar />
      <LeftSideMenuBar />

      {/* <LayoutFooter /> */}
    </div>
  );
};

export default Layout;

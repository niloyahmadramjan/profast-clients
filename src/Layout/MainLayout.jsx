import { Outlet } from "react-router";
import Footer from "../component/Footer";
import Navbar from "../component/NavBar";

const MainLayout = () => {
  return (
    <div className="max-w-7xl mx-auto">
   <Navbar></Navbar>
      <div className="min-h-[calc(100vh-407.60px)]">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;

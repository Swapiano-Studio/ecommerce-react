import NavBar from "../component/ui/NavBar";
import Footer from "../component/ui/Footer";
import { ToastContainer } from 'react-toastify';
import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";

const MainLayout = ({ numCartItems }) => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div style={{ backgroundColor: "#EFE3C2" }}>
      <NavBar numCartItems={numCartItems} />
      <ToastContainer />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;

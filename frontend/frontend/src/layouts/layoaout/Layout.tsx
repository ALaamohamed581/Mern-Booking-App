import { Outlet } from "react-router-dom";
import Header from "../../components/HEADER";
import Foonter from "../../components/footer";
import Hero from "../../pasges/Home/Hero";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Hero />

      <div className="container  mx-auto flex-1 ">
        {" "}
        <Outlet />
      </div>
      <Foonter />
    </div>
  );
};

export default Layout;

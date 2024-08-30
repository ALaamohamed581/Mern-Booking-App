import { Outlet } from "react-router-dom";
import Header from "../../components/HEADER";
import Foonter from "../../components/footer";
import Hero from "../../pasges/Home/Hero";
import SearchBar from "../../components/searchBar";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen ">
      <Header />
      <Hero />
      <div className="container mx-auto max-w-[1379px]">
        <SearchBar />
      </div>
      <div className="container  mx-auto flex-1  max-w-[1379px]">
        {" "}
        <Outlet />
      </div>
      <Foonter />
    </div>
  );
};

export default Layout;

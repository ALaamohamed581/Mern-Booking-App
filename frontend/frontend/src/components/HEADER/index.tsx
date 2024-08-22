import { Link } from "react-router-dom";
import { UseAppContext } from "../../context/AppContext";
import SignOutButton from "../logOut";
const Header = () => {
  const { isLoggedIn } = UseAppContext();
  return (
    <div className="bg-blue-800 py-6 ">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to="/"> MERNHoildays.com</Link>
        </span>
        <span className="flex space-x-2">
          {isLoggedIn ? (
            <>
              <Link
                className="flex items-center text-white px-3 font-bold hover:bg-blue-200 hover:text-blue-900"
                to="/my-bookings"
              >
                {" "}
                my Bokings
              </Link>
              <Link
                className="flex items-center text-white px-3 font-bold hover:bg-blue-200 hover:text-blue-900"
                to="/my-hotels"
              >
                {" "}
                my Hotels
              </Link>
              <SignOutButton />
            </>
          ) : (
            <Link
              to="/sign-in"
              className="flex bg-white items-center text-blue-600 px-3 font-bold hover:bg-gray-100"
            >
              Sing In
            </Link>
          )}
        </span>
      </div>
    </div>
  );
};

export default Header;

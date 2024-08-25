import { RouterProvider } from "react-router-dom";
import routesConfig from "./Routes";
import { UseAppContext } from "./context/AppContext";
function App() {
  const { isLoggedIn } = UseAppContext();
  const routes = routesConfig(isLoggedIn);

  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;

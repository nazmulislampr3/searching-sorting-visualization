import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Menu from "./components/Menu";
import { useEffect } from "react";

const App = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname === "/") {
      return navigate("/sorting/bubble");
    }
  }, [pathname]);
  return (
    <div className="h-screen overflow-hidden bg-blue-100 relative flex">
      <Menu />
      <div className="py-2 px-3 w-full h-full">
        <Outlet />
      </div>
    </div>
  );
};

export default App;

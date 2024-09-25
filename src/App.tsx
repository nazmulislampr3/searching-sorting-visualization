import { Navigate, Outlet, redirect, useLocation } from "react-router-dom";
import Menu from "./components/Menu";

const App = () => {
  const { pathname } = useLocation();
  console.log(pathname);

  if (pathname === "/") {
    return <Navigate to={"/sorting/bubble"} />;
  }
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

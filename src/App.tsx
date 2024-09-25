import { Outlet } from "react-router-dom";
import Menu from "./components/Menu";

const App = () => {
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

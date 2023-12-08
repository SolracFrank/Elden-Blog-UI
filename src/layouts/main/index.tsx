import { Outlet } from "react-router-dom";
import NavBar from "../../components/navbar";

const MainLayout = () => {
  return (
    <div className="flex flex-col h-screen font-raleway">
      <NavBar />
      <div id="main-outlet" className="flex-grow flex">
        <Outlet />
      </div>
    </div>
  );
};
export default MainLayout;

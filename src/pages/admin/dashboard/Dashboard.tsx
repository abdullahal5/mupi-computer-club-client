import { Outlet } from "react-router-dom";
import Sidebar from "../../../components/dashboard/sidebar/Sidebar";

const Dashboard = () => {
  return (
    <div className="flex h-screen">
      <div className="h-full overflow-hidden">
        <Sidebar />
      </div>
      <div className="w-full">
        <div className="h-screen overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

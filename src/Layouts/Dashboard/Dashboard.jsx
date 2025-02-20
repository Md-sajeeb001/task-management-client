import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="">
      {/* dashboard content */}
      <div className="flex-1">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;

import { NavLink, Outlet } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="flex">
      {/* dashboard side bar */}
      <div className="w-64 min-h-screen bg-orange-400">
        <ul className="menu p-4">
          {user?.email ? (
            <>
              <li>
                <NavLink to="/dashboard/users">
                  {/* <FaUsers></FaUsers> */}
                  All Users
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/dashboard/userHome">
                  {/* <FaHome></FaHome> */}
                  User Home
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
      {/* dashboard content */}
      <div className="flex-1 p-8">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;

// import { NavLink, Outlet } from "react-router-dom";
// import useAuth from "../../Hooks/useAuth";

// const Dashboard = () => {
//   const { user } = useAuth();

//   return (
//     <div className="flex">
//       {/* dashboard side bar */}
//       <div className="w-64 min-h-[100vh] bg-orange-400">
//         <ul className="menu p-4">
//           {user && (
//             <>
//               <li>
//                 <NavLink to="/dashboard/adminHome">
//                   {/* <FaHome></FaHome> */}
//                   Admin Home
//                 </NavLink>
//               </li>
//             </>
//           )}
//         </ul>
//       </div>

//       {/* dashboard content */}
//       <div className="flex-1">
//         <Outlet></Outlet>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import Container from "../../Shared/Container/Container";
import add from "../../assets/add-post.png";
import manage from "../../assets/checkmark.png";
import logout from "../../assets/logout (1).png";
import userImg from "../../assets/user (1).png";
import bars from "../../assets/menu.png";
import close from "../../assets/close.png";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false); // Sidebar state
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogOut = () => {
    logOut()
      .then((res) => {
        if (res) {
          navigate("/login");
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar (Fixed) */}
      <div
        className={`fixed bg-white top-0 left-0 bottom-0 right-0 bg-white lg:relative border-r border-slate-300 
           lg:w-64 w-64 h-full p-4 transform ${
             isOpen ? "translate-x-0" : "-translate-x-full"
           } lg:translate-x-0 transition-transform duration-400 ease-in-out`}
      >
        {/* Close Button (Mobile Only) */}
        {isOpen && (
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden absolute top-4 right-4 text-[#d9af01] text-2xl"
          >
            <img src={close} className="w-8" alt="" />
          </button>
        )}

        <div className="w-10 rounded-full mx-auto mb-4">
          <img alt="" src={user?.photoURL} className="rounded-full" />
        </div>

        {/* Sidebar Links */}
        <ul className="overflow-y-auto h-[calc(100%-50px)]">
          {user && (
            <>
              <li>
                <NavLink
                  to="/dashboard/add-task"
                  className="block flex items-center gap-3 p-2"
                >
                  <img src={add} className="w-5" alt="" /> Add Task
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/manage-tasks"
                  className="block flex items-center gap-3 p-2"
                >
                  <img src={manage} className="w-5" alt="" /> Manage Tasks
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/profile"
                  className="block flex items-center gap-3 p-2"
                >
                  <img src={userImg} className="w-5" alt="" /> User Profile
                </NavLink>
              </li>
              <li>
                <NavLink
                  onClick={handleLogOut}
                  className="block flex items-center gap-3 p-2"
                >
                  <img src={logout} className="w-5" alt="" /> Log Out
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Mobile Sidebar Toggle */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="lg:hidden fixed top-4 left-4 "
        >
          <img src={bars} className="w-8" alt="" />
        </button>
      )}

      {/* Main Content (Scrollable) */}
      <div className="flex-1 h-screen overflow-y-auto p-4">
        <Container>
          <Outlet />
        </Container>
      </div>
    </div>
  );
};

export default Dashboard;

import { useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import Container from "../../Shared/Container/Container";
import DBLogo from "../../assets/DBLogo.jpg";
import AddTaskForm from "../../components/AddTaskForm/AddTaskForm";

const DashboardHome = () => {
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
    <div>
      <nav>
        <div className="navbar bg-base-100 shadow-sm lg:px-12">
          <div className="flex-1">
            <img src={DBLogo} className="w-10 h-10 rounded-full" alt="" />
          </div>
          <div className="flex gap-2">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img alt="" src={user?.photoURL} />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <button onClick={handleLogOut}>Logout</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <Container>
        <AddTaskForm></AddTaskForm>
      </Container>
    </div>
  );
};

export default DashboardHome;

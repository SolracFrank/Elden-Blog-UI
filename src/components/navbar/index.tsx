import { NavLink } from "react-router-dom";
import { useAuthContext } from "../../context/useAuthContext";

const NavBar = () => {
  const { isAuthenticated, userName, logout} = useAuthContext();
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <NavLink to="/" className="text-xl font-semibold">
          Elden Blogs
        </NavLink>
        <ul className="flex space-x-4">
          {!isAuthenticated ? (
            <>
              <NavLink to="/login" className="hover:text-gray-300">
                Log in
              </NavLink>
              <NavLink to="/register" className="hover:text-gray-300">
                Join
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/" className="hover:text-gray-300">
                {userName}
              </NavLink>
              <button onClick={logout} className="hover:text-gray-300">
                Logout
              </button>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;

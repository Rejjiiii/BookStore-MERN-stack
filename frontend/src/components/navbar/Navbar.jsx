import { Link } from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="bg-gray-800 text-white py-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between px-4">

        <h1 className="text-xl font-bold">
          {user ? (
            <Link to="/">Book Record</Link>
          ) : (
            <span>Book Record</span>
          )}
        </h1>

        {/* Navigation Links */}
        <nav className="flex items-center space-x-6">
          {user ? (
            <div className="flex items-center space-x-6">
              {/* User Greeting */}
              <span className="text-lg text-gray-300">
                👋 Hi,{" "}
                {user.user.displayName ? user.user.displayName : user.user.username}
              </span>
              {/* Navigation Links */}
              <Link to='/' className="hover:text-gray-300 transition-colors">
                Home
              </Link>
              <button onClick={handleLogout} className="hover:text-gray-300 transition-colors">
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-6">
              <Link to='/login' className="hover:text-gray-300 transition-colors">
                Login
              </Link>
              <Link to='/register' className="hover:text-gray-300 transition-colors">
                Register
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;

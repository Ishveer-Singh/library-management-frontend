import { NavLink } from "react-router-dom";

function Sidebar() {

  const linkClass = ({ isActive }) =>
    isActive
      ? "bg-blue-600 text-white p-2 rounded"
      : "text-gray-700 p-2 rounded hover:bg-gray-200";

  return (

    <aside className="w-64 min-h-screen bg-white shadow-md p-5">

      <h2 className="text-xl font-bold mb-8">
        Library
      </h2>

      <nav className="flex flex-col gap-4">

        <NavLink to="/" className={linkClass}>🏠 Dashboard</NavLink>

        <NavLink to="/books" className={linkClass}>📚 Books</NavLink>

        <NavLink to="/members" className={linkClass}>👥 Members</NavLink>

        <NavLink to="/issue-books" className={linkClass}>🔄 Issue Books</NavLink>

        <NavLink to="/profile" className={linkClass}>👤 Profile</NavLink>

        {/* <navlink to="">🚪 Logout</navlink> */}

      </nav>

    </aside>
  );
}

export default Sidebar
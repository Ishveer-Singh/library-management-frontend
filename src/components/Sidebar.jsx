import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  ArrowRightLeft,
  UserCircle,
  X,
} from "lucide-react";

import Logo from "./Logo";

function Sidebar({ mobile = false, open = false, onClose }) {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
      isActive
        ? "bg-[#4F46E5] text-white"
        : "text-gray-300 hover:bg-slate-800 hover:text-white hover:translate-x-1"
    }`;

  return (
    <>
      {mobile && open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          bg-[#0F172A] px-5 py-6 flex flex-col
          ${
            mobile
              ? `fixed top-0 left-0 h-screen w-64 z-50 transform transition-transform duration-300 ${
                  open ? "translate-x-0" : "-translate-x-full"
                }`
              : "w-64 h-screen sticky top-0"
          }
        `}
      >
        <div className="pb-6 relative">
          <Logo />

          {mobile && (
            <button
              onClick={onClose}
              className="absolute top-0 right-0 text-white"
            >
              <X size={24} />
            </button>
          )}

          <div className="border-b border-slate-700 mt-5"></div>
        </div>

        <nav className="flex-1 flex flex-col gap-3">
          <NavLink
            to="/"
            className={linkClass}
            onClick={mobile ? onClose : undefined}
          >
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/books"
            className={linkClass}
            onClick={mobile ? onClose : undefined}
          >
            <BookOpen size={20} />
            <span>Books</span>
          </NavLink>

          <NavLink
            to="/members"
            className={linkClass}
            onClick={mobile ? onClose : undefined}
          >
            <Users size={20} />
            <span>Members</span>
          </NavLink>

          <NavLink
            to="/issue-books"
            className={linkClass}
            onClick={mobile ? onClose : undefined}
          >
            <ArrowRightLeft size={20} />
            <span>Issue Books</span>
          </NavLink>

          <NavLink
            to="/profile"
            className={linkClass}
            onClick={mobile ? onClose : undefined}
          >
            <UserCircle size={20} />
            <span>Profile</span>
          </NavLink>
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;
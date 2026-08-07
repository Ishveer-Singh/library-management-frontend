import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { UserCircle, Mail, Shield, LogOut } from "lucide-react";

function Profile() {

  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800">
          My Profile
        </h1>
        <p className="text-slate-500 mt-1">
          Manage your account information.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">

        <div className="flex flex-col items-center border-b pb-8">
          <UserCircle
            size={90}
            className="text-indigo-600"
          />

          <h2 className="text-2xl font-semibold mt-3 text-slate-800">
            {user?.name}
          </h2>

          <p className="text-slate-500">
            {user?.email}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-8">

          <div className="flex items-center gap-4 p-4 rounded-lg bg-slate-50">
            <Mail className="text-indigo-600" />
            <div>
              <p className="text-sm text-slate-500">Email</p>
              <p className="font-medium text-slate-800">
                {user?.email}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-lg bg-slate-50">
            <Shield className="text-indigo-600" />
            <div>
              <p className="text-sm text-slate-500">Role</p>
              <p className="font-medium capitalize text-slate-800">
                {user?.role}
              </p>
            </div>
          </div>

        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-5 py-2.5 rounded-lg transition-colors "
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>

      </div>
    </div>
  );
}

export default Profile;
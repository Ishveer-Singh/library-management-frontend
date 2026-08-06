// import { useContext } from "react";
// import { Menu, Bell, UserCircle } from "lucide-react";
// import { AuthContext } from "../context/AuthContext";

// function Navbar() {

//     const { user } = useContext(AuthContext);

//     return (

//         <nav className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8">

//             <div className="flex items-center gap-4">

//                 <button className="lg:hidden text-gray-700 hover:text-indigo-600">
//                     <Menu size={24} />
//                 </button>

//                 <div className="flex items-center gap-4">
//                     <button className="lg:hidden text-gray-700 hover:text-indigo-600">
//                         <Menu size={24} />
//                     </button>
//                 </div>

//             </div>

//             <div className="flex items-center gap-5">

//                 <div className="p-2 rounded-xl hover:bg-gray-100 cursor-pointer transition-all duration-200">
//                     <Bell className="w-5 h-5 text-gray-600" />
//                 </div>

//                 <button className="flex items-center gap-3 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-xl transition">

//                     <UserCircle
//                         size={28}
//                         className="text-indigo-600"
//                     />

//                     <div className="text-left">

//                         <p className="text-sm font-semibold text-gray-800">
//                             {user?.name}
//                         </p>

//                         <p className="text-xs text-gray-500">
//                             {user?.role}
//                         </p>

//                     </div>

//                 </button>

//             </div>

//         </nav>

//     );
// }

// export default Navbar;


import { useContext } from "react";
import { Bell, UserCircle } from "lucide-react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { user } = useContext(AuthContext);

  return (
    <nav className="hidden lg:flex h-20 bg-white border-b border-gray-200 items-center justify-end px-8">

      <div className="flex items-center gap-5">

        <div className="p-2 rounded-xl hover:bg-gray-100 cursor-pointer transition-all duration-200">
          <Bell className="w-5 h-5 text-gray-600" />
        </div>

        <button className="flex items-center gap-3 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-xl transition">
          <UserCircle
            size={28}
            className="text-indigo-600"
          />

          <div className="text-left">
            <p className="text-sm font-semibold text-gray-800">
              {user?.name}
            </p>

            <p className="text-xs text-gray-500">
              {user?.role}
            </p>
          </div>

        </button>

      </div>

    </nav>
  );
}

export default Navbar;
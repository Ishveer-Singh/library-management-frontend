// import { LibraryBig } from "lucide-react";

// function Logo() {
//   return (
//     <div className="flex items-center gap-3">
//       <div className="bg-indigo-600 p-3 rounded-xl">
//         <LibraryBig className="text-white w-8 h-8" />
//       </div>

//       <div>
//         <h1 className="text-3xl font-bold text-white">
//           BookSphere
//         </h1>

//         <p className="text-sm text-indigo-200">
//           Smart Library Management
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Logo;

import { LibraryBig } from "lucide-react";

function Logo() {
  return (
    <div className="flex items-center gap-3">

      <div className="bg-indigo-600 p-3 rounded-xl">
        <LibraryBig className="text-white w-7 h-7" />
      </div>

      <div>
        <h1 className="text-xl font-bold text-white">
          BookSphere
        </h1>

        <p className="text-xs text-white">
          Smart Library Management
        </p>
      </div>

    </div>
  );
}

export default Logo;
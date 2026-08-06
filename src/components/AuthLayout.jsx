import Logo from "./Logo";
import { BookOpen, Users, Repeat, } from "lucide-react";

function AuthLayout({ children }) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-slate-50">

      <div className="hidden lg:flex flex-col justify-between bg-indigo-600 p-12 text-white">

        <Logo />

        <div>
          <h1 className="text-5xl font-bold leading-tight">
            Manage Your Library,
            Smarter.
          </h1>

          <p className="mt-4 text-indigo-100 text-lg max-w-md">
            Organize books, members, and issue records from one modern dashboard.
          </p>

          <div className="mt-8 space-y-3 text-indigo-100">
            <div className="mt-8 space-y-4">

              <div className="flex items-center gap-3">
                <BookOpen size={20} />
                <p>Manage Books</p>
              </div>

              <div className="flex items-center gap-3">
                <Users size={20} />
                <p>Manage Members</p>
              </div>

              <div className="flex items-center gap-3">
                <Repeat size={20} />
                <p>Track Issue & Return</p>
              </div>

            </div>
          </div>
        </div>

        <p className="text-sm text-indigo-200">
          © 2026 BookSphere
        </p>

      </div>

      <div className="flex items-center justify-center p-10">
        {children}
      </div>


    </div>
  );
}

export default AuthLayout;
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {

    const { user } = useContext(AuthContext);
    console.log(user);

    return (

        <nav
            className="h-16 bg-white shadow flex items-center justify-between px-6">

            <h1 className="text-xl font-bold">
                📚 Library System
            </h1>

            <div>
                <button>
                    Profile
                </button>
            </div>

        </nav>

    )
}


export default Navbar;
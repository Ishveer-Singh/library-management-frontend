import { createContext, useState,useEffect} from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(() => {
    const data = localStorage.getItem("user");

    if (!data || data === "undefined") {
        return null;
    }

    return JSON.parse(data);
});


    const login = (userData) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user")
    };

    return (
        <AuthContext.Provider value={{user,login,logout}}>
            {children}
        </AuthContext.Provider>
    );
}

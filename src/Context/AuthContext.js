import { createContext } from "react";

const AuthContext = createContext({
    isAuthenticated : false,
    setIsAuthenticated : () => {},
    token : null,
    setToken : () => {}, 
    isAdmin : false,
    setIsAdmin : () => {}
})

export default AuthContext;


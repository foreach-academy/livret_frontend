import { createContext } from "react";

const AuthContext = createContext({
    isAuthenticated : false,
    setIsAuthenticated : () =>{},
    token : null,
    setToken : () => {},
})
export default AuthContext;
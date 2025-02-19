import { createContext } from "react";

const AuthContext = createContext({
    isAuthenticated : false,
    setIsAuthenticated : () => {},
    token : null,
    setToken : () => {}, 
    isAdmin : false,
    setIsAdmin : () => {},
    isTrainer : false,
    setIsTrainer : () => {},
    userName : null,
    setUserName : () => {},
})

export default AuthContext;


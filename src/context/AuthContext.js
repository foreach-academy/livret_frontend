import { createContext } from "react";

const AuthContext = createContext({
    isAuthenticated : false,
    setIsAuthenticated : () => {},
    token : null,
    setToken : () => {}, 
    isAdmin : false,
    setIsAdmin : () => {},
    isTrainer : false,
    setIsTrainer : () => {}
})

export default AuthContext;


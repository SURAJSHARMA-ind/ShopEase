import React,{useState} from "react";
import AuthContext from "./AuthContext";


const AuthProvider = ({ children }) => {
    const [loginState, setLoginState] = useState(false)
    const login = () => setLoginState(true);
    const logout = () => setLoginState(false);
    return (
        <AuthContext.Provider value={{ loginState, setLoginState, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthProvider
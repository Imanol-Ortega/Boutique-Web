/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { useLocation, useNavigate } from "react-router-dom";

export const useAuth = () => {
    const context = useContext(AuthContext);

    return context;
};

export const AuthContextProvider = ({ children }) => {
    const [user, setuser] = useState([]);

    return (
        <AuthContext.Provider value={{ user, setuser }}>
            {children}
        </AuthContext.Provider>
    );
};

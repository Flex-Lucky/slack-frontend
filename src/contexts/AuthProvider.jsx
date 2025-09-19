import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import propTypes from "prop-types";
import { toast } from "react-toastify";

import api from "src/libs/axios";

export const AuthContext = createContext();

const AuthProvider = (props) => {
    const router = useNavigate();

    const [token, setToken] = useState("");
    const [auth, setAuth] = useState({
        _id: "",
        email: "",
        avatar: "",
        status: -2,
        username: "",
    });

    const signup = async (data) => {
        try {
            const response = await api.post("/auth/signup", data , { headers: { "Content-Type": "multipart/form-data" } });
            if (response.status == 200) {
                toast("SignUp success", { type: "success" });
                setAuth({ ...response.data.payload });
                router("/");
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const signin = async (data) => {
        try {
            const response = await api.post("/auth/signin", data);
            if (response.status == 200) {
                toast("SignIn Success", { type: "success" });
                localStorage.setItem("token", response.data.token);
                setToken(response.data.token);
                router("/slack");
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const logOut = () => {
        localStorage.removeItem("token");
        setToken("");
        setAuth({});
        router("/");
    };

    const checkAuth = async () => {
        try {
            const localToken = localStorage.getItem("token");
            if (!localToken) return router("/");
            api.defaults.headers.common["Authorization"] = "Bearer " + localToken;
            const response = await api.get("/auth/checkAuth");
            if (response.status == 200) {
                setAuth(response.data.user);
            } else {
                logOut();
            }
        } catch (error) {
            logOut();
        }
    };

    useEffect(() => {
        checkAuth();
    }, [token]);

    return (
        <AuthContext.Provider value={{ ...props.value, auth, token, signup, signin, logOut, setAuth }}>
            {props.children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: propTypes.node.isRequired,
};

export default AuthProvider;

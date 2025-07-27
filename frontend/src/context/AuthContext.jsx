import { createContext, useState, useContext } from "react";
import { ApiController } from "../utils/ApiHub";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = async ({ email, password }) => {
        const authHeader = `${btoa(email)}:${btoa(password)}`;
        const headers = {
            auth: authHeader,
        };

        const api = new ApiController();

        const [statusCode, response] = await api.ConnectToGetApi("/auth/login", headers);
        if (statusCode !== 200) {
            return;
        }

        const token = {
            'Authorization': `bearer ${response.token}`
        }
        const [userStatusCode, userDetails] = await api.ConnectToGetApi(`/user/basic-details?userId=${response.userId}`, token);
        if (userStatusCode !== 200) {
            return;
        }

        setUser({
            email: userDetails.email,
            name: userDetails.name,
        });
    };

    const registerUser = async ({ first_name, last_name, email, DoB, password}) => {
        const api = new ApiController()

        const registerHeaders = { "Content-Type": "application/json" }

        const body = {
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: password,
            DoB: DoB,
        }

        const [register_code, response] = await api.ConnectToPostApi("/auth/register", registerHeaders, body);

        if (register_code !== 201) {
            return;
        }

        const authHeader = `${btoa(email)}:${btoa(password)}`;
        const loginHeaders = {
            'auth': authHeader
        }
        const [statusCode, loginResponse] = await api.ConnectToGetApi("/auth/login", loginHeaders);
        if (statusCode !== 200) {
            return;
        }

        const getDetailsHeaders = {
            'Authorization': `bearer ${loginResponse.token}`
        }
        const [userStatusCode, userDetails] = await api.ConnectToGetApi(`/user/basic-details?userId=${loginResponse.userId}`, getDetailsHeaders);
        if (userStatusCode !== 200) {
            return;
        }

        setUser({
            email: userDetails.email,
            name: userDetails.name,
        });
    };

    const logout = () => setUser(null);

    return (
        <AuthContext.Provider value={{ user, registerUser, logout, login }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

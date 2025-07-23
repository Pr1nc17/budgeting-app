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
            console.error("Login failed", response);
            return;
        }

        const [userStatusCode, userDetails] = await api.ConnectToGetApi(`/user/basic-details?userId=${response.userId}`, headers);
        if (userStatusCode !== 200) {
            console.error("Failed to fetch user details", userDetails);
            return;
        }

        setUser({
            email: userDetails.email,
            name: userDetails.name,
        });

        console.log(user);
    };

    const registerUser = async ({ first_name, last_name, email, DoB, password}) => {
        const api = new ApiController()

        console.log('here 1')

        const registerHeaders = { "Content-Type": "application/json" }

        const body = {
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: password,
            DoB: DoB,
        }

        console.log("body", body)

        const [register_code, response] = await api.ConnectToPostApi("/auth/register", registerHeaders, body);

        if (register_code !== 201) {
            console.error("Registration failed", response);
            return;
        }
        console.log('here 2')

        const [userStatusCode, userDetails] = await api.ConnectToGetApi(`/user/basic-details?userId=${response.userId}`, {});
        if (userStatusCode !== 200) {
            console.error("Failed to fetch user details", userDetails);
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

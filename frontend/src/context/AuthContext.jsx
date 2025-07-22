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
            userId: response.userID,
        });

        console.log(user);
    };

    const registerUser = ({ name, email }) => {
        setUser({ name, email });
    };

    const logout = () => setUser(null);

    return (
        <AuthContext.Provider value={{ user, registerUser, logout, login }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

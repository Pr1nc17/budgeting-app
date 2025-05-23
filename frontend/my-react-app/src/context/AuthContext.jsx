import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = ({ email, password }) => {
    // Simulate login (replace with real API call)
    setUser({ email });
  };

  const registerUser = ({ name, email, password }) => {
    setUser({ name, email, password });
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, registerUser, logout, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

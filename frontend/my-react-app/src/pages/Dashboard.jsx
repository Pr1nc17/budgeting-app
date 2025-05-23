import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-3xl font-bold">
          Welcome, {user?.name || user?.email}!
        </h1>
        <p className="mt-2 text-gray-600">You are logged in.</p>
        <button
          onClick={logout}
          type="submit"
          className="w-full bg-red-600 text-white p-2 mt-4 rounded hover:bg-blue-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

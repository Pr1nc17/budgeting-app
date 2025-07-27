import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginForm({ onLogin }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const { user } = useAuth();

    const onSubmit = async (data) => {
        console.log('hit here')
        await onLogin(data);
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white p-8 rounded shadow-md w-96"
        >
            <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>

            <div className="mb-4">
                <label className="block text-sm font-medium">Email/Username</label>
                <input
                    type="text"
                    defaultValue={user?.email || user?.name || ""}
                    {...register("email", { required: "Email is required" })}
                    className="w-full mt-1 p-2 border rounded"
                />
                {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
            </div>

            <div className="mb-6">
                <label className="block text-sm font-medium">Password</label>
                <input
                    type="password"
                    defaultValue=""
                    {...register("password", { required: "Password is required" })}
                    className="w-full mt-1 p-2 border rounded"
                />
                {errors.password && (
                    <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                )}
            </div>

            <button
                type="submit"
                className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
            >
                Login
            </button>

            <p className="mt-4 text-center text-sm">
                Don't have an account?{" "}
                <Link to="/signup" className="text-blue-600 hover:underline">
                    Sign up
                </Link>
            </p>
            <p className="mt-4 text-center text-sm">
                <Link to="/Dashboard" className="text-blue-600 hover:underline">
                    Skip to demo
                </Link>
            </p>
        </form>
    );
}

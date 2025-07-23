import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const { registerUser } = useAuth();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        console.log("New User Data:", data);
        await registerUser(data); // Auto-login after sign-up
        // Are we sure this is the logic we want to implement?
        // If it is then vibes, but we need to consider security,
        // Most apps require login after sign up just keep in mined
        navigate("/dashboard");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white p-8 rounded shadow-md w-96"
            >
                <h2 className="text-2xl font-semibold mb-6 text-center">
                    Create Account
                </h2>

                <div className="mb-4">
                    <label className="block text-sm font-medium">First Name</label>
                    <input
                        type="text"
                        {...register("first_name", { required: "First Name is required" })}
                        className="w-full mt-1 p-2 border rounded"
                    />
                    {errors.name && (
                        <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium">Last Name</label>
                    <input
                        type="text"
                        {...register("last_name", { required: "Last Name is required" })}
                        className="w-full mt-1 p-2 border rounded"
                    />
                    {errors.name && (
                        <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium">Email</label>
                    <input
                        type="email"
                        {...register("email", { required: "Email is required" })}
                        className="w-full mt-1 p-2 border rounded"
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium">Date Of Birth</label>
                    <input
                        type="date"
                        {...register("DoB", { required: "Date Of Birth is required" })}
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
                        {...register("password", {
                            required: "Password is required",
                            minLength: { value: 6, message: "Minimum 6 characters" },
                        })}
                        className="w-full mt-1 p-2 border rounded"
                    />
                    {errors.password && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.password.message}
                        </p>
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
                >
                    Sign Up
                </button>

                <p className="mt-4 text-center text-sm">
                    Already have an account?{" "}
                    <a href="/login" className="text-blue-600 hover:underline">
                        Log in
                    </a>
                </p>
            </form>
        </div>
    );
}

import { useState } from "react";
import { Link } from "react-router-dom";
import { useRegister } from "../../hooks/useRegister";

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { register, isLoading } = useRegister();

    const handleSubmit = async (e) => {
        e.preventDefault();

        await register(username, email, password);

    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
            <form
                className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md"
                onSubmit={handleSubmit}
            >
                <h3 className="text-3xl font-bold mb-6 text-center text-blue-400">Create an Account</h3>
                <div className="mb-4">
                    <label className="block text-gray-300 mb-2" htmlFor="username">
                        Username
                    </label>
                    <input
                        id="username"
                        type="text"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="Enter your username"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-300 mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="Enter your email"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-300 mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="Enter your password"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-lg hover:opacity-90 transition"
                    disabled={isLoading}
                >
                    {isLoading ? "Registering..." : "Register"}
                </button>
                <p className="mt-4 text-center text-gray-400">
                    Already have an account?{' '}
                    <Link to="/login" className="text-blue-400 hover:underline">
                        Login
                    </Link>
                </p>
            </form>
        </div>
        // <div className="min-h-screen flex items-center justify-center bg-gray-100">
        //     <form
        //         className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
        //         onSubmit={handleSubmit}
        //     >
        //         <h3 className="text-2xl font-bold mb-6 text-center">Register</h3>
        //         <div className="mb-4">
        //             <label className="block text-gray-700 mb-2" htmlFor="username">
        //                 Username:
        //             </label>
        //             <input
        //                 id="username"
        //                 type="text"
        //                 onChange={(e) => setUsername(e.target.value)}
        //                 value={username}
        //                 className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        //                 placeholder="Enter your username"
        //             />
        //         </div>
        //         <div className="mb-4">
        //             <label className="block text-gray-700 mb-2" htmlFor="email">
        //                 Email:
        //             </label>
        //             <input
        //                 id="email"
        //                 type="email"
        //                 onChange={(e) => setEmail(e.target.value)}
        //                 value={email}
        //                 className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        //                 placeholder="Enter your email"
        //             />
        //         </div>
        //         <div className="mb-6">
        //             <label className="block text-gray-700 mb-2" htmlFor="password">
        //                 Password:
        //             </label>
        //             <input
        //                 id="password"
        //                 type="password"
        //                 onChange={(e) => setPassword(e.target.value)}
        //                 value={password}
        //                 className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        //                 placeholder="Enter your password"
        //             />
        //         </div>
        //         <button
        //             type="submit"
        //             className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
        //             disabled={isLoading}
        //         >
        //             Register
        //         </button>
        //         <p className="mt-4 text-center">
        //             Already have account?{' '}
        //             <Link to="/login" className="text-blue-500 hover:underline">
        //                 Login
        //             </Link>
        //         </p>
        //     </form>
        // </div>
    );
};

export default Register;

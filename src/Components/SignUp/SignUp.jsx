import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../helpers/AuthContext";

export default function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { signup } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        await signup(email, password);
        console.log("Signup successful");
        navigate("/");
        } catch (error) {
        console.log('Sign-up error:', error);
        }
    };

    return (
        <div className="relative h-screen w-screen overflow-hidden">
            <video
                className="absolute top-0 left-0 w-full h-full object-cover"
                src="src/Components/Home/Untitled.mov"
                autoPlay
                muted
                loop
            ></video>
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="relative z-10 flex items-center justify-center h-full w-full">
                <div class="justify-center px-6 py-8 lg:px-8 bg-black bg-opacity-40 rounded-2xl mt-16">
                    <div class="sm:mx-auto sm:w-full sm:max-w-sm ">
                        <h2 class="mt-3 text-center text-2xl font-bold leading-9 tracking-tight text-white">Sign up for an account</h2>
                    </div>

                    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form class="space-y-5">
                        <div>
                            <label for="email" class="block text-sm font-medium leading-6 text-white">Email address</label>
                            <div class="mt-2">
                            <input id="email" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                            </div>
                        </div>

                        <div>
                            <div class="flex items-center justify-between">
                            <label for="password" class="block text-sm font-medium leading-6 text-white">Password</label>
                            </div>
                            <div class="mt-2">
                            <input id="password" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "/>
                            </div>

                            <div className="mt-5 text-sm text-white">
                                <span>Already have an account?</span>{' '}
                                <Link to="/signin" className="text-white font-extrabold underline hover:text-indigo-500">
                                    Log in
                                </Link>
                            </div>
                        </div>

                        <div>
                            <button type="submit" class="flex w-full justify-center bg-transparent border-white text-white font-bold shadow-outline-white rounded-xl px-3 py-2 hover:bg-black hover:bg-opacity-70" onClick={handleSubmit}>Sign Up</button>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}  
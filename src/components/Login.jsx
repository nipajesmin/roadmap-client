import React, { useContext, useState } from 'react';
import Navbar from './Navbar';
import { toast, ToastContainer } from 'react-toastify';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';

const Login = () => {
    const { signInUser, setUser } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        try {
            const result = await signInUser(email, password);
            const user = result.user;
            setUser(user);
            toast.success('Login successful!', { position: 'top-center' });

            // Redirect to the intended page or default to '/'
            const redirectTo = location?.state?.from?.pathname || '/';
            setTimeout(() => {
                navigate(redirectTo, { replace: true });
            }, 1500);
        } catch (error) {
            let errorMessage = 'Login failed!';
            if (error.code === 'auth/user-not-found') {
                errorMessage = 'No user found with this email.';
            } else if (error.code === 'auth/wrong-password') {
                errorMessage = 'Incorrect password. Please try again.';
            } else if (error.code === 'auth/invalid-email') {
                errorMessage = 'Invalid email format.';
            }
            toast.error(errorMessage, { position: 'top-center' });
        } finally {
            setLoading(false);
        }
    };
    return (
        <div>
            <Navbar />
            <ToastContainer />
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form
                            onSubmit={handleSubmit}
                            className="card-body">
                            <h1 className="text-2xl font-bold text-center">Login</h1>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    name="email"
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    placeholder="Enter your password"
                                    name="password"
                                    className="input input-bordered"
                                    required
                                />

                            </div>
                            <div className="form-control mt-6 flex justify-center">
                                <button
                                    type="submit"
                                    style={{ backgroundColor: 'rgb(10,186,181)' }}
                                    className="text-white px-6 py-2 rounded font-semibold hover:brightness-110 transition-colors duration-200"
                                >
                                    Login
                                </button>
                            </div>



                            <p className="text-sm text-center mt-2">
                                Don’t have an account?{' '}
                                <Link to="/register" className="link link-primary">
                                    Register here
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
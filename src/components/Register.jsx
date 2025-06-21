import React, { useContext } from 'react';
import Navbar from './Navbar';
import { Link, Navigate } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebase.init';

const Register = () => {

    const { createNewUser, setUser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const name = form.get('name');
        const url = form.get('url');
        const email = form.get('email');
        const password = form.get('password');


        createNewUser(email, password)
            .then((result) => {
                const user = result.user;
                setUser(user);
                updateUserProfile({ displayName: name, photoURL: url })
                    .then(() => {
                        setUser({ ...auth.currentUser });

                        toast.success('Registration successful!', { position: 'top-center' });

                        const newUser = { name, email, url };

                        // Save user to DB
                        fetch('http://localhost:3000/users', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(newUser),
                        })
                            .then((response) => response.json())
                            .then(() => {
                                setTimeout(() => {
                                    navigate('/');
                                }, 1500);
                            })
                            .catch((error) => {
                                toast.error(`Failed to save user data: ${error.message}`, { position: 'top-center' });
                            });
                    })
                    .catch((error) => {
                        toast.error(`Failed to update profile: ${error.message}`, { position: 'top-center' });
                    });


                const newUser = { name, email, url };

                //Save new user info to the database
                fetch('http://localhost:3000/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newUser),
                })
                    .then((response) => response.json())
                    .then(() => {
                        setTimeout(() => {
                            navigate('/')
                        }, 1500);

                    })
                    .catch((error) => {
                        toast.error(`Failed to save user data: ${error.message}`, { position: 'top-center' });
                    });
            })
            .catch((error) => {
                toast.error(error.message, { position: 'top-center' });
            });
    };


    return (
        <div>
            <Navbar></Navbar>
            <ToastContainer></ToastContainer>

            <h1 className="text-3xl md:text-5xl font-bold pb-5 pt-4 bg-base-200 text-center">
                Register Now!
            </h1>
            <div className="hero bg-base-200 min-h-screen">
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form
                        onSubmit={handleRegister}
                        className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                className="input input-bordered"
                                required
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
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
                                name="password"
                                placeholder="Password"
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
                                Register
                            </button>
                        </div>


                    </form>
                    <p className="ml-4 mb-4 pl-12">
                        Already have an account? Please{' '}
                        <Link to="/login" className="text-blue-600">
                            Login
                        </Link>
                    </p>
                </div>
            </div>

        </div>
    );
};

export default Register;
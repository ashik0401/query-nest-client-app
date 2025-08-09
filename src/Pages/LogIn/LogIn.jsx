import React, { useRef, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import logo from '../../assets/logo-transparent.png';
import '../../App.css';
import Navbar from '../../Shared/Navbar';
import Footer from '../../Shared/Footer';

const LogIn = () => {
    const [showPass, setShowPass] = useState(false);
    const { logIn, googleSignIn, setLoading } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const emailRef = useRef();

    const handleLogIn = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        logIn(email, password)
            .then(() => {
                navigate(location.state?.from || '/');
            })
            .catch(() => {
                setError('Enter valid Password');
                toast.error('Enter valid Password');
                setLoading(false);
            });
    };

    const handleGoogleLogin = () => {
        googleSignIn()
            .then(() => {
                navigate(location.state?.from || '/');
            })
            .catch((error) => {
                setError(error.message);
            });
    };

    return (
        <div>
            <Navbar />
            <div className='md:px-20 md:mx-auto flex items-center justify-around md:h-[901px] mx-2 h-[550px] bg-base-200'>
                <div className=''>
                    <form onSubmit={handleLogIn} className='md:space-y-4 p-5 rounded-xl md:w-96 shadow-md userForm border dark:border-gray-500 border-gray-200'>
                        <h2 className='md:text-2xl text-lg font-semibold text-center text-secondary dark:text-white '>Login to your account</h2>

                        <div>
                            <label className='label md:text-lg'>Email</label>
                            <input
                                type='email'
                                name='email'
                                ref={emailRef}
                                className='input input-bordered w-full focus:outline-none'
                                placeholder='Email'
                                required
                            />
                        </div>

                        <div>
                            <span className='label md:text-lg'>Password</span>
                            <label className='input focus-within:outline-none w-full'>
                                <input
                                    type={showPass ? 'text' : 'password'}
                                    name='password'
                                    autoComplete='password'
                                    required
                                    placeholder='Password'
                                    className='focus:outline-none w-full'
                                />
                                <p onClick={() => setShowPass(!showPass)} className='cursor-pointer'>
                                    {showPass ? <FaEyeSlash /> : <FaEye />}
                                </p>
                            </label>
                            {error && <p className='text-red-500'>{error}</p>}
                        </div>

                        <div>
                            <a className='link link-hover text-primary'>Forgot password?</a>
                        </div>

                        <button type='submit' className='btn hover:bg-base-300 bg-secondary dark:bg-[#079D68]  text-white w-full mt-2 '>
                            Login
                        </button>

                        <div className='card-body '>
                            <div className='divider'>OR</div>
                            <button onClick={handleGoogleLogin} className='btn w-full bg-white hover:bg-gray-100  '>
                                <svg aria-label='Google logo' width='16' height='16' viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'>
                                    <path fill='#34a853' d='M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341' />
                                    <path fill='#4285f4' d='m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57' />
                                    <path fill='#fbbc02' d='m90 341a208 200 0 010-171l63 49q-12 37 0 73' />
                                    <path fill='#ea4335' d='m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55' />
                                </svg>
                                <span className='ml-2 text-black'>Login with Google</span>
                            </button>
                            <p className='text-center text-sm '>
                                Don’t have an account?
                                <Link to='/register'>
                                    <span className='ml-1 text-secondary hover:underline font-semibold dark:text-[#079D68] '>Register</span>
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
                <div className='hidden md:block'>
                    <img className='md:w-[600px]' src={logo} alt='' />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default LogIn;

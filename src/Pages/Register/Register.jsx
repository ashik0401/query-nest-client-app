import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { Link, useNavigate } from 'react-router';
import { updateProfile } from 'firebase/auth';
import toast from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import logo from '../../assets/logo-transparent.png';
import Navbar from '../../Shared/Navbar';
import Footer from '../../Shared/Footer';

const Register = () => {
  const [showPass, setShowPass] = useState(false);
  const { createUser, googleSignIn } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const { email, password, name, image_url } = Object.fromEntries(formData.entries());

    createUser(email, password)
      .then((result) => {
        updateProfile(result.user, {
          displayName: name,
          photoURL: image_url
        }).then(() => {
          const userProfile = {
            email,
            name,
            image_url,
            creationTime: result.user?.metadata?.creationTime,
            lastLogInTime: result.user?.metadata?.creationTime
          };

          fetch('https://query-nest-server-side.vercel.app/users', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(userProfile)
          }).then((res) => res.json());

          toast.success('Registration Successful !');
          navigate('/');
        });
      })
      .catch((error) => {
        setError(error.code + ' ' + error.message);
      });
  };

  const handleGoogleReg = () => {
    googleSignIn()
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div>
      <Navbar />
      <div className='md:w-10/12 md:mx-auto flex items-center justify-around md:h-[901px] mx-2 h-[550px]'>
        <div className='md:w-[50%]'>
          <form onSubmit={handleRegister} className='md:space-y-4 p-5 rounded-xl md:w-96 shadow-md userForm'>
            <h2 className='font-semibold md:text-2xl text-lg text-center text-secondary'>Register your account</h2>

            <div>
              <label className='label md:text-lg'>Name</label>
              <input type='text' name='name' className='input input-bordered w-full focus:outline-none' placeholder='Full Name' required />
            </div>

            <div>
              <label className='label md:text-lg'>Email</label>
              <input type='email' name='email' className='input input-bordered w-full focus:outline-none' placeholder='Email' required />
            </div>

            <div>
              <label className='label md:text-lg'>Image URL</label>
              <input type='text' name='image_url' className='input input-bordered w-full focus:outline-none' placeholder='Profile Image URL' />
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
                  minLength='8'
                  className='w-full focus:outline-none'
                  pattern='^(?=.*[a-z])(?=.*[A-Z]).{6,}$'
                  title='Must be more than 6 characters, including lowercase letter, uppercase letter'
                />
                <p onClick={() => setShowPass(!showPass)} className='cursor-pointer'>
                  {showPass ? <FaEyeSlash /> : <FaEye />}
                </p>
              </label>
              {error && <p className='text-red-500'>{error}</p>}
            </div>

            {error && <p className='text-red-500'>{error}</p>}

            <button type='submit' className='btn hover:bg-base-300 text-white w-full mt-5 bg-secondary'>
              Register
            </button>

            <div className='divider'>OR</div>
            <button onClick={handleGoogleReg} className='btn w-full border-[#e5e5e5] bg-white hover:bg-gray-100'>
              <svg aria-label='Google logo' width='16' height='16' viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'>
                <path fill='#34a853' d='M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341' />
                <path fill='#4285f4' d='m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57' />
                <path fill='#fbbc02' d='m90 341a208 200 0 010-171l63 49q-12 37 0 73' />
                <path fill='#ea4335' d='m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55' />
              </svg>
              <span className='ml-2 text-base-content'>Login with Google</span>
            </button>
            <p className='text-center mt-4'>
              Already have an Account?
              <Link to='/login'>
                <span className='ml-1 text-secondary hover:underline font-semibold'>Login</span>
              </Link>
            </p>
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

export default Register;

import { Link, NavLink, useNavigate } from 'react-router';
import logo from "../assets/logo-transparent.png";
import useAuth from '../hooks/useAuth';


const Navbar = () => {
  const { user, logOut, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogOut = () => {
    logOut()
      .then(() => navigate('/'))
      .catch((error) => console.error("Error logging out: ", error));
  };

  if (loading) return null;

  const links = (
    <>
      <li>
        <NavLink className={({ isActive }) => `m-2 ${isActive ? 'underline font-bold' : 'text-primary font-medium'}`} to="/">Home</NavLink>
      </li>
      <li>
        <NavLink className={({ isActive }) => `m-2 ${isActive ? 'underline font-bold' : 'text-primary font-medium'} font-bold`} to="/queries">Queries</NavLink>
      </li>
      
      {user && <li>
        <NavLink className={({ isActive }) => `m-2 ${isActive ? 'underline font-bold' : 'text-primary font-medium'} font-bold`} to="/recommendations/for-me" title='Recommendations For Me'>For Me</NavLink>
      </li>}
      {user && <li>
        <NavLink className={({ isActive }) => `m-2 ${isActive ? 'underline font-bold' : 'text-primary font-medium'} font-bold`} to="/myQueries">My Queries</NavLink>
      </li>}
      {user && <li>
        <NavLink to="/recommendations" end className={({ isActive }) => `m-2 ${isActive ? 'underline font-bold' : 'text-primary font-medium'} font-bold`} title='My Recommendations'>My Recs</NavLink>
      </li>}
      <li>
        <NavLink className={({ isActive }) => `m-2 ${isActive ? 'underline font-bold' : 'text-primary font-medium'} font-bold`} to="/aboutUs">About Us</NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar sticky top-0 z-100 bg-base-200 shadow-sm md:px-20 px-4">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn mr-1 p-1 btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 md:w-52 w-32 p-2 shadow">
            {links}
          </ul>
        </div>
        <Link to='/' className='flex items-center gap-2'>
          <img className='w-10 h-10' src={logo} alt="" />
          <p className="text-3xl font-semibold Cursive text-primary hidden md:block">QueryNest</p>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex items-center justify-center">
        <ul className="flex ">
          {links}
        </ul>
      </div>

      <div className="navbar-end">
        {user ? (
          <div>
            <div className=''>
              <button onClick={handleLogOut} className="relative inline-block text-lg group hover:cursor-pointer">
                <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-primary transition-colors duration-300 ease-out border-2 border-base-300 rounded-lg group-hover:text-white">
                  <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                  <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-base-300 group-hover:-rotate-180 ease"></span>
                  <span className="relative">Logout</span>
                </span>
                <span className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-base-300 rounded-lg group-hover:mb-0 group-hover:mr-0" data-rounded="rounded-lg"></span>
              </button>
            </div>
            
          </div>
        ) : (
          <Link to='/login' className="relative inline-block text-lg group">
            <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-primary transition-colors duration-300 ease-out border-2 border-base-300 rounded-lg group-hover:text-white">
              <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
              <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-base-300 group-hover:-rotate-180 ease"></span>
              <span className="relative">Log-in</span>
            </span>
            <span className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-base-300 rounded-lg group-hover:mb-0 group-hover:mr-0" data-rounded="rounded-lg"></span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
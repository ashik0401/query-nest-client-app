import React from 'react';

import logo from "../assets/logo-transparent.png"
import { FaFacebookF, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-base-200 ">
            <div className="flex mx-5 flex-col justify-center items-center  py-10">


                <div className=" flex flex-col items-center">
                    <img src={logo} alt="Logo" className="h-10 w-10 rounded-full " />
                    <span className="text-3xl font-semibold Cursive text-primary dark:text-white ">QueryNest</span>
                </div>


               <p>Copyright © {new Date().getFullYear()} - All right reserved</p>


                
            </div>
        </footer>

    );
};

export default Footer;
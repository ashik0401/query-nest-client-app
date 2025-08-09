import React from 'react';

import logo from "../assets/logo-transparent.png"
import { FaFacebookF, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-base-200">
            <div className="flex mx-5 flex-col justify-center items-center mt-5 py-10">


                <div className=" flex flex-col items-center">
                    <img src={logo} alt="Logo" className="h-10 w-10 rounded-full " />
                    <span className="text-3xl font-semibold Cursive text-primary ">QueryNest</span>
                </div>


               <p>Copyright © {new Date().getFullYear()} - All right reserved</p>


                {/* <div className="flex gap-4 p-2">

                    <a
                        href="https://www.facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 bg-[#1877F2] rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                    >
                        <FaFacebookF className="text-white text-xl" />
                    </a>

                    <a
                        href="https://www.linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 bg-[#0077B5] rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                    >
                        <FaLinkedinIn className="text-white text-xl" />
                    </a>


                </div> */}
                
            </div>
        </footer>

    );
};

export default Footer;
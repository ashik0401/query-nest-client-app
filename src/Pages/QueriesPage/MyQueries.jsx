import React from 'react';
import AddQueries from './AddQueries';

import banner from "../../assets/add queries 2.jpg"
import { Link } from 'react-router';
import MyAllQueries from './MyAllQueries';

const MyQueries = () => {
    return (
        <div className='md:min-h-[900px] min-h-[720px] bg-base-200'>
            <div className='relative max-h-[70vh] mb-20'>
                <img
                    className=' full w-full '
                    src={banner} alt="" />
                <div className='absolute inset-0 flex flex-col justify-center items-center text-center text-white bg-black/40 px-4 space-y-2'>
                    <h2 className='md:text-4xl Cursive font-bold text-md '>ANY QUESTIONS?</h2>
                    <p className='md:text-md font-medium text-xs'>📝 Can't find what you're looking for? Tell us what you need!</p>
                    <div className='hidden md:block'>
                        <Link
                            to='/myQueries/addQueries'
                            href="#_" className="relative inline-block text-lg group hover:cursor-pointer">
                            <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-primary transition-colors duration-300 ease-out border-2 border-base-300 rounded-lg group-hover:text-white">
                                <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                                <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-base-300 group-hover:-rotate-180 ease"></span>
                                <span className="relative">Add your query</span>
                            </span>
                            <span className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-base-300 rounded-lg group-hover:mb-0 group-hover:mr-0" data-rounded="rounded-lg"></span>
                        </Link>

                    </div>
                    <div className='block md:hidden '>
                        <Link
                        to='/myQueries/addQueries'
                        className='btn h-8 bg-base-300 text-white border-none shadow-none text-xs  '>
                        Add your query
                    </Link>
                    </div>
                </div>
            </div>
            <MyAllQueries />
        </div>
    );
};

export default MyQueries;
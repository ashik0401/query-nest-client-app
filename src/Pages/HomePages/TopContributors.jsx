import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
const TopContributors = () => {
    const [contributors, setContributors] = useState([]);

    useEffect(() => {
        fetch("https://query-nest-server-side.vercel.app/top-contributors")
            .then(res => res.json())
            .then(data => setContributors(data));
            
    }, []);

    return (
        <section className="mb-20  md:w-11/12 md:mx-auto px-4">
            <div className="container  ">
                <h2 className="md:text-4xl text-2xl font-bold text-center lg:mb-15 mb-10">Top Contributors</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                    {contributors.map((user, index) => (
                     <motion.div 
                     
                     whileHover={{rotate: 3

                      }} 
                            key={index}
                            className="bg-base-100 p-6 rounded-xl shadow-md flex flex-col items-center text-center"
                        >
                            <img
                                src={user.userPhoto}
                                alt={user.userName}
                                className="w-20 h-20 rounded-full mb-4"
                            />
                            <h3 className="text-xl font-semibold Cursive">{user.userName}</h3>
                            <p className="text-sm text-gray-600">{user.totalPosts} Helpful Posts</p>
                            <span className="mt-2 inline-block bg-base-200  text-yellow-600 text-xs px-3 py-1 rounded-full">
                                Top Contributor
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TopContributors;

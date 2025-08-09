import { useEffect, useState } from "react";
import { Link } from "react-router";
import { FaComments, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: i => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.2, duration: 0.5, ease: "easeOut" },
    }),
};

const TrendingDiscussions = () => {
    const [queries, setQueries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://query-nest-server-side.vercel.app/queries")
            .then(res => res.json())
            .then(data => {
                const sorted = data.sort((a, b) => (b.recommendationCount || 0) - (a.recommendationCount || 0));
                setQueries(sorted.slice(0, 3));
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    }, []);

    return (
        <section className="py-5  md:w-11/12 md:mx-auto px-4 mt-20">
            <div className=" ">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="md:text-4xl text-2xl font-bold text-center mb-10 lg:mb-15 Cursive text-primary dark:text-white"
                >
                    🔥Trending Product Discussions
                </motion.h2>

                {loading ? (
                   <div className="text-center">
                    <span className="loading loading-ring loading-xl"></span>
                   </div>
                ) : (
                    <div className="grid gap-10 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
                        {queries.map((query, index) => (
                            <motion.div
                                key={query._id}
                                custom={index}
                                initial="hidden"
                                animate="visible"
                                variants={cardVariants}
                                whileHover={{ scale: 1.03, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
                                className="group border bg-base-100   shadow-md rounded-xl p-6 transition duration-300 h-full flex flex-col justify-between border-gray-400"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <span className="text-sm font-medium text-gray-600 dark:text-[#079D68] truncate max-w-[70%]">{query.productName}</span>
                                    <span className="flex items-center gap-1 text-sm text-green-600 min-w-fit">
                                        <FaComments />
                                        {query.recommendationCount || 0}
                                    </span>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-blue-600 dark:text-white transition">
                                    {query.queryTitle}
                                </h3>
                                <p className="text-gray-600 text-sm line-clamp-3 mb-4 dark:text-white">
                                    {query.productBrand}
                                </p>
                                <div className="flex justify-between items-center mt-auto">
                                    <Link
                                        to={`/queries/${query._id}`}
                                        className="inline-flex items-center gap-1 text-blue-500 hover:underline text-sm"
                                    >
                                        View Details <FaArrowRight />
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default TrendingDiscussions;

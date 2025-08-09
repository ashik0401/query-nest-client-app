import { motion } from "framer-motion";
import { FaThumbsUp, FaSearch, FaCommentDots } from "react-icons/fa";

const WhyChooseUs = () => {
    return (
        <section className="md:w-11/12 md:mx-auto px-4 mt-20">
            <div className="">
                <h2 className="md:text-4xl text-xl font-bold text-center lg:mb-15 mb-10 Cursive text-primary dark:text-white"> Why Choose Our Platform</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <motion.div whileHover={{ scale: 1.05 }} className="bg-base-100    shadow-md p-6 rounded-xl text-center">
                        <FaSearch className="text-4xl mx-auto text-blue-500 mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Find the Right Product</h3>
                        <p>Get the best product suggestions based on real user experience and expert advice.</p>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} className="bg-base-100    shadow-md p-6 rounded-xl text-center">
                        <FaThumbsUp className="text-4xl mx-auto text-green-500 mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Trusted Recommendations</h3>
                        <p>All recommendations come from real users who faced similar queries.</p>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} className="bg-base-100    shadow-md p-6 rounded-xl text-center">
                        <FaCommentDots className="text-4xl mx-auto text-purple-500 mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Community Driven</h3>
                        <p>Engage with a helpful community to find the best product faster and easier.</p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;

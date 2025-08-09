import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { Link } from 'react-router';
import { FaArrowRight } from 'react-icons/fa';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const ForMe = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [myQueries, setMyQueries] = useState([]);
    const [allRecommendations, setAllRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (!user?.email) return;
            setLoading(true);

            try {
                const [queriesRes, recsRes] = await Promise.all([
                    axiosSecure.get(`/my-queries/${user.email}`),
                    axiosSecure.get(`/recommendations-for-user/${user.email}`)
                ]);

                setMyQueries(Array.isArray(queriesRes.data) ? queriesRes.data : []);
                setAllRecommendations(Array.isArray(recsRes.data) ? recsRes.data : []);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user?.email, axiosSecure]);

    const myQueryIds = myQueries.map(q => q._id.toString());
    const recommendationsForMe = allRecommendations.filter(rec => myQueryIds.includes(rec.queryId));

    if (loading) {
        return (
            <div className="flex justify-center items-center  min-h-screen">
                <span className="loading loading-ring loading-xl"></span>
            </div>
        );
    }

    return (
        <div className="md:min-h-[700px] min-h-[680px] md:w-11/12 md:mx-auto px-4 ">
            <div className="max-w-6xl mt-10 mx-auto md:p-4 shadow-md border border-base-200 rounded-2xl p-5">
              
                {recommendationsForMe.length === 0 ? (
                    <p className='text-center'>No recommendations found for your queries.</p>
                ) : (
                    <div className="overflow-x-auto rounded-2xl border  ">
                        <table className="min-w-full  bg-white dark:bg-transparent  shadow">
                            <thead>
                                <tr className="bg-gray-200 text-left">
                                    <th className="p-3 dark:text-black">Product Name</th>
                                    <th className="p-3 dark:text-black text-center">Recommendation</th>
                                    <th className="p-3 dark:text-black text-center">Recommender</th>
                                    <th className="p-3 dark:text-black text-center">Date</th>
                                    <th className="p-3 dark:text-black">View</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recommendationsForMe.map(rec => {
                                    const query = myQueries.find(q => q._id.toString() === rec.queryId);
                                    return (
                                        <tr key={rec._id} className="border-t hover:bg-gray-50 dark:hover:bg-black">
                                            <td className="p-3 font-semibold">{query?.productName || 'Untitled'}</td>
                                            <td className="p-3 text-center">{rec.recommendedProductName}</td>
                                            <td className="p-3 text-center">{rec.recommenderName}</td>
                                            <td className="p-3 text-sm text-center">{new Date(rec.createdAt).toLocaleString()}</td>
                                            <td className="p-3">
                                                <Link to={`/queries/${query?._id}`} className="text-blue-600 hover:underline flex items-center gap-1">
                                                    View <FaArrowRight />
                                                </Link>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ForMe;

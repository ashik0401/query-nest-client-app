import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { LuPenLine } from 'react-icons/lu';
import { AiOutlineDelete } from 'react-icons/ai';
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import { TiInfoLarge } from 'react-icons/ti';
import useAxiosSecure from '../../hooks/useAxiosSecure';


const MyAllQueries = () => {
    const { user } = useAuth();
    const userEmail = user?.email;
    const axiosSecure = useAxiosSecure();
    const [myQueries, setMyQueries] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (userEmail) {
            setLoading(true);
            axiosSecure.get(`/my-queries/${userEmail}`)
                .then(res => {
                    const sorted = res.data.sort((a, b) => new Date(b.timeStamp) - new Date(a.timeStamp));
                    setMyQueries(sorted);
                })
                .finally(() => setLoading(false));
        }
    }, [userEmail]);

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        });

        if (result.isConfirmed) {
            try {
                const response = await axiosSecure.delete(`/queries/${id}`);
                if (response.data.success) {
                    setMyQueries(prev => prev.filter(item => item._id !== id));
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your query has been deleted.",
                        icon: "success"
                    });
                } else {
                    Swal.fire("Failed!", response.data.message, "error");
                }
            } catch {
                Swal.fire("Error!", "Something went wrong.", "error");
            }
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center mt-20">
                <span className="loading loading-ring loading-xl"></span>
            </div>
        );
    }

    return (
        <div className='md:w-11/12 md:mx-auto px-4'>
            <h2 className='md:text-4xl text-2xl font-bold Cursive text-primary mb-10 '>🏠 My Queries</h2>
            {myQueries.length === 0 ? (
                <p className="text-center text-gray-500 mt-10 text-lg font-medium">
                    You have not added any queries yet.
                </p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {myQueries.map((query, index) => (
                        <div key={index} className="card bg-base-100 shadow-sm overflow-hidden lg:h-[600px] md:h-[500px] h-[600px]">
                            <figure className='lg:h-96 md:h-72 h-96'>
                                <img className="w-full h-full object-cover" src={query.imageUrl} alt={query.productBrand} />
                            </figure>
                            <div className="card-body flex flex-col flex-1">
                                <h2 className="text-xl font-bold Cursive">{query.productName}</h2>
                                <p><strong>Brand:</strong> {query.productBrand}</p>
                                <p><strong>Title:</strong> {query.queryTitle}</p>
                                <p><strong>Reason:</strong> {query.reason}</p>
                                <div className="flex items-center justify-between gap-2 mt-auto pt-2 border-t border-gray-200">
                                    <p className="font-semibold whitespace-nowrap"><strong>Total:</strong> {query.recommendationCount || 0}</p>
                                    <div className="flex gap-1">
                                        <Link to={`/queries/${query._id}`} className="btn h-6 min-h-6 bg-white border text-base-300 border-base-300 hover:bg-base-300 hover:text-white">
                                            <TiInfoLarge />
                                        </Link>
                                        <Link to={`/myQueries/update-query/${query._id}`} className="btn h-6 min-h-6 bg-white border border-green-300 hover:bg-green-300">
                                            <LuPenLine />
                                        </Link>
                                        <button onClick={() => handleDelete(query._id)} className="btn h-6 min-h-6 bg-white border border-red-300 hover:bg-red-400">
                                            <AiOutlineDelete />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyAllQueries;

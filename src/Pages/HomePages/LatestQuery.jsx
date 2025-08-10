import React, { useEffect, useState } from 'react';
import { TiInfoLarge } from 'react-icons/ti';
import { Link } from 'react-router';

const LatestQuery = () => {
    const [queries, setQueries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://query-nest-server-side.vercel.app/queries')
            .then(res => res.json())
            .then(data => setQueries(data.slice(0, 6)))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center mt-20">
                <span className="loading loading-ring loading-xl"></span>
               
            </div>
        );
    }

    return (
        <div className='mt-20 md:w-11/12 md:mx-auto px-4'>
            <h2 className='md:text-4xl text-2xl font-bold Cursive text-primary md:text-start lg:mb-15 flex justify-center mb-10 dark:text-white'>🕘 Latest Queries </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4 mt-2 transition-transform">
                {queries.map((query) => (
                    <div key={query._id} className="card bg-base-100    overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-3 transform transition-all duration-300 lg:h-[600px] md:h-[500px] h-[600px]">
                        <figure className='lg:h-96 md:h-72 h-96'>
                            <img src={query.imageUrl} alt={query.productBrand} className="w-full h-full object-cover" />
                        </figure>
                        <div className="card-body p-4">
                            <h2 className="text-lg font-semibold Cursive">{query.productName}</h2>
                            <p className="text-sm"><strong>Brand:</strong> {query.productBrand}</p>
                            <p className="text-sm"><strong>Title:</strong> {query.queryTitle}</p>
                            <p className="text-sm"><strong>Reason:</strong> {query.reason}</p>
                            <div className="flex justify-between items-center mt-4">
                                <div className="badge bg-base-300 text-white text-xs py-5 px-3">
                                    Recommend: {query.recommendationCount || 0}
                                </div>
                                <Link
                                    to={`/queries/${query._id}`}
                                    className="relative inline-block text-lg group"
                                >
                                    <span className="relative z-10 block px-4 py-3 overflow-hidden font-medium leading-tight text-primary dark:text-black transition-colors duration-300 ease-out border-2 border-base-300 rounded-lg group-hover:text-white">
                                        <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                                        <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-base-300 group-hover:-rotate-180 ease"></span>
                                        <span className="relative"><TiInfoLarge /></span>
                                    </span>
                                    <span className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-base-300 rounded-lg group-hover:mb-0 group-hover:mr-0" data-rounded="rounded-lg"></span>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LatestQuery;

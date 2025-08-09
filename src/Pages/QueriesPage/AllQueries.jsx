import { Link, useLoaderData } from 'react-router';
import { useState, useEffect } from 'react';
import { FaSortAmountDown } from 'react-icons/fa';

const AllQueries = () => {
    const data = useLoaderData();
    const [searchText, setSearchText] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [gridCols, setGridCols] = useState(4);
    const [sortBy, setSortBy] = useState('latest');
    const [showSortDropdown, setShowSortDropdown] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setFilteredData(data);
        setLoading(false);
    }, [data]);

    const handleSearch = () => {
        const filtered = data.filter(query =>
            query.productName.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredData(filtered);
    };

    const handleSort = (list) => {
        let sorted = [...list];
        if (sortBy === 'latest') {
            sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        } else if (sortBy === 'recommendations') {
            sorted.sort((a, b) => (b.recommendationCount || 0) - (a.recommendationCount || 0));
        }
        return sorted;
    };

    useEffect(() => {
        handleSearch();
    }, [searchText]);

    const finalList = handleSort(filteredData);

    if (loading) {
        return (
            <div className="flex justify-center items-center   md:min-h-[800px] min-h-[1000px]">
                <span className="loading loading-ring loading-xl"></span>
            </div>
        );
    }

    return (
        <div className="pt-5 md:min-h-[750px] min-h-[500px] bg-base-200  md:w-11/12 md:mx-auto px-4">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between mb-6 ">
                <div className="w-full lg:w-2/3 flex gap-2">
                    <input
                        type="text"
                        placeholder="Search by product name"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className="input input-bordered w-full"
                    />
                    <button onClick={handleSearch} className="btn bg-base-300 text-white">
                        Search
                    </button>
                </div>

                <div className="flex flex-wrap justify-center gap-4 sm:gap-2 sm:justify-start">
                    <select
                        className="select select-bordered hidden sm:block"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option value="latest">Sort: Latest</option>
                        <option value="recommendations">Sort: Most Recommended</option>
                    </select>

                    <div className="hidden sm:flex gap-1 ">
                        {[1, 2, 3, 4].map(n => (
                            <button
                                key={n}
                                onClick={() => setGridCols(n)}
                                className={`btn ${gridCols === n ? 'bg-base-300 text-white' : 'bg-white dark:text-black'}`}
                            >
                                {n}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex justify-end mb-4 sm:hidden">
                <div className="relative">
                    <button
                        onClick={() => setShowSortDropdown(!showSortDropdown)}
                        className="btn btn-sm bg-base-300 text-white"
                    >
                        <FaSortAmountDown />
                    </button>
                    {showSortDropdown && (
                        <div className="absolute right-0 top-10 bg-base-100 border border-gray-200 rounded shadow-md z-10 w-40">
                            <button
                                onClick={() => {
                                    setSortBy('latest');
                                    setShowSortDropdown(false);
                                }}
                                className="block w-full px-4 py-2 hover:bg-base-200 text-left"
                            >
                                Latest
                            </button>
                            <button
                                onClick={() => {
                                    setSortBy('recommendations');
                                    setShowSortDropdown(false);
                                }}
                                className="block w-full px-4 py-2 hover:bg-base-200 text-left"
                            >
                                Most Recommended
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div
                className={`grid gap-10 md:gap-5 ${gridCols === 1
                        ? 'grid-cols-1  lg:w-3/12 md:w-4/12 sm:w-5/12 mx-auto'
                        : gridCols === 2
                            ? 'grid-cols-1 sm:grid-cols-2 lg:w-6/12 md:w-9/12 sm:w-11/12 mx-auto'
                            : gridCols === 3
                                ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:w-9/12 md:w-11/12 sm:w-11/12 mx-auto '
                                : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 '
                    }`}
            >
                {finalList.map((query, index) => (
                    <div key={index} className="w-full">
                        <div className="card bg-base-100 shadow-md h-full overflow-hidden">
                            <figure className=" sm:h-64 md:h-64 lg:h-82 overflow-hidden">
                                <img
                                    className="w-full h-full object-cover"
                                    src={query.imageUrl}
                                    alt={query.productBrand}
                                />
                            </figure>
                            <div className="card-body flex flex-col justify-between px-4 py-3 text-sm">
                                <div>
                                    <h2 className="text-lg sm:text-xl font-semibold mb-1 truncate">
                                        {query.productName}
                                    </h2>
                                    <p className="text-gray-700 truncate">
                                        <strong>Brand:</strong> {query.productBrand}
                                    </p>
                                    <p className="truncate">
                                        <strong>Title:</strong> {query.queryTitle}
                                    </p>
                                    <p className="line-clamp-2">
                                        <strong>Reason:</strong> {query.reason}
                                    </p>
                                </div>
                                <div className="flex justify-between items-center gap-3 mt-3">
                                    <div className="badge badge-outline border-base-200  justify-center text-sm">
                                        Total: {query.recommendationCount || 0}
                                    </div>
                                    <Link
                                        to={`/queries/${query._id}`}
                                        className="btn btn-sm bg-base-300 text-white hover:scale-[1.02]"
                                    >
                                        Recommend
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllQueries;

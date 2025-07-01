import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import useAuth from '../../hooks/useAuth';

const QueriesDetails = () => {
    const { user } = useAuth();
    const { id } = useParams();
    const [query, setQuery] = useState(null);
    const [recommendations, setRecommendations] = useState([]);
    const [form, setForm] = useState({
        recommendationTitle: '',
        recommendedProductName: '',
        recommendedProductImage: '',
        recommendationReason: ''
    });
    const [showForm, setShowForm] = useState(false);

    const currentUser = {
        recommenderName: user?.displayName || 'Unknown User',
        recommenderEmail: user?.email || 'No Email',
        recommenderPhoto: user?.photoURL || 'https://i.postimg.cc/jSJ4dx9P/image-1.png'
    };

    useEffect(() => {
        fetch(`http://localhost:3000/queries/${id}`)
            .then(res => res.json())
            .then(data => setQuery(data));

        fetch(`http://localhost:3000/recommendations/${id}`)
            .then(res => res.json())
            .then(data => setRecommendations(data));
    }, [id]);

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        const payload = {
            ...form,
            queryId: query._id,
            queryTitle: query.queryTitle,
            productName: query.productBrand,
            userEmail: query.userEmail,
            userName: query.userName,
            recommenderEmail: currentUser.recommenderEmail,
            recommenderName: currentUser.recommenderName,
            recommenderPhoto: currentUser.recommenderPhoto,
            timeStamp: new Date()
        };

        await fetch('http://localhost:3000/recommendations', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        fetch(`http://localhost:3000/recommendations/${id}`)
            .then(res => res.json())
            .then(data => setRecommendations(data));

        setForm({
            recommendationTitle: '',
            recommendedProductName: '',
            recommendedProductImage: '',
            recommendationReason: ''
        });

        setShowForm(false);
    };

    if (!query) return <div className='flex justify-center min-h-screen items-center'>
        <span className="loading loading-ring loading-xl "></span>
    </div>;

    return (
        <div className="max-w-6xl  mx-auto mt-10 flex flex-col lg:flex-row gap-6 md:px-4">
            <div className="w-full  lg:w-2/3 bg-white md:p-6 rounded-xl shadow max-h-[90vh] overflow-auto">
                <div className="flex items-center gap-3 mb-4">
                    <img src={query.userPhoto} className="w-15 h-15  rounded-full" alt="" />
                    <div>
                        <p className="font-semibold md:text-2xl Cursive">{query.userName}</p>
                        <p className="text-sm text-gray-500">{query.
                            userEmail}</p>
                        <p className="text-sm text-gray-500">{new Date(query.createdAt).toLocaleString()}</p>
                    </div>
                </div>
                <img src={query.imageUrl} className="w-full object-cover rounded mb-4" alt="" />
                <h2 className="text-2xl font-bold mb-2 Cursive">{query.productName}</h2>
                <p className="text-gray-700 mb-2"><strong>Brand:</strong> {query.productBrand}</p>
                <p className="text-gray-800"><strong>Title: </strong>{query.queryTitle}</p>
                <p className="text-gray-800"><strong>reason: </strong>{query.reason}</p>
                <button
                    onClick={() => setShowForm(prev => !prev)}
                    className={`mt-4 px-4 py-2 rounded w-full text-white ${showForm ? 'bg-red-500' : 'bg-base-300'} cursor-pointer`}
                >
                    {showForm ? 'Close Recommendation Form' : 'Add Recommendation'}
                </button>

                {showForm && (
                    <form onSubmit={handleSubmit} className="mt-4 space-y-3 bg-red-100 p-4 rounded">
                        <input
                            name="recommendationTitle"
                            value={form.recommendationTitle}
                            onChange={handleChange}
                            placeholder="Recommendation Title"
                            className="w-full border px-3 py-2 rounded"
                            required
                        />
                        <input
                            name="recommendedProductName"
                            value={form.recommendedProductName}
                            onChange={handleChange}
                            placeholder="Recommended Product Name"
                            className="w-full border px-3 py-2 rounded"
                            required
                        />
                        <input
                            name="recommendedProductImage"
                            value={form.recommendedProductImage}
                            onChange={handleChange}
                            placeholder="Image URL"
                            className="w-full border px-3 py-2 rounded"
                            required
                        />
                        <textarea
                            name="recommendationReason"
                            value={form.recommendationReason}
                            onChange={handleChange}
                            placeholder="Reason for Recommendation"
                            className="w-full border px-3 py-2 rounded"
                            required
                        />
                        <button
                            type="submit"
                            className="bg-green-600 cursor-pointer text-white px-4 py-2 rounded w-full"
                        >
                            Submit Recommendation
                        </button>
                    </form>
                )}
            </div>

            <div className="w-full lg:w-1/3 space-y-6 overflow-auto max-h-[90vh]">
                <h3 className="text-xl font-semibold mb-4 bg-white sticky top-0 z-10 border-b border-gray-300 px-2 py-2">
                    All Recommendations: {query.recommendationCount}
                </h3>
                {recommendations.length === 0 && <p>No recommendations yet.</p>}
                {recommendations.map((rec, index) => (
                    <div key={index} className="bg-white rounded-xl p-4 shadow">
                        <div className="flex items-start gap-4 mb-3">
                            <img src={rec.recommenderPhoto} className="w-10 h-10 rounded-full" alt="" />
                            <div>
                                <p className="font-semibold Cursive">{rec.recommenderName}</p>
                                <p className="text-sm text-gray-500">{rec.recommenderEmail}</p>
                                <p className="text-xs text-gray-400">{new Date(rec.timeStamp).toLocaleString()}</p>
                            </div>
                        </div>
                        <img src={rec.recommendedProductImage} alt="" className="object-cover rounded mb-3" />
                        <h4 className="text-md font-bold Cursive">{rec.recommendedProductName}</h4>
                        <p><strong>Title:</strong>  {rec.recommendationTitle}</p>
                        <p><strong>Reason:</strong> {rec.recommendationReason}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default QueriesDetails;

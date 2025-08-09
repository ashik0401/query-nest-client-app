import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-hot-toast';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const UpdateQueries = () => {
    const { id } = useParams();
    const formRef = useRef();
    const [queryData, setQueryData] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        axiosSecure.get(`/queries/${id}`)
            .then(res => {
                setQueryData(res.data);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    }, [id, axiosSecure]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const updatedData = Object.fromEntries(formData.entries());

        try {
            const res = await axiosSecure.patch(`/queries/${id}`, updatedData);
            if (res.data.success) {
                toast.success('Query updated successfully!');
                navigate('/myQueries');
                setQueryData(prev => ({ ...prev, ...updatedData }));
            } else {
                toast.error('Failed to update query');
            }
        } catch {
            toast.error('Something went wrong');
        }
    };

    if (loading) {
        return (
            <div className='flex justify-center min-h-screen items-center'>
                <span className="loading loading-ring loading-xl"></span>
            </div>
        );
    }

    return (
        <div className='h-[600px]'>
            <div className="max-w-xl mx-auto mt-30 bg-white dark:bg-black md:p-6 p-2 rounded-xl shadow">
                <h2 className="md:text-4xl text-primary text-center font-bold mb-4 text-lg Cursive dark:text-white"> 🔄Update Your Query</h2>
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                    <input
                        name="productName"
                        defaultValue={queryData.productName}
                        required
                        className="input input-bordered w-full"
                        placeholder="Product Name"
                    />
                    <input
                        name="productBrand"
                        defaultValue={queryData.productBrand}
                        required
                        className="input input-bordered w-full"
                        placeholder="Product Brand"
                    />
                    <input
                        name="imageUrl"
                        defaultValue={queryData.imageUrl}
                        required
                        className="input input-bordered w-full"
                        placeholder="Image URL"
                    />
                    <input
                        name="queryTitle"
                        defaultValue={queryData.queryTitle}
                        required
                        className="input input-bordered w-full"
                        placeholder="Query Title"
                    />
                    <textarea
                        name="reason"
                        defaultValue={queryData.reason}
                        required
                        className="textarea textarea-bordered w-full"
                        placeholder="Boycotting Reason"
                    />
                    <button type="submit" className="btn bg-base-300 text-white w-full dark:bg-[#079D68]">Update Query</button>
                </form>
            </div>
        </div>
    );
};

export default UpdateQueries;

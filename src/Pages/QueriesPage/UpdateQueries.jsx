import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-hot-toast';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useImgBBUpload from '../../Shared/UseImgBBUpload';

const UpdateQueries = () => {
    const { id } = useParams();
    const formRef = useRef();
    const [queryData, setQueryData] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const { loading: imgLoading, imageUrl, uploadImage } = useImgBBUpload(import.meta.env.VITE_image_upload_key);

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

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        const url = await uploadImage(file);
        if (url) {
            toast.success("Image uploaded!");
        } else {
            toast.error("Image upload failed");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const updatedData = Object.fromEntries(formData.entries());

        if (imageUrl) {
            updatedData.imageUrl = imageUrl;
        }

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
        <div className='h-[620px]'>
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
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="file-input w-full"
                    />
                    {imgLoading && <p className="text-sm text-blue-500">Uploading image...</p>}
                    {(imageUrl || queryData.imageUrl) && (
                        <img
                            src={imageUrl || queryData.imageUrl}
                            alt="Preview"
                            className="w-32 mt-2 rounded"
                        />
                    )}
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
                   
                    <button
                        type="submit"
                        className={`btn w-full ${imgLoading ? "bg-gray-400 text-black dark:text-white" : "bg-base-300 text-white dark:bg-[#079D68]"
                            }`}
                        disabled={imgLoading}
                    >
                        {imgLoading ? (
                            <span className="animate-pulse">Uploading...</span>
                        ) : (
                            "Update Query"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateQueries;

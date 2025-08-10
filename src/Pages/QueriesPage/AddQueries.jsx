import { useRef } from "react";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import { BsPlusCircleDotted } from "react-icons/bs";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router";
import useImgBBUpload from "../../Shared/UseImgBBUpload";

export default function AddQueries() {
    const formRef = useRef();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const { loading: imgLoading, imageUrl, uploadImage } = useImgBBUpload(import.meta.env.VITE_image_upload_key);

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
        const queryData = Object.fromEntries(formData.entries());

        if (!imageUrl) {
            toast.error("Please upload an image first");
            return;
        }

        const finalData = {
            ...queryData,
            imageUrl,
            userName: user?.displayName,
            userEmail: user?.email,
            userPhoto: user?.photoURL,
            createdAt: new Date().toISOString(),
        };

        try {
            await axiosSecure.post("/queries", finalData);
            toast.success("Query posted!");
            navigate("/myQueries");
            formRef.current.reset();
        } catch {
            toast.error("Failed to post query");
        }
    };

    return (
        <div className="h-[600px]">
            <div className="max-w-xl mx-5 md:mx-auto mt-30 bg-white dark:bg-black md:p-6 p-2 rounded-xl shadow">
                <h2 className="md:text-4xl text-primary text-center font-bold mb-4 flex items-center justify-center gap-2 text-xl Cursive dark:text-white">
                    <BsPlusCircleDotted /> Add Your Query
                </h2>

                <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                    <input name="productName" placeholder="Product Name" required className="input input-bordered w-full" />
                    <input name="productBrand" placeholder="Product Brand" required className="input input-bordered w-full" />

                    <input type="file" accept="image/*" onChange={handleImageChange} className="file-input w-full" />
                    {imgLoading && <p className="text-sm text-blue-500">Uploading image...</p>}
                    {imageUrl && <img src={imageUrl} alt="Preview" className="w-32 mt-2 rounded" />}

                    <input name="queryTitle" placeholder="Query Title" required className="input input-bordered w-full" />
                    <textarea name="reason" placeholder="Boycotting Reason Details" required className="textarea textarea-bordered w-full" />

                    <button
                        type="submit"
                        className={`btn w-full ${imgLoading ? "bg-gray-400 text-black dark:text-white" : "bg-base-300 text-white dark:bg-[#079D68]"
                            }`}
                        disabled={imgLoading}
                    >
                        {imgLoading ? (
                            <span className="animate-pulse">Uploading...</span>
                        ) : (
                            "Add Query"
                        )}
                    </button>

                </form>
            </div>
        </div>
    );
}

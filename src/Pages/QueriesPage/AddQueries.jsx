import { useRef } from "react";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";;
import { BsPlusCircleDotted } from "react-icons/bs";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router";

const AddQueries = () => {
    const formRef = useRef();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const queryData = Object.fromEntries(formData.entries());

        const finalData = {
            ...queryData,
            userName: user?.displayName,
            userEmail: user?.email,
            userPhoto: user?.photoURL,
            createdAt: new Date().toISOString(),
        };

        try {
            await axiosSecure.post("/queries", finalData);
            toast.success("Queries posted");
            navigate('/myQueries')
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
                    <input
                        name="productName"
                        placeholder="Product Name"
                        required
                        className="input input-bordered w-full"
                    />
                    <input
                        name="productBrand"
                        placeholder="Product Brand"
                        required
                        className="input input-bordered w-full"
                    />
                    <input
                        name="imageUrl"
                        placeholder="Product Image URL"
                        required
                        className="input input-bordered w-full"
                    />
                    <input
                        name="queryTitle"
                        placeholder="Query Title"
                        required
                        className="input input-bordered w-full"
                    />
                    <textarea
                        name="reason"
                        placeholder="Boycotting Reason Details"
                        required
                        className="textarea textarea-bordered w-full"
                    />
                    <button type="submit" className="btn bg-base-300 text-white dark:bg-[#079D68] w-full">
                        Add Query
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddQueries;

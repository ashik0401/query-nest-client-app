import { useState } from 'react';

export default function useImgBBUpload() {
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState("");

    const uploadImage = async (file) => {
        if (!file) return null;
        setLoading(true);

        const formData = new FormData();
        formData.append("image", file);

        try {
            const res = await fetch(
                `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`,
                {
                    method: "POST",
                    body: formData
                }
            );
            const data = await res.json();
            setImageUrl(data.data.url);
            return data.data.url;
        } catch (err) {
            console.error("Upload failed", err);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { loading, imageUrl, uploadImage };
}

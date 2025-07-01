import React, { useState, useRef, useEffect } from 'react';
import { FaCamera } from 'react-icons/fa';
import { toast } from 'sonner';
import { uploadAvatarAPI } from '../services/FetchAPI'; // <-- Cập nhật đường dẫn này cho đúng

interface AvatarUploaderProps {
    initialAvatarUrl: string;
    customerId: string | undefined;
    onUploadSuccess: (newImageUrl: string) => void;
}

const AvatarUploader: React.FC<AvatarUploaderProps> = ({ initialAvatarUrl, customerId, onUploadSuccess }) => {
    const [isLoading, setIsLoading] = useState(false);
    // State nội bộ để quản lý URL avatar, được khởi tạo từ prop
    const [avatarUrl, setAvatarUrl] = useState<string>(initialAvatarUrl);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // [QUAN TRỌNG] Dùng useEffect để đồng bộ state nội bộ với prop từ cha.
    // Nếu prop `initialAvatarUrl` thay đổi, state `avatarUrl` cũng sẽ được cập nhật.
    useEffect(() => {
        setAvatarUrl(initialAvatarUrl);
    }, [initialAvatarUrl]);

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
            if (file.size > maxSizeInBytes) {
                toast.error("File is too large. Maximum size is 5MB.");
                return;
            }
            await handleUpload(file);
        }
    };

    const handleUpload = async (file: File) => {
        if (!customerId) {
            toast.error("Cannot upload: Customer ID is missing.");
            return;
        }

        setIsLoading(true);

        try {
            const result = await uploadAvatarAPI(customerId, file);

            if (result.status === 200 || result.status === 201) {
                toast.success(result.message || "Avatar updated successfully!");

                // Giả sử API trả về URL ảnh mới trong result.data.imageUrl
                const newImageUrl = result.data || initialAvatarUrl;

                // 1. Cập nhật state nội bộ để thay đổi avatar trên UI ngay lập tức
                setAvatarUrl(newImageUrl);

                // 2. Vẫn gọi callback để báo cho component cha biết sự thay đổi
                onUploadSuccess(newImageUrl);
            } else {
                toast.error(result.message || "Failed to update avatar.");
            }
        } catch (error) {
            console.error("Upload submission error:", error);
            toast.error("Could not submit the upload request.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative w-32 h-32">
            <img
                // Sử dụng state "avatarUrl" nội bộ để hiển thị ảnh
                src={avatarUrl}
                alt="User Avatar"
                className={`w-full h-full rounded-full object-cover ring-4 ring-green-200 transition-opacity duration-300 ${isLoading ? 'opacity-50' : 'opacity-100'}`}
            />
            {isLoading && (
                <div className="absolute inset-0 flex justify-center items-center">
                    <div className="w-10 h-10 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
                </div>
            )}
            <label
                htmlFor="avatar-upload-input"
                className={`absolute bottom-1 right-1 bg-white p-2 rounded-full shadow-md cursor-pointer hover:bg-gray-100 transition-all duration-200 transform hover:scale-110 ${isLoading ? 'pointer-events-none' : ''}`}
            >
                <FaCamera className="text-gray-600" size={18} />
            </label>
            <input
                id="avatar-upload-input"
                ref={fileInputRef}
                type="file"
                accept="image/jpeg, image/png, image/gif, image/webp"
                className="hidden"
                onChange={handleFileChange}
                disabled={isLoading}
            />
        </div>
    );
};

export default AvatarUploader;
import React, { useRef, useState } from 'react'
import { useAddImagesMutation, useGetAllImagesQuery, useDeleteImageMutation } from '../../apis/media'
import toast from 'react-hot-toast'
import { isVideo, getVideoAcceptTypes } from '../../utils/videoDetection'

const MAX_IMAGES = 10;

const statusColors: Record<string, string> = {
    pending: 'bg-gray-400',
    approved: 'bg-green-500',
    rejected: 'bg-red-500',
};

const Media = () => {
    const [media, setMedia] = useState<(string | null)[]>(Array(MAX_IMAGES).fill(null));
    const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [addImages, { isLoading: isUploadingMedia }] = useAddImagesMutation();
    const [deleteImage, { isLoading: isDeleting }] = useDeleteImageMutation();
    const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const [lastUploadedMedia, setLastUploadedMedia] = useState<(string | null)[]>(Array(MAX_IMAGES).fill(null));
    const { data: allImagesData, isLoading, refetch } = useGetAllImagesQuery(undefined);

    React.useEffect(() => {
        if (allImagesData) {
            console.log('Fetched images:', allImagesData);
        }
    }, [allImagesData]);

    // Helper function to generate SHA-1 signature
    const generateSHA1 = async (message: string) => {
        const msgBuffer = new TextEncoder().encode(message);
        const hashBuffer = await crypto.subtle.digest('SHA-1', msgBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
        return hashHex;
    };

    // Compose the grid: API images first, then local uploads, then empty
    let apiImages: any[] = Array.isArray(allImagesData) ? allImagesData : [];
    let gridItems: { image?: string, status?: string, isApi?: boolean, _id?: string }[] = [];
    for (let i = 0; i < MAX_IMAGES; i++) {
        if (apiImages[i]) {
            gridItems.push({ image: apiImages[i].image, status: apiImages[i].status, isApi: true, _id: apiImages[i]._id });
        } else if (media[i - apiImages.length]) {
            gridItems.push({ image: media[i - apiImages.length]!, isApi: false });
        } else {
            gridItems.push({});
        }
    }

    const handleBoxClick = (index: number) => {
        // Only allow upload if not an API image
        if (isUploading || isUploadingMedia) return;
        if (gridItems[index].isApi) return;
        if (fileInputRefs.current[index - apiImages.length]) {
            fileInputRefs.current[index - apiImages.length]!.value = '';
            fileInputRefs.current[index - apiImages.length]!.click();
        }
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (file.size > 25 * 1024 * 1024) {
            toast.error('File size must be less than 25MB');
            return;
        }
        setUploadingIndex(index);
        setIsUploading(true);
        try {
            // Cloudinary upload
            const timestamp = Math.round(new Date().getTime() / 1000).toString();
            const str_to_sign = `timestamp=${timestamp}${import.meta.env.VITE_CLOUDINARY_API_SECRET}`;
            const signature = await generateSHA1(str_to_sign);
            const formData = new FormData();
            formData.append('file', file);
            formData.append('api_key', import.meta.env.VITE_CLOUDINARY_API_KEY);
            formData.append('timestamp', timestamp);
            formData.append('signature', signature);
            const resourceType = file.type.startsWith('video/') ? 'video' : 'image';
            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/${resourceType}/upload`,
                { method: 'POST', body: formData }
            );
            if (!response.ok) throw new Error('Upload failed');
            const data = await response.json();
            setMedia((prev) => {
                const updated = [...prev];
                updated[index - apiImages.length] = data.secure_url;
                return updated;
            });
            toast.success(`${resourceType === 'video' ? 'Video' : 'Image'} uploaded!`);
        } catch (error) {
            toast.error('Failed to upload media. Please try again.');
        } finally {
            setUploadingIndex(null);
            setIsUploading(false);
        }
    };

    // Determine if there are unsaved changes (media array is different from last uploaded)
    const hasUnsavedChanges = JSON.stringify(media) !== JSON.stringify(lastUploadedMedia) && media.some(Boolean);

    const handleUploadMedia = async () => {
        const images = media.filter(Boolean).map((url) => ({ image: url! }));
        if (images.length === 0) {
            toast.error('Please upload at least one image or video.');
            return;
        }
        try {
            await addImages(images).unwrap();
            setLastUploadedMedia([...media]); // Update last uploaded state
            toast.success('Media uploaded successfully!');
            refetch(); // Refresh images from API after successful upload
            setMedia(Array(MAX_IMAGES).fill(null)); // Clear local media array
        } catch (error) {
            toast.error('Failed to upload media.');
        }
    };

    const handleDelete = async (_id: string | undefined) => {
        if (!_id) return;
        try {
            await deleteImage(_id).unwrap();
            toast.success('Image deleted successfully!');
            refetch();
        } catch (error) {
            toast.error('Failed to delete image.');
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[300px]">
                <div className="w-8 h-8 border-4 border-[#FF00A2] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="max-w-[900px] w-full mx-auto p-4 md:px-8 pb-16 bg-black">
            <h2 className="font-['Space_Grotesk'] text-white font-normal text-[24px] md:text-[36px] leading-[100%] capitalize">
                Upload images/video
            </h2>
            <p className="font-['Space_Grotesk'] mt-4 md:mt-6 text-white font-normal text-[12px] md:text-[13px] leading-[120%] md:leading-[100%] align-middle">
                Upload JPG, PNG, GIF, or MP4. Maximum of 10 photos and video clips combined (max 25MB, 1200x800px or larger for images).
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mt-5 md:mt-7">
                {gridItems.map((item, index) => (
                    <div
                        key={index}
                        onClick={() => handleBoxClick(index)}
                        className={`aspect-square w-full max-w-[214px] bg-[#0D0D0D] rounded-[12px] md:rounded-[16px] overflow-hidden flex items-center justify-center cursor-pointer relative ${uploadingIndex === index ? 'opacity-60' : ''}`}
                    >
                        {/* Status badge for API images */}
                        {item.isApi && item.status && (
                            <span className={`absolute top-2 left-2 px-2 py-0.5 rounded text-xs text-white font-semibold ${statusColors[item.status] || 'bg-gray-400'}`}
                                style={{ fontSize: '10px', zIndex: 2 }}>
                                {item.status}
                            </span>
                        )}
                        {/* Delete icon for API images */}
                        {item.isApi && item._id && (
                            <button
                                type="button"
                                className="absolute top-2 right-2 z-10 bg-black bg-opacity-60 text-white rounded-full p-1 hover:bg-[#FF00A2] hover:text-white transition-colors"
                                style={{ fontSize: '14px', lineHeight: 1, width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                onClick={e => {
                                    e.stopPropagation();
                                    handleDelete(item._id);
                                }}
                                disabled={isDeleting}
                                title="Delete image"
                            >
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            </button>
                        )}
                        {/* File input for upload slots only */}
                        {!item.isApi && (
                            <input
                                type="file"
                                accept={`image/jpeg,image/png,image/gif,${getVideoAcceptTypes()}`}
                                style={{ display: 'none' }}
                                ref={el => fileInputRefs.current[index - apiImages.length] = el}
                                onChange={e => handleFileChange(e, index)}
                            />
                        )}
                        {item.image ? (
                            isVideo(item.image) ? (
                                <video src={item.image} className="w-full h-full object-cover" controls />
                            ) : (
                                <img src={item.image} alt="media" className="w-full h-full object-cover" />
                            )
                        ) : (
                            <span className="text-[#383838] text-2xl md:text-3xl">+</span>
                        )}
                        {uploadingIndex === index && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70">
                                <div className="w-8 h-8 border-4 border-[#FF00A2] border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            {hasUnsavedChanges && (
                <div className="mt-6 mb-2 text-[#FF00A2] text-center font-['Space_Grotesk'] text-[16px]">
                    You have unsaved changes.
                </div>
            )}
            <div className="flex flex-row gap-3 justify-center mt-6 md:mt-8">
                <button
                    type="button"
                    className={`w-[150px] sm:w-[200px] px-4 sm:px-6 md:px-8 py-2 rounded-full ${isUploadingMedia || !hasUnsavedChanges ? 'bg-gray-500 cursor-not-allowed' : 'bg-[#FF00A2]'} text-white text-sm md:text-base font-['Space_Grotesk']`}
                    onClick={handleUploadMedia}
                    disabled={isUploadingMedia || !hasUnsavedChanges}
                >
                    {isUploadingMedia ? (
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Uploading...</span>
                        </div>
                    ) : (
                        'Upload Media'
                    )}
                </button>
            </div>
        </div>
    )
}

export default Media
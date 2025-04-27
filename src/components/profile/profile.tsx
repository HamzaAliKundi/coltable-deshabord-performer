import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import {
  useGetPerformerProfileQuery,
  useUpdatePerformerProfileMutation,
} from "../../apis/profile";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface MediaItem {
  url: string;
  type: "image" | "video";
}

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [mediaUrls, setMediaUrls] = useState<(MediaItem | string)[]>(
    Array(10).fill("")
  );

  const [logoUrl, setLogoUrl] = useState("");
  const [logoPreview, setLogoPreview] = useState("");
  const [logoUploading, setLogoUploading] = useState(false);
  const [images, setImages] = useState<string[]>(Array(10).fill(""));
  const [videos, setVideos] = useState<string[]>(Array(10).fill(""));

  const { register, handleSubmit, control, reset } = useForm();
  const performerId = localStorage.getItem("userId") || "";

  const [updateProfile, { isLoading: isUpdating }] =
    useUpdatePerformerProfileMutation();
  const { data: profileData, isLoading } = useGetPerformerProfileQuery();

  // State for managing media previews
  const [mediaPreviews, setMediaPreviews] = useState<(MediaItem | string)[]>(
    Array(4).fill("")
  );

  const handleLogoUpload = async () => {
    if (!isEditing) return;

    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/jpeg,image/png,image/gif";

    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        try {
          setLogoUploading(true);
          // First show preview
          const reader = new FileReader();
          reader.onload = () => {
            setLogoPreview(reader.result as string);
          };
          reader.readAsDataURL(file);

          // Create timestamp for signature
          const timestamp = Math.round(new Date().getTime() / 1000).toString();

          // Create the string to sign
          const str_to_sign = `timestamp=${timestamp}${
            import.meta.env.VITE_CLOUDINARY_API_SECRET
          }`;

          // Generate SHA-1 signature
          const signature = await generateSHA1(str_to_sign);

          // Upload to Cloudinary using signed upload
          const formData = new FormData();
          formData.append("file", file);
          formData.append("api_key", import.meta.env.VITE_CLOUDINARY_API_KEY);
          formData.append("timestamp", timestamp);
          formData.append("signature", signature);

          const response = await fetch(
            `https://api.cloudinary.com/v1_1/${
              import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
            }/image/upload`,
            {
              method: "POST",
              body: formData,
            }
          );

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error?.message || "Upload failed");
          }

          const data = await response.json();
          setLogoUrl(data.secure_url);
          toast.success("Logo uploaded successfully!");
        } catch (error) {
          console.error("Failed to upload logo:", error);
          toast.error("Failed to upload logo. Please try again.");
        } finally {
          setLogoUploading(false); // Upload complete
        }
      }
    };

    input.click();
  };

  const handleMediaSelect = async (index: number) => {
    if (!isEditing) return;

    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/jpeg,image/png,image/gif,video/mp4,video/quicktime";
    input.multiple = false;

    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      try {
        // First show preview
        const previewUrl = URL.createObjectURL(file);
        const isVideo = file.type.startsWith("video/");

        const newPreviews = [...mediaPreviews];
        newPreviews[index] = isVideo
          ? { url: previewUrl, type: "video" }
          : previewUrl;
        setMediaPreviews(newPreviews);

        // Create timestamp for signature
        const timestamp = Math.round(new Date().getTime() / 1000).toString();

        // Create the string to sign
        const str_to_sign = `timestamp=${timestamp}${
          import.meta.env.VITE_CLOUDINARY_API_SECRET
        }`;

        // Generate SHA-1 signature
        const signature = await generateSHA1(str_to_sign);

        // Upload to Cloudinary using signed upload
        const formData = new FormData();
        formData.append("file", file);
        formData.append("api_key", import.meta.env.VITE_CLOUDINARY_API_KEY);
        formData.append("timestamp", timestamp);
        formData.append("signature", signature);

        // Use different upload endpoints for images vs videos
        const resourceType = isVideo ? "video" : "image";
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${
            import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
          }/${resourceType}/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error("Upload failed");
        }

        const data = await response.json();

        // Store the Cloudinary URL with type info
        if (resourceType === "image") {
          const newImages = [...images];
          newImages[index] = data.secure_url;
          setImages(newImages);
        } else {
          const newVideos = [...videos];
          newVideos[index] = data.secure_url;
          setVideos(newVideos);
        }

        toast.success(
          `${
            resourceType === "image" ? "Image" : "Video"
          } uploaded successfully!`
        );
      } catch (error) {
        console.error("Failed to upload media:", error);
        toast.error("Failed to upload media. Please try again.");

        // Reset preview on error
        const newPreviews = [...mediaPreviews];
        newPreviews[index] = "";
        setMediaPreviews(newPreviews);
      }
    };

    input.click();
  };

  // Helper function to generate SHA-1 signature
  const generateSHA1 = async (message: string) => {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest("SHA-1", msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    return hashHex;
  };

  useEffect(() => {
    if (profileData?.user) {
      const formData = {
        displayName: profileData.user.name,
        dragName: profileData.user.fullDragName,
        tagline: profileData.user.tagline,
        about: profileData.user.description,
        pronouns: profileData.user.pronoun,
        city: profileData.user.city,
        dragAnniversary: profileData.user.dragAnniversary?.split("T")[0], // Format date to YYYY-MM-DD
        dragMother: profileData.user.dragMotherName,
        aesthetic: profileData.user.dragPerformerName,
        competitions: profileData.user.awards?.join(", "),
        performances: profileData.user.dragPerformances?.map((p: any) => ({
          value: p,
          label: p.charAt(0).toUpperCase() + p.slice(1).replace("-", " "),
        })),
        illusions: profileData.user.illusions,
        musicGenres: profileData.user.genres?.map((g: any) => ({
          value: g,
          label: g.charAt(0).toUpperCase() + g.slice(1).replace("-", " "),
        })),
        venues: profileData.user.venues?.map((v: any) => ({
          value: v,
          label: v.charAt(0).toUpperCase() + v.slice(1).replace("-", " "),
        })),
        hosts: profileData.user.hosts?.[0] || "",
        privateEvents: profileData.user.receivePrivateEventRequests
          ? "yes"
          : "no",
        venueMessages: profileData.user.receiveVenueBookingMessages
          ? "yes"
          : "no",
        facebook: profileData.user.socialMediaLinks?.facebook || "",
        instagram: profileData.user.socialMediaLinks?.instagram || "",
        tiktok: profileData.user.socialMediaLinks?.tiktok || "",
        youtube: profileData.user.socialMediaLinks?.youtube || "",
      };

   

      if (profileData.user.images) {
        setImages([...profileData.user.images]);
      }
      if (profileData.user.videos) {
        setVideos([...profileData.user.videos]);
      }
      if (profileData.user.profilePhoto) {
        setLogoUrl(profileData.user.profilePhoto);
        setLogoPreview(profileData.user.profilePhoto);
      }

      reset(formData);
    }
  }, [profileData, reset]);

  const onSubmit = async (data: any) => {
    try {
      const transformedData = {
        name: data.displayName,
        fullDragName: data.dragName,
        tagline: data.tagline,
        description: data.about,
        pronoun: data.pronouns,
        city: data.city,
        dragAnniversary: data.dragAnniversary,
        dragMotherName: data.dragMother,
        dragPerformerName: data.displayName,
        awards: data.competitions,
        dragPerformances: data.performances
          ? data.performances.map((item: any) => item.value)
          : [],
        illusions: data.illusions,
        genres: data.musicGenres
          ? data.musicGenres.map((item: any) => item.value)
          : [],
        venues: data.venues ? data.venues.map((item: any) => item.value) : [],
        hosts: [data.hosts],
        receiveVenueBookingMessages: data.venueMessages === "yes",
        receivePrivateEventRequests: data.privateEvents === "yes",
      
        profilePhoto: logoUrl,
        images: images.filter((url) => url !== ""),
        videos: videos.filter((url) => url !== ""),

        socialMediaLinks: {
          facebook: data.facebook,
          instagram: data.instagram,
          tiktok: data.tiktok,
          youtube: data.youtube,
        },
      };

      await updateProfile({ data: transformedData }).unwrap();
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast.error("Failed to update profile. Please try again.");
    }
  };

  if (isLoading)
    return (
      <div className="flex mt-16 justify-center min-h-screen max-w-[850px]">
        <div className="w-8 h-8 border-4 border-[#FF00A2] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  const inputClass =
    "w-full max-w-[782px] h-[46px] rounded-[16px] bg-[#0D0D0D] text-[#383838] px-4 py-2.5 font-['Space_Grotesk'] text-[16px] md:text-[20px] leading-[100%] capitalize placeholder-[#383838] focus:outline-none focus:ring-2 focus:ring-[#FF00A2]";
  const labelClass =
    "block font-['Space_Grotesk'] font-normal text-[14px] md:text-[20px] leading-[100%] capitalize text-white mb-2";

  // Render media preview
  // Update the renderMediaPreview function in your component
  const renderMediaPreview = (media: MediaItem | string, index: number) => {
    if (!media) {
      return (
        <div className="w-full h-full flex items-center justify-center">
          <span className="text-[#383838] text-2xl md:text-3xl">+</span>
        </div>
      );
    }

    const isVideo = typeof media === "object" && media.type === "video";
    const isImage =
      typeof media === "string" ||
      (typeof media === "object" && media.type === "image");
    const url = typeof media === "string" ? media : media.url;

    return (
      <div className="w-full h-full relative">
        {isVideo ? (
          <div className="relative w-full h-full">
            <video
              className="w-full h-full object-cover"
              src={url}
              controls
              controlsList="nodownload noremoteplayback noplaybackrate"
              onClick={(e) => e.stopPropagation()}
            />
            {isEditing && (
              <button
                className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs"
                onClick={(e) => {
                  e.stopPropagation();
                  handleMediaSelect(index);
                }}
              >
                Change
              </button>
            )}
          </div>
        ) : (
          <>
            <img
              src={url}
              alt={`Preview ${index + 1}`}
              className="w-full h-full object-cover"
            />
            {isEditing && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity">
                <span className="text-white text-lg">Click to change</span>
              </div>
            )}
          </>
        )}
      </div>
    );
  };

  return (
    <>
      <div
        className="flex justify-end pt-16 max-w-[850px] text-white font-['Space_Grotesk'] font-normal text-[16px] leading-[100%] tracking-[0%] align-middle uppercase items-center gap-2 cursor-pointer"
        onClick={() => setIsEditing(!isEditing)}
      >
        <img src="/profile/edit.svg" alt="Edit" className="w-4 h-4" />
        {isEditing ? "cancel" : "edit"}
      </div>
      <div className="p-4 md:px-8 pb-16 bg-black max-w-[782px]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 md:space-y-6"
        >
          {/* Name */}
          <div className="relative">
            <label className={labelClass}>
              How Would You Like Your Name To Appear On Your Profile?*
            </label>
            <input
              type="text"
              placeholder="Catalina"
              className={inputClass}
              disabled={!isEditing}
              {...register("displayName", { required: true })}
            />
          </div>

          {/* Drag Name */}
          <div>
            <label className={labelClass}>What Is Your Full Drag Name?*</label>
            <input
              type="text"
              placeholder="Catalina Seymour-Alexander"
              className={inputClass}
              disabled={!isEditing}
              {...register("dragName", { required: true })}
            />
          </div>

          {/* Profile Tagline */}
          <div>
            <label className={labelClass}>Your Profile Tagline*</label>
            <textarea
              placeholder="This Beautiful And Talented Queen Will Twin And Leave You Begging For An Encore With Her Electrifying Energy!"
              className={`${inputClass} h-[80px] resize-none`}
              disabled={!isEditing}
              {...register("tagline", { required: true })}
            />
          </div>

          {/* About */}
          <div>
            <label className={labelClass}>Tell Us About Yourself?*</label>
            <textarea
              placeholder="I am a Latin Showgirl with all of the kicks, splits, tricks and dips!"
              className={`${inputClass} h-[80px] md:h-[130px] resize-none`}
              disabled={!isEditing}
              {...register("about", { required: true })}
            />
          </div>

          {/* Pronouns */}
          <div className="relative">
            <label className={labelClass}>Pronouns?</label>
            <select
              className={`${inputClass} appearance-none`}
              disabled={!isEditing}
              {...register("pronouns")}
            >
              <option value="she/her">She/Her</option>
              <option value="he/him">He/Him</option>
              <option value="they/them">They/Them</option>
              <option value="other">Other</option>
            </select>
            <div className="absolute xl:right-4 lg:right-4 right-4 top-[30px] md:top-[36px] pointer-events-none text-[#383838]">
              <svg width="20px" height="30px" viewBox="0 0 16 16" fill="none">
                <path
                  d="M4 6L8 10L12 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* City */}
          <div className="relative">
            <label className={labelClass}>City/Metropolitan Area*</label>
            <input
              type="text"
              placeholder="Enter your city"
              className={inputClass}
              disabled={!isEditing}
              {...register("city", { required: true })}
            />
            <div className="absolute xl:right-4 lg:right-4 right-4 top-[36px] md:top-[40px] pointer-events-none text-[#383838]">
              <img src="/profile/location.svg" alt="location" />
            </div>
          </div>

          {/* Drag Anniversary */}
          <div className="relative">
            <label className={labelClass}>Your Drag Anniversary?*</label>
            <input
              type="date"
              className={`${inputClass} appearance-none`}
              disabled={!isEditing}
              {...register("dragAnniversary", { required: true })}
            />
            <div className="absolute xl:right-4 lg:right-4 right-4 top-[30px] md:top-[38px] pointer-events-none text-[#383838]">
              <img src="/profile/calendar.svg" alt="calendar" />
            </div>
          </div>

          {/* Drag Mother */}
          <div>
            <label className={labelClass}>Drag Mother(s)?</label>
            <input
              type="text"
              placeholder="Enter drag mother's name"
              className={inputClass}
              disabled={!isEditing}
              {...register("dragMother")}
            />
          </div>

          {/* Performance Aesthetic */}
          <div className="relative">
            <label className={labelClass}>
              Describe your Drag Performance/Aesthetic?
            </label>
            <input
              type="text"
              maxLength={150}
              placeholder="Describe your performance style"
              className={`${inputClass} pr-32`}
              disabled={!isEditing}
              {...register("aesthetic")}
            />
            <span className="absolute md:bottom-2 md:right-64 bottom-[-20px] right-0 text-[#383838] text-xs md:text-sm">
              ( 150 characters)
            </span>
          </div>

          {/* Competitions */}
          <div className="!mt-10 md:mt-0">
            <label className={labelClass}>
              Competitions and Awards you want to mention?
            </label>
            <input
              type="text"
              placeholder="Enter your achievements"
              className={inputClass}
              disabled={!isEditing}
              {...register("competitions")}
            />
          </div>

          {/* Drag Performances */}
          <div>
            <label className={labelClass}>
              Your Drag Performances?* (Select at least 3)
            </label>
            <Controller
              name="performances"
              control={control}
              rules={{ required: true, minLength: 3 }}
              render={({ field }) => (
                <Select
                  {...field}
                  isMulti
                  isDisabled={!isEditing}
                  closeMenuOnSelect={false}
                  options={[
                    { value: "lip-sync", label: "Lip Sync" },
                    { value: "dance", label: "Dance" },
                    { value: "comedy", label: "Comedy" },
                    { value: "live-singing", label: "Live Singing" },
                  ]}
                  className="w-full max-w-[782px]"
                  styles={{
                    control: (base) => ({
                      ...base,
                      minHeight: "46px",
                      background: "#0D0D0D",
                      border: "1px solid #383838",
                      borderRadius: "16px",
                      boxShadow: "none",
                      "&:hover": {
                        border: "1px solid #383838",
                      },
                    }),
                    menu: (base) => ({
                      ...base,
                      background: "#1D1D1D",
                      border: "1px solid #383838",
                      borderRadius: "4px",
                    }),
                    option: (base, state) => ({
                      ...base,
                      background: state.isFocused ? "#383838" : "#1D1D1D",
                      color: "#fff",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      "&::before": {
                        content: '""',
                        display: "block",
                        width: "16px",
                        height: "16px",
                        border: "2px solid #fff",
                        borderRadius: "50%",
                        backgroundColor: state.isSelected
                          ? "#FF00A2"
                          : "transparent",
                      },
                    }),
                    multiValue: (base) => ({
                      ...base,
                      background: "#383838",
                      borderRadius: "4px",
                    }),
                    multiValueLabel: (base) => ({
                      ...base,
                      color: "#fff",
                    }),
                    multiValueRemove: (base) => ({
                      ...base,
                      color: "#fff",
                      ":hover": {
                        background: "#4a4a4a",
                        borderRadius: "0 4px 4px 0",
                      },
                    }),
                    input: (base) => ({
                      ...base,
                      color: "#fff",
                    }),
                  }}
                  placeholder="Select performances"
                />
              )}
            />
          </div>

          {/* Illusions */}
          <div>
            <label className={labelClass}>
              Do you have any Illusions/Impersonations you Perform?
            </label>
            <input
              type="text"
              placeholder="Enter your illusions/impersonations"
              className={inputClass}
              disabled={!isEditing}
              {...register("illusions")}
            />
          </div>

          {/* Music Genres */}
          <div className="relative">
            <label className={labelClass}>Music Genre's performed to?*</label>
            <Controller
              name="musicGenres"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  {...field}
                  isMulti
                  isDisabled={!isEditing}
                  closeMenuOnSelect={false}
                  options={[
                    { value: "the80s", label: "The 80's" },
                    { value: "tejano", label: "Tejano" },
                    { value: "rnb", label: "R&B" },
                    { value: "country", label: "Country" },
                    { value: "comedy", label: "Comedy" },
                    { value: "rock", label: "Rock" },
                    { value: "pop", label: "Pop" },
                    { value: "jazzBlues", label: "Jazz/Blues" },
                    { value: "disney", label: "Disney" },
                    { value: "other", label: "Other's" },
                  ]}
                  className="w-full max-w-[782px]"
                  styles={{
                    control: (base) => ({
                      ...base,
                      minHeight: "46px",
                      background: "#0D0D0D",
                      border: "1px solid #383838",
                      borderRadius: "16px",
                      boxShadow: "none",
                      "&:hover": {
                        border: "1px solid #383838",
                      },
                    }),
                    menu: (base) => ({
                      ...base,
                      background: "#1D1D1D",
                      border: "1px solid #383838",
                      borderRadius: "4px",
                    }),
                    option: (base, state) => ({
                      ...base,
                      background: state.isFocused ? "#383838" : "#1D1D1D",
                      color: "#fff",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      "&::before": {
                        content: '""',
                        display: "block",
                        width: "16px",
                        height: "16px",
                        border: "2px solid #fff",
                        borderRadius: "50%",
                        backgroundColor: state.isSelected
                          ? "#FF00A2"
                          : "transparent",
                      },
                    }),
                    multiValue: (base) => ({
                      ...base,
                      background: "#383838",
                      borderRadius: "4px",
                    }),
                    multiValueLabel: (base) => ({
                      ...base,
                      color: "#fff",
                    }),
                    multiValueRemove: (base) => ({
                      ...base,
                      color: "#fff",
                      ":hover": {
                        background: "#4a4a4a",
                        borderRadius: "0 4px 4px 0",
                      },
                    }),
                    input: (base) => ({
                      ...base,
                      color: "#fff",
                    }),
                  }}
                  placeholder="Select music genres"
                />
              )}
            />
          </div>

          {/* Venues */}
          <div>
            <label className={labelClass}>
              What venues have you been booked at Recently?*
            </label>
            <Controller
              name="venues"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  {...field}
                  isMulti
                  isDisabled={!isEditing}
                  closeMenuOnSelect={false}
                  options={[
                    { value: "jps-bar", label: "JP's Bar And Grill, Eagle" },
                    { value: "eagle", label: "Eagle" },
                    { value: "boheme", label: "Boheme" },
                    {
                      value: "rich's",
                      label: "Rich's/The Montrose Country Club",
                    },
                    {
                      value: "hamburger-marys",
                      label: "Hamburger Mary's/YKYK, HALO (Bryan, TX)",
                    },
                    { value: "crush", label: "Crush (Dallas, TX)" },
                    { value: "havana", label: "Havana (Dallas TX)" },
                    {
                      value: "woodlawn",
                      label: "Woodlawn Pointe (San Antonio, TX)",
                    },
                  ]}
                  className="w-full max-w-[782px]"
                  styles={{
                    control: (base) => ({
                      ...base,
                      minHeight: "46px",
                      background: "#0D0D0D",
                      border: "1px solid #383838",
                      borderRadius: "16px",
                      boxShadow: "none",
                      "&:hover": {
                        border: "1px solid #383838",
                      },
                    }),
                    menu: (base) => ({
                      ...base,
                      background: "#1D1D1D",
                      border: "1px solid #383838",
                      borderRadius: "4px",
                    }),
                    option: (base, state) => ({
                      ...base,
                      background: state.isFocused ? "#383838" : "#1D1D1D",
                      color: "#fff",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      "&::before": {
                        content: '""',
                        display: "block",
                        width: "16px",
                        height: "16px",
                        border: "2px solid #fff",
                        borderRadius: "50%",
                        backgroundColor: state.isSelected
                          ? "#FF00A2"
                          : "transparent",
                      },
                    }),
                    multiValue: (base) => ({
                      ...base,
                      background: "#383838",
                      borderRadius: "4px",
                    }),
                    multiValueLabel: (base) => ({
                      ...base,
                      color: "#fff",
                    }),
                    multiValueRemove: (base) => ({
                      ...base,
                      color: "#fff",
                      ":hover": {
                        background: "#4a4a4a",
                        borderRadius: "0 4px 4px 0",
                      },
                    }),
                    input: (base) => ({
                      ...base,
                      color: "#fff",
                    }),
                  }}
                  placeholder="Select venues"
                />
              )}
            />
          </div>

          {/* Hosts */}
          <div className="relative">
            <label className={labelClass}>
              Hosts/Hostesses/Showrunners that you have worked with!
            </label>
            <select
              className={`${inputClass} appearance-none`}
              disabled={!isEditing}
              {...register("hosts")}
            >
              <option value="host1">Host 1</option>
              <option value="host2">Host 2</option>
              <option value="host3">Host 3</option>
            </select>
            <div className="absolute xl:right-4 lg:right-4 right-4 top-[44px] md:top-[36px] pointer-events-none text-[#383838]">
              <svg width="20px" height="30px" viewBox="0 0 16 16" fill="none">
                <path
                  d="M4 6L8 10L12 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Booking Preferences */}
          <div className="space-y-6 bg-black text-white">
            {/* First Question */}
            <div className="space-y-4 max-w-[800px]">
              <p className="text-xl font-medium">
                Please select "No" if you wish to not receive messages from
                venues regarding direct booking requests?
              </p>
              <div className="flex gap-6 items-center">
                <label className="flex items-center">
                  <input
                    type="radio"
                    {...register("venueMessages")}
                    value="yes"
                    disabled={!isEditing}
                    className="mr-2 h-4 w-4 appearance-none rounded-full border-2 border-[#FF00A2] checked:border-[#FF00A2] checked:before:content-[''] checked:before:block checked:before:w-2 checked:before:h-2 checked:before:rounded-full checked:before:bg-[#FF00A2] checked:before:m-[2px]"
                  />
                  <span className="text-lg">Yes</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    {...register("venueMessages")}
                    value="no"
                    disabled={!isEditing}
                    className="mr-2 h-4 w-4 appearance-none rounded-full border-2 border-[#FF00A2] checked:border-[#FF00A2] checked:before:content-[''] checked:before:block checked:before:w-2 checked:before:h-2 checked:before:rounded-full checked:before:bg-[#FF00A2] checked:before:m-[2px]"
                  />
                  <span className="text-lg">No</span>
                </label>
              </div>
            </div>

            {/* Second Question */}
            <div className="space-y-4">
              <p className="text-xl font-normal text-[20px] leading-none capitalize max-w-[800px] font-['Space_Grotesk']">
                Please select "No" if you wish not to receive booking requests
                for private events?
              </p>
              <div className="flex gap-6 items-center">
                <label className="flex items-center">
                  <input
                    type="radio"
                    {...register("privateEvents")}
                    value="yes"
                    disabled={!isEditing}
                    className="mr-2 h-4 w-4 appearance-none rounded-full border-2 border-[#FF00A2] checked:border-[#FF00A2] checked:before:content-[''] checked:before:block checked:before:w-2 checked:before:h-2 checked:before:rounded-full checked:before:bg-[#FF00A2] checked:before:m-[2px]"
                  />
                  <span className="text-lg">Yes</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    {...register("privateEvents")}
                    value="no"
                    disabled={!isEditing}
                    className="mr-2 h-4 w-4 appearance-none rounded-full border-2 border-[#FF00A2] checked:border-[#FF00A2] checked:before:content-[''] checked:before:block checked:before:w-2 checked:before:h-2 checked:before:rounded-full checked:before:bg-[#FF00A2] checked:before:m-[2px]"
                  />
                  <span className="text-lg">No</span>
                </label>
              </div>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="space-y-3 md:space-y-4">
            <h2 className={labelClass}>Add Social Media Link</h2>
            {["Instagram", "Facebook", "TikTok", "Twitter", "YouTube"].map(
              (platform) => (
                <input
                  key={platform}
                  type="text"
                  placeholder={platform.toLowerCase()}
                  className={inputClass}
                  disabled={!isEditing}
                  {...register(platform.toLowerCase())}
                />
              )
            )}
          </div>

          <hr className="!my-12 py-0.5 max-w-[900px] text-[#656563]" />

          {/* Upload Logo */}
          <div className="w-full max-w-[782px] bg-black p-4">
            <h2 className="font-['Space_Grotesk'] text-white text-[20px] leading-[100%] mb-4">
              Upload Logo
            </h2>

            <div
              className={`bg-[#0D0D0D] rounded-[16px] px-8 py-3 text-center ${
                isEditing ? "cursor-pointer hover:bg-[#1A1A1A]" : ""
              }`}
              onClick={handleLogoUpload}
            >
              {logoPreview ? (
                <div className="flex flex-col items-center">
                  <img
                    src={logoPreview}
                    alt="Venue Logo"
                    className="w-32 h-32 object-contain mb-4"
                  />
                  <p className="text-[#FF00A2]">Click to change logo</p>
                </div>
              ) : (
                <>
                  <p className="text-[#3D3D3D] font-['Space_Grotesk'] text-[12px] leading-[100%] tracking-[0%] text-center capitalize mb-2">
                    Please Upload The Venue Logo In PNG Or JPG Format, With A
                    Recommended Size
                  </p>
                  <p className="text-[#3D3D3D] font-['Space_Grotesk'] text-[12px] leading-[100%] tracking-[0%] text-center capitalize mb-4">
                    Of [Specify Dimensions, E.G., 500x500px]
                  </p>
                  <div className="bg-[#FF00A2] text-black rounded-lg px-8 py-1 inline-block font-['Space_Grotesk'] text-[16px] leading-[100%] tracking-[0%] text-center capitalize">
                    Upload
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Upload Images/Video */}
          <div className="max-w-[900px] w-full">
            <h2 className="font-['Space_Grotesk'] text-white font-normal text-[24px] md:text-[36px] leading-[100%] capitalize">
              Upload images/video
            </h2>
            <p className="font-['Space_Grotesk'] mt-4 md:mt-6 text-white font-normal text-[12px] md:text-[13px] leading-[120%] md:leading-[100%] align-middle">
              Upload JPG, PNG, GIF, or MP4. Maximum 10 photos & 10 video clips
              (max 25MB, 1200x800px or larger for images).
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mt-5 md:mt-7">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => (
                <div
                  key={index}
                  onClick={() => handleMediaSelect(index)}
                  className={`aspect-square w-full max-w-[214px] bg-[#0D0D0D] rounded-[12px] md:rounded-[16px] overflow-hidden ${
                    isEditing
                      ? "cursor-pointer hover:bg-[#1A1A1A] transition-colors"
                      : "cursor-default"
                  }`}
                >
                  {renderMediaPreview(mediaPreviews[index], index)}
                </div>
              ))}
            </div>
          </div>

          {/* Buttons */}
          {isEditing && (
            <div className="flex flex-row gap-3 justify-center mt-6 md:mt-8">
              {/* <button
                type="button"
                onClick={handleSubmit(async (data) => {
                  try {
                    await updateProfile({ id: performerId, data }).unwrap();
                    setIsEditing(false);
                  } catch (error) {
                    console.error('Failed to save changes:', error);
                  }
                })}
                disabled={isUpdating}
                className="w-[150px] sm:w-[200px] px-4 sm:px-6 md:px-8 py-2 rounded-l-full border border-[#FF00A2] text-[#FF00A2] text-sm md:text-base"
              >
                {isUpdating ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-[#FF00A2] border-t-transparent rounded-full animate-spin"></div>
                    <span>Saving...</span>
                  </div>
                ) : 'Save Changes'}
              </button> */}

              <button
                type="submit"
                disabled={isUpdating}
                className="w-[150px] sm:w-[200px] px-4 sm:px-6 md:px-8 py-2 rounded-full bg-[#FF00A2] text-white text-sm md:text-base"
              >
                {isUpdating ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Publishing...</span>
                  </div>
                ) : (
                  "Publish/Update"
                )}
              </button>
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default Profile;
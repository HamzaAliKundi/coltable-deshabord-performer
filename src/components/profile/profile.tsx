import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import {
  useGetAllPerformersQuery,
  useGetAllVenuesQuery,
  useGetPerformerProfileQuery,
  useUpdatePerformerProfileMutation,
} from "../../apis/profile";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { pronounOptions } from "../../utils/create-event/create-profile/dropDownOptions";
import CustomSelect from "../../utils/CustomSelect";
import { Edit, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface MediaSlot {
  url: string;
  type: "image" | "video" | "none";
  cloudUrl?: string;
  uploading?: boolean;
}

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { register, handleSubmit, control, reset } = useForm();
  const performerId = localStorage.getItem("userId") || "";
  const [updateProfile, { isLoading: isUpdating }] =
    useUpdatePerformerProfileMutation();

    const {
      data: profileData,
      isLoading,
      refetch,
      // @ts-ignore
  } = useGetPerformerProfileQuery();

  // @ts-ignore
  const { data: venues } = useGetAllVenuesQuery();
  // @ts-ignore
  const { data: performers } = useGetAllPerformersQuery();
  console.log(performers);

  const [logoUrl, setLogoUrl] = useState("");
  const [logoPreview, setLogoPreview] = useState("");
  const [logoUploading, setLogoUploading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const navigate = useNavigate();

  const handleLogoUpload = async () => {
    if (!isEditing) return;

    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/jpeg,image/png,image/gif";

    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        // Check file size (25MB = 25 * 1024 * 1024 bytes)
        if (file.size > 25 * 1024 * 1024) {
          toast.error("File size must be less than 25MB");
          return;
        }

        // Check image dimensions
        const img = new window.Image();
        img.onload = async () => {
          if (img.width !== 350 || img.height !== 450) {
            toast("For best results, use a 350x450px image. Other sizes may not display as expected.", { icon: "⚠️" });
          }
          try {
            setLogoUploading(true);
            setIsUploading(true);
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
            setLogoUploading(false);
            setIsUploading(false);
          }
        };
        // Read the file as a data URL to check dimensions
        img.src = URL.createObjectURL(file);
      }
    };

    input.click();
  };

  const removeLogo = () => {
    setLogoUrl("");
    setLogoPreview("");
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
      // Sort genres alphabetically by label for consistency
      const genreOptions = [
        { value: "the80s", label: "The 80's" },
        { value: "tejano", label: "Tejano" },
        { value: "rnb", label: "R&B" },
        { value: "country", label: "Country" },
        { value: "comedy", label: "Comedy" },
        { value: "rock", label: "Rock" },
        { value: "pop", label: "Pop" },
        { value: "jazzBlues", label: "Jazz/Blues" },
        { value: "disney", label: "Disney" },
        { value: "other", label: "Other" },
        { value: "alternative", label: "Alternative (Emo, Goth, etc.)" },
        { value: "comedy-mix", label: "Comedy Mix" },
        { value: "musical-theater", label: "Musical Theater" },
        { value: "the-70s", label: "The 70's" },
        { value: "the-90s", label: "The 90's" },
        { value: "the-2000s", label: "The 2000's" },
      ].sort((a, b) => a.label.localeCompare(b.label));
      
      const sortedGenres = (profileData.user.genres || [])
        .map((g: any) => {
          // First try to find in predefined options
          const predefinedOption = genreOptions.find(opt => opt.value === g);
          if (predefinedOption) {
            return predefinedOption;
          }
          // If not found, it's a custom genre - create option for it
          return {
            value: g,
            label: g.charAt(0).toUpperCase() + g.slice(1).replace(/-/g, ' ')
          };
        })
        .filter(Boolean)
        // @ts-ignore
        .sort((a, b) => a.label.localeCompare(b.label));
        
      const formData = {
        // displayName: profileData.user.name,
        dragName: profileData.user.fullDragName,
        tagline: profileData.user.tagline,
        about: profileData.user.description,
        performerType: profileData.user.performerType,
        city: profileData.user.city,
        dragAnniversary: profileData.user.dragAnniversary?.split("T")[0], // Format date to YYYY-MM-DD
        dragMother: profileData.user.dragMotherName || [],
        dragFamilyAssociation: profileData.user.dragFamilyAssociation || [],
        aesthetic: profileData.user.aesthetic,
        competitions: profileData.user.awards || [],
        performances: profileData.user.dragPerformances?.map((p: any) => {
          // Check if it's a predefined performance type
          const predefinedPerformances = [
            "dance", "burlesque", "campy", "comedy", "dance-twirl", 
            "drag-bingo", "drag-karaoke", "drag-trivia", "hosting", 
            "lip-sync", "live-singing"
          ];
          
          if (predefinedPerformances.includes(p)) {
            return {
              value: p,
              label: p.charAt(0).toUpperCase() + p.slice(1).replace("-", " "),
            };
          } else {
            // It's a custom performance - format it properly
            return {
              value: p,
              label: p.charAt(0).toUpperCase() + p.slice(1).replace(/-/g, ' '),
            };
          }
        }),
        illusions: profileData.user.illusions || [],
        musicGenres: sortedGenres,
        venues: profileData.user.venues?.map((venueId: any) => {
          const found = Array.isArray(venues) ? venues.find((v: any) => v._id === venueId) : null;
          return {
            value: venueId,
            label: found?.name || venueId,
          };
        }),
        hosts:
          profileData.user.hosts?.map((hostId: string) => {
            const found = Array.isArray(performers) ? performers.find((p: any) => p._id === hostId) : null;
            return {
              value: hostId,
              label: found?.fullDragName || found?.name || found?.firstName || hostId,
            };
          }) || [],
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

      if (profileData.user.profilePhoto) {
        setLogoUrl(profileData.user.profilePhoto);
        setLogoPreview(profileData.user.profilePhoto);
      }

      reset(formData);
    }
  }, [profileData, reset, venues, performers]);

  const onSubmit = async (data: any) => {
    if (!logoUrl) {
      toast.error("Profile image is required");
      return;
    }
    try {
      const transformedData = {
        // name: data.displayName,
        fullDragName: data.dragName,
        tagline: data.tagline,
        description: data.about,
        performerType: data.performerType,
        aesthetic: data.aesthetic,
        city: data.city,
        dragAnniversary: data.dragAnniversary,
        dragMotherName: Array.isArray(data.dragMother) ? data.dragMother : [],
        dragFamilyAssociation: Array.isArray(data.dragFamilyAssociation)
          ? data.dragFamilyAssociation
          : [],
        // dragPerformerName: data.displayName,
        awards: Array.isArray(data.competitions) ? data.competitions : [],
        dragPerformances: data.performances
          ? data.performances.map((item: any) => item.value)
          : [],
        illusions: Array.isArray(data.illusions) ? data.illusions : [],
        genres: data.musicGenres
          ? data.musicGenres.map((item: any) => item.value)
          : [],
        venues: data.venues ? data.venues.map((item: any) => item.value) : [],
        hosts: data.hosts ? data.hosts.map((item: any) => item.value) : [],
        receiveVenueBookingMessages: data.venueMessages === "yes",
        receivePrivateEventRequests: data.privateEvents === "yes",

        profilePhoto: logoUrl,

        socialMediaLinks: {
          facebook: data.facebook,
          instagram: data.instagram,
          tiktok: data.tiktok,
          youtube: data.youtube,
        },
      };

      await updateProfile({ data: transformedData }).unwrap();
      await refetch();
      toast.success("Profile updated successfully!");
      if(!profileData?.user?.isProfileCompleted){
        navigate("/profile/media");
      }
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
    "w-full max-w-[782px] h-[46px] rounded-[16px] bg-[#0D0D0D] text-white px-4 py-2.5 font-['Space_Grotesk'] text-[16px] md:text-[16px] leading-[100%] capitalize placeholder-[#383838] focus:outline-none focus:ring-2 focus:ring-[#FF00A2]";
  const labelClass =
    "block font-['Space_Grotesk'] font-normal text-[14px] md:text-[18px] leading-[100%] capitalize text-white mb-2";

  return (
    <>
      
        <div className="p-4 md:px-8 pb-4 max-w-[782px]">
          <div className="w-full max-w-[782px] bg-[#FF00A2] text-white p-4 rounded-[16px]">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center h-full">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="min-w-[24px] min-h-[24px] shrink-0 self-center"
                >
                  <path
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 8V12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 16H12.01"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p className="font-['Space_Grotesk'] text-[16px] leading-[140%]">
              Go ahead and complete that profile—give the world a reason to stare! Once you hit submit, we'll take a moment to review and make sure everything's giving authentic excellence and not hot mess express. Keep it classy: no indecent language, no fighting words, and definitely no "oops, I forgot my clothes" moments. Serve face, not disgrace.
              </p>
            </div>
          </div>
        </div>
      
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
          {/* <div className="relative">
            <label className={labelClass}>
              How Would You Like Your Name To Appear On Your Profile?*
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className={inputClass}
              disabled={!isEditing}
              {...register("displayName", { required: true })}
            />
          </div> */}

          {/* Drag Name */}
          <div>
            <label className={labelClass}>What Is Your Full Drag Name?*</label>
            <input
              type="text"
              placeholder="Enter your drag name"
              className={inputClass}
              disabled={!isEditing}
              {...register("dragName", { required: true })}
            />
          </div>

          {/* Profile Tagline */}
          <div>
            <label className={labelClass}>Your Profile Tagline*</label>
            <textarea
              placeholder="Enter your tagline"
              className={`${inputClass} h-[80px] resize-none`}
              disabled={!isEditing}
              {...register("tagline", { required: true })}
            />
          </div>

          {/* About */}
          <div>
            <label className={labelClass}>Tell Us About Yourself?*</label>
            <textarea
              placeholder="Enter your about"
              className={`${inputClass} h-[80px] md:h-[130px] resize-none`}
              disabled={!isEditing}
              {...register("about", { required: true })}
            />
          </div>

          {/* Pronouns */}
          <div className="flex flex-col gap-2">
            <label className={labelClass}>Choose Performer type?</label>
            <Controller
              name="performerType"
              control={control}
              render={({ field }) => (
                <CustomSelect
                  {...field}
                  value={pronounOptions.find(
                    (option) => option.value === field.value
                  )}
                  onChange={(selectedOption: any) =>
                    field.onChange(selectedOption?.value)
                  }
                  options={pronounOptions}
                  isDisabled={!isEditing}
                  placeholder="Select Performer Type"
                />
              )}
            />
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
            <Controller
              name="dragMother"
              control={control}
              render={({ field }) => (
                <div className="w-full max-w-[782px]">
                  <div className="min-h-[46px] bg-[#0D0D0D] border border-[#383838] rounded-[16px] p-2 flex flex-wrap gap-2">
                    {(Array.isArray(field.value) ? field.value : []).map(
                      (mother: string, index: number) => (
                        <div
                          key={index}
                          className="bg-[#383838] rounded-[4px] px-2 py-1 flex items-center gap-2"
                        >
                          <span className="text-white">{mother}</span>
                          {isEditing && (
                            <button
                              type="button"
                              onClick={() => {
                                const mothers = Array.isArray(field.value)
                                  ? [...field.value]
                                  : [];
                                mothers.splice(index, 1);
                                field.onChange(mothers);
                              }}
                              className="text-white hover:text-[#FF00A2]"
                            >
                              ×
                            </button>
                          )}
                        </div>
                      )
                    )}
                    {isEditing && (
                      <input
                        type="text"
                        placeholder="Type drag mother name and press Enter"
                        className="flex-1 min-w-[120px] bg-transparent border-none outline-none text-white placeholder-[#383838]"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            const input = e.target as HTMLInputElement;
                            const value = input.value.trim();
                            if (value) {
                              const currentMothers = Array.isArray(field.value)
                                ? [...field.value]
                                : [];
                              if (!currentMothers.includes(value)) {
                                field.onChange([...currentMothers, value]);
                              }
                              input.value = "";
                            }
                          }
                        }}
                      />
                    )}
                  </div>
                </div>
              )}
            />
          </div>

          {/* Drag Family Association */}
          <div>
            <label className={labelClass}>Drag Family Association(s)?</label>
            <Controller
              name="dragFamilyAssociation"
              control={control}
              render={({ field }) => (
                <div className="w-full max-w-[782px]">
                  <div className="min-h-[46px] bg-[#0D0D0D] border border-[#383838] rounded-[16px] p-2 flex flex-wrap gap-2">
                    {(Array.isArray(field.value) ? field.value : []).map(
                      (family: string, index: number) => (
                        <div
                          key={index}
                          className="bg-[#383838] rounded-[4px] px-2 py-1 flex items-center gap-2"
                        >
                          <span className="text-white">{family}</span>
                          {isEditing && (
                            <button
                              type="button"
                              onClick={() => {
                                const families = Array.isArray(field.value)
                                  ? [...field.value]
                                  : [];
                                families.splice(index, 1);
                                field.onChange(families);
                              }}
                              className="text-white hover:text-[#FF00A2]"
                            >
                              ×
                            </button>
                          )}
                        </div>
                      )
                    )}
                    {isEditing && (
                      <input
                        type="text"
                        placeholder="Type family name and press Enter"
                        className="flex-1 min-w-[120px] bg-transparent border-none outline-none text-white placeholder-[#383838]"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            const input = e.target as HTMLInputElement;
                            const value = input.value.trim();
                            if (value) {
                              const currentFamilies = Array.isArray(field.value)
                                ? [...field.value]
                                : [];
                              if (!currentFamilies.includes(value)) {
                                field.onChange([...currentFamilies, value]);
                              }
                              input.value = "";
                            }
                          }
                        }}
                      />
                    )}
                  </div>
                </div>
              )}
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
            <span className="absolute md:bottom-2 md:right-4 bottom-[-20px] right-0 text-[#383838] text-xs md:text-sm">
              ( 150 characters)
            </span>
          </div>

          {/* Competitions */}
          <div className="!mt-10 md:mt-0">
            <label className={labelClass}>
              Competitions and Awards you want to mention?
            </label>
            <Controller
              name="competitions"
              control={control}
              render={({ field }) => (
                <div className="w-full max-w-[782px]">
                  <div className="min-h-[46px] bg-[#0D0D0D] border border-[#383838] rounded-[16px] p-2 flex flex-wrap gap-2">
                    {(Array.isArray(field.value) ? field.value : []).map(
                      (award: string, index: number) => (
                        <div
                          key={index}
                          className="bg-[#383838] rounded-[4px] px-2 py-1 flex items-center gap-2"
                        >
                          <span className="text-white">{award}</span>
                          {isEditing && (
                            <button
                              type="button"
                              onClick={() => {
                                const awards = Array.isArray(field.value)
                                  ? [...field.value]
                                  : [];
                                awards.splice(index, 1);
                                field.onChange(awards);
                              }}
                              className="text-white hover:text-[#FF00A2]"
                            >
                              ×
                            </button>
                          )}
                        </div>
                      )
                    )}
                    {isEditing && (
                      <input
                        type="text"
                        placeholder="Type competition name and press Enter"
                        className="flex-1 min-w-[120px] bg-transparent border-none outline-none text-white placeholder-[#383838]"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            const input = e.target as HTMLInputElement;
                            const value = input.value.trim();
                            if (value) {
                              const currentAwards = Array.isArray(field.value)
                                ? [...field.value]
                                : [];
                              if (!currentAwards.includes(value)) {
                                field.onChange([...currentAwards, value]);
                              }
                              input.value = "";
                            }
                          }
                        }}
                      />
                    )}
                  </div>
                </div>
              )}
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
                <div className="w-full max-w-[782px]">
                  <Select
                    {...field}
                    isMulti
                    isDisabled={!isEditing}
                    closeMenuOnSelect={false}
                    options={[
                      { value: "dance", label: "Dance" },
                      { value: "burlesque", label: "Burlesque" },
                      { value: "campy", label: "Campy" },
                      { value: "comedy", label: "Comedy" },
                      { value: "dance-twirl", label: "Dance/Twirl" },
                      { value: "drag-bingo", label: "Drag Bingo" },
                      { value: "drag-karaoke", label: "Drag Karaoke" },
                      { value: "drag-trivia", label: "Drag Trivia" },
                      { value: "hosting", label: "Hosting" },
                      { value: "lip-sync", label: "Lip Sync" },
                      { value: "live-singing", label: "Live Singing" },
                      { value: "other", label: "Other", isCustom: true },
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
                    onChange={(selectedOptions) => {
                      const lastOption = selectedOptions?.[selectedOptions.length - 1];
                      if (lastOption?.isCustom) {
                        const customValue = prompt("Enter custom performance type:");
                        if (customValue?.trim()) {
                          const newPerformance = {
                            value: customValue.toLowerCase().replace(/\s+/g, "-"),
                            label: customValue.trim(),
                          };
                          const currentPerformances = Array.isArray(field.value)
                            ? [...field.value]
                            : [];
                          if (
                            !currentPerformances.some(
                              (p) =>
                                (typeof p === "object" ? p.label : p) === customValue.trim()
                            )
                          ) {
                            field.onChange([...currentPerformances, newPerformance]);
                          }
                        }
                        return;
                      }
                      field.onChange(selectedOptions);
                    }}
                  />
                </div>
              )}
            />
          </div>

          {/* Illusions */}
          <div>
            <label className={labelClass}>
              Do you have any Illusions/Impersonations you Perform?
            </label>
            <Controller
              name="illusions"
              control={control}
              render={({ field }) => (
                <div className="w-full max-w-[782px]">
                  <div className="min-h-[46px] bg-[#0D0D0D] border border-[#383838] rounded-[16px] p-2 flex flex-wrap gap-2">
                    {(Array.isArray(field.value) ? field.value : []).map(
                      (illusion: string, index: number) => (
                        <div
                          key={index}
                          className="bg-[#383838] rounded-[4px] px-2 py-1 flex items-center gap-2"
                        >
                          <span className="text-white">{illusion}</span>
                          {isEditing && (
                            <button
                              type="button"
                              onClick={() => {
                                const illusions = Array.isArray(field.value)
                                  ? [...field.value]
                                  : [];
                                illusions.splice(index, 1);
                                field.onChange(illusions);
                              }}
                              className="text-white hover:text-[#FF00A2]"
                            >
                              ×
                            </button>
                          )}
                        </div>
                      )
                    )}
                    {isEditing && (
                      <input
                        type="text"
                        placeholder="Type illusion/impersonation and press Enter"
                        className="flex-1 min-w-[120px] bg-transparent border-none outline-none text-white placeholder-[#383838]"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            const input = e.target as HTMLInputElement;
                            const value = input.value.trim();
                            if (value) {
                              const currentIllusions = Array.isArray(
                                field.value
                              )
                                ? [...field.value]
                                : [];
                              if (!currentIllusions.includes(value)) {
                                field.onChange([...currentIllusions, value]);
                              }
                              input.value = "";
                            }
                          }
                        }}
                      />
                    )}
                  </div>
                </div>
              )}
            />
          </div>

          {/* Music Genres */}
          <div className="relative">
            <label className={labelClass}>Music Genre's performed to?*</label>
            <Controller
              name="musicGenres"
              control={control}
              rules={{ required: true }}
              render={({ field }) => {
                // Sort options alphabetically by label, but keep "Other" at the end
                const genreOptions = [
                  { value: "the80s", label: "The 80's" },
                  { value: "tejano", label: "Tejano" },
                  { value: "rnb", label: "R&B" },
                  { value: "country", label: "Country" },
                  { value: "comedy", label: "Comedy" },
                  { value: "rock", label: "Rock" },
                  { value: "pop", label: "Pop" },
                  { value: "jazzBlues", label: "Jazz/Blues" },
                  { value: "disney", label: "Disney" },
                  { value: "alternative", label: "Alternative (Emo, Goth, etc.)" },
                  { value: "comedy-mix", label: "Comedy Mix" },
                  { value: "musical-theater", label: "Musical Theater" },
                  { value: "the-70s", label: "The 70's" },
                  { value: "the-90s", label: "The 90's" },
                  { value: "the-2000s", label: "The 2000's" },
                ].sort((a, b) => a.label.localeCompare(b.label));
                
                // Add "Other" at the end
                // @ts-ignore
                genreOptions.push({ value: "other", label: "Other", isCustom: true });
                
                return (
                  <div className="w-full max-w-[782px]">
                    <Select
                      {...field}
                      isMulti
                      isDisabled={!isEditing}
                      closeMenuOnSelect={false}
                      options={genreOptions}
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
                      onChange={(selectedOptions) => {
                        const lastOption = selectedOptions?.[selectedOptions.length - 1];
                        if (lastOption?.isCustom) {
                          const customValue = prompt("Enter custom music genre:");
                          if (customValue?.trim()) {
                            const newGenre = {
                              value: customValue.toLowerCase().replace(/\s+/g, "-"),
                              label: customValue.trim(),
                            };
                            const currentGenres = Array.isArray(field.value)
                              ? [...field.value]
                              : [];
                            if (
                              !currentGenres.some(
                                (g) =>
                                  (typeof g === "object" ? g.label : g) === customValue.trim()
                              )
                            ) {
                              field.onChange([...currentGenres, newGenre]);
                            }
                          }
                          return;
                        }
                        field.onChange(selectedOptions);
                      }}
                    />
                  </div>
                );
              }}
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
              render={({ field }) => {
                // Map and sort venues from API
                const venueOptions = [
                  ...(Array.isArray(venues)
                    ? venues
                        .map((venue: any) => {
                          const label = venue.name || venue.label || venue.value || "";
                          return {
                            value: venue._id || venue.value || label.toLowerCase().replace(/\s+/g, "-"),
                            label,
                          };
                        })
                        .filter(v => v.label) // Only keep venues with a label
                        .sort((a, b) => a.label.localeCompare(b.label))
                    : []),
                  {
                    value: "custom",
                    label: "+ Add Custom Venue",
                    isCustom: true,
                  },
                ];
                return (
                  <div className="w-full max-w-[782px]">
                    <Select
                      {...field}
                      isMulti
                      isDisabled={!isEditing}
                      closeMenuOnSelect={false}
                      options={venueOptions}
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
                      onChange={(selectedOptions) => {
                        const lastOption =
                          selectedOptions?.[selectedOptions.length - 1];
                        if (lastOption?.isCustom) {
                          const customValue = prompt("Enter custom venue name:");
                          if (customValue?.trim()) {
                            const newVenue = {
                              value: customValue
                                .toLowerCase()
                                .replace(/\s+/g, "-"),
                              label: customValue.trim(),
                            };
                            const currentVenues = Array.isArray(field.value)
                              ? [...field.value]
                              : [];
                            if (
                              !currentVenues.some(
                                (v) =>
                                  (typeof v === "object" ? v.label : v) ===
                                  customValue.trim()
                              )
                            ) {
                              field.onChange([...currentVenues, newVenue]);
                            }
                          }
                          return;
                        }
                        field.onChange(selectedOptions);
                      }}
                    />
                  </div>
                );
              }}
            />
          </div>

          {/* Hosts */}
          <div>
            <label className={labelClass}>
              Hosts/Hostesses/Showrunners that you have worked with!
            </label>
            <Controller
              name="hosts"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  isMulti
                  isDisabled={!isEditing}
                  closeMenuOnSelect={false}
                  options={[
                    ...(performers?.map((performer: any) => ({
                      value: performer._id,
                      label: performer.fullDragName || performer.name || performer.firstName || performer.email,
                    })) || []),
                    {
                      value: "custom",
                      label: "+ Add Custom Host",
                      isCustom: true,
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
                  placeholder="Select hosts"
                  onChange={(selectedOptions) => {
                    const lastOption =
                      selectedOptions?.[selectedOptions.length - 1];
                    if (lastOption?.isCustom) {
                      const customValue = prompt("Enter custom host name:");
                      if (customValue?.trim()) {
                        const newHost = {
                          value: customValue.toLowerCase().replace(/\s+/g, "-"),
                          label: customValue.trim(),
                        };
                        const currentHosts = Array.isArray(field.value)
                          ? [...field.value]
                          : [];
                        if (
                          !currentHosts.some(
                            (h) =>
                              (typeof h === "object" ? h.label : h) ===
                              customValue.trim()
                          )
                        ) {
                          field.onChange([...currentHosts, newHost]);
                        }
                      }
                      return;
                    }
                    field.onChange(selectedOptions);
                  }}
                />
              )}
            />
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
              Profile Picture
            </h2>
            <p className="text-[#FF00A2] text-sm mb-2 font-['Space_Grotesk']">
              For best results, your profile picture should be 350x450px. Other sizes may not display as expected.
            </p>

            <div
              className={`bg-[#0D0D0D] rounded-[16px] px-8 py-3 text-center ${
                isEditing ? "cursor-pointer hover:bg-[#1A1A1A]" : ""
              }`}
              onClick={handleLogoUpload}
            >
              {logoPreview ? (
                <div className="flex flex-col items-center ">
                  <div className="relative ">
                    <img
                      src={logoPreview}
                      alt="Venue Logo"
                      className="w-36 h-36 object-cover mb-4 "
                    />
                    {isEditing && (
                      <button
                        className="absolute top-2 right-2 bg-black bg-opacity-70 text-white p-1 rounded-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeLogo();
                        }}
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                  {isEditing && (
                    <p className="text-[#FF00A2]">Upload Profile Picture</p>
                  )}
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

          {/* Buttons */}
          {isEditing && (
            <div className="flex flex-row gap-3 justify-center mt-6 md:mt-8">
              <button
                type="submit"
                disabled={isUpdating || isUploading || logoUploading}
                className={`w-[150px] sm:w-[200px] px-4 sm:px-6 md:px-8 py-2 rounded-full ${
                  isUpdating || isUploading || logoUploading
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-[#FF00A2]"
                } text-white text-sm md:text-base`}
              >
                {isUpdating || isUploading || logoUploading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>
                      {isUploading || logoUploading
                        ? "Uploading..."
                        : "Publishing..."}
                    </span>
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

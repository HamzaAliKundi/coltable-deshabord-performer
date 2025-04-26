import { Controller, useForm } from "react-hook-form";
import Select from 'react-select';
import { useGetAllVenuesQuery, useGetPerformerProfileQuery, useUpdatePerformerProfileMutation } from "../../apis/profile";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { v2 as cloudinary } from 'cloudinary';
import { cityOptions } from '../../utils/city';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [imageUrls, setImageUrls] = useState<string[]>(Array(4).fill(''));
  const { register, handleSubmit, control, reset } = useForm();
  const performerId = localStorage.getItem("userId") || "";

  const [updateProfile, { isLoading: isUpdating }] = useUpdatePerformerProfileMutation();
  const { data: profileData, isLoading } = useGetPerformerProfileQuery();
  const { data: venuesData } = useGetAllVenuesQuery();

  const [imagePreviews, setImagePreviews] = useState<string[]>(Array(4).fill(''));
  
  const handleImageSelect = async (index: number) => {
    if (!isEditing) return;
    
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/jpeg,image/png,image/gif';
    
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        try {
          // First show preview
          const reader = new FileReader();
          reader.onload = () => {
            const newPreviews = [...imagePreviews];
            newPreviews[index] = reader.result as string;
            setImagePreviews(newPreviews);
          };
          reader.readAsDataURL(file);
  
          // Create timestamp for signature
          const timestamp = Math.round((new Date()).getTime() / 1000).toString();
          
          // Create the string to sign
          const str_to_sign = `timestamp=${timestamp}${import.meta.env.VITE_CLOUDINARY_API_SECRET}`;
          
          // Generate SHA-1 signature
          const signature = await generateSHA1(str_to_sign);
  
          // Upload to Cloudinary using signed upload
          const formData = new FormData();
          formData.append('file', file);
          formData.append('api_key', import.meta.env.VITE_CLOUDINARY_API_KEY);
          formData.append('timestamp', timestamp);
          formData.append('signature', signature);
          
          const response = await fetch(
            `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
            {
              method: 'POST',
              body: formData,
            }
          );
  
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error?.message || 'Upload failed');
          }
  
          const data = await response.json();
          
          // Store the Cloudinary URL
          const newUrls = [...imageUrls];
          newUrls[index] = data.secure_url;
          setImageUrls(newUrls);
  
          toast.success('Image uploaded successfully!');
        } catch (error) {
          console.error('Failed to upload image:', error);
          toast.error('Failed to upload image. Please try again.');
        }
      }
    };
    
    input.click();
  };

  const generateSHA1 = async (message: string) => {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-1', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
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
        city: profileData.user.city ? (
          cityOptions.find(city => city.label === profileData.user.city) ?? 
          { 
            value: profileData.user.city.toLowerCase().replace(/[^a-z0-9]+/g, '-'), 
            label: profileData.user.city 
          }
        ) : null,
        dragAnniversary: profileData.user.dragAnniversary?.split('T')[0], // Format date to YYYY-MM-DD
        dragMother: profileData.user.dragMotherName,
        aesthetic: profileData.user.dragPerformerName,
        competitions: profileData.user.awards?.join(', '),
        performances: profileData.user.dragPerformances?.map((p: any) => ({ value: p, label: p.charAt(0).toUpperCase() + p.slice(1).replace('-', ' ') })),
        illusions: profileData.user.illusions,
        musicGenres: profileData.user.genres?.map((g: any) => ({ value: g, label: g.charAt(0).toUpperCase() + g.slice(1).replace('-', ' ') })),
        venues: profileData.user.venues?.map((v: any) => ({ value: v, label: v.charAt(0).toUpperCase() + v.slice(1).replace('-', ' ') })),
        hosts: profileData.user.hosts?.map((hostId: any) => {
          const venue = venuesData?.find((v: any) => v._id === hostId);
          return venue ? { value: venue._id, label: venue.name } : null;
        }).filter(Boolean) || [],
        privateEvents: profileData.user.receivePrivateEventRequests ? 'yes' : 'no',
        venueMessages: profileData.user.receiveVenueBookingMessages ? 'yes' : 'no',
        facebook: profileData.user.socialMediaLinks?.facebook || '',
        instagram: profileData.user.socialMediaLinks?.instagram || '',
        tiktok: profileData.user.socialMediaLinks?.tiktok || '',
        youtube: profileData.user.socialMediaLinks?.youtube || ''
      };

      // Set image previews and URLs if they exist
      if (profileData.user.images?.length) {
        setImageUrls(profileData.user.images);
        setImagePreviews(profileData.user.images);
      }

      reset(formData);
    }
  }, [profileData, reset, venuesData]);

  const onSubmit = async (data: any) => {
    try {
      const transformedData = {
        name: data.displayName,
        fullDragName: data.dragName,
        tagline: data.tagline,
        description: data.about,
        pronoun: data.pronouns,
        city: data.city?.label || '',
        dragAnniversary: data.dragAnniversary,
        dragMotherName: data.dragMother,
        dragPerformerName: data.aesthetic,
        awards: data.competitions,
        dragPerformances: data.performances ? data.performances.map((item: any) => item.value) : [],
        illusions: data.illusions,
        genres: data.musicGenres ? data.musicGenres.map((item: any) => item.value) : [],
        venues: data.venues ? data.venues.map((item: any) => item.value) : [],
        hosts: data.hosts?.map((host: any) => host.value) || [],
        receiveVenueBookingMessages: data.venueMessages === "yes",
        receivePrivateEventRequests: data.privateEvents === "yes",
        images: imageUrls.filter(url => url !== ''),
        socialMediaLinks: {
          facebook: data.facebook,
          instagram: data.instagram,
          tiktok: data.tiktok,
          youtube: data.youtube
        }
      };

      console.log("transformed data : ", transformedData);
      await updateProfile({ data: transformedData }).unwrap();
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
      toast.error('Failed to update profile. Please try again.');
    }
  };

  if (isLoading) return <div className="flex mt-16 justify-center min-h-screen max-w-[850px]">
    <div className="w-8 h-8 border-4 border-[#FF00A2] border-t-transparent rounded-full animate-spin"></div>
  </div>;

  const inputClass = "w-full max-w-[782px] h-[46px] rounded-[16px] bg-[#0D0D0D] text-[#383838] px-4 py-2.5 font-['Space_Grotesk'] text-[16px] md:text-[20px] leading-[100%] capitalize placeholder-[#383838] focus:outline-none focus:ring-2 focus:ring-[#FF00A2]";
  const labelClass = "block font-['Space_Grotesk'] font-normal text-[14px] md:text-[20px] leading-[100%] capitalize text-white mb-2";

  return (
    <>
      <div className="flex justify-end pt-16 max-w-[850px] text-white font-['Space_Grotesk'] font-normal text-[16px] leading-[100%] tracking-[0%] align-middle uppercase items-center gap-2 cursor-pointer" onClick={() => setIsEditing(!isEditing)}>
        <img src="/profile/edit.svg" alt="Edit" className="w-4 h-4" />
        {isEditing ? 'cancel' : 'edit'}
      </div>
      <div className="p-4 md:px-8 pb-16 bg-black max-w-[782px]">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
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
                <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          {/* City */}
          <div className="relative">
            <label className={labelClass}>City/Metropolitan Area*</label>
            <Controller
              name="city"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  {...field}
                  isDisabled={!isEditing}
                  options={cityOptions}
                  className="w-full max-w-[782px]"
                  placeholder="Search for your city"
                  isClearable
                  isSearchable
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
                      maxHeight: "200px",
                      overflowY: "auto",
                    }),
                    option: (base, state) => ({
                      ...base,
                      background: state.isFocused ? "#383838" : "#1D1D1D",
                      color: "#fff",
                      cursor: "pointer",
                    }),
                    singleValue: (base) => ({
                      ...base,
                      color: "#fff",
                    }),
                    input: (base) => ({
                      ...base,
                      color: "#fff",
                    }),
                    placeholder: (base) => ({
                      ...base,
                      color: "#383838",
                    }),
                  }}
                />
              )}
            />
            {/* <div className="absolute xl:right-4 lg:right-4 right-4 top-[36px] md:top-[40px] pointer-events-none text-[#383838]">
              <img src="/profile/location.svg" alt="location" />
            </div> */}
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
            <label className={labelClass}>Describe your Drag Performance/Aesthetic?</label>
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
            <label className={labelClass}>Competitions and Awards you want to mention?</label>
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
            <label className={labelClass}>Your Drag Performances?* (Select at least 3)</label>
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
                        backgroundColor: state.isSelected ? "#FF00A2" : "transparent",
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
            <label className={labelClass}>Do you have any Illusions/Impersonations you Perform?</label>
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
                        backgroundColor: state.isSelected ? "#FF00A2" : "transparent",
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
            <label className={labelClass}>What venues have you been booked at Recently?*</label>
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
                    { value: "rich's", label: "Rich's/The Montrose Country Club" },
                    { value: "hamburger-marys", label: "Hamburger Mary's/YKYK, HALO (Bryan, TX)" },
                    { value: "crush", label: "Crush (Dallas, TX)" },
                    { value: "havana", label: "Havana (Dallas TX)" },
                    { value: "woodlawn", label: "Woodlawn Pointe (San Antonio, TX)" },
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
                        backgroundColor: state.isSelected ? "#FF00A2" : "transparent",
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
            <label className={labelClass}>Hosts/Hostesses/Showrunners that you have worked with!</label>
            <Controller
              name="hosts"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  isMulti
                  isDisabled={!isEditing}
                  options={venuesData?.map((venue: any) => ({
                    value: venue._id,
                    label: venue.name
                  })) || []}
                  className="w-full max-w-[782px]"
                  placeholder="Select venues you've worked with"
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
                      maxHeight: "200px",
                      overflowY: "auto",
                    }),
                    option: (base, state) => ({
                      ...base,
                      background: state.isFocused ? "#383838" : "#1D1D1D",
                      color: "#fff",
                      cursor: "pointer",
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
                    placeholder: (base) => ({
                      ...base,
                      color: "#383838",
                    }),
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
                Please select "No" if you wish to not receive messages from venues regarding direct booking requests?
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
                Please select "No" if you wish not to receive booking requests for private events?
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
            {["Instagram", "Facebook", "TikTok", "Twitter", "YouTube"].map((platform) => (
              <input
                key={platform}
                type="text"
                placeholder={platform.toLowerCase()}
                className={inputClass}
                disabled={!isEditing}
                {...register(platform.toLowerCase())}
              />
            ))}
          </div>

          <hr className="!my-12 py-0.5 max-w-[900px] text-[#656563]" />

          {/* Upload Images/Video */}
          <div className="max-w-[900px] w-full">
            <h2 className="font-['Space_Grotesk'] text-white font-normal text-[24px] md:text-[36px] leading-[100%] capitalize">
              Upload images/video
            </h2>
            <p className="font-['Space_Grotesk'] mt-4 md:mt-6 text-white font-normal text-[12px] md:text-[13px] leading-[120%] md:leading-[100%] align-middle">
              Upload JPG, PNG, or GIF Maximum 10 photos & 10 video clips (max 25MB, 1200x800px or larger), no copyrighted or inappropriate content
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mt-5 md:mt-7">
              {[0, 1, 2, 3].map((index) => (
                <div
                  key={index}
                  onClick={() => handleImageSelect(index)}
                  className={`aspect-square w-full max-w-[214px] bg-[#0D0D0D] rounded-[12px] md:rounded-[16px] flex items-center justify-center overflow-hidden ${isEditing ? 'cursor-pointer hover:bg-[#1A1A1A] transition-colors' : 'cursor-not-allowed'}`}
                >
                  {imagePreviews[index] ? (
                    <img 
                      src={imagePreviews[index]} 
                      alt={`Preview ${index + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-[#383838] text-2xl md:text-3xl">+</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Buttons */}
          {isEditing && (
            <div className="flex flex-row gap-3 justify-center mt-6 md:mt-8">
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
                ) : 'Publish/Update'}
              </button>
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default Profile;
import { Controller, useForm } from "react-hook-form";
import Select from 'react-select';
import { useGetPerformerProfileQuery, useUpdatePerformerProfileMutation } from "../../apis/events";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { register, handleSubmit, control, reset } = useForm();
  const performerId = localStorage.getItem("userId") || "";
  
  const { data: profileData, isLoading } = useGetPerformerProfileQuery(performerId);
  const [updateProfile, { isLoading: isUpdating }] = useUpdatePerformerProfileMutation();

  useEffect(() => {
    if (profileData) reset(profileData);
  }, [profileData, reset]);

  const onSubmit = async (data: any) => {
    try {
      // Transform the multi-select values to array of strings
      const transformedData = {
        ...data,
        // Transform performances array
        performances: data.performances ? data.performances.map((item: any) => item.value) : [],
        // Transform music genres array
        musicGenres: data.musicGenres ? data.musicGenres.map((item: any) => item.value) : [],
        // Transform venues array
        venues: data.venues ? data.venues.map((item: any) => item.value) : [],
      };

      await updateProfile({ id: performerId, data: transformedData }).unwrap();
      toast.success('Profile updated successfully!');
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
            <label className={labelClass}>Describe your Drag Performance/Aesthetic?</label>
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
                <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
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
                    {...register("privateEvents")}
                    value="yes"
                    disabled={!isEditing}
                    className="mr-2 h-4 w-4 appearance-none rounded-full border-2 border-[#FF00A2] checked:border-[#FF00A2] checked:before:content-[''] checked:before:block checked:before:w-2 checked:before:h-2 checked:before:rounded-full checked:before:bg-[#FF00A2] checked:before:m-[2px]"
                    defaultChecked
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

            {/* Second Question */}
            <div className="space-y-4">
              <p className="text-xl font-normal text-[20px] leading-none capitalize max-w-[800px] font-['Space_Grotesk']">
                Please select "No" if you wish not to receive booking requests for private events?
              </p>
              <div className="flex gap-6 items-center">
                <label className="flex items-center">
                  <input
                    type="radio"
                    {...register("venueMessages")}
                    value="yes"
                    disabled={!isEditing}
                    className="mr-2 h-4 w-4 appearance-none rounded-full border-2 border-[#FF00A2] checked:border-[#FF00A2] checked:before:content-[''] checked:before:block checked:before:w-2 checked:before:h-2 checked:before:rounded-full checked:before:bg-[#FF00A2] checked:before:m-[2px]"
                    defaultChecked
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
              {[1, 2, 3, 4].map((index) => (
                <div
                  key={index}
                  className={`aspect-square w-full max-w-[214px] bg-[#0D0D0D] rounded-[12px] md:rounded-[16px] flex items-center justify-center ${isEditing ? 'cursor-pointer hover:bg-[#1A1A1A] transition-colors' : 'cursor-not-allowed'}`}
                >
                  <span className="text-[#383838] text-2xl md:text-3xl">+</span>
                </div>
              ))}
            </div>
          </div>

          {/* Buttons */}
          {isEditing && (
            <div className="flex flex-row gap-3 justify-center mt-6 md:mt-8">
              <button
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
              </button>
              <button
                type="submit"
                disabled={isUpdating}
                className="w-[150px] sm:w-[200px] px-4 sm:px-6 md:px-8 py-2 rounded-r-full bg-[#FF00A2] text-white text-sm md:text-base"
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
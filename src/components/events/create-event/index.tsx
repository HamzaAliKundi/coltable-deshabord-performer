import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import {
  useAddEventMutation,
  useGetAllEventsQuery,
  useGetEventByIdQuery,
  useUpdateEventMutation,
} from "../../../apis/event";
import { useParams, useNavigate } from "react-router-dom";

interface EventFormData {
  title: string;
  host: string;
  type: string;
  theme: string;
  startTime: string;
  endTime: string;
  description: string;
  isPrivate: boolean;
  logo: string;
}

const CreateEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [logoPreview, setLogoPreview] = useState("");
  const [logoUploading, setLogoUploading] = useState(false);
  const [logoUrl, setLogoUrl] = useState("");

  const {
    register,

    handleSubmit,
    reset,

    formState: { errors },
  } = useForm<EventFormData>();

  const [createEvent, { isLoading: isCreating }] = useAddEventMutation();
  const [updateEvent, { isLoading: isUpdating }] = useUpdateEventMutation();
  const { data: eventResponse, isLoading: isFetching } = useGetEventByIdQuery(
    id || "",
    {
      skip: !id,
    }
  );
  const { refetch: getAllEventsRefetch } = useGetAllEventsQuery({
    limit: 1000,
    page: 1,
  });

  const handleLogoUpload = async () => {
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

  const generateSHA1 = async (message: string) => {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest("SHA-1", msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    return hashHex;
  };

  // Format time from ISO string to HH:MM format
  const formatTime = (isoString: string) => {
    if (!isoString) return "00:00";
    const date = new Date(isoString);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  // Reset form with fetched data when editing
  useEffect(() => {
    if (id && eventResponse) {
      const event = eventResponse?.event;
      reset({
        title: event.title,
        host: event.host,
        type: event.type,
        // theme: event.theme,
        startTime: formatTime(event.startTime),
        endTime: formatTime(event.endTime),
        description: event.description,
        isPrivate: event.isPrivate,
      });

      if (eventResponse?.event?.image) {
        setLogoUrl(eventResponse.event.image);
        setLogoPreview(eventResponse.event.image);
      }
    } else if (!id) {
      // Reset to default values when creating new event
      reset({
        title: "",
        host: "",
        type: "",
        // theme: "",
        startTime: "19:00",
        endTime: "20:00",
        description: "",
        isPrivate: false,
      });
    }
  }, [eventResponse, id, reset]);

  const onSubmit = async (data: EventFormData) => {
    try {
      // Create Date objects from time strings
      const now = new Date();
      const startDate = new Date(now);
      const endDate = new Date(now);

      const [startHours, startMinutes] = data.startTime.split(":").map(Number);
      const [endHours, endMinutes] = data.endTime.split(":").map(Number);

      startDate.setHours(startHours, startMinutes, 0, 0);
      endDate.setHours(endHours, endMinutes, 0, 0);

      const eventData = {
        ...data,
        startTime: startDate.toISOString(),
        endTime: endDate.toISOString(),
        image: logoUrl,
      };

      if (id) {
        await updateEvent({ id, eventData }).unwrap();
        toast.success("Event updated successfully!");
        getAllEventsRefetch();
        navigate(`/events`);
      } else {
        await createEvent(eventData).unwrap();
        toast.success("Event created successfully!");
        getAllEventsRefetch();
        navigate(`/events`);
      }
    } catch (error) {
      console.error("Error saving event:", error);
      toast.error(
        `Failed to ${id ? "update" : "create"} event. Please try again.`
      );
    }
  };

  if (isFetching && id) {
    return (
      <div className="p-4 md:px-8 py-16 bg-black flex justify-center items-center min-h-screen">
        <div className="w-8 h-8 border-4 border-[#FF00A2] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-4 md:px-8 py-16 bg-black">
      <div className="w-[100px] my-3 h-[4px] rounded-lg bg-[#FF00A2]"></div>
      <h1 className="text-white text-3xl font-space-grotesk mb-8">
        {id ? "EDIT EVENT" : "CREATE EVENT"}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-white font-space-grotesk text-sm md:text-base">
              Event Title*
            </label>
            <input
              {...register("title", { required: "Event title is required" })}
              type="text"
              placeholder="Event Title..."
              className="w-full h-10 bg-[#0D0D0D] rounded-lg px-3 text-white font-space-grotesk text-base placeholder:text-[#878787] focus:outline-none focus:ring-1 focus:ring-pink-500"
            />
            {errors.title && (
              <span className="text-red-500">{errors.title.message}</span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-white font-space-grotesk text-sm md:text-base">
              Event Host*
            </label>
            <input
              {...register("host", { required: "Event host is required" })}
              type="text"
              placeholder="Event Host Name..."
              className="w-full h-10 bg-[#0D0D0D] rounded-lg px-3 text-white font-space-grotesk text-base placeholder:text-[#878787] focus:outline-none focus:ring-1 focus:ring-pink-500"
            />
            {errors.host && (
              <span className="text-red-500">{errors.host.message}</span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2 relative">
          <label className="text-white font-space-grotesk text-sm md:text-base">
            Event type*
          </label>
          <select
            required
            defaultValue=""
            {...register("type", { required: "Event type is required" })}
            className="w-full h-10 bg-[#0D0D0D] rounded-lg px-3 text-white font-space-grotesk text-base focus:outline-none focus:ring-1 focus:ring-pink-500 appearance-none invalid:text-gray-500"
          >
            <option value="" disabled hidden>
              Select
            </option>
            <option value="drag-show" className="text-white">
              Drag show
            </option>
            <option value="comedy-show" className="text-white">
              Comedy Show
            </option>
            <option value="music-concert" className="text-white">
              Music Concert
            </option>
            <option value="dance-performance" className="text-white">
              Dance Performance
            </option>
            <option value="theater-show" className="text-white">
              Theater Show
            </option>
            <option value="other" className="text-white">
              Other
            </option>
          </select>
          <div className="absolute right-3 top-[45px] pointer-events-none">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M4 6L8 10L12 6"
                stroke="#878787"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          {errors.type && (
            <span className="text-red-500">{errors.type.message}</span>
          )}
        </div>

        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-white font-space-grotesk text-sm md:text-base">
              Event Theme*
            </label>
            <input
              {...register("theme", { required: "Event theme is required" })}
              type="text"
              placeholder="Event Theme..."
              className="w-full h-10 bg-[#0D0D0D] rounded-lg px-3 text-white font-space-grotesk text-base placeholder:text-[#878787] focus:outline-none focus:ring-1 focus:ring-pink-500"
            />
            {errors.theme && (
              <span className="text-red-500">{errors.theme.message}</span>
            )}
          </div>
        </div> */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-white font-space-grotesk text-sm md:text-base">
              Event Start Time*
            </label>
            <input
              {...register("startTime", { required: "Start time is required" })}
              type="time"
              className="w-full h-10 bg-[#0D0D0D] rounded-lg px-3 text-white font-space-grotesk text-base focus:outline-none focus:ring-1 focus:ring-pink-500"
            />
            {errors.startTime && (
              <span className="text-red-500">{errors.startTime.message}</span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-white font-space-grotesk text-sm md:text-base">
              Event End Time*
            </label>
            <input
              {...register("endTime", {
                required: "End time is required",
                validate: (value, { startTime }) =>
                  value > startTime || "End time must be after start time",
              })}
              type="time"
              className="w-full h-10 bg-[#0D0D0D] rounded-lg px-3 text-white font-space-grotesk text-base focus:outline-none focus:ring-1 focus:ring-pink-500"
            />
            {errors.endTime && (
              <span className="text-red-500">{errors.endTime.message}</span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-white font-space-grotesk text-sm md:text-base">
            Description*
          </label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            placeholder="Type..."
            rows={6}
            className="w-full bg-[#0D0D0D] rounded-lg p-3 text-white font-space-grotesk text-base placeholder:text-[#878787] focus:outline-none focus:ring-1 focus:ring-pink-500"
          />
          {errors.description && (
            <span className="text-red-500">{errors.description.message}</span>
          )}
        </div>

        <div className="flex flex-col md:flex-row gap-4 md:gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              {...register("isPrivate")}
              value="false"
              checked
              className="w-5 h-5 text-[#FF00A2] focus:ring-[#FF00A2]"
            />
            <span className="text-white font-space-grotesk text-sm md:text-base">
              Public Event
            </span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              {...register("isPrivate")}
              value="true"
              className="w-5 h-5 text-[#FF00A2] focus:ring-[#FF00A2]"
            />
            <span className="text-white font-space-grotesk text-sm md:text-base">
              Private Event
            </span>
          </label>
        </div>

        {/* Logo Upload */}
        <div className="w-full max-w-[782px] self-center bg-black p-4">
          <h2 className="font-['Space_Grotesk'] text-white text-[20px] leading-[100%] mb-4">
            Upload Logo
          </h2>

          <div
            className="bg-[#0D0D0D] rounded-[16px] px-8 py-3 text-center 
               cursor-pointer"
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
                <div className="bg-[#FF00A2] text-black rounded-lg px-8 py-3 inline-block font-['Space_Grotesk'] text-[16px] leading-[100%] tracking-[0%] text-center capitalize">
                  Upload
                </div>
              </>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={isCreating || isUpdating || logoUploading}
          className="mt-4 bg-[#FF00A2] text-white font-space-grotesk text-base py-2 px-12 rounded-full hover:bg-pink-600 transition-colors w-fit ml-auto disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isCreating || isUpdating ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>{id ? "Updating..." : "Creating..."}</span>
            </div>
          ) : id ? (
            "Update Event"
          ) : (
            "Create Event"
          )}
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;

import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import {
  useAddEventMutation,
  useGetAllEventsQuery,
  useGetEventByIdQuery,
  useUpdateEventMutation,
} from "../../../apis/event";
import { useParams, useNavigate } from "react-router-dom";
import { eventOptions } from "../../../utils/create-event/dropDownData";
import CustomSelect from "../../../utils/CustomSelect";
import { Calendar, Clock } from "lucide-react";

interface EventFormData {
  title: string;
  host: string;
  type: string;
  theme: string;
  startDate: string;
  startTime: string;
  endTime: string;
  description: string;
  isPrivate: boolean;
  logo: string;
  eventLocation: string;
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
    watch,
    control,
    setValue,
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
          setLogoUploading(false);
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

  const formatTime = (isoString: string) => {
    if (!isoString) return "00:00";
    const date = new Date(isoString);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  useEffect(() => {
    if (id && eventResponse) {
      const event = eventResponse?.event;
      reset({
        title: event.title,
        host: event.host,
        type: event.type,
        startDate: event.startDate
          ? new Date(event.startDate).toISOString().split("T")[0]
          : undefined,
        startTime: formatTime(event.startTime),
        endTime: formatTime(event.endTime),
        description: event.description,
        isPrivate: event.isPrivate,
        eventLocation: event.address,
      });

      if (eventResponse?.event?.image) {
        setLogoUrl(eventResponse.event.image);
        setLogoPreview(eventResponse.event.image);
      }
    } else if (!id) {
      reset({
        title: "",
        host: "",
        type: "",
        startDate: new Date().toISOString().split("T")[0],
        startTime: "19:00",
        endTime: "20:00",
        description: "",
        isPrivate: false,
        eventLocation: "",
      });
    }
  }, [eventResponse, id, reset]);

  const onSubmit = async (data: EventFormData) => {
    if (!logoUrl.trim()) {
      return;
    }

    try {
      const startDate = new Date(data.startDate);
      const startTime = new Date(startDate);
      const endTime = new Date(startDate);

      const [startHours, startMinutes] = data.startTime.split(":").map(Number);
      const [endHours, endMinutes] = data.endTime.split(":").map(Number);

      startTime.setHours(startHours, startMinutes, 0, 0);
      endTime.setHours(endHours, endMinutes, 0, 0);

      const eventData = {
        ...data,
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        image: logoUrl,
        address: data.eventLocation,
        isPrivate: data.isPrivate,
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

  const inputClass =
    "w-full max-w-[700px] h-[46px] rounded-[16px] bg-[#0D0D0D] text-[#383838] px-4 py-2.5 font-['Space_Grotesk'] text-[16px] md:text-[16px] leading-[100%] capitalize placeholder-[#383838] focus:outline-none focus:ring-2 focus:ring-[#FF00A2]";
  const labelClass =
    "block font-['Space_Grotesk'] font-normal text-[14px] md:text-[16px] leading-[100%] capitalize text-white mb-2";

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-white font-space-grotesk text-sm md:text-base">
              Event type*
            </label>
            <Controller
              name="type"
              control={control}
              rules={{ required: "Event type is required" }}
              render={({ field }) => (
                <CustomSelect
                  {...field}
                  value={eventOptions.find(
                    (option) => option.value === field.value
                  )}
                  onChange={(selectedOption: any) =>
                    field.onChange(selectedOption?.value)
                  }
                  options={eventOptions}
                  isDisabled={false}
                  placeholder="Select event type"
                />
              )}
            />
            {errors.type && (
              <span className="text-red-500 text-sm">
                {errors.type.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-white font-space-grotesk text-sm md:text-base">
              Event Location*
            </label>
            <input
              type="text"
              placeholder="Event Location"
              className="w-full h-12 bg-[#0D0D0D] rounded-lg px-3 text-white font-space-grotesk text-base placeholder:text-[#878787] focus:outline-none focus:ring-1 focus:ring-pink-500"
              {...register("eventLocation", {
                required: "Event location is required",
              })}
            />
            {errors.eventLocation && (
              <span className="text-red-500 text-sm">
                {errors.eventLocation.message}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-white font-space-grotesk text-sm md:text-base">
            Event Start Date*
          </label>
          <div className="relative">
            <input
              type="date"
              className="w-full h-12 bg-[#0D0D0D] rounded-lg px-3 text-white font-space-grotesk text-base focus:outline-none focus:ring-1 focus:ring-pink-500"
              {...register("startDate", {
                required: "Start date is required",
              })}
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <Calendar color="white" size={20} />
            </div>
          </div>

          {errors.startDate && (
            <span className="text-red-500 text-sm">
              {errors.startDate.message}
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className={labelClass}>Event Start Time*</label>

            <div className="relative">
              <input
                type="time"
                className={`${inputClass} text-white `}
                {...register("startTime", {
                  required: "Start time is required",
                })}
              />

              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <Clock color="white" size={20} />
              </div>
            </div>
            {errors.startTime && (
              <p className="text-red-500 text-sm mt-1">
                {errors.startTime.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className={labelClass}>Event End Time*</label>
            <div className="relative">
              <input
                type="time"
                className={`${inputClass} text-white `}
                {...register("endTime", {
                  required: "End time is required",
                })}
              />

              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <Clock color="white" size={20} />
              </div>
            </div>
            {errors.endTime && (
              <p className="text-red-500 text-sm mt-1">
                {errors.endTime.message}
              </p>
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
              name="isPrivate"
              onChange={() => setValue("isPrivate", false)}
              defaultChecked
              className="w-5 h-5 text-[#FF00A2] focus:ring-[#FF00A2]"
            />
            <span className="text-white font-space-grotesk text-sm md:text-base">
              Public Event
            </span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="isPrivate"
              onChange={() => setValue("isPrivate", true)}
              className="w-5 h-5 text-[#FF00A2] focus:ring-[#FF00A2]"
            />
            <span className="text-white font-space-grotesk text-sm md:text-base">
              Private Event
            </span>
          </label>
        </div>

        <div className="w-full max-w-[782px] self-center bg-black p-4">
          <h2 className="font-['Space_Grotesk'] text-white text-[20px] leading-[100%] mb-4">
            Upload Event Flier <span className="text-[#FF00A2]">*</span>
          </h2>

          <div
            className="bg-[#0D0D0D] rounded-[16px] px-8 py-3 text-center cursor-pointer"
            onClick={handleLogoUpload}
          >
            {logoPreview ? (
              <div className="flex flex-col items-center">
                <img
                  src={logoPreview}
                  alt="Venue Logo"
                  className="w-32 h-32 object-contain mb-4"
                />
                <p className="text-[#FF00A2]">Click to Update Flier</p>
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
                  Upload Event Flier
                </div>
              </>
            )}
          </div>
          {!logoUrl.trim() && (
            <span className="text-red-500 text-sm">
              Event flier is required
            </span>
          )}
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

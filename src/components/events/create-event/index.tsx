import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import {
  useAddEventMutation,
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
}

const CreateEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    watch,
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
        theme: event.theme,
        startTime: formatTime(event.startTime),
        endTime: formatTime(event.endTime),
        description: event.description,
        isPrivate: event.isPrivate,
      });
    } else if (!id) {
      // Reset to default values when creating new event
      reset({
        title: "",
        host: "",
        type: "drag-show",
        theme: "",
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
      };

      if (id) {
        await updateEvent({ id, ...eventData }).unwrap();
        toast.success("Event updated successfully!");
        navigate(`/events/${id}`);
      } else {
        const result = await createEvent(eventData).unwrap();
        toast.success("Event created successfully!");
        navigate(`/events/${result._id}`);
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
            {...register("type", { required: "Event type is required" })}
            className="w-full h-10 bg-[#0D0D0D] rounded-lg px-3 text-white font-space-grotesk text-base focus:outline-none focus:ring-1 focus:ring-pink-500 appearance-none"
          >
            <option value="drag-show">Drag show</option>
            <option value="comedy-show">Comedy Show</option>
            <option value="music-concert">Music Concert</option>
            <option value="dance-performance">Dance Performance</option>
            <option value="theater-show">Theater Show</option>
            <option value="other">Other</option>
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        </div>

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
              {...register("isPrivate")}
              type="radio"
              value="false"
              checked={watch("isPrivate") === true}
              className="w-5 h-5 text-[#FF00A2] focus:ring-[#FF00A2]"
            />
            <span className="text-white font-space-grotesk text-sm md:text-base">
              Public Event
            </span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              {...register("isPrivate")}
              type="radio"
              value="true"
              checked={watch("isPrivate") === false}
              className="w-5 h-5 text-[#FF00A2] focus:ring-[#FF00A2]"
            />
            <span className="text-white font-space-grotesk text-sm md:text-base">
              Private Event
            </span>
          </label>
        </div>

        <button
          type="submit"
          disabled={isCreating || isUpdating}
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

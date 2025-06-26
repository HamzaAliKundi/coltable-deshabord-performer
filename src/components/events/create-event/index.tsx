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
import { useGetAllPerformersQuery } from "../../../apis/profile";
import Select from "react-select";

interface EventFormData {
  title: string;
  host: Array<{ value: string; label: string; isCustom?: boolean }>;
  type: string;
  theme: string;
  startDate: string;
  startTime: string;
  endTime: string;
  description: string;
  isPrivate: boolean;
  logo: string;
  eventLocation: string;
  performers?: Array<{ value: string; label: string; isCustom?: boolean }>;
}

const CreateEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [logoPreview, setLogoPreview] = useState("");
  const [logoUploading, setLogoUploading] = useState(false);
  const [logoUrl, setLogoUrl] = useState("");
   const [logoError, setLogoError] = useState("");
  const [isLogoError, setIsLogoError] = useState(false);

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
  const { data: performers } = useGetAllPerformersQuery({});

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
      
      // Helper function to process hosts/performers
      const processHostsOrPerformers = (items: any[]) => {
        if (!Array.isArray(items)) return [];
        
        return items.map((item) => {
          // If item is already an object with _id, it's a database entry
          if (item && typeof item === 'object' && item._id) {
            return {
              value: item._id,
              label: item.fullDragName || item.name || item.firstName || item.email || item.label || item._id,
            };
          }
          // If item is a string, it could be either an ID or a custom name
          if (typeof item === 'string') {
            // Check if it looks like a MongoDB ObjectId
            if (item.length === 24 && /^[0-9a-fA-F]{24}$/.test(item)) {
              // It's an ID, but we don't have the full object, so we'll use the ID as both value and label
              return { value: item, label: item };
            } else {
              // It's a custom name
              return { value: item.toLowerCase().replace(/\s+/g, "-"), label: item };
            }
          }
          // Fallback
          return { value: item, label: item };
        });
      };

      reset({
        title: event.title,
        host: Array.isArray(event.host) 
          ? processHostsOrPerformers(event.host)
          : event.host 
            ? [{ value: event.host, label: event.host }]
            : [],
        type: event.type,
        startDate: event.startDate
          ? new Date(event.startDate).toISOString().split("T")[0]
          : undefined,
        startTime: formatTime(event.startTime),
        endTime: formatTime(event.endTime),
        description: event.description,
        isPrivate: event.isPrivate,
        eventLocation: event.address,
        performers: event.performersList
          ? processHostsOrPerformers(event.performersList)
          : [],
      });

      if (eventResponse?.event?.image) {
        setLogoUrl(eventResponse.event.image);
        setLogoPreview(eventResponse.event.image);
      }
    } else if (!id) {
      reset({
        title: "",
        host: [],
        type: "",
        startDate: new Date().toISOString().split("T")[0],
        startTime: "19:00",
        endTime: "20:00",
        description: "",
        isPrivate: false,
        eventLocation: "",
        performers: [],
      });
    }
  }, [eventResponse, id, reset]);

  const onSubmit = async (data: EventFormData) => {
  if (!logoUrl.trim()) {
      setIsLogoError(true);
      setLogoError("Flier is required");
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

      // Send names (labels) for hosts, but IDs (values) for performers
      const processedHosts = data.host ? data.host.map((h) => h.label) : [];
      const processedPerformers = data.performers ? data.performers.map((p) => p.value) : [];

      const eventData = {
        ...data,
        startDate: startDate.toISOString(),
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        image: logoUrl,
        address: data.eventLocation,
        isPrivate: data.isPrivate,
        host: processedHosts,
        performersList: processedPerformers,
      };

      if (eventData.performers) delete eventData.performers;

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
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
              Event Host* (If name not listed, select + Add Other Host and type
              in their name)
            </label>
            <Controller
              name="host"
              control={control}
              rules={{ required: "Event host is required" }}
              render={({ field }) => (
                <Select
                  {...field}
                  isMulti
                  isDisabled={false}
                  closeMenuOnSelect={false}
                  options={[
                    ...(performers?.map((performer: any) => ({
                      value: performer._id,
                      label:
                        performer.fullDragName ||
                        performer.name ||
                        performer.firstName ||
                        performer.email,
                    })) || []),
                    {
                      value: "custom",
                      label: "+ Add Other Host",
                      isCustom: true,
                    },
                  ]}
                  className="w-full max-w-[782px]"
                  styles={{
                    control: (base) => ({
                      ...base,
                      minHeight: "40px",
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
            {errors.host && (
              <span className="text-red-500 text-sm">
                {errors.host.message}
              </span>
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
            Select Performer(s)
          </label>
          <Controller
            name="performers"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                isMulti
                isDisabled={false}
                closeMenuOnSelect={false}
                options={performers?.map((performer: any) => ({
                  value: performer._id,
                  label:
                    performer.fullDragName ||
                    performer.name ||
                    performer.firstName ||
                    performer.email,
                })) || []}
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
                placeholder="Select performers"
                onChange={(selectedOptions) => {
                  field.onChange(selectedOptions);
                }}
              />
            )}
          />
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
          {isLogoError && (
            <span className="text-red-500 text-sm">{logoError}</span>
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

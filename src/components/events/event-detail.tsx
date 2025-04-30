import React from "react";
import { useGetEventByIdQuery, useDeleteEventMutation } from "../../apis/event";
import { format } from "date-fns";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Anchor, Omega } from "lucide-react";

interface EventDetailProps {
  eventId: string | undefined;
}

const EventDetail: React.FC<EventDetailProps> = ({ eventId }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isEditMode = searchParams.get("edit") === "true";
  const {
    data: eventResponse,
    isLoading,
    error,
  } = useGetEventByIdQuery(eventId || "");
  const [deleteEvent] = useDeleteEventMutation();

  const event = eventResponse?.event;

  const handleDelete = async () => {
    if (!eventId) return;

    try {
      await deleteEvent(eventId).unwrap();
      toast.success("Event deleted successfully");
      navigate("/events");
    } catch (error) {
      toast.error("Failed to delete event");
    }
  };

  const handleEdit = () => {
    navigate(`/event/create-event/${eventId}`);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF00A2]"></div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="text-center text-white py-8">
        {error ? "Error loading event" : "Event not found"}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-[#212121] rounded-[8px] overflow-hidden">
        <div className="p-4">
          <img
            src={event?.image}
            alt="Event"
            className="w-full h-[400px] rounded-[8px] object-cover"
          />
        </div>

        <div className="p-6">
          <h1 className="text-white font-['Space_Grotesk'] font-bold text-2xl mb-4">
            {event?.title}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <img src="/events/time.svg" alt="Time" className="w-4 h-4" />
                <p className="font-['Space_Grotesk'] text-white">
                  {event?.startTime &&
                    format(
                      new Date(event.startTime),
                      "MMM dd, yyyy h:mm a"
                    )}{" "}
                  -{event?.endTime && format(new Date(event.endTime), "h:mm a")}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <img
                  src="/events/location.svg"
                  alt="Location"
                  className="w-4 h-4"
                />
                <p className="font-['Space_Grotesk'] text-white">
                  {event?.host}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Anchor color="#FF00A2" size={16} />
                <p className="font-['Space_Grotesk'] text-white">
                  {event?.type}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Omega color="#FF00A2" size={16} />
                <p className="font-['Space_Grotesk'] text-white">
                  {event?.theme}
                </p>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Omega color="#FF00A2" size={20} />
                <h2 className="text-white font-['Space_Grotesk'] font-bold text-lg">
                  Description:
                </h2>
              </div>
              <p className="font-['Space_Grotesk'] text-white ml-7">
                {event?.description}
              </p>
            </div>
          </div>

          <div className="mt-8 flex justify-end gap-4">
            <button
              onClick={handleDelete}
              className="px-6 py-2 bg-[#212121] border border-white text-white rounded-[30px] hover:bg-red-500 hover:border-red-500 transition-colors"
            >
              Delete Event
            </button>
            {!isEditMode && (
              <button
                onClick={handleEdit}
                className="px-6 py-2 bg-[#FF00A2] text-white rounded-[30px]"
              >
                Edit Event
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;

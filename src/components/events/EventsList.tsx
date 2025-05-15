import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDeleteEventMutation, useGetAllEventsQuery, useUpdatePerformerEventStatusMutation } from "../../apis/event";
import { toast } from "react-hot-toast";
import Pagination from "../../common/Pagination";

interface Event {
  _id: string;
  title: string;
  host: string;
  type: string;
  theme: string;
  startTime: string;
  endTime: string;
  startDate: string;
  description: string;
  isPrivate: boolean;
  status: string;
  image?: string;
  address: string;
  eventStatus?: {
    _id: string;
    event: string;
    user: string;
    userType: string;
    status: string;
    createdAt: string;
    updatedAt: string;
  };
}

interface EventsListProps {
  events: Event[];
  isLoading: boolean;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  activeTab: string;
  refetchVenueRequest: () => void;
}

const EventsList: React.FC<EventsListProps> = ({
  events,
  isLoading,
  currentPage,
  totalPages,
  onPageChange,
  activeTab,
  refetchVenueRequest
}) => {
  const [expandedTitle, setExpandedTitle] = React.useState<string | null>(null);
  const navigate = useNavigate();
  const [deleteEvent] = useDeleteEventMutation();
  const { refetch } = useGetAllEventsQuery({ limit: 10, page: currentPage });
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [updatePerformerEventStatus] = useUpdatePerformerEventStatusMutation();

  const [loadingStatus, setLoadingStatus] = useState<string | null>(null);
  const [currentAction, setCurrentAction] = useState<'approved' | 'rejected' | null>(null);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const extractTime = (dateString: string) => {
    const date = new Date(dateString);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;

    return `${hours}:${minutes} ${ampm}`;
  };

  const handleDelete = async (eventId: string) => {
    setDeletingId(eventId);
    try {
      await deleteEvent(eventId).unwrap();
      toast.success("Event deleted successfully");
      refetch(); 

    } catch (error) {
      toast.error("Failed to delete event");
    } finally {
      setDeletingId(null);
    }
  };

  const handleStatusUpdate = async (eventId: string, status: 'approved' | 'rejected') => {
    setLoadingStatus(eventId);
    setCurrentAction(status);
    
    try {
      await updatePerformerEventStatus({ id: eventId, status }).unwrap();
      toast.success(`Event ${status === 'approved' ? 'accepted' : 'rejected'} successfully`);
      refetch?.();
      refetchVenueRequest();
    } catch (error) {
      toast.error(`Failed to ${status === 'approved' ? 'accept' : 'reject'} event`);
    } finally {
      setLoadingStatus(null);
      setCurrentAction(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF00A2]"></div>
      </div>
    );
  }

  if (!events.length) {
    return <div className="text-center text-white py-8">No events found</div>;
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {events.map((event) => (
          <div
            key={event._id}
            className="bg-[#212121] mt-7 rounded-[8px] overflow-hidden w-full max-w-[300px] flex flex-col"
          >
            <div className="p-2 relative">
              <img
                src={event?.image}
                alt="Event"
                className="w-full h-[220px] rounded-[8px] object-cover"
              />
              <div className="absolute top-3 left-3 w-[70px] h-[70px] bg-gradient-to-b from-[#FF00A2] to-[#D876B5] rounded-full flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-[#e3d4de] leading-none">
                  {formatDate(event.startDate)?.replace(",", "").slice(3, 6)}
                </span>
                <span className="text-lg font-semibold text-[#ebd4e3] uppercase leading-none">
                  {formatDate(event.startDate)?.slice(0, 3)}
                </span>
              </div>
            </div>

            <div className="p-3 flex flex-col">
              <h2
                className="text-white font-['Space_Grotesk'] font-bold text-base capitalize mb-3 cursor-pointer"
                onClick={() =>
                  setExpandedTitle(
                    expandedTitle === event._id ? null : event._id
                  )
                }
              >
                {expandedTitle === event._id
                  ? event.title
                  : event.title.length > 20
                  ? `${event.title.substring(0, 20)}...`
                  : event.title}
              </h2>

              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <img src="/events/time.svg" alt="Time" className="w-4 h-4" />
                  <p className="font-['Space_Grotesk'] font-normal text-sm leading-none text-white">
                    Starts: {extractTime(event.startTime)}
                  </p>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <img
                    src="/events/location.svg"
                    alt="Location"
                    className="w-4 h-4"
                  />
                  <p className="font-['Space_Grotesk'] font-normal text-sm leading-none text-white">
                    {event.address || "N/A"}
                  </p>
                </div>
              </div>

              {activeTab !== "eventRequest" && (
                <div className="mt-4 space-y-2">
                  <button
                    onClick={() => navigate(`/event/detail/${event._id}`)}
                    className="w-full h-[35px] bg-[#FF00A2] text-white text-xs font-medium rounded-[30px]"
                  >
                    VIEW DETAILS
                  </button>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDelete(event._id)}
                      className={`w-1/2 h-[35px] bg-[#212121] border-[1px] border-[#FFFFFF] text-white text-xs font-normal rounded-[82px] flex items-center justify-center gap-2 ${
                        deletingId === event._id
                          ? "opacity-50"
                          : "hover:text-red-500"
                      }`}
                      disabled={deletingId === event._id}
                    >
                      {deletingId === event._id ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Deleting...
                        </>
                      ) : (
                        "DELETE EVENT"
                      )}
                    </button>
                    <button
                      onClick={() =>
                        navigate(`/event/create-event/${event._id}`)
                      }
                      className="w-1/2 h-[35px] bg-[#212121] border-[1px] border-[#FFFFFF] text-white text-xs font-normal rounded-[82px]"
                    >
                      EDIT EVENT
                    </button>
                  </div>
                </div>
              )}
              {activeTab === "eventRequest" && (
              <div className="mt-4 space-y-2">
              <button
                onClick={() => navigate(`/event/detail/${event._id}?isEventRequest=true`)}
                className="w-full h-[35px] bg-[#FF00A2] text-white text-xs font-medium rounded-[30px]"
              >
                VIEW DETAILS
              </button>
              <div className="flex gap-2">
                <button
                  onClick={() => handleStatusUpdate(event._id, 'approved')}
                  disabled={loadingStatus === event._id || event.eventStatus?.status === 'approved'}
                  className={`w-1/2 h-[35px] bg-[#212121] border-[1px] border-[#FFFFFF] text-white text-xs font-normal rounded-[82px] flex items-center justify-center gap-2 
                    ${event.eventStatus?.status === 'approved' ? 'opacity-50 cursor-not-allowed bg-green-800' : ''}`}
                >
                  {loadingStatus === event._id && currentAction === 'approved' ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : event.eventStatus?.status === 'approved' ? (
                    <>
                      <span className="w-2 h-2 rounded-full bg-green-400 mr-1"></span>
                      Approved
                    </>
                  ) : 'Accept'}
                </button>
                <button
                  onClick={() => handleStatusUpdate(event._id, 'rejected')}
                  disabled={loadingStatus === event._id || event.eventStatus?.status === 'rejected'}
                  className={`w-1/2 h-[35px] bg-[#212121] border-[1px] border-[#FFFFFF] text-white text-xs font-normal rounded-[82px] flex items-center justify-center gap-2 
                    ${event.eventStatus?.status === 'rejected' ? 'opacity-50 cursor-not-allowed bg-red-800' : ''}`}
                >
                  {loadingStatus === event._id && currentAction === 'rejected' ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : event.eventStatus?.status === 'rejected' ? (
                    <>
                      <span className="w-2 h-2 rounded-full bg-red-400 mr-1"></span>
                      Rejected
                    </>
                  ) : 'Reject'}
                </button>
              </div>
            </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex mt-10 justify-center items-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            isLoading={isLoading}
            onPageChange={onPageChange}
            showPagination={true}
          />
        </div>
      )}
    </>
  );
};

export default EventsList;

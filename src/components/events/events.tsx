import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  useGetAllEventsQuery,
  useGetAllPerformerEventsQuery,
} from "../../apis/event";
import EventsList from "./EventsList";

const Events = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 8;
  const [activeTab, setActiveTab] = useState<
    "eventRequest" | "pendingRequest" | "confirmRequest"
  >("eventRequest");

  // Fetch ALL events (no pagination) to sort them properly
  const {
    data: pendingConfirmedEventsData,
    isLoading: isPendingConfirmedLoading,
    isFetching: isPendingConfirmedFetching,
  } = useGetAllEventsQuery(
    {
      limit: 10000, // Fetch all events
      page: 1,
      status:
        activeTab === "pendingRequest"
          ? "pending"
          : activeTab === "confirmRequest"
          ? "approved"
          : undefined,
    },
    {
      skip: activeTab === "eventRequest",
    }
  );

  const {
    data: venueRequestEventData,
    isLoading: isVenueRequestLoading,
    isFetching: isVenueRequestFetching,
    refetch: refetchVenueRequest,
  } = useGetAllPerformerEventsQuery(
    {
      limit: 10000, // Fetch all events
      page: 1,
    },
    {
      skip: activeTab !== "eventRequest",
    }
  );

  const getCurrentData = () => {
    switch (activeTab) {
      case "eventRequest":
        return venueRequestEventData;
      case "pendingRequest":
      case "confirmRequest":
        return pendingConfirmedEventsData;
      default:
        return { docs: [], totalPages: 0 };
    }
  };

  const currentData = getCurrentData();
  const rawEvents = Array.isArray(currentData?.docs) ? currentData.docs : [];

  // Sort ALL events: future events first, then past events
  // Then paginate client-side
  const sortedEvents = useMemo(() => {
    if (!rawEvents.length) return [];

    const now = new Date();
    now.setHours(0, 0, 0, 0); // Set to start of today for comparison

    // Separate future and past events
    const futureEvents: typeof rawEvents = [];
    const pastEvents: typeof rawEvents = [];

    rawEvents.forEach((event: any) => {
      if (!event.startDate) {
        // If no startDate, treat as past event
        pastEvents.push(event);
        return;
      }

      const eventDate = new Date(event.startDate);
      eventDate.setHours(0, 0, 0, 0); // Set to start of day for comparison

      if (eventDate >= now) {
        futureEvents.push(event);
      } else {
        pastEvents.push(event);
      }
    });

    // Sort future events by startDate ascending (earliest first)
    futureEvents.sort((a: any, b: any) => {
      if (!a.startDate || !b.startDate) return 0;
      return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
    });

    // Sort past events by startDate descending (most recent first)
    pastEvents.sort((a: any, b: any) => {
      if (!a.startDate || !b.startDate) return 0;
      return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
    });

    // Combine: future events first, then past events
    return [...futureEvents, ...pastEvents];
  }, [rawEvents]);

  // Calculate total pages for client-side pagination
  const totalPages = useMemo(() => {
    return Math.ceil(sortedEvents.length / eventsPerPage);
  }, [sortedEvents, eventsPerPage]);

  // Paginate the sorted events client-side
  const events = useMemo(() => {
    if (!Array.isArray(sortedEvents)) return [];
    const startIndex = (currentPage - 1) * eventsPerPage;
    const endIndex = startIndex + eventsPerPage;
    return sortedEvents.slice(startIndex, endIndex);
  }, [sortedEvents, currentPage, eventsPerPage]);

  const isLoading =
    (activeTab === "eventRequest" &&
      (isVenueRequestLoading || isVenueRequestFetching)) ||
    (activeTab !== "eventRequest" &&
      (isPendingConfirmedLoading || isPendingConfirmedFetching));

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleTabChange = (
    tab: "eventRequest" | "pendingRequest" | "confirmRequest"
  ) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  return (
    <div className="bg-black p-4 md:p-8 w-full mb-32">
      {/* Tab Navigation */}
      <div className="flex relative flex-col md:flex-row md:gap-8 mb-6 md:mb-8">
        <div className="grid grid-cols-2 md:flex md:flex-row gap-2 md:gap-4 w-full md:w-auto">
          <button
            className={`px-3 md:px-6 py-2 md:py-4 font-bold text-sm md:text-base transition-all duration-300 relative whitespace-nowrap ${
              activeTab === "eventRequest" ? "text-white" : "text-gray-400"
            }`}
            onClick={() => handleTabChange("eventRequest")}
          >
            Event Request
            {activeTab === "eventRequest" && (
              <div className="absolute bottom-0 left-0 w-full h-1 bg-[#FF00A2]"></div>
            )}
          </button>
          <button
            className={`px-3 md:px-6 py-2 md:py-4 font-bold text-sm md:text-base transition-all duration-300 relative whitespace-nowrap ${
              activeTab === "pendingRequest" ? "text-white" : "text-gray-400"
            }`}
            onClick={() => handleTabChange("pendingRequest")}
          >
            Pending Request
            {activeTab === "pendingRequest" && (
              <div className="absolute bottom-0 left-0 w-full h-1 bg-[#FF00A2]"></div>
            )}
          </button>
          <button
            className={`px-3 md:px-6 py-2 md:py-4 font-bold text-sm md:text-base transition-all duration-300 relative whitespace-nowrap ${
              activeTab === "confirmRequest" ? "text-white" : "text-gray-400"
            }`}
            onClick={() => handleTabChange("confirmRequest")}
          >
            Confirmed Request
            {activeTab === "confirmRequest" && (
              <div className="absolute bottom-0 left-0 w-full h-1 bg-[#FF00A2]"></div>
            )}
          </button>
        </div>
        <div className="absolute -right-4 top-16 flex items-center gap-3 text-white lg:top-0">
          <Link to="/event/create-event" className="font-['Space_Grotesk']">
            Create event
          </Link>
        </div>
      </div>

      <EventsList
        events={events}
        isLoading={isLoading}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        activeTab={activeTab}
        refetchVenueRequest={refetchVenueRequest}
      />
    </div>
  );
};

export default Events;

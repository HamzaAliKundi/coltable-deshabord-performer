import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useGetAllEventsQuery, useGetAllPerformerEventsQuery } from "../../apis/event";
import EventsList from "./EventsList";

const Events = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 10;
  const [activeTab, setActiveTab] = useState<
    "eventRequest" | "pendingRequest" | "confirmRequest"
  >("eventRequest");

  const { data: eventsData, isLoading } = useGetAllEventsQuery({
    limit: 1000,
    page: 1,
  });

   const { data: getAllPerformerEvents, isLoading: getAllPerformerEventsLoading } = useGetAllPerformerEventsQuery({
    limit: 100,
    page: 1,
  });

  const filterEventsByTab = () => {
    if (!eventsData?.docs) return [];

    return eventsData.docs.filter((event: any) => {
      if (activeTab === "pendingRequest") return event.status === "pending";
      if (activeTab === "confirmRequest") return event.status === "approved";
      return true;
    });
  };

  const filteredEvents = filterEventsByTab();

  const paginatedEvents = filteredEvents.slice(
    (currentPage - 1) * eventsPerPage,
    currentPage * eventsPerPage
  );

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  // const handleStatusChange = async (
  //   eventId: string,
  //   newStatus: "approved" | "rejected"
  // ) => {
  //   console.log(`Changing status of event ${eventId} to ${newStatus}`);
  //   await refetch();
  // };

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
        events={paginatedEvents}
        isLoading={isLoading}
        currentPage={currentPage}
        totalPages={Math.ceil(filteredEvents.length / eventsPerPage)}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Events;

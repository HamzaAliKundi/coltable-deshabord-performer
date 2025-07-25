import { useParams } from "react-router-dom";
import { useGetEventByIdQuery } from "../../apis/event";

export const outdoorCoveringOptions = [
  { label: "Indoor Stage", value: "indoor_stage" },
  { label: "Outdoor Stage", value: "outdoor_stage" },
  {
    label: "Indoor Open Floor Of Venue - Hardwood/Concrete",
    value: "indoor_open_floor_hardwood",
  },
  {
    label: "Indoor Open Floor Of Venue - Carpet",
    value: "indoor_open_floor_carpet",
  },
  { label: "Outdoor Patio - Hardwood", value: "outdoor_patio_hardwood" },
  { label: "Outdoor - Grass", value: "outdoor_grass" },
];

const EventRequestDetail = () => {
  const { id } = useParams();

  const { data: getEventsByVenuesById, isLoading } = useGetEventByIdQuery(
    id || ""
  );

  const formatDate = (dateString: string) => {
    let date = new Date(dateString);
    // Handle midnight UTC case
    if (
      date.getUTCHours() === 0 &&
      date.getUTCMinutes() === 0 &&
      date.getUTCSeconds() === 0
    ) {
      const localDate = new Date(date);
      const localDay = localDate.getDate();
      const utcDay = date.getUTCDate();
      if (localDay < utcDay) {
        localDate.setDate(localDate.getDate() + 1);
        date = localDate;
      }
    }

    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return date.toLocaleDateString("en-US", options);
  };

  const extractTime = (dateString: string) => {
    let date = new Date(dateString);
    // Handle midnight UTC case
    if (
      date.getUTCHours() === 0 &&
      date.getUTCMinutes() === 0 &&
      date.getUTCSeconds() === 0
    ) {
      const localDate = new Date(date);
      const localDay = localDate.getDate();
      const utcDay = date.getUTCDate();
      if (localDay < utcDay) {
        localDate.setDate(localDate.getDate() + 1);
        date = localDate;
      }
    }

    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12;
    const minutesStr = minutes < 10 ? `0${minutes}` : `${minutes}`;

    return `${hours}:${minutesStr} ${ampm}`;
  };

  const formatEventType = (type: string) => {
    const types: Record<string, string> = {
      "drag-show": "Drag Show",
      "drag-brunch": "Drag Brunch",
      "drag-bingo": "Drag Bingo",
      "drag-trivia": "Drag Trivia",
      other: "Other",
    };
    return types[type] || "Other";
  };

  const selectedCovering = getEventsByVenuesById?.event?.hasCoverings;

  const selectedLabel = outdoorCoveringOptions.find(
    (option) => option.value === selectedCovering
  )?.label;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="w-8 h-8 border-2 border-[#FF00A2] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="col-span-1 lg:col-span-8 p-4 md:px-8 py-2 bg-black">
      <h1 className="font-tangerine text-xl md:text-[64px] text-white font-bold mb-4 lg:mb-8 text-center">
        {getEventsByVenuesById?.event?.title}
      </h1>

      {/* Event Image */}
      <div className="relative flex justify-center">
        <img
          src={getEventsByVenuesById?.event?.image}
          alt={getEventsByVenuesById?.event?.title}
          className="w-full md:max-w-[550px] h-auto max-h-[300px] object-contain mx-auto rounded-lg"
        />
      </div>

      {/* About Section */}
      <div className="mb-6 lg:mb-8 mt-12">
        <h2 className="bg-[#FF00A2] text-white py-2 px-4 rounded-md mb-4 text-lg lg:text-xl text-center">
          About {getEventsByVenuesById?.event?.title}
        </h2>
      </div>

      {/* Basic Info Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        <div>
          <h3 className="text-white border-b-[3px] border-[#FF00A2] mb-3 pb-1 text-lg">
            Event Details
          </h3>
          <ul className="text-white/90 space-y-2">
            <li>
              <span className="font-medium">Host:</span>{" "}
              {Array.isArray(getEventsByVenuesById?.event?.host) 
                ? getEventsByVenuesById?.event?.host.join(", ")
                : getEventsByVenuesById?.event?.host}
            </li>
            <li>
              <span className="font-medium">Type:</span>{" "}
              {formatEventType(getEventsByVenuesById?.event?.type)}
            </li>

            <li>
              <span className="font-medium">Audience:</span>{" "}
              {Array.isArray(getEventsByVenuesById?.event?.audienceType) 
                ? getEventsByVenuesById?.event?.audienceType.join(", ")
                : getEventsByVenuesById?.event?.audienceType}
            </li>

            {/* <li>
              <span className="font-medium">Location:</span>{" "}
              {getEventsByVenuesById?.event?.address}
            </li> */}
          </ul>
        </div>

        <div>
          <h3 className="text-white border-b-[3px] border-[#FF00A2] mb-3 pb-1 text-lg">
            Event Timing
          </h3>
          <ul className="text-white/90 space-y-2">
            <li>
              <span className="font-medium">Start Date:</span>{" "}
              {formatDate(getEventsByVenuesById?.event.startDate)?.slice(0, 12)}
            </li>
            <li>
              <span className="font-medium">Start Time:</span>{" "}
              {extractTime(getEventsByVenuesById?.event.startTime)}
            </li>
            <li>
              <span className="font-medium">End Time:</span>{" "}
              {extractTime(getEventsByVenuesById?.event.endTime)}
            </li>
            <li>
              <span className="font-medium">Call Time:</span>{" "}
              {extractTime(getEventsByVenuesById?.event.eventCallTime)}
            </li>

            <li>
              <span className="font-medium">Music Deadline:</span>{" "}
              {getEventsByVenuesById?.event?.musicFormat}
            </li>
          </ul>
        </div>
      </div>

      {/* Performers Section */}
      <div className="mt-8">
        <h3 className="text-white border-b-[3px] border-[#FF00A2] mb-3 pb-1 text-lg">
          Performers Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white/90">
          <div>
            <p>
              <span className="font-medium">Number of Hosts:</span>{" "}
              {getEventsByVenuesById?.event?.hosts}
            </p>
            <p>
              <span className="font-medium">Number of Performers:</span>{" "}
              {getEventsByVenuesById?.event?.performers}
            </p>
            <p>
              <span className="font-medium">Numbers per Performer:</span>{" "}
              {getEventsByVenuesById?.event?.assignedPerformers}
            </p>
          </div>
          <div>
            <p>
              <span className="font-medium">Dressing Area:</span>{" "}
              {getEventsByVenuesById?.event?.hasPrivateDressingArea === "yes"
                ? "Available"
                : "Not available"}
            </p>
            <p>
              <span className="font-medium">Equipment Responsibility:</span>{" "}
              {getEventsByVenuesById?.event?.isEquipmentProvidedByPerformer ===
              "yes"
                ? "Yes"
                : "No"}
            </p>

            <p>
              <span className="font-medium">Performers:</span>{" "}
              {getEventsByVenuesById?.event?.performersList
                ?.filter((performer: any) => performer?.fullDragName)
                .map((performer: any) => performer.fullDragName)
                .join(", ")}
            </p>
          </div>
        </div>
      </div>

      {/* Equipment Section */}
      <div className="mt-8">
        <h3 className="text-white border-b-[3px] border-[#FF00A2] mb-3 pb-1 text-lg">
          Equipment & Facilities
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white/90">
          <div>
            <p>
              <span className="font-medium">Venue Equipment:</span>{" "}
              {getEventsByVenuesById?.event?.isEquipmentProvidedByVenue}
            </p>
            <p>
              <span className="font-medium">Stage:</span> {selectedLabel}
            </p>
          </div>
        </div>
      </div>

      {/* Special Requests */}
      {getEventsByVenuesById?.event?.description && (
        <div className="mt-8">
          <h3 className="text-white border-b-[3px] border-[#FF00A2] mb-3 pb-1 text-lg">
            Description & Special Request
          </h3>
          <p className="text-white/90">
            <span className="font-medium">Description:</span>{" "}
            <span dangerouslySetInnerHTML={{ 
              __html: (getEventsByVenuesById?.event?.description || "N/A").replace(/\n/g, '<br>') 
            }} />
          </p>
          <p className="text-white/90">
            <span className="font-medium">Special Request For Performer:</span>{" "}
            <span dangerouslySetInnerHTML={{ 
              __html: (getEventsByVenuesById?.event?.specialRequirements || "N/A").replace(/\n/g, '<br>') 
            }} />
          </p>
        </div>
      )}
    </div>
  );
};

export default EventRequestDetail;

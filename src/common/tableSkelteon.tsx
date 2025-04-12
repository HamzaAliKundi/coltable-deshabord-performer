import React from "react";

interface SkeletonTableProps {
  rowCount: number;
  columnCount: number;
}

const LoadingTableSkeleton: React.FC<SkeletonTableProps> = ({
  rowCount,
  columnCount,
}) => {
  const renderSkeletonRows = () => {
    const rows = [];
    for (let i = 0; i < rowCount; i++) {
      const cells = [];
      for (let j = 0; j < columnCount; j++) {
        cells.push(
          <div
            key={j}
            className="h-5 bg-gray-300 animate-pulse rounded w-full"
          ></div>
        );
      }
      rows.push(
        <div
          key={i}
          className="grid grid-cols-6 gap-4 py-4 border-b border-gray-200"
        >
          {cells}
        </div>
      );
    }
    return rows;
  };

  return (
    <div
      className="flex justify-center items-center shadow-md px-5"
      style={{ height: "400px" }}
    >
      <div className="w-full max-w-7xl space-y-4">{renderSkeletonRows()}</div>
    </div>
  );
};

export default LoadingTableSkeleton;

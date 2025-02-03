import React, { useState } from "react";

const Table = ({ tableData }) => {
  const { columns, rows } = tableData;

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(rows?.length / itemsPerPage);

  const currentRows = rows?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="w-full h-screen border-blue-500 ">
      <div className="w-full h-full overflow-x-auto overflow-y-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-200">
            <tr className="rounded-md bg-blue-500 font-bold text-white">
              {columns?.map((column, index) => (
                <th
                  key={index}
                  className={`border border-blue-500 px-4 py-2 font-bold text-lg text-center ${
                    column.style || ""
                  }`}
                >
                  {column.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentRows?.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column, colIndex) => (
                  <td
                    key={colIndex}
                    className={`border border-blue-500 px-4 py-2 ${
                      column.style || ""
                    }`}
                  >
                    {column?.value === "image" ? (
                      <img
                        src={row[column.value]}
                        alt={row.title || "image"}
                        className="w-12 h-12 rounded-md object-cover mx-auto"
                      />
                    ) : (
                      <div className="truncate max-w-[200px] mx-auto">
                        {row[column.value]}
                      </div>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination */}
        <div className="flex justify-end mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 mx-1 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-1 mx-1 ${
                currentPage === page
                  ? "bg-blue-700 text-white"
                  : "bg-blue-500 text-white"
              } rounded`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 mx-1 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Table;

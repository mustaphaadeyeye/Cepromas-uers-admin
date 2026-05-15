import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex items-center justify-center mb-10 mt-6 gap-2 select-none">

      {/* Prev Button */}
      <button
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        className="w-[35px] h-[35px] flex items-center justify-center rounded-md border border-gray-300 bg-white"
      >
        ‹
      </button>

      {/* Page 1 */}
      <button
        onClick={() => onPageChange(1)}
        className={`
          w-[35px] h-[35px] flex items-center justify-center rounded-md border border-gray-300 
          ${currentPage === 1 ? "bg-[#E6D8F3] text-black font-semibold" : "bg-white"}
        `}
      >
        1
      </button>

      {/* Dots */}
      <div className="w-[35px] h-[35px] flex items-center justify-center text-gray-500">
        ...
      </div>

      {/* Page 2 */}
      <button
        onClick={() => onPageChange(2)}
        className={`
          w-[35px] h-[35px] flex items-center justify-center rounded-md border border-gray-300
          ${currentPage === 2 ? "bg-[#E6D8F3] text-black font-semibold" : "bg-white"}
        `}
      >
        2
      </button>

      {/* Next Button */}
      <button
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
        className="w-[35px] h-[35px] flex items-center justify-center rounded-md border border-gray-300 bg-white"
      >
        ›
      </button>
    </div>
  );
};

export default Pagination;

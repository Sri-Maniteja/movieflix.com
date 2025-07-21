import React from "react";

function Pagination({ handlePrev, handleNext, pageNo }) {
  return (
    <div className="bg-gray-400/30 flex justify-center py-4">
      <div onClick={handlePrev} className="px-8 cursor-pointer">
        <i className="fa-solid fa-arrow-left"></i>
      </div>
      <div className="font-bold">{pageNo}</div>
      <div onClick={handleNext} className="px-8 cursor-pointer">
        <i className="fa-solid fa-arrow-right"></i>
      </div>
    </div>
  );
}

export default Pagination;

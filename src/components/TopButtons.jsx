import React from "react";

const TopButtons = ({ toggleUnit, unit }) => {
  return (
    <div className="flex justify-end mb-4">
      <button
        onClick={toggleUnit}
        className="bg-white hover:text-white hover:bg-[#1468C9]  text-[#1468C9] px-4 py-2 rounded-md shadow-lg"
      >
        Switch to {unit === "metric" ? "Fahrenheit" : "Celsius"}
      </button>
    </div>
  );
};

export default TopButtons;

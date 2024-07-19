import React from "react";

const RecentSearches = ({ searches, onSearch }) => {
  return (
    <div className="text-white">
      <h3 className="text-lg mb-2 ">Recent Searches</h3>
      <ul className="flex gap-2">
        {searches.map((city, index) => (
          <li
            key={index}
            className="cursor-pointer hover:no-underline py-2 px-4 border bg-white rounded-lg text-[#1468C9] font-medium text-lg hover:text-white hover:bg-[#1468C9] shadow-lg "
            onClick={() => onSearch(city)}
          >
            {city}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentSearches;

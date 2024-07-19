import React from "react";

const TimeLoc = () => {
  const date = new Date();
  const formattedDate = date.toLocaleDateString();
  const formattedTime = date.toLocaleTimeString();

  return (
    <div className="text-white mb-4">
      <h1 className="text-3xl">{formattedTime}</h1>
      <p>{formattedDate}</p>
    </div>
  );
};

export default TimeLoc;

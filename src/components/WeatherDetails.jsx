import React from "react";

const WeatherDetails = ({ weather, unit }) => {
  const { name, main, weather: weatherInfo, wind } = weather;
  const temperature = main.temp.toFixed(1);
  const unitSymbol = unit === "metric" ? "C" : "F";
  const windSpeed =
    unit === "metric" ? `${wind.speed} m/s` : `${wind.speed} mph`;

  return (
    <div className="text-white mb-4">
      <h2 className="text-2xl">{name}</h2>
      <p className="text-lg">
        {temperature}°{unitSymbol}
      </p>
      <p>{weatherInfo[0].description}</p>
      <p>Wind Speed: {windSpeed}</p>
    </div>
  );
};

export default WeatherDetails;

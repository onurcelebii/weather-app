import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTemperatureLow,
  faCity,
  faCloud,
  faWind,
  faClock,
  faSun,
  faPenNib,
} from "@fortawesome/free-solid-svg-icons";

const WeatherDetails = ({ weatherInfo }) => {
  // console.log(weatherInfo);
  return (
    <div id="weatherInfo" aria-live="polite">
      <p className="city">
        <FontAwesomeIcon icon={faCity} /> {weatherInfo.city}
      </p>

      <div className="weather-info-details">
        <p>
          <FontAwesomeIcon icon={faTemperatureLow} /> Temperature:{" "}
          {weatherInfo.temp}°C
        </p>
        <p>
          <FontAwesomeIcon icon={faCloud} /> Condition: {weatherInfo.condition}
        </p>
        <p>
          <FontAwesomeIcon icon={faSun} />
          Humidity: {weatherInfo.humidity}%
        </p>
        <p>
          <FontAwesomeIcon icon={faWind} /> Wind Speed: {weatherInfo.wind} km/h
        </p>
        <p>
          <FontAwesomeIcon icon={faClock} />
          Local Time: {weatherInfo.localtime}
        </p>
      </div>

      <p className="last-updated">
        <FontAwesomeIcon icon={faPenNib} /> Last Updated:{" "}
        {weatherInfo.last_updated}
      </p>
    </div>
  );
};

export default WeatherDetails;

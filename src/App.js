import React, { useState, useEffect, Suspense } from "react";
import "./App.css";
import cityList from "./cities.json";
import Select from "react-select";

const WeatherDetails = React.lazy(() => import("./WeatherDetails"));

function WeatherApp() {
  const WEATHER_API_KEY = process.env.REACT_APP_API_KEY;
  const [selectedCity, setSelectedCity] = useState("");
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [cities, setCities] = useState([]);

  // console.log(process.env);

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = () => {
    setCities(cityList);
  };

  const handleCityChange = (selectedOption) => {
    setSelectedCity(selectedOption.value);
    if (selectedOption.value) {
      fetchWeather(selectedOption.value);
    } else {
      setWeatherInfo(null);
    }
  };

  const fetchWeather = (city) => {
    fetch(
      `https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${city}&aqi=yes`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Weather information could not be retrieved.");
        }
        return response.json();
      })
      .then((data) => {
        const { current, location } = data;
        // console.log(data);
        const { temp_c, condition, humidity, wind_kph, last_updated } = current;
        const { localtime } = location;
        const lastUpdatedTime = new Date(last_updated).toLocaleString("tr-TR", {
          timeStyle: "short",
        });
        const formattedLocalTime = formatDateTime(localtime);

        setWeatherInfo({
          city: city.toUpperCase(),
          temp: temp_c,
          condition: condition.text,
          humidity,
          wind: wind_kph,
          localtime: formattedLocalTime,
          last_updated: lastUpdatedTime,
        });
      })
      .catch((error) => {
        setWeatherInfo({ error: error.message });
        console.error("Weather information could not be retrieved:", error);
      });
  };

  const formatDateTime = (dateTime) => {
    const dateOptions = {
      day: "numeric",
      month: "long",
      weekday: "long",
      year: "numeric",
    };
    const timeOptions = { hour: "numeric", minute: "numeric" };
    const formattedDate = new Date(dateTime).toLocaleDateString(
      "tr-TR",
      dateOptions
    );
    const formattedTime = new Date(dateTime).toLocaleTimeString(
      "tr-TR",
      timeOptions
    );
    return formattedDate + " " + formattedTime;
  };

  return (
    <div className="container">
      <header>
        <h1>Weather Condition</h1>
      </header>
      <main>
        <label htmlFor="citySelect">Select a city:</label>
        <Select
          id="citySelect"
          value={
            selectedCity ? { value: selectedCity, label: selectedCity } : null
          }
          onChange={handleCityChange}
          options={[
            { value: "", label: "Please select a city" },
            ...cities.map((city) => ({ value: city, label: city })),
          ]}
          placeholder="Please select a city..."
          menuPlacement="bottom"
          menuPosition="fixed"
          aria-label="Select a city"
        />
        {weatherInfo !== null && (
          <Suspense fallback={<div>Loading...</div>}>
            <WeatherDetails weatherInfo={weatherInfo} />
          </Suspense>
        )}

        {weatherInfo && weatherInfo.error && <div>{weatherInfo.error}</div>}
      </main>
    </div>
  );
}

export default WeatherApp;

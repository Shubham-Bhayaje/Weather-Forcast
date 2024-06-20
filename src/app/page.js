"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const place = "New York";
  const [location, setLocation] = useState(place);
  const [weather, setWeather] = useState(null);
  const [current, setCurrent] = useState(null);

  async function fetchWeather() {
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=e386e114cfd5406f97a150914241906&q=${location}&aqi=yes`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }

      const data = await response.json();
      setWeather(data.location);
      setCurrent(data.current);
    } catch (error) {
      console.error("Error fetching weather data:", error.message);

      throw error;
    }
  }
  useEffect(() => {
    fetchWeather();
  }, []);

  const formatDate = (dateString) => {
    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <div
      className="h-screen w-screen flex  items-center justify-center"
      style={{
        backgroundImage: `url("./pexels-donaldtong94-133953.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-slate-900 sm:h-96 sm:w-96 rounded-lg flex flex-col items-center justify-center lg:h-4/6 lg:w-1/3">
        <div className="flex items-center justify-center w-96 mt-6">
          <input
            type="text"
            className="h-10  rounded-lg text-black pl-4 font-serif w-72 "
            value={location}
            onChange={(event) => {
              setLocation(event.target.value);
            }}
          ></input>
          <button onClick={fetchWeather} className="rounded-full">
            <img
              onClick={fetchWeather}
              src="./search-svgrepo-com.svg"
              className="w-10 h-10  p-2 ml-2 rounded-lg "
              style={{ backgroundColor: "#47b59b" }}
            ></img>
          </button>
        </div>
        {weather && current && (
          <div className="w-80 h-10 m-10 mb-0 text-center mt-6">
            <h1 className=" text-4xl text-white font-serif" value="">
              {weather.name}
            </h1>
          </div>
        )}
        <div className="w-full h-6 m-2 flex items-center justify-center">
          {weather && current && (
            <p className="text-slate-500">{formatDate(weather.localtime)}</p>
          )}
        </div>
        <div className="w-full h-6  m-2 flex items-center justify-center">
          {weather && current && (
            <img src={current.condition.icon} className="w-8 h-8"></img>
          )}
          {weather && current && (
            <p className="text-white m-1">{current.condition.text}</p>
          )}
        </div>
        <div className="w-full h-16  flex items-center justify-center">
          {" "}
          {weather && current && (
            <p className="text-white text-4xl font-bold flex items-center justify-cente">
              {current.temp_c}
              <span className="text-[30px]">&deg;</span>
            </p>
          )}
        </div>

        <div className="w-[100%] mt-6 h-28 flex items-center justify-center gap-4 mb-8">
          <div className="w-24 h-24 bg-white rounded-lg flex flex-col items-center justify-center">
            <img src="./wind.png" className="w-8 h-8 m-2"></img>
            {weather && current && (
              <h2 className="font-medium text-customGreen">
                {" "}
                {current.wind_kph} Km/h
              </h2>
            )}
            <h5 className="font-serif">Wind</h5>
          </div>
          <div className="w-24 h-24 bg-white rounded-lg flex flex-col items-center justify-center">
            <img src="./drop.png" className="w-8 h-8 m-2"></img>
            {weather && current && (
              <h2 className="font-medium text-customGreen">
                {" "}
                {current.humidity}%
              </h2>
            )}
            <h5 className="font-serif">Humidity</h5>
          </div>
          <div className="w-24 h-24 bg-white rounded-lg flex flex-col items-center justify-center">
            <img src="./eye.png" className="w-8 h-8 m-2"></img>
            {weather && current && (
              <h2 className="font-medium text-customGreen">
                {" "}
                {current.vis_km} Km
              </h2>
            )}
            <h5 className="font-serif">Visiblity</h5>
          </div>
        </div>
      </div>
    </div>
  );
}

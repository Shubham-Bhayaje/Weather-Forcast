'use client';
const baseUrl =
  "https://api.weatherapi.com/v1/current.json?key=e386e114cfd5406f97a150914241906&q=London&aqi=no";
export const getWeatherDataForCity = async (city) => {
  const response = await fetch(`${baseUrl}&aqi=yes`);
  const data = await response.json();
  return data;
};

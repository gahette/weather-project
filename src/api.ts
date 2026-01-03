import { WeatherSchema } from "./schemas/weatherSchema";
import {GeocodeSchema } from "./schemas/geocodeSchema";

const API_KEY = import.meta.env.VITE_API_KEY;

export const getWeather = async ({
    lat,
    lon,
}: {
    lat: number;
    lon: number;
}) => {
    const res = await fetch(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,alerts&lang=fr&appid=${API_KEY}`,
    );
    const data = await res.json();
    return WeatherSchema.parse(data);
};

export const getGeocode = async (location: string) => {
    const res = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${API_KEY}`,
    );
    const data = await res.json();
    return GeocodeSchema.parse(data);

};

import { WeatherSchema } from "./schemas/weatherSchema";

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

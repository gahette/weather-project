import { useSuspenseQuery } from "@tanstack/react-query";
import { getWeather } from "../../api";
import Card from "./Card";
import WeatherIcon from "../../WeatherIcon";
import type { Coords } from "../../types";

type Props = {
    coords: Coords;
};

export default function CurrentWeather({ coords }: Props) {
    const { data } = useSuspenseQuery({
        queryKey: ["weather", coords],
        queryFn: () => getWeather({ lat: coords.lat, lon: coords.lon }),
    });

    if (!data) return null;
    return (
        <Card
            title="Current Weather"
            childrenClassName="flex flex-col items-center gap-6"
        >
            <div className="flex flex-col items-center gap-2">
                <h2 className="text-center text-6xl font-semibold">
                    {Math.round(data.current.temp)}˚C
                </h2>
                <WeatherIcon
                    src={data.current.weather[0].icon}
                    className="size-14"
                />
                <h3 className="text-xl capitalize">
                    {data.current.weather[0].description}
                </h3>
            </div>
            <div className="flex flex-col gap-2">
                <p className="text-center text-xl">Heure Local:</p>
                <h3 className="text-4xl font-semibold">
                    {new Intl.DateTimeFormat("fr-FR", {
                        timeZone: data.timezone,
                        hour: "2-digit",
                        minute: "2-digit",
                    }).format(new Date(data.current.dt * 1000))}
                </h3>
            </div>
            <div className="flex w-full justify-between">
                <div className="flex flex-col items-center gap-2">
                    <p className="text-gray-500">Ressenti</p>
                    <p>{Math.round(data.current.feels_like)}˚C</p>
                </div>

                <div className="flex flex-col items-center gap-2">
                    <p className="text-gray-500">Humidité</p>
                    <p>{Math.round(data.current.humidity)}%</p>
                </div>

                <div className="flex flex-col items-center gap-2">
                    <p className="text-gray-500">Vent</p>
                    <p>
                        {Math.round((data.current.wind_speed * 3600) / 1000)}
                        Km/h
                    </p>
                </div>
            </div>
        </Card>
    );
}

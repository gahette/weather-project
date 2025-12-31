import { useSuspenseQuery } from "@tanstack/react-query";
import { getWeather } from "../../api";
import Card from "./Card";
import WeatherIcon from "../../WeatherIcon";
import type { Coords } from "../../types";

type Props = {
    coords: Coords;
};

export default function HourlyForecast({ coords }: Props) {
    const { data } = useSuspenseQuery({
        queryKey: ["weather", coords],
        queryFn: () => getWeather({ lat: coords.lat, lon: coords.lon }),
    });

    if (!data) return null;
    return (
        <Card
            title="Hourly Forecast (48 Hours)"
            childrenClassName="flex gap-6 overflow-x-scroll"
        >
            {data.hourly.map((hour) => (
                <div
                    key={hour.dt}
                    className="flex flex-col items-center gap-2 p-2"
                >
                    <p className="whitespace-nowrap">
                        {new Date(hour.dt * 1000).toLocaleTimeString(
                            undefined,
                            {
                                hour: "numeric",
                                minute: "2-digit",
                            },
                        )}
                    </p>
                    <WeatherIcon src={hour.weather[0].icon} />
                    <p>{Math.round(hour.temp)}˚C</p>
                </div>
            ))}
        </Card>
    );
}

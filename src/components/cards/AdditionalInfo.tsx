import { useSuspenseQuery } from "@tanstack/react-query";
import Card from "./Card";
import { getWeather } from "../../api";
import Sunrise from "../../assets/sunrise.svg?react";
import Sunset from "../../assets/sunset.svg?react";
import Cloud from "../../assets/cloud.svg?react";
import Wind from "../../assets/wind.svg?react";
import Pressure from "../../assets/pressure.svg?react";
import UV from "../../assets/uv.svg?react";
import UpArrow from "../../assets/UpArrow.svg?react";
import type { Coords } from "../../types";

type Props = {
    coords: Coords;
};

export default function AdditionalInfo({ coords }: Props) {
    const { data } = useSuspenseQuery({
        queryKey: ["weather", coords],
        queryFn: () => getWeather({ lat: coords.lat, lon: coords.lon }),
    });

    if (!data) return null;
    return (
        <Card
            title="Informations météorologiques supplémentaires"
            childrenClassName="flex flex-col gap-8"
        >
            {rows.map(({ label, value, Icon }) => (
                <div className="flex justify-between" key={value}>
                    <div className="flex gap-4">
                        <span className="text-gray-500">{label}</span>
                        <Icon className="size-8 invert" />
                    </div>
                    <span>
                        <FormatComponent
                            value={value}
                            number={data.current[value]}
                        />
                    </span>
                </div>
            ))}
        </Card>
    );
}

function FormatComponent({ value, number }: { value: string; number: number }) {
    if (value === "sunrise" || value === "sunset")
        return new Date(number * 1000).toLocaleTimeString(undefined, {
            hour: "2-digit",
            minute: "2-digit",
        });

    if (value === "wind_deg")
        return (
            <UpArrow
                className="size-8 invert"
                style={{ transform: `rotate(${number}deg)` }}
            />
        );

    return number;
}

const rows = [
    {
        label: "Nébulosité (%)",
        value: "clouds",
        Icon: Cloud,
    },
    {
        label: "Indice UV",
        value: "uvi",
        Icon: UV,
    },
    {
        label: "Direction du vent",
        value: "wind_deg",
        Icon: Wind,
    },
    {
        label: "Pression atmosphérique",
        value: "pressure",
        Icon: Pressure,
    },
    {
        label: "Lever du soleil",
        value: "sunrise",
        Icon: Sunrise,
    },
    {
        label: "Coucher du soleil",
        value: "sunset",
        Icon: Sunset,
    },
] as const;

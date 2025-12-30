import { useSuspenseQuery } from "@tanstack/react-query";
import Card from "./Card";
import { getWeather } from "../../api";

type Props = {};

export default function AdditionalInfo({}: Props) {
    const { data } = useSuspenseQuery({
        queryKey: ["weather"],
        queryFn: () => getWeather({ lat: 48.1436, lon: 0.1622 }),
    });

    if (!data) return null;
    return (
        <Card
            title="Informations météorologiques supplémentaires"
            childrenClassName="flex flex-col gap-8"
        >
            {rows.map(({ label, value }) => (
                <div className="flex justify-between" key={value}>
                    <span className="text-gray-500">{label}</span>
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
    if (value === "sunrise" || value === "sunset") {
        return new Date(number * 1000).toLocaleTimeString(undefined, {
            hour: "2-digit",
            minute: "2-digit",
        });
    }
    return number;
}

const rows = [
    {
        label: "Nébulosité (%)",
        value: "clouds",
    },
    {
        label: "Indice UV",
        value: "uvi",
    },
    {
        label: "Direction du vent",
        value: "wind_deg",
    },
    {
        label: "Pression atmosphérique",
        value: "pressure",
    },
    {
        label: "Lever du soleil",
        value: "sunrise",
    },
    {
        label: "Coucher du soleil",
        value: "sunset",
    },
] as const;

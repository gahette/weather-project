import type { Dispatch, SetStateAction } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";

type Props = {
    location: string;
    setLocation: Dispatch<SetStateAction<string>>;
};

export default function LocationDropdown({ location, setLocation }: Props) {
    return (
        <Select value={location} onValueChange={(value) => setLocation(value)}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent className="z-1001">
                {locations.map((city) => (
                    <SelectItem key={city} value={city}>
                        {city}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}

const locations = [
    "Bangkok",
    "Beijing",
    "Bogota",
    "Brasilia",
    "Buenos Aires",
    "Cairo",
    "Cape Town",
    "Chicago",
    "Dallas",
    "Denver",
    "Guangzhou",
    "Hong Kong",
    "Istanbul",
    "Jakarta",
    "Johannesburg",
    "Kuala Lumpur",
    "Lima",
    "London",
    "Los Angeles",
    "Madrid",
    "Melbourne",
    "Mexico City",
    "Miami",
    "Moscow",
    "Mumbai",
    "New York",
    "Osaka",
    "Paris",
    "Perth",
    "Rio de Janeiro",
    "Rome",
    "São Paulo",
    "Seoul",
    "Sydney",
    "Taipei",
    "Tokyo",
    "Toronto",
    "Vancouver",
    "Washington",
    "Wellington",
    "Zurich",
] as const;

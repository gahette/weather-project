import CurrentWeather from "./components/cards/CurrentWeather";
import DailyForecast from "./components/cards/DailyForecast";
import HourlyForecast from "./components/cards/HourlyForecast";
import AdditionalInfo from "./components/cards/AdditionalInfo";
import Map from "./components/Map";
import { useState } from "react";
import type { Coords } from "./types";

function App() {
    const [coords, setCoords] = useState<Coords>({ lat: 48.1436, lon: 0.1622 });

    const onMapClick = (lat: number, lon: number) => {
        setCoords({ lat, lon });
    };
    return (
        <div className="flex flex-col gap-8">
            <Map coords={coords} onMapClick={onMapClick} />
            <CurrentWeather coords={coords} />
            <HourlyForecast coords={coords} />
            <DailyForecast coords={coords} />
            <AdditionalInfo coords={coords} />
        </div>
    );
}

export default App;

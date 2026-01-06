import CurrentWeather from "./components/cards/CurrentWeather";
import DailyForecast from "./components/cards/DailyForecast";
import HourlyForecast from "./components/cards/HourlyForecast";
import AdditionalInfo from "./components/cards/AdditionalInfo";
import Map from "./components/Map";
import { Suspense, useState } from "react";
import type { Coords } from "./types";
import LocationDropdown from "./components/dropdowns/LocationDropdown";
import { useQuery } from "@tanstack/react-query";
import { getGeocode } from "./api";
import MapTypeDropdown from "./components/dropdowns/MapTypeDropdown";
import MapLegend from "./components/MapLegend";
import CurrentSkeleton from "./components/skeletons/CurrentSkeleton";
import DailySkeleton from "./components/skeletons/DailySkeleton";
import HourlySkeleton from "./components/skeletons/HourlySkeleton";
import AdditionalInfoSkeleton from "./components/skeletons/AdditionalInfoSkeleton";

function App() {
    const [coordinates, setCoords] = useState<Coords>({
        lat: 48.1436,
        lon: 0.1622,
    });
    const [location, setLocation] = useState("Paris");
    const [mapType, setMapType] = useState("clouds_new");

    const { data: geocodeData } = useQuery({
        queryKey: ["geocode", location],
        queryFn: () => getGeocode(location),
    });

    const onMapClick = (lat: number, lon: number) => {
        setCoords({ lat, lon });
        setLocation("custom");
    };

    const coords =
        location === "custom"
            ? coordinates
            : {
                  lat: geocodeData?.[0].lat ?? coordinates.lat,
                  lon: geocodeData?.[0].lon ?? coordinates.lon,
              };

    return (
        <div className="flex flex-col gap-8">
            <div className="flex gap-8">
                <div className="flex gap-4">
                    <h1 className="text-2xl font-semibold">Location: </h1>
                    <LocationDropdown
                        location={location}
                        setLocation={setLocation}
                    />
                </div>
                <div className="flex gap-4">
                    <h1 className="text-2xl font-semibold">Map Type: </h1>
                    <MapTypeDropdown
                        mapType={mapType}
                        setMapType={setMapType}
                    />
                </div>
            </div>
            <div className="relative">
                <Map
                    coords={coords}
                    onMapClick={onMapClick}
                    mapType={mapType}
                />
                <MapLegend mapType={mapType} />
            </div>
            <Suspense fallback={<CurrentSkeleton />}>
                <CurrentWeather coords={coords} />
            </Suspense>
            <Suspense fallback={<HourlySkeleton />}>
                <HourlyForecast coords={coords} />
            </Suspense>
            <Suspense fallback={<DailySkeleton />}>
                <DailyForecast coords={coords} />
            </Suspense>
            <Suspense fallback={<AdditionalInfoSkeleton />}>
                <AdditionalInfo coords={coords} />
            </Suspense>
        </div>
    );
}

export default App;

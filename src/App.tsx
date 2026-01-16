import CurrentWeather from './components/cards/CurrentWeather';
import DailyForecast from './components/cards/DailyForecast';
import HourlyForecast from './components/cards/HourlyForecast';
import AdditionalInfo from './components/cards/AdditionalInfo';
import Map from './components/Map';
import { Suspense, useState } from 'react';
import type { Coords } from './types';
import LocationDropdown from './components/dropdowns/LocationDropdown';
import { useQuery } from '@tanstack/react-query';
import { getGeocode } from './api';
import MapTypeDropdown from './components/dropdowns/MapTypeDropdown';
import MapLegend from './components/MapLegend';
import CurrentSkeleton from './components/skeletons/CurrentSkeleton';
import DailySkeleton from './components/skeletons/DailySkeleton';
import HourlySkeleton from './components/skeletons/HourlySkeleton';
import AdditionalInfoSkeleton from './components/skeletons/AdditionalInfoSkeleton';
import SidePanel from './components/SidePanel';
import Hamburger from '/src/assets/hamburger.svg?react';
import MobileHeader from './components/MobileHeader';

function App() {
    const [coordinates, setCoords] = useState<Coords>({
        lat: 48.1436,
        lon: 0.1622,
    });
    const [location, setLocation] = useState('Paris');
    const [mapType, setMapType] = useState('clouds_new');
    const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);

    const { data: geocodeData } = useQuery({
        queryKey: ['geocode', location],
        queryFn: () => getGeocode(location),
    });

    const onMapClick = (lat: number, lon: number) => {
        setCoords({ lat, lon });
        setLocation('custom');
    };

    const coords =
        location === 'custom'
            ? coordinates
            : {
                  lat: geocodeData?.[0].lat ?? coordinates.lat,
                  lon: geocodeData?.[0].lon ?? coordinates.lon,
              };

    return (
        <>
            <MobileHeader setIsSidePanelOpen={setIsSidePanelOpen} />
            <div className="xs:pt-8 flex flex-col gap-8 p-8 pt-4 lg:w-[calc(100dvw-var(--sidebar-width))] 2xl:h-screen 2xl:min-h-280">
                <div className="xs:flex-row xs:gap-8 flex flex-col gap-4">
                    <div className="flex flex-col gap-8 md:flex-row md:gap-4">
                        <h1 className="text-2xl font-semibold">Location: </h1>
                        <LocationDropdown
                            location={location}
                            setLocation={setLocation}
                        />
                    </div>
                    <div className="flex flex-col gap-8 md:flex-row md:gap-4">
                        <h1 className="text-2xl font-semibold">Map Type: </h1>
                        <MapTypeDropdown
                            mapType={mapType}
                            setMapType={setMapType}
                        />
                    </div>

                    <button
                        onClick={() => setIsSidePanelOpen(true)}
                        className="xs:block hidden"
                    >
                        <Hamburger className="ml-auto size-8 invert lg:hidden" />
                    </button>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:min-h-0 2xl:flex-1 2xl:grid-cols-4 2xl:grid-rows-4">
                    <div className="relative order-1 col-span-1 h-120 md:col-span-2 2xl:col-span-4 2xl:row-span-2 2xl:h-auto">
                        <Map
                            coords={coords}
                            onMapClick={onMapClick}
                            mapType={mapType}
                        />
                        <MapLegend mapType={mapType} />
                    </div>
                    <div className="order-2 col-span-1 2xl:row-span-2">
                        <Suspense fallback={<CurrentSkeleton />}>
                            <CurrentWeather coords={coords} />
                        </Suspense>
                    </div>
                    <div className="order-3 col-span-1 2xl:order-4 2xl:row-span-2">
                        <Suspense fallback={<DailySkeleton />}>
                            <DailyForecast coords={coords} />
                        </Suspense>
                    </div>
                    <div className="order-4 col-span-1 md:col-span-2 2xl:order-3 2xl:row-span-1">
                        <Suspense fallback={<HourlySkeleton />}>
                            <HourlyForecast coords={coords} />
                        </Suspense>
                    </div>
                    <div className="order-5 col-span-1 md:col-span-2 2xl:row-span-1">
                        <Suspense fallback={<AdditionalInfoSkeleton />}>
                            <AdditionalInfo coords={coords} />
                        </Suspense>
                    </div>
                </div>
            </div>
            <SidePanel
                coords={coords}
                isSidePanelOpen={isSidePanelOpen}
                setIsSidePanelOpen={setIsSidePanelOpen}
            />
        </>
    );
}

export default App;

type Props = {
    mapType: string;
};

export default function MapLegend({ mapType }: Props) {
    const data = mapTypeData[mapType];

    const maxValue = data.stops[data.stops.length - 1].value;

    const gradientStops = data.stops
        .map((stop) => `${stop.color} ${(stop.value / maxValue) * 100}%`)
        .join(', ');

    return (
        <div className="xs:w-96 border-accent/70 bg-background/50 absolute top-4 right-4 z-1000 flex w-48 flex-col gap-4 rounded-xl border p-4 shadow-lg">
            <h3 className="text-foreground text-sm font-semibold">
                {data.label}
            </h3>
            <div
                style={{
                    background: `linear-gradient(to right, ${gradientStops})`,
                }}
                className="border-accent/70 h-6 w-full rounded-xl border"
            />
            <div className="text-foreground/70 flex justify-between text-xs">
                <span>
                    {data.stops[0].value} {data.unit}
                </span>
                <span>
                    {data.stops[data.stops.length - 1].value} {data.unit}
                </span>
            </div>
        </div>
    );
}

type ColorStop = {
    value: number;
    color: string;
};

type MapTypeDefinition = {
    id: string;
    label: string;
    unit: string;
    openWeatherLayer: string;
    opacity?: number;
    stops: ColorStop[];
};

type MapTypeData = Record<string, MapTypeDefinition>;

const mapTypeData: MapTypeData = {
    precipitation_new: {
        id: 'rain',
        label: 'Classic rain',
        unit: 'mm',
        openWeatherLayer: 'precipitation_new',
        opacity: 0.6,
        stops: [
            { value: 0, color: 'rgba(225, 200, 100, 0)' },
            { value: 0.1, color: 'rgba(200, 150, 150, 0)' },
            { value: 0.2, color: 'rgba(150, 150, 170, 0)' },
            { value: 0.5, color: 'rgba(120, 120, 190, 0)' },
            { value: 1, color: 'rgba(110, 110, 205, 0.3)' },
            { value: 10, color: 'rgba(80, 80, 225, 0.7)' },
            { value: 140, color: 'rgba(20, 20, 255, 0.9)' },
        ],
    },

    snow_new: {
        id: 'snow',
        label: 'Snow',
        unit: 'mm',
        openWeatherLayer: 'snow',
        stops: [
            { value: 0, color: 'transparent' },
            { value: 5, color: '#00d8ff' },
            { value: 10, color: '#00b6ff' },
            { value: 25.076, color: '#9549ff' },
        ],
    },

    clouds_new: {
        id: 'clouds',
        label: 'Classic clouds',
        unit: '%',
        openWeatherLayer: 'clouds_new',
        stops: [
            { value: -65, color: 'rgba(130, 22, 146, 1)' },
            { value: -55, color: 'rgba(130, 22, 146, 1)' },
            { value: -45, color: 'rgba(130, 22, 146, 1)' },
            { value: -40, color: 'rgba(130, 22, 146, 1)' },
            { value: -30, color: 'rgba(130, 87, 219, 1)' },
            { value: -20, color: 'rgba(32, 140, 236, 1)' },
            { value: -10, color: 'rgba(32, 196, 232, 1)' },
            { value: 0, color: 'rgba(35, 221, 221, 1)' },
            { value: 10, color: 'rgba(194, 255, 40, 1)' },
            { value: 20, color: 'rgba(255, 240, 40, 1)' },
            { value: 25, color: 'rgba(255, 194, 40, 1)' },
            { value: 30, color: 'rgba(252, 128, 20, 1)' },
        ],
    },

    temp_new: {
        id: 'temperature',
        label: 'Temperature',
        unit: '°C',
        openWeatherLayer: 'temp_new',
        stops: [
            { value: -65, color: 'rgba(130, 22, 146, 1)' },
            { value: -55, color: 'rgba(130, 22, 146, 1)' },
            { value: -45, color: 'rgba(130, 22, 146, 1)' },
            { value: -40, color: 'rgba(130, 22, 146, 1)' },
            { value: -30, color: 'rgba(130, 87, 219, 1)' },
            { value: -20, color: 'rgba(32, 140, 236, 1)' },
            { value: -10, color: 'rgba(32, 196, 232, 1)' },
            { value: 0, color: 'rgba(35, 221, 221, 1)' },
            { value: 10, color: 'rgba(194, 255, 40, 1)' },
            { value: 20, color: 'rgba(255, 240, 40, 1)' },
            { value: 25, color: 'rgba(255, 194, 40, 1)' },
            { value: 30, color: 'rgba(252, 128, 20, 1)' },
        ],
    },

    pressure_new: {
        id: 'pressure',
        label: 'Pressure',
        unit: 'Pa',
        openWeatherLayer: 'pressure_new',
        stops: [
            { value: 94000, color: 'rgba(0,115,255,1)' },
            { value: 96000, color: 'rgba(0,170,255,1)' },
            { value: 98000, color: 'rgba(75,208,214,1)' },
            { value: 100000, color: 'rgba(141,231,199,1)' },
            { value: 101000, color: 'rgba(176,247,32,1)' },
            { value: 102000, color: 'rgba(240,184,0,1)' },
            { value: 104000, color: 'rgba(251,85,21,1)' },
            { value: 106000, color: 'rgba(243,54,59,1)' },
            { value: 108000, color: 'rgba(198,0,0,1)' },
        ],
    },

    wind_new: {
        id: 'wind',
        label: 'Wind',
        unit: 'm/s',
        openWeatherLayer: 'wind_new',
        stops: [
            { value: 1, color: 'rgba(255,255,255,0)' },
            { value: 5, color: 'rgba(238,206,206,0.4)' },
            { value: 15, color: 'rgba(179,100,188,0.7)' },
            { value: 25, color: 'rgba(63,33,59,0.8)' },
            { value: 50, color: 'rgba(116,76,172,0.9)' },
            { value: 100, color: 'rgba(70,0,175,1)' },
            { value: 200, color: 'rgba(13,17,38,1)' },
        ],
    },
};

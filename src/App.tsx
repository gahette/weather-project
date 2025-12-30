import { useQuery } from "@tanstack/react-query";
import { getWeather } from "./api";
import CurrentWeather from "./components/cards/CurrentWeather";
import DailyForecast from "./components/cards/DailyForecast";
import HourlyForecast from "./components/cards/HourlyForecast";
import AdditionalInfo from "./components/cards/AdditionalInfo";

function App() {
    const { data } = useQuery({
        queryKey: ["weather"],
        queryFn: () => getWeather({ lat: 48.1436, lon: 0.1622 }),
    });

    if (!data) return null;

    return (
        <div className="flex flex-col gap-8">
            <CurrentWeather />
            <HourlyForecast />
            <DailyForecast />
            <AdditionalInfo />
        </div>
    );
}

export default App;

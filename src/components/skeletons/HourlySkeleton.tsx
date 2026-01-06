import Card from "../cards/Card";
import { Skeleton } from "../ui/skeleton";

type Props = {};

export default function HourlySkeleton({}: Props) {
    return (
        <Card
            title="Hourly Forecast (48 Hours)"
            childrenClassName="flex gap-6 overflow-x-scroll"
        >
            {Array.from({ length: 48 }).map((_, index) => (
                <div
                    key={index}
                    className="flex flex-col items-center gap-2 p-2"
                >
                    <Skeleton className="h-6 w-15" />
                    <Skeleton className="size-8 rounded-full" />
                    <Skeleton className="h-6 w-8" />
                </div>
            ))}
        </Card>
    );
}

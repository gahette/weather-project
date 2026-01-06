import Card from "../cards/Card";
import { Skeleton } from "../ui/skeleton";

type Props = {};

export default function CurrentSkeleton({}: Props) {
    return (
        <Card
            title="Current Weather"
            childrenClassName="flex flex-col items-center gap-6"
        >
            <div className="flex flex-col items-center gap-2">
                <Skeleton className="h-15 w-30" />
                <Skeleton className="rouded-full size-14" />
                <Skeleton className="h-7 w-36" />
            </div>
            <div className="flex flex-col gap-2">
                <p className="text-center text-xl">Heure Local:</p>
                <Skeleton className="h-10 w-36" />
            </div>
            <div className="flex w-full justify-between">
                <div className="flex flex-col items-center gap-2">
                    <p className="text-gray-500">Ressenti</p>
                    <Skeleton className="h-6 w-16" />
                </div>

                <div className="flex flex-col items-center gap-2">
                    <p className="text-gray-500">Humidité</p>
                    <Skeleton className="h-6 w-16" />
                </div>

                <div className="flex flex-col items-center gap-2">
                    <p className="text-gray-500">Vent</p>
                    <Skeleton className="h-6 w-16" />
                </div>
            </div>
        </Card>
    );
}

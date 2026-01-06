import Card from "../cards/Card";
import { Skeleton } from "../ui/skeleton";

type Props = {};

export default function AdditionalInfoSkeleton({}: Props) {
    return (
        <Card
            title="Informations météorologiques supplémentaires"
            childrenClassName="flex flex-col gap-8"
        >
            {Array.from({ length: 6 }).map((_, index) => (
                <div className="flex justify-between" key={index}>
                    <div className="flex gap-4">
                        <Skeleton className="h-8 w-20" />
                        <Skeleton className="size-8 rounded-full" />
                    </div>
                    <Skeleton className="size-8" />
                </div>
            ))}
        </Card>
    );
}

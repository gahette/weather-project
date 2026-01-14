import Card from '../cards/Card';
import { Skeleton } from '../ui/skeleton';

type Props = {};

export default function SideCardSkeleton({}: Props) {
    return (
        <Card
            childrenClassName="flex flex-col gap-3"
            className="from-sidebar-accent to-sidebar-accent/60 gap-0! overflow-y-scroll transition-transform duration-300 hover:scale-105"
        >
            <div className="flex justify-between">
                <Skeleton className="h-7 w-12 bg-sidebar" />
                <Skeleton className="h-7 w-12 bg-sidebar" />
            </div>
            <Skeleton className="h-1.5 w-full bg-sidebar" />
            <div className="flex justify-between text-xs">
                <Skeleton className="h-4 w-2 bg-sidebar" />
                <Skeleton className="h-4 w-2 bg-sidebar" />
            </div>
            <div className="flex justify-between">
                {Array.from({ length: 5 }).map((_, index) => (
                    <Skeleton key={index} className="h-6 w-15 bg-sidebar" />
                ))}
            </div>
        </Card>
    );
}

import { type ReactNode } from "react";

type Props = {
    children: ReactNode;
    title: string;
    childrenClassName?: string;
};

export default function Card({ children, title, childrenClassName }: Props) {
    return (
        <div className="flex flex-col gap-4 rounded-xl bg-zinc-900 p-4 shadow-md">
            <h2 className="text-2xl font-semibold">{title}</h2>
            <div className={childrenClassName}>{children}</div>
        </div>
    );
}

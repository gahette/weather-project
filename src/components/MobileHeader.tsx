import type { SetStateAction } from 'react';
import Hamburger from '/src/assets/hamburger.svg?react';

type Props = {
    setIsSidePanelOpen: React.Dispatch<SetStateAction<boolean>>;
};

export default function MobileHeader({ setIsSidePanelOpen }: Props) {
    return (
        <div className="bg-background xs:hidden sticky top-0 z-1001 flex h-16 w-full justify-end gap-8 p-4">
            <button onClick={() => setIsSidePanelOpen(true)}>
                <Hamburger className="size-6" />
            </button>
        </div>
    );
}

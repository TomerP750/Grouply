
import { useEffect, useState } from "react";
import { HiOutlineGlobeAlt } from "react-icons/hi";
import { ConnectionMenu } from "../menus/ConnectionsMenu";
import { Badge } from "../../../shared/ui/Badge";
import { useUserSelector } from "../../../shared/store/hooks";

interface ConnectionBadgeProps {
    onOpen: () => void;
    open: boolean
}


export function ConnectionBadge({ onOpen, open }: ConnectionBadgeProps) {

    const [count, setCount] = useState(0);

    return (

        <div className="relative hover:bg-gray-500/20">
            <button onClick={onOpen}>
                <Badge Icon={HiOutlineGlobeAlt} size={28} count={count} className="cursor-pointer p-3" />
            </button>

            {open && <ConnectionMenu />}

        </div>

    );
}
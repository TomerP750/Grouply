
import { useEffect, useState } from "react";
import { useUser, useUserSelector } from "../../../redux/hooks";
import { HiOutlineGlobeAlt } from "react-icons/hi";
import { Badge } from "../../elements/Badge";
import { ConnectionMenu } from "./menus/connections_menu";

interface ConnectionBadgeProps {
    onOpen: () => void;
    open: boolean
}


export function ConnectionBadge({ onOpen, open }: ConnectionBadgeProps) {

    const [count, setCount] = useState(0);

    //   useEffect(() => {
    //     const eventSource = new EventSource("http://localhost:8080/api/notifications/stream");

    //     eventSource.addEventListener("message", (event) => {
    //       console.log("New message:", event.data);
    //       setCount(prev => prev + 1);
    //     });

    //     return () => eventSource.close();
    //   }, []);

    const user = useUserSelector(state => state.authSlice.user);

    useEffect(() => {

        if (user) {

            console.log(count);
            
            const userId = user.id;
            const eventSource = new EventSource(`http://localhost:8080/api/notifications/stream/${userId}`);

            eventSource.addEventListener("message", (event) => {
                console.log("New message:", event.data);
                setCount(prev => prev + 1);
            });

            return () => eventSource.close();

        }

    }, []);

    return (

        <div className="relative hover:bg-gray-500/20">
            <button onClick={onOpen}>
                <Badge Icon={HiOutlineGlobeAlt} size={28} count={count} className="cursor-pointer p-3" />
            </button>

            {open && <ConnectionMenu />}

        </div>

    );
}
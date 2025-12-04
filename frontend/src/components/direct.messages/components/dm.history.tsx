import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import directMessageRoomService from "../../../service/direct.message.room.service";
import type { DirectMessageRoomDTO } from "../models/direct.message.room.dto";
import { DirectMessageHistoryHeader } from "./dm.history.header";
import { DmHistoryRow } from "./dm.history.row";


export function DirectMessagesHistory() {

    const [dms, setDms] = useState<DirectMessageRoomDTO[]>([]);
    

    useEffect(() => {
        directMessageRoomService.directMessagesHistory()
            .then(res => {
                setDms(res);
            })
            .catch(err => toast.error(err.response.data))
    }, []);

    return (
        <section className="grid grid-cols-1 px-5 gap-3">

            <DirectMessageHistoryHeader />

            {dms.length > 0 && dms.map(r => {
                return <DmHistoryRow key={r.id} room={r} />
            })}

        </section>
    )
}
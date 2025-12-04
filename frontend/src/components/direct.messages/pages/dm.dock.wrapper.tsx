import { DmProvider } from "../../../context/Dm_context";
import { DirectMessagesDock } from "./dm.dock";

export function DmDockWrapper() {
    return (
        <DmProvider>
            <DirectMessagesDock />
        </DmProvider>
    )
}
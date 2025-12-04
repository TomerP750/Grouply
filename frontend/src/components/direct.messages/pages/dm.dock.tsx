import { DmProvider, useDm } from "../../../context/Dm_context";
import { Panel } from "../../layout/message-box/panel";
import { DirectMessageConversation } from "../components/dm.conversation";
import { DirectMessagesHistory } from "../components/dm.history";
import { MessageButton } from "../components/dm.message.button";




export function DirectMessagesDock() {

    const { state, openHistory, closeDock } = useDm();

    if (state === "button") {
        return (
            <div className="text-black dark:text-white fixed bottom-5 right-5 z-50">
                <MessageButton onOpen={openHistory} />
            </div>
        );
    }

    function getPanel() {
        
        switch (state) {
            
            case "history":
                return (
                    <Panel onClose={closeDock} title="Messages">
                        <DirectMessagesHistory />
                    </Panel>
                );

            case "conversation":
                return (
                    <Panel onClose={closeDock} title="Messages">
                        <DirectMessageConversation />
                    </Panel>
                );

            case "button":

            default:
                return <MessageButton onOpen={openHistory} />;
        }

    }

    return (

        <div className="text-black dark:text-white fixed bottom-5 right-5 z-50">
            {getPanel()}
        </div>

    );
}
import { BiMailSend } from "react-icons/bi";


export function DirectMessageHistoryHeader() {


    const handleCreateChatRoom = () => {

    }

    return (
        <section className="flex items-center justify-between  gap-3 py-3">

            <input type="text" className="border border-white w-full px-2 py-1 focus:outline-none rounded-xl focus:border-teal-500"/>
            <button className="cursor-pointer"><BiMailSend size={25}/></button>

        </section>
    )
}
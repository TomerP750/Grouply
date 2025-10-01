import { useState } from "react";
import { BiChat } from "react-icons/bi";
import { Badge } from "../../elements/Badge";


export function MessageBox() {

    const [open, setOpen] = useState<boolean>(false);

    return (
        <div className="hidden md:flex justify-center items-center w-15 
        aspect-square rounded-full bg-gradient-to-r from-teal-600 to-teal-800 
        fixed bottom-5 right-5 cursor-pointer text-white
        hover:scale-110 duration-200
        ">
            <Badge Icon={BiChat} size={30} count={5}/>
        </div>
    )
}
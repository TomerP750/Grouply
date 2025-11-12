import { FaLinkedin, FaGithub, FaLink } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import type { ProfileDTO } from "../../../dtos/models_dtos/profile_dto";


const linkStyle = "border px-3 w-1/2 py-2 inline-flex justify-center gap-2 items-center hover:bg-black dark:hover:text-black dark:hover:bg-white hover:text-white transition-colors duration-200"

interface ProfileSocialsProps {
    profile: ProfileDTO
}

export function ProfileSocials() {
    return (
        <section className="w-80 aspect-square mt-30 flex flex-col items-center text-sm gap-3">
        
                  <button className="font-medium mb-3 cursor-pointer">2 Connections</button>
        
                  {<NavLink to={"/"} className={`${linkStyle}`}>
                    <FaLinkedin size={22} />
                    <span>LinkedIn</span>
                  </NavLink>}
        
                  {<NavLink to={"/"} className={`${linkStyle}`}>
                    <FaGithub size={22} />
                    <span>GitHub</span>
                  </NavLink>}
        
                  {<NavLink to={"/"} className={`${linkStyle}`}>
                    <FaLink size={22} />
                    <span>Portfolio</span>
                  </NavLink>}
        
                </section>
    )
}
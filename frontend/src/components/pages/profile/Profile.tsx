import { useParams } from "react-router-dom"
import profileService from "../../../service/ProfileService";
import { useState } from "react";



export function Profile() {

    const params = useParams();
    const id = +params.id!;

    // const [profile, setProfile] = useState();

    // const getOneProfile = () => {
    //     profileService.getOneProfile(id)
    //     .then()
    //     .catch()
    // }

    return (
        <div>

        </div>
    )
}
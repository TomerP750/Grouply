import { useParams } from "react-router-dom"
import profileService from "../../../service/ProfileService";
import { useEffect, useState } from "react";
import type { ProfileDTO } from "../../../dtos/models_dtos/ProfileDTO";
import { Avatar } from "../../elements/Avatar";
import defaultBanner from "../../../assets/defaultProfileBanner.jpg";
import { ProfileBanner } from "./profile_banner";
import { useUser, useUserSelector } from "../../../redux/hooks";
import { Navbar } from "../../layout/navbar/Navbar";



export function ProfilePage() {

    const params = useParams();
    const id = +params.id!;

    const [profile, setProfile] = useState<ProfileDTO>();

    const user = useUser();

    useEffect(() => {
        profileService.getOneProfile(id)
            .then(res => {
                setProfile(res);
            })
            .catch(err => {
                console.log(err);
            })

    }, []);



    return (
        <div className="flex flex-col items-center min-h-screen bg-slate-900 text-white">
            <Navbar/>
            <div className="flex flex-col items-center w-4/5">
                {/* Banner */}
                {profile && <ProfileBanner avatarSize={200} user={profile.user} />}


                <div className="flex justify-end w-full p-6">
                    {user.id === profile?.user.id
                        && <button className="cursor-pointer bg-slate-700 font-medium hover:bg-blue-500 rounded-full px-3 py-1">Edit Profile</button>
                    }
                </div>


            </div>




        </div>
    )
}
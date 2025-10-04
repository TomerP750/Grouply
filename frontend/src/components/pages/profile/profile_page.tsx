import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { ProfileDTO } from "../../../dtos/models_dtos/ProfileDTO";
import { useUser } from "../../../redux/hooks";
import profileService from "../../../service/ProfileService";
import { Navbar } from "../../layout/navbar/Navbar";
import { ProfileBanner } from "./profile_banner";



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
            <Navbar />
            <div className="flex flex-col items-center w-4/5">
                {/* Banner */}
                {profile && <ProfileBanner user={profile.user} />}


                <div className="flex justify-between w-full p-6">
                    
                    <section className="flex justify-center gap-5">
                        <button className="border px-2 py-1 rounded-lg cursor-pointer">Add Friend</button>
                        <button className="border px-2 py-1 rounded-lg cursor-pointer">Invite to project</button>
                    </section>
                    
                    {user.id === profile?.user.id
                        && <button className="cursor-pointer bg-slate-700 font-medium hover:bg-blue-500 rounded-full px-3 py-1">Edit Profile</button>
                    }

                    
                </div>



                <section className="mt-10">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis accusantium optio error voluptates, cum autem quibusdam ut molestiae sunt minus ratione itaque unde cupiditate dolores enim obcaecati veritatis, commodi ex.</p>
                </section>
            </div>




        </div>
    )
}
import axios from "axios";
import { BASE_API } from "../../../shared/api/baseApi";
import type { EditProfileRequestDTO } from "../components/edit_profile_modal";



class ProfileService {

    async getOneProfile(userId: number) {
        return (await axios.get(`${BASE_API}/profile/${userId}`)).data
    }

    async updateProfile(data: EditProfileRequestDTO) {
        return (await axios.put(`${BASE_API}/profile/update`, data))
    }

}

const profileService = new ProfileService();
export default profileService;
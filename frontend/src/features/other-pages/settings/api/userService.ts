import axios from "axios";
import { BASE_API } from "../../../../shared/api/baseApi";
import type { UpdateUserDTO } from "../models/UpdateUserDto";
import type { ChangePasswordDTO } from "../pages/SecuritySettings";
import type { DeleteUserRequestDTO } from "../pages/user_settings/DeleteAccount";



class UserService {

    async searchUsers(query: string) {
        return (await axios.get(`${BASE_API}/user/search`, {
            params: { query, page: 0, size: 10 }
        })).data
    }

    async getAllUsers(page: number, size: number) {
        return (await axios.get(`${BASE_API}/user/all?page=${page}&size=${size}`)).data
    }

    async getOneUser(id: number) {
        return (await axios.get(`${BASE_API}/user/${id}`)).data
    }

    async updateUser(data: UpdateUserDTO) {
        return (await axios.put(`${BASE_API}/user/update`, data))
    }

    async deleteUser(data: DeleteUserRequestDTO) {
        return (await axios.delete(`${BASE_API}/user/delete`, {
            data
        }))
    }

    async checkUsernameAvailability(username: string) {
        return (await axios.get(`${BASE_API}/user/available/${username}`)).data
    }

    async isAdmin() {
        return (await axios.get(`${BASE_API}/user/admin`)).data
    }

    async changePassword(data: ChangePasswordDTO) {
        return (await axios.patch(`${BASE_API}/user/change`, data))
    }

    
}

const userService = new UserService();
export default userService;
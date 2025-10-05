import axios from "axios";
import { BASE_API } from "../util/base_api";
import type { UpdateUserDTO } from "../dtos/models_dtos/request_dto/update_user_dto";


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

    async isAdmin() {
        return (await axios.get(`${BASE_API}/user/admin`)).data
    }
}

const userService = new UserService();
export default userService;
import axios from "axios";
import { BASE_API } from "../util/base_api";


class UserService {

    async getAllUsers(page: number, size: number) {
        return (await axios.get(`${BASE_API}/user/all?page=${page}&size=${size}`)).data
    }

    async getOneUser(id: number) {
        return (await axios.get(`${BASE_API}/user/${id}`)).data
    }

    async isAdmin() {
        return (await axios.get(`${BASE_API}/user/admin`)).data
    }
}

const userService = new UserService();
export default userService;
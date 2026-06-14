import axios from "axios";
import type { LoginRequestDTO } from "../models/LoginRequestDto";
import type { SignUpRequestDTO } from "../models/SignUpRequestDto";
import { BASE_API } from "../../../shared/api/baseApi";




class AuthService {

    async signup(data: SignUpRequestDTO) {
        return (await axios.post(`${BASE_API}/auth/signup`, data)).data;
    };

    async login(data: LoginRequestDTO) {
        return (await axios.post(`${BASE_API}/auth/login`, data)).data; 
    };
    
}

const authService = new AuthService();
export default authService;
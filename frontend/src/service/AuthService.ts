import axios from "axios";
import type { LoginRequestDTO } from "../components/pages/authentication/Login";
import type { SignUpRequestDTO } from "../components/pages/authentication/signup-wizard/Dtos/SignUpRequestDTO";

const BASE_API = "http://localhost:8080/api/auth";

class AuthService {

    async signup(data: SignUpRequestDTO) {
        return (await axios.post(`${BASE_API}/signup`, data)).data;
    };

    async login(data: LoginRequestDTO) {
        return (await axios.post(`${BASE_API}/login`, data)).data; 
    };

}

const authService = new AuthService();
export default authService;
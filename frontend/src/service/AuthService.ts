import axios from "axios";

import type { SignUpRequestDTO } from "../components/pages/authentication/signup-wizard/Dtos/SignUpRequestDTO";
import type { LoginRequestDTO } from "../components/pages/authentication/user_auth/Login";
import type { RecruiterSignUpRequestDTO } from "../components/pages/authentication/recruiter-auth/recruiter_signup";

const BASE_API = "http://localhost:8080/api/auth";

class AuthService {

    async signup(data: SignUpRequestDTO) {
        return (await axios.post(`${BASE_API}/signup`, data)).data;
    };

    async login(data: LoginRequestDTO) {
        return (await axios.post(`${BASE_API}/login`, data)).data; 
    };

    async recruiterSignUp(data: RecruiterSignUpRequestDTO) {
        
    }

    async recruiterLogin() {

    }

}

const authService = new AuthService();
export default authService;
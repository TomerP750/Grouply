import axios from "axios";

import type { SignUpRequestDTO } from "../components/pages/authentication/signup-wizard/Dtos/SignUpRequestDTO";

import type { RecruiterSignUpRequestDTO } from "../components/pages/authentication/recruiter-auth/recruiter_signup";
import type { RecruiterLoginRequestDTO } from "../components/pages/authentication/recruiter-auth/recruiter_login";
import type { LoginRequestDTO } from "../components/pages/authentication/user_auth/Login";

const BASE_API = "http://localhost:8080/api/auth";

class AuthService {

    async signup(data: SignUpRequestDTO) {
        return (await axios.post(`${BASE_API}/signup`, data)).data;
    };

    async login(data: LoginRequestDTO) {
        return (await axios.post(`${BASE_API}/login`, data)).data; 
    };

    async recruiterSignUp(data: RecruiterSignUpRequestDTO) {
        return (await axios.post(`${BASE_API}/recruiter/signup`, data)).data
    }

    async recruiterLogin(data: RecruiterLoginRequestDTO) {
        return (await axios.post(`${BASE_API}/recruiter/login`, data)).data
    }

}

const authService = new AuthService();
export default authService;
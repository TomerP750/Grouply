import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { Role } from "../dtos/enums/Role"
import { jwtDecode } from "jwt-decode"

export type JwtUser = {
    id?: number // legacy
    sub: number
    email: string
    firstName: string
    lastName: string
    username: string
    role: Role
    avatar: string
}


type AuthState = {
    user: JwtUser | null;
}

const token = localStorage.getItem("token");

const initState: AuthState = {
    user: token ? jwtDecode<JwtUser>(token) : null,
}


export const authSlice = createSlice({
    name: "auth",
    initialState: initState,
    reducers: {
        login(state: AuthState, action: PayloadAction<string>) {
            const decodedToken: JwtUser = jwtDecode(action.payload);
            state.user = decodedToken;
        },
        logout(state: AuthState) {
            state.user = null;
            localStorage.removeItem("token");
        }
    }

})


export const { login, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;

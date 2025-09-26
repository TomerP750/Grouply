import { type TypedUseSelectorHook, useSelector } from "react-redux";
import type { JwtUser } from "./AuthSlice";
import type { RootState } from "./store";

export const useUserSelector: TypedUseSelectorHook<RootState> = useSelector;

export function useUser(): JwtUser {

    const user = useUserSelector(state => state.authSlice.user);
    
    if (!user) {
        throw new Error("No user found.");
    }

    return user;
}
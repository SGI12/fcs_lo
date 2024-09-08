import {authData} from "@/types/user";
import axios from "axios";
import { authRoute, headers} from "@/app/http";


export const getUserAuth = (data: authData) => {
    return axios.post(`${authRoute}/login`, data, {headers});
}

export const checkAuth = () => {
    return axios.get(`${authRoute}/isAuth`, {headers})
}

export const logout = () => {
    return axios.get(`${authRoute}/logout`, {headers})
}
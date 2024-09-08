import axios from "axios";
import {headers, userRoute} from "@/app/http";

export const fetchUser = () => {
   return axios.get(`${userRoute}/fetchUser`, {headers})
}
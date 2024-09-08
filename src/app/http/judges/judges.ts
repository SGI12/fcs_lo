import axios from "axios";
import {headers, judgesRoute} from "@/app/http";

export const fetchAllJudges = () => {
    return axios.get(`${judgesRoute}/fetchAllJudges`, {headers});
}
import http, {API_URL} from "../../services/http";
import {toast} from "react-toastify";
import AppStorage from "../../services/storage";

export const VSP_TOKEN = "vsp-token";
export const login = async (email, password) => {
    try {
        const {data} = await http.post(`${API_URL}auth/login`, {email, password});
        const {token, msg} = data;
        toast.success(msg);
        console.log("Token", token);
        AppStorage.sessionStore(VSP_TOKEN, token);
        while (AppStorage.sessionGet(VSP_TOKEN) !== token) {
            console.log("======Logging in======")
        }
        if (token) {
            window.location.reload()
        }
    } catch (e) {
        toast.error("Username or password incorrect")
    }
}

import axios from "axios";
import logger from "./logService";
import {toast} from "react-toastify";
import _ from "lodash";
import AppStorage from "./storage";
import {VSP_TOKEN} from "../features/auth/authAPI";

export const API_URL = process.env.REACT_APP_API || ""

axios.interceptors.response.use(null, error => {
    const expectedError =
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500;

    if (!expectedError) {
        logger.log(error);
        console.error("An unexpected error occurred.");
    } else {
        let data = error.response.data;
        if (data.err || data.error) {
            toast.error(_.capitalize(data.err || data.error));
        }
    }

    return Promise.reject(error);
});

axios.interceptors.request.use((config) => {
    let token = AppStorage.sessionGet(VSP_TOKEN);
    if (token)
        config.headers['x-token'] = token;
    return config;
})

function setJwt(jwt) {
    axios.defaults.headers.common["x-auth-token"] = jwt;
}

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
    API_URL
};
import axios from 'axios';
import { logout, setIsAuthenticated, loginSuccess } from '../redux/features/auth';
import store from '../redux/store/store'; 
import toast from 'react-hot-toast';

export const API_BASE_URL = "http://localhost:9000/";

export const API_CONFIG = {
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
};

export const api = axios.create(API_CONFIG);

export const INTERNAL_SERVER_ERROR = "Internal server error!"
api.interceptors.response.use(
    response => response,
    async (error) => {

        const dispatch = store.dispatch; 
        if (error?.response?.status === 403) { // Token expired
            console.log(">>> intercepter: Token expired or not found")
            dispatch(setIsAuthenticated({ isAuthenticated: false }));
            await refreshAccessToken(); // Attempt token refresh
            const authState = store.getState().auth;
            console.log(">>>> refresh token finished: ", authState)
            if (authState.isAuthenticated) {
                error.config.headers['Authorization'] = `Bearer ${authState.token}`;
                return axios(error.config); // Retry the request
            } else {
                toast.error(INTERNAL_SERVER_ERROR)
                console.log("Not authenticated. error while getting access token via refresh token....")
            }
            return
        }
        return Promise.reject(error);
    }
);

export const refreshAccessToken = async () => {
    const dispatch = store.dispatch;
    try {
        console.log(">>>> Requesting refresh token")
        const response = await api.post(`auth/refresh_token`, {}, { withCredentials: true }); // Send refresh token via cookie
        if (response.data.success) {
            const userData = {
                username: response.data.data.object.username,
                email: response.data.data.object.email,
                token: response.data.data.object.accessToken,
                currency: response.data.data.object.currency,
                plan: response.data.data.object.plan,
                role: response.data.data.object.role,
            }
            dispatch(loginSuccess(userData))
        }

        console.log(">>> Refresh token pass")
    } catch (error) {
        console.log(">>> Refresh token expired. navigate to login: ", error)
        dispatch(logout());
        window.location.href = '/login'; 
        toast.info("Your session has expired. Please login.")
    }
};




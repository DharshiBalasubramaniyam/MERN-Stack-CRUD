import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess, logout } from '../redux/features/auth';
import { api } from '../config/api.config';

export function AuthService() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    async function register(body) {
        try {
            const response = await api.post(`auth/register`, body, { withCredentials: true });
            console.log(response.data)
            if (response.data.success) {
                const userData = {
                    username: response.data.data.object.username,
                    email: response.data.data.object.email,
                    token: response.data.data.object.accessToken,
                    phone: response.data.data.object.phone,
                    role: response.data.data.object.role,
                }
                dispatch(loginSuccess(userData))
                toast.success("Login successful!");
                navigate(`/`);
            }
        } catch (error) {
            processError(error);
        }
    }

    async function login(body) {
        try {
            const response = await api.post(`auth/login`, body, { withCredentials: true });
            console.log(response.data)
            if (response.data.success) {
                const userData = {
                    username: response.data.data.object.username,
                    email: response.data.data.object.email,
                    token: response.data.data.object.accessToken,
                    phone: response.data.data.object.phone,
                    role: response.data.data.object.role,
                }
                dispatch(loginSuccess(userData))
                toast.success("Login successful!");
                navigate(`/`);
            }
        } catch (error) {
            processError(error)
        }
    }

    async function loginWithGoogle(body) {
        try {
            const response = await api.post(`auth/google`, body, { withCredentials: true });
            console.log(response.data)
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
                toast.success("Login successful!");
                navigate(`/`);
            }
        } catch (error) {
            processError(error)
        }
    }

    const logOut = async () => {
        try {
            const response = await api.post(`auth/logout`, {}, { withCredentials: true });
            dispatch(logout());
        } catch (error) {
            console.log(error)
            dispatch(logout());
        }
    };

    return { register, login, loginWithGoogle, logOut };
}

function processError(error) {
    if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data?.error?.message || error.response.data?.data?.message || "An error occurred while processing your request.";
        toast.error(errorMessage);
    } else {
        toast.error("An unexpected error occurred. Please try again later.");
    }
    console.error("Error details:", error);
}

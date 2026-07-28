import axios from "axios";

const AUTH_BASE_URL = import.meta.env.VITE_AUTH_BASE_URL;
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;

const authClient = axios.create({
    baseURL: AUTH_BASE_URL,
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
});

export const login = async (username, password) => {
    try {
        const params = new URLSearchParams();
        params.append("username", username);
        params.append("password", password);
        params.append("grant_type", "password");
        params.append("client_id", CLIENT_ID);

        const response = await authClient.post('/token/', params);
        return response.data;
    } catch (error) {
        throw new Error("Error en login: " + error.message);
    }
}

export const isLoggedIn = () => {
    const token = localStorage.getItem("token");
    return !!token;
}

export const logout = () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
        const params = new URLSearchParams();
        params.append("token", token);
        params.append("client_id", CLIENT_ID);
        authClient.post('/revoke_token/', params);
    } catch (error) {
        console.error("Error al cerrar sesión:", error);
    }
    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");
}
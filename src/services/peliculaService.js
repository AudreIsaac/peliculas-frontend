import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

//PELÍCULAS 

export const getPeliculaList = async () => {
    try {
        const response = await apiClient.get('/peliculas/');
        return response.data;
    } catch (error) {
        console.error("Error obteniendo lista de películas:", error);
        throw error;
    }
}

export const getPelicula = async (id) => {
    try {
        const response = await apiClient.get(`/peliculas/${id}/`);
        return response.data;
    } catch (error) {
        console.error("Error obteniendo película:", error);
        throw error;
    }
}

export const addPelicula = async (peliculaData) => {
    let posterBase64 = "";
    if (peliculaData.poster instanceof File) {
        posterBase64 = await fileToBase64(peliculaData.poster);
    }
    const payload = { ...peliculaData, poster: posterBase64 || undefined };
    try {
        const response = await apiClient.post('/peliculas/', payload);
        return response.data;
    } catch (error) {
        console.error("Error agregando película:", error);
        throw error;
    }
}

export const updatePelicula = async (id, peliculaData) => {
    let posterBase64;
    if (peliculaData.poster instanceof File) {
        posterBase64 = await fileToBase64(peliculaData.poster);
    }
    const payload = { ...peliculaData };
    if (posterBase64) {
        payload.poster = posterBase64;
    } else {
        delete payload.poster; // no reenviamos el poster si no cambió
    }
    try {
        const response = await apiClient.patch(`/peliculas/${id}/`, payload);
        return response.data;
    } catch (error) {
        console.error("Error actualizando película:", error);
        throw error;
    }
}

export const deletePelicula = async (id) => {
    try {
        await apiClient.delete(`/peliculas/${id}/`);
    } catch (error) {
        console.error("Error eliminando película:", error);
        throw error;
    }
}

//DIRECTORES 

export const getDirectorList = async () => {
    try {
        const response = await apiClient.get('/directores/');
        return response.data;
    } catch (error) {
        console.error("Error obteniendo lista de directores:", error);
        throw error;
    }
}

export const addDirector = async (directorData) => {
    try {
        const response = await apiClient.post('/directores/', directorData);
        return response.data;
    } catch (error) {
        console.error("Error agregando director:", error);
        throw error;
    }
}
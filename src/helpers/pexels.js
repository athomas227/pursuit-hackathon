import axios from "axios";
import { createClient } from "pexels";

const PEXELS_API_KEY = import.meta.env.VITE_PEXELS_API_KEY;

const pexelsClient = createClient(PEXELS_API_KEY);

export const fetchPhotos = async (query) => {
    try {
        const response = await pexelsClient.photos.search({ query });
        console.log(response);
        return response;
    } catch (error) {
        console.error("Error fetching photos:", error);
        throw error;
    }
}

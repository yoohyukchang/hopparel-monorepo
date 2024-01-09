import { DesignWithUserData } from "./types";

const API_URL = import.meta.env.VITE_API_URL;

// API call to find a user by ID

// Fetch all designs created of a given user
export const fetchUserDesigns = async (): Promise<DesignWithUserData[]> => {
    const response = await fetch(`${API_URL}/designs`);
    const responseJson = await response.json();

    if (!response.ok) {
        throw new Error(
            `Error: ${response.status} - ${
                responseJson.message || response.statusText
            }`,
        );
    }

    return responseJson.data;
}

// API call from backend to delete a design by id
export const deleteDesign = async (id: string): Promise<void> => {
    
}

// API call to create a new design

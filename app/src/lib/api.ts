import { getAuthenticatedUser, getAuthenticatedUserToken, removeAuthenticatedUserToken, storeAuthenticatedUserToken } from "./auth";
import { Design, DesignWithUserData, User } from "./types";

const API_URL = import.meta.env.VITE_API_URL;

// handling errors
const handleError = (response: Response, message?: string) => {
    if (response.status === 401) {
      removeAuthenticatedUserToken();
      throw new Error("Your session has expired. Please login again.");
    }
  
    throw new Error(
      `Error: ${response.status} - ${message || response.statusText}`,
    );
};

// Fetch all designs created of a given user
export const fetchUserDesigns = async (): Promise<DesignWithUserData[]> => {
    const token = getAuthenticatedUserToken();

    const response = await fetch(`${API_URL}/designs`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const responseJson = await response.json();

    if (!response.ok) {
        handleError(response, responseJson.message);
    }
    
    return responseJson.data;
}

// Fetch a design with a specific id
export const fetchDesignById = async (id: string): Promise<Design> => {
    const token = getAuthenticatedUserToken();

    const response = await fetch(`${API_URL}/designs/${id}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const responseJson = await response.json();

    if (!response.ok) {
        handleError(response, responseJson.message);
    }

    return responseJson.data;
}

// API call from backend to delete a design by id
export const deleteDesign = async (id: string): Promise<void> => {
    const token = getAuthenticatedUserToken();

    const response = await fetch(`${API_URL}/designs/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const responseJson = await response.json();
    if (!response.ok) {
        handleError(response, responseJson.message);
    }
};

// API call to create a new design
export const createDesign = async(
    productType: string,
    image: string,
): Promise<Design> => {
    const user = getAuthenticatedUser();
    const token = getAuthenticatedUserToken();

    const response = await fetch(`${API_URL}/designs`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productType, image }),
    });

    const responseJson = await response.json();

    if (!response.ok) {
        handleError(response, responseJson.message);
    }

    return {
        ...responseJson.data,
        user: user,
    };
};

// Edit a design
export const editDesign = async (
        id: string, 
        newProductType: string,
        newImage: string,
    ): Promise<void> => {
    const token = getAuthenticatedUserToken();

    const response = await fetch(`${API_URL}/designs/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ 
            productType: newProductType,
            image: newImage,
        }),
    });

    const responseJson = await response.json();

    if (!response.ok) {
        handleError(response, responseJson.message);
    }
}

// Login, store the token, and return the user
export const login = async (
    username: string,
    password: string,
): Promise<User> => {
    const response = await fetch(`${API_URL}/users/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
    });

    const responseJson = await response.json();

    if (!response.ok) {
        if (response.status === 401) {
            removeAuthenticatedUserToken();
            throw new Error(
                `Error: ${response.status} - ${
                    responseJson.message || response.statusText
                }`,
            );
        }
        throw new Error(
            `Error: ${response.status} - ${
            responseJson.message || response.statusText
            }`,
        );
    }

    const { access_token } = responseJson.data;

    if (!access_token) {
        throw new Error("Authentication token is missing from the response!");
    }

    storeAuthenticatedUserToken(access_token);
    const user = getAuthenticatedUser();
    return user;
};

// Logout and clear the token
export const logout = async (): Promise<void> => {
    // You can send a request to the server to perform server-side logout
    // Here we just clear the token
    removeAuthenticatedUserToken();
};

// Register a new user
export const register = async (
    username: string,
    password: string,
): Promise<void> => {
    const response = await fetch(`${API_URL}/users/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
    });
    const responseJson = await response.json();

    if (!response.ok) {
        if (response.status === 409) {
            throw new Error(
                "Username already exists. Please choose a different username.",
            );
        } else {
            handleError(response, responseJson.message);
        }
    }
};

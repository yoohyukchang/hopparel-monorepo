import { jwtDecode } from "jwt-decode";
import { User } from "./types";

// Get the user by decoding the token from local storage
export const getAuthenticatedUser = (): User => {
    const token = localStorage.getItem("token") as string;
    const decodedToken = jwtDecode<User>(token);
    return decodedToken;
};

// Get the token from local storage
export const getAuthenticatedUserToken = (): string | null => {
    return localStorage.getItem("token");
};

// Store the token in local storage
export const storeAuthenticatedUserToken = (token: string): void => {
    localStorage.setItem("token", token);
};

// Remove the token from local storage
export const removeAuthenticatedUserToken = (): void => {
    localStorage.removeItem("token");
};

// Function to check if the token is expired
export const isTokenExpired = (token: string): boolean => {
    try {
    const decodedToken: { exp: number } = jwtDecode(token);
    const currentTimestamp = Date.now() / 1000; // current time in seconds
    return decodedToken.exp < currentTimestamp;
    } catch (error) {
    // If there's an error in decoding, assume the token is invalid/expired
    return true;
    }
};

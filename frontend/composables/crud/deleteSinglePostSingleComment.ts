import { deleteMethod } from "~/services/apiByCRUD";

/**
 * Deletes a specific comment made by the logged-in user.
 *
 * @param {string} userURL - The URL containing the ID of the comment to be deleted.
 * @returns {Promise<true|null>} A promise that resolves to true if the deletion was successful, or null if it failed or the token was missing.
 */
export const deleteSinglePostSingleComment = async (userURL: string): Promise<true | null> => {

    /**
     * Fetches the user authentication token from local storage.
     * 
     * @returns {string|null} The token if available, otherwise null.
     */
    const authStore = useAuthStore()

const token = authStore.retrieveToken()

    // Handle the case where no token is present
    if (token === null) {
        console.log("There was no token");
        return null;
    }

    // Construct the headers for the API request
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
    };

    // Make the delete request
    const response = await deleteMethod(userURL, headers);

    // Check and handle the response status
    if (response?.status === 204) {
        return true;
    } else {
        return null;
    }
}

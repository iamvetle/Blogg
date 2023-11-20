import { deleteMethod } from "~/services/apiByCRUD";
/**
 * Deletes a comment made by the logged in user
 * 
 * @param userURL - The url with the id of the comment that is going to be deleted
 *  
 * @returns - The response (.data, .status)
 */
export const deleteSinglePostSingleComment = async (userURL: string): Promise<true | null> => {

    /**
     * Fetches the token from local storage, or just returns null.
     */
    const token = retrieveToken();

    if (token === null) {
        console.log("There was no token")
        return null
    }
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
    };

    const response = await deleteMethod(userURL, headers)

    if (response?.status === 204) {

        return true

    } else {

        return null
    }
}

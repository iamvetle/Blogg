import { deleteMethod } from '../apiByCRUD';

/**
 * Deletes a post made by the logged in user
 * 
 * @param userURL - The url with the id of the post that is going to be deleted
 *  
 * @returns - The response (.data, .status)
 */
export const deleteLoggedInUserPost = async (userURL: string) => {

    /**
     * Fetches the token from local storage, or just returns null.
     */
    const token = retrieveToken()

    if (token) {
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
        };

        const response = await deleteMethod(userURL, headers)

        if (response) {

            return response

        } else {

            return null
        }
    }
}

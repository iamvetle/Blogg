import { getMethod } from "~/services/apiByCRUD";


/**
 * Returns a list of all the users that are following logged-in-user
 * 
 * ! Not in use 
 * 
 * @param url - the url that the request is going to
 * @returns - the response data
 */
export const getLoggedInUserAllFollowers = async (url: string): Promise<FollowerType[] | null> => {

    /**
     * Fetches the token from local storage, or just returns null.
     */
    const authStore = useAuthStore()

const token = authStore.retrieveToken()

    if (token === null) {
        console.log("There was not token")
        return null
    }

	const headers = {
		"Content-Type": "application/json",
		Authorization: `Token ${token}`,
	};

	const response = await getMethod(url, headers);

	if (response) {
		// console.log("OK: got all of the followers of logged in user", response.data); // print to self
		return response.data
	} else {
		console.error("FAILED: you did not fetch whom the logged in user is following") // print to self
		return null
	}
};

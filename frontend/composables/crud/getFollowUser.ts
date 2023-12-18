import { postMethod } from "~/services/apiByCRUD";

/** Sends a get request to follow the user 
 * 
 * It also takes care of the header for you
*/
export const getFollowUser = async (url: string): Promise<object | null> => {

	const authStore = useAuthStore()

const token = authStore.retrieveToken()

	if (token === null) {
		console.log("There was no token")
		return null
	}

	const headers = {
		"Content-Type": "application/json",
		Authorization: `Token ${token}`,
	};

	const response = await postMethod(url, {}, headers);

	if (response) {
		// console.log("OK: managed to follow user", response.data); // print to self
		return response.data
	} else {
		console.log("FAILED: you might not have successfolly followed the user") // print to self
		return null
	}
};

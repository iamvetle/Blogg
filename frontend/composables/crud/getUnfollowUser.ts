import { postMethod } from "../apiByCRUD";

/** Sends a get request to unfollow the user 
 * 
 * It also takes care of the header for you
*/
export const getUnfollowUser = async (url: string): Promise<object | null> => {
	const token = retrieveToken();

	if (token === null) {
		console.log("There was not token")
		return null
	}

	const headers = {
		"Content-Type": "application/json",
		Authorization: `Token ${token}`,
	};

	const response = await postMethod(url, {}, { headers });

	if (response) {
		// console.log("OK: managed to unfollow user", response.data); // print to self
		return response
	} else {
		console.log("FAILED: you might not have successfolly unfollowed:") // print to self
		return null
	}
};

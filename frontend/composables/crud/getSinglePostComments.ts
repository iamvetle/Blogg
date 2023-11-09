import { getMethod } from "~/services/apiByCRUD";

/**
 * This function fetches data in GET based to the specified URL.
 * The URL can take query parameters and be customized. 
 * 
 * @param - The url to use in the GET request 
 * 
 * @returns - The response from the API endpoint
 */

export const getSinglePostComments = async (url: string): Promise<Comment[] | null> => {

	try {
		const token = localStorage.getItem("token");
		const headers = {
			"Content-Type": "application/json",
			"Authorization": `Token ${token}`,
		};

		const response = await getMethod(url, headers);

		// console.log(toRaw(response)) // print to self

		/** If the response was null - it did not work */
		if (response == null) {
			// console.log("Request failed") // print to self

			return null
		}

		console.log("OK: Comments fetched", response?.status, response?.data); // print to self
		/** returns all the comments in (response) */
		return response.data

	} catch (error) {
		console.error("ERROR: An error occured while trying to fetch comments: ", error); // print to self
		return null;
	}
}

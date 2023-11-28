import { getMethod } from "~/services/apiByCRUD";
import { usePostStore } from '~/store/postStore';

/**
 * Fetches comments for a single post from the API using a GET request.
 * On successful retrieval, the comments are stored in a Vuex store.
 * 
 * @param {string} url - The URL to use for the GET request, which can include query parameters.
 * @returns {Promise<Comment[] | null>} A promise that resolves to an array of Comment objects if successful, or null if the request fails.
 */
export const getSinglePostComments = async (url: string): Promise<Comment[] | null> => {
	try {
		const postStore = usePostStore();

		const token = localStorage.getItem("token");
		const headers = {
			"Content-Type": "application/json",
			"Authorization": `Token ${token}`,
		};

		const response = await getMethod(url, headers);

		// Handle null response indicating a failed request
		if (response == null) {
			console.log("Request failed"); // Logging for debugging
			return null;
		}

		console.log("OK: Comments fetched", response?.status, response?.data); // Logging for debugging

		// Update the Pinia store with the fetched comments
		/**
		* TODO maybe switch this down to the page level instead
		*/
		postStore.allComments = response.data;

		return response.data;

	} catch (error) {
		console.error("ERROR: An error occurred while trying to fetch comments: ", error); // Logging for debugging
		return null;
	}
}

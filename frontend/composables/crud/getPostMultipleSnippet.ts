import axios from 'axios'
import { useGeneralStore } from '~/store/generalStore';

/**
 * The function fetches post snippets
 * @param optionalURL 
 */
export const getPostMultipleSnippet = async (optionalURL?: string) => {
	const store = useGeneralStore()

	try {
		const token = localStorage.getItem("token");

		const headers = {
			"Content-Type": "application/json",
			Authorization: `Token ${token}`,
		};

		console.log(token) // print to self
		console.log(headers) // print to self

		let response;

		if (optionalURL) {
			response = await axios.get(optionalURL, { headers })
		} else {
			response = await axios.get(store.baseFeedURL, { headers });
		}

		console.log(toRaw(response)) // print to self

		if (response.data != null) {

			console.log("OK: Posts fetched", response.data); // print to self

			/** Makes the pagination-bar correspond to the posts that are fetched */
			await fixPagination(response.data)

			store.posts = response.data as SnippetPostMultipleType;

			return response.data

		} else {
			console.log("OBS! Fetching succsedded, but response(data) was:", response.data) // print to self
		}

	} catch (error) {
		console.error("ERROR: An error occured while trying to fetch posts: ", error); // print to self
	}
};

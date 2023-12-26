
import { getMethod } from '~/services/apiByCRUD';

/**
 * This function fetches data in GET based to the specified URL.
 * The URL can take query parameters and be customized. 
 * 
 * @returns The response from the API endpoint
 */

export const getPostMultipleSnippet = async (url: string): Promise<SnippetPostMultipleType | null> => {

	const postStore = usePostStore()

// 	/**
// 	 * Fetches the token from local storage, or just returns null.
// 	 */
// 	const authStore = useAuthStore()

// const token = authStore.retrieveToken()

	// if (token === null) {
	// 	console.log("There was not token")
	// 	return null
	// }
	const headers = {
		"Content-Type": "application/json",
		// Authorization: `Token ${token}`
	}

	/** It uses the last set URL */
	const response = await getMethod(url, headers);

	//console.log(toRaw(response)) // print to self

	if (response) {
		// console.log("OK: Followers fetched", response.status, response.data); // print to self

		/** This makes the FeedPagination component adhere to the current posts. 
		 * This makes sure that the pagination component 'next button', for instance, is
		 * in sync with the next expected posts.
		*/
		fixPagination(response.data)

		/**
		 * TODO take the assigning to posstore down to page level
		 * ? no^i dont want that bu where though
		 */
		postStore.posts = response.data

		/**
		 * Has the option to return the response **directly** as well.
		 * This can be usefull to check if the response was 200 OK, for instance.
		 */
		return response.data
	} else {
		return null
	}
}


import { getMethod } from '~/services/apiByCRUD';

/**
 * Fetches the single post
 *  
 * The URL can take query parameters and decides the post
 * 
 * @returns The response from the API endpoint
 */

export const getSinglePost = async (url: string): Promise<PostSingleType | null> => {

	const postStore = usePostStore()

	/**
	 * Fetches the token from local storage, or just returns null.
	 */
	const token = retrieveToken();

	if (token === null) {
		console.log("There was not token")
		return null
	}
	const headers = {
		"Content-Type": "application/json",
		Authorization: `Token ${token}`
	}

	/** It uses the last set URL */
	const response = await getMethod(url, headers);

	//console.log(toRaw(response)) // print to self

	if (response) {

		postStore.posts = response.data

        /** Return in use somewhere */
		return response.data
	} else {
		return null
	}
}

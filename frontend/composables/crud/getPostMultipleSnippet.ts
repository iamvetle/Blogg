import axios from 'axios'
import { usePostStore } from '~/store/postStore'

/**
 * This function fetches data in GET based to the specified URL.
 * The URL can take query parameters and be customized. 
 * 
 * @returns The response from the API endpoint
 */

export const getPostMultipleSnippet = async (url:string) => {

	try {
		const postStore = usePostStore()

		const token = localStorage.getItem("token");
		const headers = {
			"Content-Type": "application/json",
			"Authorization": `Token ${token}`,
		};
		
		console.log({ token }) // print to self
		console.log(headers) // print to self

		/** It uses the last set URL */
		const response = await axios.get(url, { headers });

		console.log(toRaw(response)) // print to self

		if (response.data != null) {
			console.log("OK: Followers fetched", response.status, response.data); // print to self
			
			/** This makes the FeedPagination component adhere to the current posts. 
			 * This makes sure that the pagination component 'next button', for instance, is
			 * in sync with the next expected posts.
			*/
			await fixPagination(response.data)

			postStore.posts = response.data

			/**
			 * Has the option to return the response **directly** as well.
			 * This can be usefull to check if the response was 200 OK, for instance.
			 */
			return response
		} 

		/** If a response was given, but the content has essentially empty */
		if (response.data == null) {
			console.log("OBS! Fetching succedded, but response(data) was:", response.status, response.data) // print to self
			
			postStore.posts = null
			/**
			 * I *hope* it is not bad that I correct the status code, in case it returns 200OK or is just empty.
			 */
			response.status = 400 // 404 status code means 'bad request'
			
			return response
		}
	} catch (error) {
		console.error("ERROR: An error occured while trying to fetch followers: ", error); // print to self
		return error;
	}
}

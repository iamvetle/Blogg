import { postMethod } from '~/services/apiByCRUD';

export const getSaveOrUnsavePost = async (postId: number): Promise<object | null> => {

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

	const postURL = `http://localhost:8888/api/post/${postId}/save/`

	const response = await postMethod(postURL, {}, headers);

	if (response) {

		/** 
		 * Calls the composable that fetches profile information about the logged in user, so that the saved posts can be updated 
		 * * I think this refreshses everything - unsure
		 * ? Should I rather have this at the earlier level? 
		 */
		await getLoggedInUserProfile("http://localhost:8888/api/min-side/")

		return response.data
	} else {
		return null
	}

}

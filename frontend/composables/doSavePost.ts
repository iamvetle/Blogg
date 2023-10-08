import axios from 'axios';

export const doSavePost = async (postId:any) => {
	if (process.client) {
		try {
			const token = localStorage.getItem("token");
	
			const response = await axios.post(`http://localhost:8888/api/post/${postId}/save/`, {}, {
				headers: {
					"Authorization": `Token ${token}`,
				},
			});
			console.log("OK: saved post for reading later", response.data); // print to self
			if (response.data?.message) {
				alert(response.data.message)
			}
			
			/** Calls the composable that fetches profile information about the logged in user, so that the saved posts can be updated */
			await fetchPersonalUser()
			
			return response.data;
		} catch (e) {
			console.log("FAILED: did not manage to save post for reading later") // print to self - not working at all, no idea why
			// is it only with get requests?
			return null;
		}
	};
}

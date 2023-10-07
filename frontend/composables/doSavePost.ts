import axios from 'axios';

export const doSavePost = async (postId:any) => {
	if (process.client) {
		try {
			const token = localStorage.getItem("token");
			console.log(token)
	
			const response = await axios.post(`http://localhost:8888/api/post/${postId}/save/`, {}, {
				headers: {
					"Authorization": `Token ${token}`,
				},
			});
			console.log("OK: saved post for reading later", response.data); // print to self
			return response.data;
		} catch (e) {
			console.log("FAILED: did not manage to save post for reading later") // print to self - not working at all, no idea why
			// is it only with get requests?
			return false;
		}
	};
}

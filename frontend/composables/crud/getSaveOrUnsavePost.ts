import axios from 'axios';
import { postMethod } from '~/services/apiByCRUD';

export const getSaveOrUnsavePost = async (postId:any) => {
		try {
			const token = localStorage.getItem("token");
	
			const response = await postMethod(`http://localhost:8888/api/post/${postId}/save/`, {}, {
				headers: {
					"Authorization": `Token ${token}`,
				},
			});
			// if (response.data?.message) {
			// 	alert(response.data.message)
			// }
			
			/** Calls the composable that fetches profile information about the logged in user, so that the saved posts can be updated */
			await getLoggedInUserProfile("http://localhost:8888/api/min-side/")
			
			return response
		} catch (e) {
			console.log("FAILED: did not manage to save post for reading later") // print to self - not working at all, no idea why
			// is it only with get requests?
			return null;
		}
	};


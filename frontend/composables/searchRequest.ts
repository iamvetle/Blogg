import axios from 'axios'
import { useGeneralStore } from '~/store/generalStore';
// with the full url query path
export const searchRequest = async (url: string) => {

	if (process.client) {
try {
	const store = useGeneralStore()
	const token = localStorage.getItem("token");
	const headers = {
	"Authorization": `Token ${token}`,
	};
    console.log(token)
    console.log(headers)

	const response = await axios.get(url, { headers });
	console.log(toRaw(response))

	if (response.data != null) {
		console.log("OK: Followers fetched", response.status, response.data); // print to self
		store.searchPosts = response.data

		// returns 'custom' response when the request was successfull
		return true
	} else {
		console.log("OBS! Fetching succedded, but response(data) was:", response.status, response.data) // print to self
		store.searchPosts = null
		return null
	}
} catch (error) {
	console.error("ERROR: An error occured while trying to fetch followers: ", error); // print to self
	return null;
}
}};

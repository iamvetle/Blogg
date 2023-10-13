import axios from 'axios'
import { useSearchStore } from '../store/searchStore';
// with the full url query path
export const searchRequest = async () => {

	if (process.client) {
		try {
			const store = useSearchStore()
			const store2 = useGeneralStore()
			const token = localStorage.getItem("token");
			const headers = {
				"Authorization": `Token ${token}`,
			};
			console.log(token)
			console.log(headers)

			const response = await axios.get(store.baseSearchURL, { headers });
			
			console.log(toRaw(response))

			if (response.data != null) {
				console.log("OK: Followers fetched", response.status, response.data); // print to self

				store2.posts = response.data
				await fixPagination(store2.posts)

				store.number_of_posts_count = response.data.count

				const calculate_total_pages = () => {
					const num = store.number_of_posts_count as number / 10
					return Math.ceil(num)
				}

				store.total_pages_count = calculate_total_pages()
				store.next_page_link = response.data.next
				store.previous_page_link = response.data.previous
				//store.last_page_link = `http://localhost:8888/api/search/?limit=10&offset${store.total_pages_count*10}`
				store.current_page = response.data.current_page

				store2.posts= response.data

				// returns 'custom' response when the request was successfull
				return true
			} else {
				console.log("OBS! Fetching succedded, but response(data) was:", response.status, response.data) // print to self
				store2.posts = null
				return null
			}
		} catch (error) {
			console.error("ERROR: An error occured while trying to fetch followers: ", error); // print to self
			return null;
		}
	}
};

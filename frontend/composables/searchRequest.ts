import axios from 'axios'
import { useSearchStore } from '~/store/searchStore';
import { useGeneralStore } from '~/store/generalStore';
import { usePostStore } from '~/store/postStore'
import { usePaginationStore } from '~/store/paginationStore';


// with the full url query path
export const searchRequest = async () => {

	if (process.client) {
		try {
			const searchStore = useSearchStore()
			const generalStore = useGeneralStore()
			const postStore = usePostStore()
			const paginationStore = usePaginationStore()

			const token = localStorage.getItem("token");
			const headers = {
				"Authorization": `Token ${token}`,
			};
			console.log(token)
			console.log(headers)

			const response = await axios.get(searchStore.baseSearchURL, { headers });
			
			console.log(toRaw(response))

			if (response.data != null) {
				console.log("OK: Followers fetched", response.status, response.data); // print to self

				postStore.posts = response.data
				await fixPagination(postStore.posts)

				paginationStore.number_of_posts = response.data.count

				const calculate_total_pages = () => {
					const num = paginationStore.number_of_posts as number / 10
					return Math.ceil(num)
				}

				paginationStore.all_pages_count = calculate_total_pages()
				paginationStore.next_page = response.data.next
				paginationStore.previous_page = response.data.previous
				//paginationStore.last_page_link = `http://localhost:8888/api/search/?limit=10&offset${paginationStore.all_pages_count*10}`
				paginationStore.current_page_number = response.data.current_page_number

				postStore.posts= response.data

				// returns 'custom' response when the request was successfull
				return true
			} else {
				console.log("OBS! Fetching succedded, but response(data) was:", response.status, response.data) // print to self
				postStore.posts = null
				return null
			}
		} catch (error) {
			console.error("ERROR: An error occured while trying to fetch followers: ", error); // print to self
			return null;
		}
	}
};

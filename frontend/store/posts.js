import axios from 'axios'

export const useGeneralStore = defineStore('general', () => {

const allposts = ref(null)

async function fetchAllPosts() {
	try {
		const response = await axios.get("http://localhost:8888/api/feed/")
		console.log("Success: fetched all posts", response.data)
		allposts.value = response.data
	} catch {
		console.log("Error: failed to fetch tasks")
	}
}

return { allposts, fetchAllPosts}
})

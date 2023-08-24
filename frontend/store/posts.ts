import axios from 'axios'

export const useGeneralStore = defineStore('general', () => {

type PostType = {
	id:number;
	title:string;    
	content:string;
	date_published:string;
	last_modified:string;
	author: {
		username:string;
		first_name:string;
		last_name:string;
	};
}


const baseURL = "http://localhost:8888/api/feed/"
const posts = ref<PostType[]>([])

async function fetchAllPosts() {
	try {
		const response = await axios.get<PostType[]>(baseURL)
		console.log("Success: fetched all posts", response.data)
		posts.value = response.data
	} catch {
		console.log("Error: failed to fetch tasks")
	}
}

return { posts, fetchAllPosts}
})

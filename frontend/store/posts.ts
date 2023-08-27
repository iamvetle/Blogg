import axios from 'axios'

export const useGeneralStore = defineStore('general', () => {

const posts = ref<PostType[] | null>(null)
const isAuthenticated = ref(false)

interface FetchResponseType {
	token:string
}
interface PostType {
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
interface AccountType {
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    nickname: string;
    age:number;
    address:string;
    phone_number:number;
}

async function fetchAllPosts() {
	try {
		const {data: response} = await useFetch<PostType[]>("http://localhost:8888/api/feed/")
		posts.value = toRaw(response.value)
		console.log("Success: fetched all posts", toRaw(response.value))

	} catch {
		console.log("Error: failed to fetch tasks")
	}
}
async function loginPost(username:string, password:string) {
	const baseURL = "http://localhost:8888/api/login/"

	const payload = {
		"username": username,
		"password": password
	}
	try {
		const { data: response } = await useFetch<FetchResponseType>(baseURL, {
			body: JSON.stringify(payload),
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			}
		})
		console.log("Successfully logged in: ", toRaw(response.value))
		return toRaw(response.value?.token)
	} catch {
		console.log("Failed to login")
		return false
	}
}
async function registerFormPost(data:object) {
	const baseURL = "http://localhost:8888/api/registrer/"

	try {
		const response = await axios.post(baseURL, data)
		console.log("Successfully created user account", response.data)
		return true
	} catch {
		console.log("Failed in creating user account")
		return false
	}
}
async function fetchUserAccount (token:string) { 
	const baseURL = "http://localhost:8888/api/myuser/"

    try {
        const { data: response } = await useFetch<AccountType>(baseURL, { 
        headers: {
                'Authorization': `Token ${token}`
            }})

            const accountInformation = toRaw(response.value)
			console.log("Success: Retrieved user information: ", toRaw(accountInformation))
			return accountInformation
    
		} catch {
            console.log("Something happend. Failed to fetch user information.")
			return false
    }
}
function changeAuthenticated(state:boolean) {
	isAuthenticated.value = state
}

return { posts, isAuthenticated, fetchAllPosts, changeAuthenticated, loginPost, registerFormPost, fetchUserAccount }

})
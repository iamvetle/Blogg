import axios from 'axios'
import { request } from 'http';

//@ts-ignore
export const useGeneralStore = defineStore('general', () => {

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

const posts = ref<PostType[]>([])

const isAuthenticated = ref(false)

async function fetchAllPosts() {
	try {
		const response = await axios.get<PostType[]>("http://localhost:8888/api/feed/")
		console.log("Success: fetched all posts", response.data)
		posts.value = response.data
	} catch {
		console.log("Error: failed to fetch tasks")
	}
}

async function loginPost(username:string, password:string) {
	const header = {
		"username": username,
		"password": password
	}
	try {
		const response = await axios.post("http://localhost:8888/api/login/", header)
		console.log("Successfully logged in: ", response.data)
		return response.data.token
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

type AccountType = {
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    nickname: string;
    age:number;
    address:string;
    phone_number:number;
}

async function fetchUserAccount (token:any) { 
	const baseURL = "http://localhost:8888/api/myuser/"

    try {
        const response = await axios.get<AccountType>(baseURL, { 
        headers: {
                'Authorization': `Token ${token}`
            }})
			console.log("Successfully retrieved user information: ", response.data)
            const accountInformation = response.data
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
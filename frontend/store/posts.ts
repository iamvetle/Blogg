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

interface LoginType {
	token:string;
}

const posts = ref<PostType[]>([])

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
		const response = await axios.post<LoginType>("http://localhost:8888/api/login/", header)
		localStorage.setItem("token", response.data.token)
		console.log("Successfully logged in: ", response.data)
		return true
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

async function fetchUserAccount () { 
	const baseURL = "http://localhost:8888/api/myuser/"

    const token = localStorage.getItem("token")
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


return { posts, fetchAllPosts, loginPost, registerFormPost, fetchUserAccount }


})
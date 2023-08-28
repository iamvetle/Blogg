export async function fetchMyAccount (url:string) {
    
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

    try {
        const token = localStorage.getItem("token")
        !token ? console.log("no token") : "" 

        const headers = {
            'Authorization': `Token ${token}`
        }

        const { data: response } = await useFetch<AccountType>(url, {
            headers
        })
		console.log("OK: My account fetch", response.value) // print to self
        return response.value
    
	} catch {
        console.log("FAILED: My account fetch ") // print to self
        return null
    }
}
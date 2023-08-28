import axios from 'axios'

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

export const fetchMyAccount = async(url:string) => {

    try {
        const token = localStorage.getItem("token")
        !token ? console.log("no token") : "" 
 
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        }

        const response = await axios.get(url, { headers })
		console.log("OK: fetched personal user account", response.data) // print to self
        return response.data
    
	} catch {
        //console.log("FAILED: did not fetch personal account") // print to self - not working at all, no idea why
        // is it only with get requests?
        return false
    }
}
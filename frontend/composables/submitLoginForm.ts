import axios from 'axios'

interface FetchResponseType {
	token:string
}

export const submitLoginForm = async(url:string, formData:object) => {

	try {
		const response = await axios.post<FetchResponseType>(url, formData)
		return response.data?.token
	} catch {
		console.log("FAILED: not logged in") // print to self
		return false
	}
}
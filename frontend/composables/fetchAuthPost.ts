import axios from 'axios'

export const fetchAuthPost = async(url:string) => {
    try {
        const token = localStorage.getItem("token")
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        }
        const response = await axios.get(url, { headers })
        return response.data
    } catch (error) {
        console.log("FAILED: did not manage to fetch post,", error)
        return null
    }
}
import axios from 'axios'

export const fetchPost = async(url:string) => {
    try {
        const response = await axios.get(url)
        return response.data
    } catch (error) {
        console.log("FAILED: did not manage to fetch post,", error)
        return null
    }
}
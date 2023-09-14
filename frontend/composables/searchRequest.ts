import axios from 'axios'

export const searchRequest = async (url:string, data:string) => {
    
    try {
        const response = await axios.get(url, data)

        if (response.data != null) {
            console.log("search was successfull, results:", response.data)

            return response.data
        } else {
            console.log("search results where", response.data)
        }
    } catch (error) {
        console.log("search failed")
        console.error(error)
    }
}
import axios from 'axios'

export const apiEndpointCheck = async (url:string) => {
    try {
        const response = await axios.get(url)
        if (response.status === 200) {
            console.log(`API-endpoint is up. ${url} returned ${response.status}`)
            return response            
        } else {
            console.log(`API-endpoint is down. ${url} did not return 200 OK`)
            return response
        }
    } catch (error) {
        console.log("An error occured while trying to test API-endpoint. Server is probably down. Error:", error)
        return null
    }
}
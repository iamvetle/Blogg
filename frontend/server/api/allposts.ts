import axios from 'axios';

export default defineEventHandler(async(event) => {
    const baseURL = "http://localhost:8888/api/feed/";
    try {
        const response = await axios.get(baseURL);
        console.log("All posts retrieved:", response.data);
        const data = response.data
        return data 
    } catch (error) {
        console.error("Error fetching all posts:", error);
        return null
    }
});
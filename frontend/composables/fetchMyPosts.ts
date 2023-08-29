import axios from 'axios'

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

export const fetchMyPosts = async(url:string ) => {

    try {
        const token = localStorage.getItem("token")
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        }
        const response = (await axios.get<PostType[]>(url, { headers }))

        console.log("OK: all posts fetched", response.data)// print to self
        return response.data

    } catch (error) {
        //console.error("An error occured while trying to fetch posts", error) // print to self
        return null
    }
}
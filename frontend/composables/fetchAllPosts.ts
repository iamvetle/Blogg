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

export const fetchAllPosts = async(url:string ) => {

    try {
        const response = await axios.get<PostType[]>(url)
        
        console.log("OK: all posts fetched", response.data)// print to self
        return response.data
    
    } catch {
        //console.error("FAILED: no posts fetched") // print to self - not working at all, no idea why
    }
}
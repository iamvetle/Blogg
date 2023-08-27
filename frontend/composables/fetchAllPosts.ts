export async function fetchAllPosts (url:string ) {

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

    try {
        const { data:response } = await useFetch<PostType[]>(url)
        
        console.log("OK: All posts fetched", response.value)// print to self
        return response.value
    
    } catch {
        console.error("FAILED: Posts not fetched") // print to self
        return null
    }
}
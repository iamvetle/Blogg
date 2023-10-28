import { usePostStore } from '~/store/postStore';
/** Fetches all tags possible */

/** @todo Jeg burde kanskje ha et sted hvor jeg fetcher alle "filters?" */

export const getAllTags = async () => {
    const baseURL = "http://localhost:8888/api/tags/"
    const postStore = usePostStore()

    const token = localStorage.getItem("token");
    if (token) {
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
        };

        const response = await getMethod(baseURL, headers)

        if (response) { //@ts-ignore
            postStore.allTags = response.data
            
            return response
        } else {
            return null
        }
    }
}

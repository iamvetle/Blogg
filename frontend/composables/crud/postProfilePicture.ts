import { postMethod } from "~/services/apiByCRUD";

export const postProfilePicture = async (url: string, formData: object, headers?: object): Promise<object | null> => {
    try {
        const authStore = useAuthStore()

const token = authStore.retrieveToken()
        const headers = {
            "Authorization": `Token ${token}`,
        };

        /** The actual POST fetch */
        const response = await postMethod(url, formData, headers)

        /** Returns the data from the response */
        if (response) {
            return response.data
        } else {
            console.log("FAILED: something failed"); // print to self
            return null
        }

    } catch (error) {
        console.error("ERROR: An error occurred while trying to edit/add profile picture to logged in user: ", error); // Logging for debugging
        return null;
    }

};

/**
 * Retrieves and returns the (login) token from localStorage, or null, if no token is found
 * 
 * The function will only try to get from localStorage if it is on client side, else it will just return null.
 * 
 * @returns - The token from localStorage, or null 
 */
export const retrieveToken = (): string | null => {
    if (process.client) {
        const token = localStorage.getItem("token");

        if(token) {
            return token
        } else {
            return null
        }
    }
    // console.log("Not on the client side (process.client)") // print to self
    return null
}
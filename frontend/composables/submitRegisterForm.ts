import 

export const submitLoginForm = async () => {
    
    try {
        async function registerFormPost(data:object) {
            const baseURL = "http://localhost:8888/api/registrer/"
        
            try {
                const response = await axios.post(baseURL, data)
                console.log("OK: created new user account", response.data) // print to self
                return true
            } catch {
                console.log("FAILED: no new user account created") // print to self
                return false
            }
        }
    } catch {

    }
}
import { useGeneralStore } from "store/generalStore"
import { storeToRefs } from "pinia"

export default defineNuxtRouteMiddleware((to) => {
    if (process.client) { // Update the token in 'Store' if a token is present
        const token = localStorage.getItem("token")
        const store = useGeneralStore()

        if (token !== null) {
            store.changeAuthenticated(true)      
        } else {
            store.changeAuthenticated(false)
            console.log("No token")
        }
    }
})
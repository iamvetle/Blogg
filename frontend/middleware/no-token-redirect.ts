import { useGeneralStore } from "@/store/generalStore"

export default defineNuxtRouteMiddleware((to, from) => {
    if (process.client) {

        const token = localStorage.getItem("token")
        const store = useGeneralStore()

        token != null ? store.isAuthenticated = true : store.isAuthenticated = false  


        if (token == null) {
            if (to.path === "/myuser/" || to.path === "/newpost/") {
                return navigateTo("/login/")
            } else if (to.path === "/logout/") {
                return navigateTo("")
            }
        }
    }
})
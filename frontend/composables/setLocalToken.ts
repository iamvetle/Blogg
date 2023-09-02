import { useGeneralStore } from "@/store/generalStore"

export const setLocalToken = (token:string) => {
    if (process.client) {
        token != null ? localStorage.setItem("token", token): localStorage.removeItem("token")
        const store = useGeneralStore()

        store.isAuthenticated = Boolean(token)
    }
}
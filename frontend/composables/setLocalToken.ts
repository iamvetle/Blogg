import { useGeneralStore } from "@/store/generalStore"

export const setLocalToken = () => {
    if (process.client) {
        const token = localStorage.getItem("token")
        const store = useGeneralStore()

        store.isAuthenticated = Boolean(token)
    }
}
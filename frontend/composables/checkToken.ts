import { useGeneralStore } from "@/store/generalStore"

export const checkToken = () => {
    if (process.client) {
        const token = localStorage.getItem("token")
        const store = useGeneralStore()

        store.isAuthenticated = Boolean(token)
    }
}
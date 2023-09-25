import { useGeneralStore } from '~/store/generalStore'

export default defineNuxtPlugin(useNuxtApp => {
    const store = useGeneralStore()

    const token = localStorage.getItem("token")?? null

    if (token != null) {
        store.isAuthenticated = true
    } else {
        store.isAuthenticated = false
    }
    
})
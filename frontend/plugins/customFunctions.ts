import axios from 'axios'

export default defineNuxtPlugin(nuxtApp => {
    const token = localStorage.getItem("token") ?? null
    
    const webFetch = axios.create({
        headers: {
            'Authorization': `Token ${token}`
        }
    })
    nuxtApp.provide('webFetch', webFetch)
})
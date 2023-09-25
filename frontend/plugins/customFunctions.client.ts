// webFetch() 

import axios from 'axios'

export default defineNuxtPlugin(() => {
    const token = localStorage.getItem("token") ?? null
    
    const fetch = axios.create({
        headers: {
            'Authorization': `Token ${token}`
        }
    })
    return {
        provide: {
            fetchWithToken: fetch
        }
    }
})
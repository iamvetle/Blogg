export const useGeneralStore = defineStore('general', () => {
    const isAuthenticated = ref(false);


    const changeAuthenticated =  (state:boolean) => {
 	    isAuthenticated.value = state

    }


    return { isAuthenticated, changeAuthenticated}

})
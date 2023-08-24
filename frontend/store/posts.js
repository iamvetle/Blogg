export const useGeneralStore = defineStore('general', () => {
const example = ref("hello")

function changeName() {
    example.value = "goodbye"
}

return { example, changeName}
})

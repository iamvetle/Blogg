import { defineStore } from 'pinia';

export const useTagStore = defineStore("Has all logic related to the tags for posts", () => {
    /** All tags as objects */
    const allTags = ref<TagType[]>([])

    /** The names of all the tags in an array */
    const allTagNames = computed<string[]>(() => allTags.value?.map(tag => tag.name) ?? [] )

    /** 
     * All of the tags that are selected 
     * @see FeedTopBarDropdownFilter
     */
    const selectedTagNames = ref<string[]>([])

    /**
     * Fetches all tags, and then assigns them to the allTags reactive referance
     */
    const fetchAllTags = async () => {
        // const headers = {}

        const url = urls.api.posts.filter.tags
        
        try {
            const response = await axios.get(url) // switch this to usefetch later
            if (response.data == null) {
                console.error(`GET request to ${url} failed (${response.status})`, response.request)
            } else {
                allTags.value = response.data
            }
        } catch (e: unknown) {
            console.error("A 'catch' fail happend:")
        }
    }

    const route = useRoute()
    const router = useRouter()

    /** Adds tags to the url router based on the selected tags */
    watchEffect(() => {
        router.replace({
            query: {
                ...route.query,
                tags: selectedTagNames.value
            }
        })
    })

    /** Adds value to the reactive tags referances based on the url */
// ! on on LATER
    // watchEffect(() => {

    //     if (Array.isArray(route.query.tags)) {
    //         selectedTagNames.value = route.query.tags as string[];
    //     }
        

    // })

    return {allTags, allTagNames, selectedTagNames, fetchAllTags}
})
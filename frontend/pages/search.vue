<template>
    <div id="site-wrapper">
        <div>
            <input @keyup.enter="trySearch(search_input)" placeholder="search.." v-model="search_input" class="w-full p-2 border rounded-md" type="text" name="text" id="search_bar">
            <button @click="trySearch(search_input)" id="search_button">Search</button>
        </div>
        <div v-if="results" v-for="result in results">
            <ul>
                <PostWindow :postDetail="result" :key="results.id"/>
            </ul>
        </div>
        <p v-if="no_posts_found">No results for '{{ last_search }}'</p>
    </div>


</template>

<script setup lang="ts">
//@ts-nocheck

const search_input = ref("")

const results = ref<object | null>(null)
const no_posts_found = ref(false)
const route = useRoute()
const router = useRouter()
const last_search = ref<string | null>(null)


const trySearch = async (search_query) => {
    no_posts_found.value = false
    
    const response = await searchRequest(`http://localhost:8888/api/search?q=${search_query}`)

    router.replace({
        query:{ q:search_query}
    })
    
    console.log(response)

    last_search.value = search_query

    if (response.length == 0) {
        no_posts_found.value = true 
    }

    search_input.value = ""

    results.value = response
}

onMounted( async () => {
    
    const search_query = route.query.q
    
    if (search_query != null) {
        console.log(route.fullPath)
        console.log(route.query, "query found so trying search")
        
        await trySearch(search_query)
    }
})


</script>

<style scoped>

</style>
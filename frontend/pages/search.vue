<template>
    <div>
        <input v-model="search_input" class="w-full p-2 border rounded-md" type="text" name="text" id="search_bar">
        <button @click="trySearch" id="search_button">Search</button>
    </div>

    <div v-for="result in results">
        <ul>
            <li>{{ result }}</li>
        </ul>
    </div>

</template>

<script setup lang="ts">

const search_input = ref("")
const results = ref(null)


const trySearch = async () => {

    if (search_input.value.trim() != null) {

        const baseURL = "http://localhost:8888/api/search/"
    
        results.value = await searchRequest(baseURL, search_input.value)

        if (results != null) {
            console.log("search results retrieved")
        }

    }



}


</script>

<style scoped>

</style>
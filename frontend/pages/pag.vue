<template>
    <div>
        <Pagination
        v-if="pages_count"
        :all_pages_count="pages_count"
        />
    </div>
</template>

<script setup lang="ts">

import axios from 'axios'

const pages_count = ref(null)
const baseURL = "http://localhost:8888/api/feed/"


onMounted( async () => {
    try {
        const response = await fetchAllPosts(baseURL)

        if (response != null) {
            pages_count.value = response.count
        }
    } catch (error) {
        console.log(error)
    }
})
</script>

<style scoped>

</style>
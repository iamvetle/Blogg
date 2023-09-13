<template>
    <div>
        <ul>
            <div v-for="f, index in followers">
				<OneFollower
				:key="index"
				:follower="f"
				/>
			</div>
        </ul>

    </div>
</template>

<script setup lang="ts">

const baseURL = "http://localhost:8888/api/min-side/followers/"

const followers = ref<object | null>(null)

onMounted(() => {
    (async() => {
        followers.value = await fetchAllFollowers(baseURL)
    })()
})

</script>

<style scoped>

</style>
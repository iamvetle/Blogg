<template>
  <div>
    <ul>
      <div
        v-for="f, index in followers" 
        :key="index"
      >
        <Follower
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
        followers.value = await getLoggedInUserAllFollowers(baseURL)
    })()
})

</script>

<style scoped>

</style>
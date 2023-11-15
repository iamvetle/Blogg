<template>
  <div>
    <span class="mb-4 flex items-center">
      <img :src="profile_picture" class="w-6 h-auto">
      <nuxt-link :to="author_link"><p class="ms-2">{{ props.username }}</p></nuxt-link>
    </span>
  </div>
</template>

<script setup lang="ts">

import profile_picture from '~/assets/placeholder-profile-picture.png'

const props = defineProps<{
  username: string
}>()


const author_link = `http://localhost:3000/user/${props.username}`

</script>

<style scoped></style>
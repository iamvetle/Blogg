<template>
  <div>
    <span class="mb-4 flex items-center">
      <img
        :src="profile_picture"
        class="w-6 h-auto"
      >
      <p class="ms-2">{{ followingProp.username }}</p>
    </span>
  </div>
</template>

<script setup lang="ts">

import profile_picture from '~/assets/placeholder-profile-picture.png'

const { followingProp } = defineProps(['followingProp'])

</script>

<style scoped>

</style>
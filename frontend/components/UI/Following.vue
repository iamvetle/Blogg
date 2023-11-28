<template>
  <div>
    <span class="mb-4 flex items-center">
      <img :src="profile_picture" class="w-6 h-auto">
      <NuxtLink :to="`/user/${following}`"><p class="ms-2">{{ following }}</p></NuxtLink>
    </span>
  </div>
</template>

<script setup lang="ts">
import profile_picture from '~/assets/placeholder-profile-picture.png'

defineProps<{
  following:FollowingType
}>()

</script>

<style scoped></style>
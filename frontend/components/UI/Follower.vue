<template>
  <div>
    <span class="flex items-center space-x-3">
      <img
        :src="user_profile_picture"
        class="flex w-5 h-5"
      >
      <NuxtLink :to="`/user/${follower}`"><p v-if="follower">{{ follower }}</p></NuxtLink>
    </span>
  </div>
</template>

<script setup lang="ts">
import user_profile_picture from '~/assets/account-circle-line.svg'

defineProps<{
  follower: FollowerType
}>();

</script>

<style scoped></style>
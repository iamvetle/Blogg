<template>
  <div>
    <div v-if="removed">
      <p>Du er nå logged ut.</p>
    </div>
    <div v-else>
      <p>Logges ut..</p>
    </div>
  </div>
</template>

<script setup lang="ts">

definePageMeta({
  layout: "blank"
})

const authStore = useAuthStore();
const removed = ref(false);

const logoutFunction = () => {

  // Removes the token and username from localstorage and store
  authStore.resetStore()

  // Redirects to login page
  setTimeout(() => {
    removed.value = true;
    setTimeout(() => {
      return navigateTo("/login");
    }, 750);
  }, 500);
}

onMounted(() => logoutFunction());

</script>

<style scoped></style>

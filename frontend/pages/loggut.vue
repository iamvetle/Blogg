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
import { useGeneralStore } from "~/store/generalStore";

definePageMeta({
  layout:"blank"
})

const generalStore = useGeneralStore();

const removed = ref(false);

const logoutFunction = () => {
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  if (token != null || username != null) {
    localStorage.removeItem("token");
    localStorage.removeItem("username");

    generalStore.isAuthenticated = true;

    setTimeout(() => {
      removed.value = true;
      setTimeout(() => {
        return navigateTo("/login");
      }, 750);
    }, 500);
  } else {
    navigateTo("/"); // temperory redirectioon
  }
};

onMounted(logoutFunction);

</script>

<style scoped></style>

<template>
  <div id="site-wrapper">
    <div v-if="storeValue">
      <TheFeed />
    </div>
    <div v-else>
      <TheWait />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGeneralStore } from "~/store/generalStore";
const store = useGeneralStore();

const storeValue = computed(() => store.isAuthenticated);

console.log(store.isAuthenticated);

watch(storeValue, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    setPageLayout("feed-layout");
  }
});

onBeforeMount(() => {
  if (store.isAuthenticated === true) {
    setPageLayout("feed-layout");
  } else {
    setPageLayout("blank");
  }
});

</script>

<style scoped lang="scss"></style>

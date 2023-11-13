<template>
    <div class="flex flex-col items-center h-full justify-center mt-10">
      <div
        class="w-full flex flex-col items-center bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <SignUpCard />
      </div>
    </div>
</template>

<script setup lang="ts">

definePageMeta({
    layout:"form-layout"
})

</script>

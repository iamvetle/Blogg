<template>
  <div>
    <div v-for="category in categories" :key="category">
      <BaseCheckboxOption v-model="selectedCategories[category]"
      :label="category"
      />
    </div>

    <div>
      Selected Categories: {{ selectedCategories }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const categories = ['Fruit', 'Vegetable'];
const selectedCategories = ref({});

// const selectedCategoryNames = computed(() => {
//   return categories.filter(category => selectedCategories.value[category]);
// });
</script>

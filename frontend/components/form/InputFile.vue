<template>
    <label :class="class" for="uploadFile">
        <input type="file" id="uploadFile" hidden data-test="input-file-element" @change="handleFileChange" v-bind="$attrs" :class="inputClass">
        <span>{{ label }}</span>
    </label>
</template>

<script setup lang="ts">

const emit = defineEmits(["fileChange"])

defineOptions({
    inheritAttrs:false
})
/**
 * * Has to have a label prop to display
 * 
 * So that i can decide placeholder and such from the parent component
 */

/**
 * Have to have a provide earlier
 */

defineProps<{
    inputClass?:string
    class?:string;
    label?:string;
}>();

const handleFileChange = (event:any) => {
    const file = event;
    emit("fileChange", file)
}

</script>

<style scoped>

</style>
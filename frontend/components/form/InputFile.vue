<template>
    <label class="labelClass" for="upload_file">
        <input type="file" name="upload_file" data-test="input-file-element" @change="handleFileChange" v-bind="$attrs" class="inputClass">
        <span v-if="label">{{ label }}</span>
    </label>
</template>

<script setup lang="ts">

const emit = defineEmits(["fileChange"])

defineOptions({
    inheritAttrs:false
})

defineProps<{
    inputClass?:string
    labelClass?:string
    label?:string
}>();

const handleFileChange = (event:any) => {
    const file = event.target.files;
    emit("fileChange", file)
}

</script>

<style scoped>

</style>
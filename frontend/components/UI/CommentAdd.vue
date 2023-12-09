<template>
    <div>
        <BaseButton class="rounded-md mb-2 p-1 bg-primary text-onPrimary" @click="tryAddComment" text="Submit" data-test="submit_comment_button"/>
        <div data-test="input_comment_text">
            <InputTextarea v-model.trim="textInput" />
        </div>
    </div>
</template>

<script setup lang="ts">

const emit = defineEmits(["emitComment"])

const textInput = ref<any>("")

const tryAddComment = () => {
    if (textInput.value.trim() !== "") {
        emit('emitComment', textInput.value)
    }
}


</script>

<style scoped></style>
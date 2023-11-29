<template>
    <div>
        <BaseButton class="rounded-md mb-2 p-1 bg-primary text-onPrimary" @click="tryAddComment" text="Submit" data-test="submit_comment_button"/>
        <div data-test="input_comment_text">
            <BaseTextareaInput @emitInput="input" />
        </div>
    </div>
</template>

<script setup lang="ts">

const emit = defineEmits(["emitComment"])

const textInput = ref("")

const input = (value: string) => {
    textInput.value = value
}

const tryAddComment = () => {
    if (textInput.value.trim() !== "") {
        emit('emitComment', textInput.value)
    }
}


</script>

<style scoped></style>
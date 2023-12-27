<template>
	<BaseButton
		class="p-2 rounded-lg"
		data-test="following_option"
		:class="selected"
		text="Following"
	/>
</template>

<script setup lang="ts">

const props = defineProps<{
	showAsSelected:boolean
}>();

const selected = computed(() => {
	return props.showAsSelected ? 'bg-onPrimary text-primary border-primary border shadow-md' : 'bg-primary text-onPrimary border'
})

</script>

<style scoped></style>

:class="


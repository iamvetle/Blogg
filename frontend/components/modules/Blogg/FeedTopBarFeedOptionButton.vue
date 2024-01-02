<template>
	<BaseButton
		class="p-2 rounded-lg"
		data-test="feed_option"
		:class="selected"
		@click="$emit('showAllFeedPosts')"
		text="Feed"
	/>
</template>

<script setup lang="ts">

defineEmits<{
	showAllFeedPosts:any
}>();

const props = defineProps<{
	showAsSelected:boolean
}>();

/**
 * ! i have to turn this logic upside down
 */
const selected = computed(() => {
	if (props.showAsSelected) {
		return 'bg-onPrimary text-primary border-primary border shadow-md'
	} else {
		return 'bg-primary text-onPrimary border'
	}
})

</script>

<style scoped></style>

:class="


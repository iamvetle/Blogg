<template>
	<UModal v-model="isOpen">
		<UCard>
			<template #header>
				<div class="prose">
					<h3>{{ title }}</h3>
				</div>
			</template>
			<div class="prose" v-html="sanitizedDescription"></div>
		</UCard>
	</UModal>
</template>

<script setup lang="ts">
//@ts-ignore
import DOMPurify from "dompurify";

/**
 * This works.
 *
 * I have to do v-model on this component though "on-top".
 */
const emit = defineEmits(["close"]);

const props = withDefaults(
	defineProps<{
		title?: string;
		description?: string;
	}>(),
	{
		title: "Requirements not met",
		description:
			`<p>
                &#8226 The 
                <strong>title</strong> 
                has to be at least 
                <strong>3</strong> 
                characters long.
            </p>
            <p>
                &#8226 The 
                <strong>content</strong> of the post has to be at least <strong>50</strong> characters long.
            </p>
            <p>
                &#8226
                The post cannot have more than <strong>three tags</strong>.
            </p>`,
	},
);
const sanitizedDescription = DOMPurify.sanitize(props.description);

const isOpen = ref(true);

/**
 * Makes sure that when the modal is closed by clicking outside the emit that closes the "showModal" is emit
 * I have to have this to make it possible to click outside of the modal and go back to editing.
 */
watchEffect(() => {
	if (isOpen.value === false) {
		emit("close");
		isOpen.value = true;
	}
});

// sanitizes the input/makes it safe (imported it quick - dont know the reliability of it)
</script>

<style scoped></style>

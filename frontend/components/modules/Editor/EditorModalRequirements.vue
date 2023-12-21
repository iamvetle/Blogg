<template>
	<UModal v-model="isOpen">
		<UCard>
			<template #header>
				<div class="prose">
					<h3>{{ title }}</h3>
				</div>
			</template>
			<template #default>
				<ul class="space-y-4">
					<li
						:class="charTitle < 3 ? 'text-error' : ''"
						class="prose"
						v-html="sanitzedTitle"
					></li>
					<li
						:class="charContent < 50 ? 'text-error' : ''"
						class="prose"
						v-html="sanitizedContent"
					></li>
					<li
						:class="tagsCount > 3 ? 'text-error' : ''"
						class="prose"
						v-html="req3Tags"
					></li>
				</ul>
			</template>
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
		charTitle: any;
		charContent: any;
		charTotal: any;
		tagsCount: any;
	}>(),
	{
		title: "Requirements not met",
	},
);

const req1Title = computed(
	() => `
			&#8226 The
			<strong>title</strong> 
			has to be at least 
			<strong>3</strong> 
			characters long - (now <strong>${props.charTitle}</strong>).
		`,
);

const req2Content = computed(
	() => `
			&#8226 The 
			<strong>content</strong> has to be at least <strong>50</strong> characters long - (currently ${props.charContent}).
`,
);

const req3Tags = computed(
	() => `
			&#8226
			The post cannot have more than <strong>three tags</strong> - (now <ul><li>${props.tagsCount.toString()}</li></ul>).
		`,
);
const sanitzedTitle = DOMPurify.sanitize(req1Title.value);
const sanitizedContent = DOMPurify.sanitize(req2Content.value);

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

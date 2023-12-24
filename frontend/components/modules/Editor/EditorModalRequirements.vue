<template>
	<UModal :value="modelValue" @input="handleInput">
		<UCard>
			<template #header>
				<div class="prose">
					<h3>{{ title }}</h3>
				</div>
			</template>
			<template #default>
				<div class="prose">
					<ul
						:class="charTitle < 3 ? 'text-error' : ''"
						v-html="sanitzedTitle"
					></ul>
					<ul
						:class="charContent < 50 ? 'text-error' : ''"
						v-html="sanitizedContent"
					></ul>
					<ul
						:class="tagsCount > 3 ? 'text-error' : ''"
						v-html="req3Tags"
					></ul>
				</div>
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
const emit = defineEmits(["close", "update:modelValue"]);

const props = withDefaults(
	defineProps<{
		title?: string;
		charTitle: number;
		charContent: number;
		tagsCount: number;
		modelValue: any;
	}>(),
	{
		title: "Requirements not met",
	},
);

/**
 * Handles the input event from the textarea.
 * Emits an 'update:modelValue' event with the new value, allowing the parent component to update its data.
 * @param {Event} event - The input event object.
 */
 const handleInput = (event: any) => {
    emit('update:modelValue', event.target.value);
};

const req1Title = computed(
	() => `
			<li>
			The
			<strong>title</strong> 
			has to be at least 
			<strong>3</strong> 
			characters long.
			</li>
			<ul>
				<li>
					Currently have <strong>${props.charTitle}</strong> characters.
					</li>
				</ul>
		`,
);

const req2Content = computed(
	() => `	<li>
			The 
			<strong>content</strong> has to be at least <strong>50</strong> characters long.
			</li>
			<ul>
				<li>
					Currently have <strong>${props.charContent}</strong> characters.
					</li>
				</ul>

`,
);

const req3Tags = computed(
	() => `	<li>
			The post cannot have more than <strong>three tags</strong>.
			</li>
			<ul>
				<li>Currently have <strong>${props.tagsCount}</strong> characters.
					</li>
			</ul>.
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

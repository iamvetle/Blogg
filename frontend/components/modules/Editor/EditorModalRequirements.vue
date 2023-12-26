<template>
	<UModal v-model="isOpen">
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

/** Can this be exploited - the fact that I am not sanitizing tagsCount? - what no */
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

const sanitzedTitle = computed(() => DOMPurify.sanitize(req1Title.value));
const sanitizedContent = computed(() => DOMPurify.sanitize(req2Content.value));

/** This controls whether the modal is open or not */
const isOpen = ref(true);


/**
 * Runs every time the modal is shown/not shown
 * 
 * Makes it so that I do not need to use v-model in the parent component
 * because it turns the "isOpen" to false after every emit
 * 
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

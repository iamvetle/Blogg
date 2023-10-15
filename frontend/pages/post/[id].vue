<template>
	<div class="prose max-w-3xl py-[100px] mx-auto">
		<div v-if="post" class="w-full px-[60px] py-[30px] bg-white">
			<h1 class="">
				{{ post.title }}
			</h1>
			<!-- <span class="text-xs">Published {{ post.date_published }}</span> -->
			<!-- <p class="pt-3 font-bold">
		- {{ post.author.username }}
	</p> -->
			<div class="mb-4" v-html="post.content"></div>
			<button class="border-2 bg-light-blue-400 rounded-lg py-1 px-2" @click="$router.go(-1)">
				Back
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">

// import noimage from '~/assets/noimage.jpg'

const post = ref<PostSingleType | null>(null);

onMounted(async () => {
	const route = useRoute();
	const postURL = `http://localhost:8888/api/post/${route.params.id}/`;


	post.value = await fetchPost(postURL);
});

</script>


<style scoped>
/* @import "~/assets/nrk/nrk-sans.min.css"; */

/* I can use scoped css on this component to be able to render it with the styles I want*/

/* h1 {
	cursor: default;
	font: 100%/1.5 'Helvetica Neue', Helvetica, Arial, sans-serif;
	text-size-adjust: 100%;
	-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
	--nrk-sans-weight-hairline: 1;
	--nrk-sans-weight-thin: 90;
	--nrk-sans-weight-extralight: 180;
	--nrk-sans-weight-light: 290;
	--nrk-sans-weight-regular: 400;
	--nrk-sans-weight-medium: 560;
	--nrk-sans-weight-bold: 700;
	--nrk-sans-weight-extrabold: 800;
	--nrk-sans-weight-heavy: 890;
	--nrk-sans-weight-black: 950;
	--nrk-sans-width-regular: 100;
	--nrk-sans-width-compressed: 50;
	--nrk-sans-width-condensed: 80;
	--nrk-sans-width-semi-condensed: 90;
	--nrk-sans-width-extended: 120;
	--nrk-sans-width-ultra-extended: 200;
	--nrk-sans-regular: 'wdth' var(--nrk-sans-width-regular);
	--nrk-sans-compressed: 'wdth' var(--nrk-sans-width-compressed);
	--nrk-sans-condensed: 'wdth' var(--nrk-sans-width-condensed);
	--nrk-sans-semi-condensed: 'wdth' var(--nrk-sans-width-semi-condensed);
	--nrk-sans-extended: 'wdth' var(--nrk-sans-width-extended);
	--nrk-sans-ultra-extended: 'wdth' var(--nrk-sans-width-ultra-extended);
	--nrk-sans-features-super: 'ss01', 'ss02';
	--nrk-sans-features-animation: 'ss04';
	fill: currentColor;
	text-decoration: none !important;
	display: block;
	margin: 0 0 .3em 0;
	color: #061629;
	hyphens: manual;
	word-wrap: break-word;
	text-rendering: optimizelegibility;
	font-family: 'NRK Sans Variable', 'Helvetica Neue', Arial, sans-serif;
	font-style: normal;
	margin-top: 0.9375rem;
	font-size: 3.25rem;
	line-height: 1.153846153846154;
	letter-spacing: -.015em;
	margin-bottom: 0.625rem;
	font-variation-settings: "wdth" 90;
	font-weight: 740;
}

h3 {
	cursor: default;
	font: 100%/1.5 'Helvetica Neue', Helvetica, Arial, sans-serif;
	text-size-adjust: 100%;
	-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
	--nrk-sans-weight-hairline: 1;
	--nrk-sans-weight-thin: 90;
	--nrk-sans-weight-extralight: 180;
	--nrk-sans-weight-light: 290;
	--nrk-sans-weight-regular: 400;
	--nrk-sans-weight-medium: 560;
	--nrk-sans-weight-bold: 700;
	--nrk-sans-weight-extrabold: 800;
	--nrk-sans-weight-heavy: 890;
	--nrk-sans-weight-black: 950;
	--nrk-sans-width-regular: 100;
	--nrk-sans-width-compressed: 50;
	--nrk-sans-width-condensed: 80;
	--nrk-sans-width-semi-condensed: 90;
	--nrk-sans-width-extended: 120;
	--nrk-sans-width-ultra-extended: 200;
	--nrk-sans-regular: 'wdth' var(--nrk-sans-width-regular);
	--nrk-sans-compressed: 'wdth' var(--nrk-sans-width-compressed);
	--nrk-sans-condensed: 'wdth' var(--nrk-sans-width-condensed);
	--nrk-sans-semi-condensed: 'wdth' var(--nrk-sans-width-semi-condensed);
	--nrk-sans-extended: 'wdth' var(--nrk-sans-width-extended);
	--nrk-sans-ultra-extended: 'wdth' var(--nrk-sans-width-ultra-extended);
	--nrk-sans-features-super: 'ss01', 'ss02';
	--nrk-sans-features-animation: 'ss04';
	fill: currentColor;
	font-family: 'NRK Sans Variable', 'Helvetica Neue', Arial, sans-serif;
	font-style: normal;
	color: #061629;
	margin: 0 0 1em 0;
	font-weight: 520;
	line-height: 1.4;
	font-size: 1.5rem;
	margin-bottom: 0;
}

h2 {
	cursor: default;
	font: 100%/1.5 'Helvetica Neue', Helvetica, Arial, sans-serif;
	text-size-adjust: 100%;
	-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
	--nrk-sans-weight-hairline: 1;
	--nrk-sans-weight-thin: 90;
	--nrk-sans-weight-extralight: 180;
	--nrk-sans-weight-light: 290;
	--nrk-sans-weight-regular: 400;
	--nrk-sans-weight-medium: 560;
	--nrk-sans-weight-bold: 700;
	--nrk-sans-weight-extrabold: 800;
	--nrk-sans-weight-heavy: 890;
	--nrk-sans-weight-black: 950;
	--nrk-sans-width-regular: 100;
	--nrk-sans-width-compressed: 50;
	--nrk-sans-width-condensed: 80;
	--nrk-sans-width-semi-condensed: 90;
	--nrk-sans-width-extended: 120;
	--nrk-sans-width-ultra-extended: 200;
	--nrk-sans-regular: 'wdth' var(--nrk-sans-width-regular);
	--nrk-sans-compressed: 'wdth' var(--nrk-sans-width-compressed);
	--nrk-sans-condensed: 'wdth' var(--nrk-sans-width-condensed);
	--nrk-sans-semi-condensed: 'wdth' var(--nrk-sans-width-semi-condensed);
	--nrk-sans-extended: 'wdth' var(--nrk-sans-width-extended);
	--nrk-sans-ultra-extended: 'wdth' var(--nrk-sans-width-ultra-extended);
	--nrk-sans-features-super: 'ss01', 'ss02';
	--nrk-sans-features-animation: 'ss04';
	fill: currentColor;
	font-family: 'NRK Sans Variable', 'Helvetica Neue', Arial, sans-serif;
	font-style: normal;
	margin: 0 0 .5em 0;
	padding-top: .5em;
	color: #061629;
	font-size: 1.3125rem;
	font-weight: 720;
	line-height: 1.25em;
	text-rendering: optimizelegibility;
}

p {
	cursor: default;
	font: 100%/1.5 'Helvetica Neue', Helvetica, Arial, sans-serif;
	text-size-adjust: 100%;
	-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
	--nrk-sans-weight-hairline: 1;
	--nrk-sans-weight-thin: 90;
	--nrk-sans-weight-extralight: 180;
	--nrk-sans-weight-light: 290;
	--nrk-sans-weight-regular: 400;
	--nrk-sans-weight-medium: 560;
	--nrk-sans-weight-bold: 700;
	--nrk-sans-weight-extrabold: 800;
	--nrk-sans-weight-heavy: 890;
	--nrk-sans-weight-black: 950;
	--nrk-sans-width-regular: 100;
	--nrk-sans-width-compressed: 50;
	--nrk-sans-width-condensed: 80;
	--nrk-sans-width-semi-condensed: 90;
	--nrk-sans-width-extended: 120;
	--nrk-sans-width-ultra-extended: 200;
	--nrk-sans-regular: 'wdth' var(--nrk-sans-width-regular);
	--nrk-sans-compressed: 'wdth' var(--nrk-sans-width-compressed);
	--nrk-sans-condensed: 'wdth' var(--nrk-sans-width-condensed);
	--nrk-sans-semi-condensed: 'wdth' var(--nrk-sans-width-semi-condensed);
	--nrk-sans-extended: 'wdth' var(--nrk-sans-width-extended);
	--nrk-sans-ultra-extended: 'wdth' var(--nrk-sans-width-ultra-extended);
	--nrk-sans-features-super: 'ss01', 'ss02';
	--nrk-sans-features-animation: 'ss04';
	fill: currentColor;
	color: #061629;
	font-family: 'NRK Sans Variable', 'Helvetica Neue', Arial, sans-serif;
	font-style: normal;
	font-size: 1.125rem;
	margin: 0 0 1em 0;
	font-weight: 400;
	line-height: 1.55;
}

ul {
	cursor: default;
	font: 100%/1.5 'Helvetica Neue', Helvetica, Arial, sans-serif;
	text-size-adjust: 100%;
	-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
	--nrk-sans-weight-hairline: 1;
	--nrk-sans-weight-thin: 90;
	--nrk-sans-weight-extralight: 180;
	--nrk-sans-weight-light: 290;
	--nrk-sans-weight-regular: 400;
	--nrk-sans-weight-medium: 560;
	--nrk-sans-weight-bold: 700;
	--nrk-sans-weight-extrabold: 800;
	--nrk-sans-weight-heavy: 890;
	--nrk-sans-weight-black: 950;
	--nrk-sans-width-regular: 100;
	--nrk-sans-width-compressed: 50;
	--nrk-sans-width-condensed: 80;
	--nrk-sans-width-semi-condensed: 90;
	--nrk-sans-width-extended: 120;
	--nrk-sans-width-ultra-extended: 200;
	--nrk-sans-regular: 'wdth' var(--nrk-sans-width-regular);
	--nrk-sans-compressed: 'wdth' var(--nrk-sans-width-compressed);
	--nrk-sans-condensed: 'wdth' var(--nrk-sans-width-condensed);
	--nrk-sans-semi-condensed: 'wdth' var(--nrk-sans-width-semi-condensed);
	--nrk-sans-extended: 'wdth' var(--nrk-sans-width-extended);
	--nrk-sans-ultra-extended: 'wdth' var(--nrk-sans-width-ultra-extended);
	--nrk-sans-features-super: 'ss01', 'ss02';
	--nrk-sans-features-animation: 'ss04';
	fill: currentColor;
	color: #061629;
	font-family: 'NRK Sans Variable', 'Helvetica Neue', Arial, sans-serif;
	font-style: normal;
	font-size: 1.125rem;
	padding: 0 0 0 2.5rem;
	margin: 0 0 1em 0;
	font-weight: 400;
	line-height: 1.55;
	padding-left: 1.875em;
}

li {
	cursor: default;
	font: 100%/1.5 'Helvetica Neue', Helvetica, Arial, sans-serif;
	text-size-adjust: 100%;
	-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
	--nrk-sans-weight-hairline: 1;
	--nrk-sans-weight-thin: 90;
	--nrk-sans-weight-extralight: 180;
	--nrk-sans-weight-light: 290;
	--nrk-sans-weight-regular: 400;
	--nrk-sans-weight-medium: 560;
	--nrk-sans-weight-bold: 700;
	--nrk-sans-weight-extrabold: 800;
	--nrk-sans-weight-heavy: 890;
	--nrk-sans-weight-black: 950;
	--nrk-sans-width-regular: 100;
	--nrk-sans-width-compressed: 50;
	--nrk-sans-width-condensed: 80;
	--nrk-sans-width-semi-condensed: 90;
	--nrk-sans-width-extended: 120;
	--nrk-sans-width-ultra-extended: 200;
	--nrk-sans-regular: 'wdth' var(--nrk-sans-width-regular);
	--nrk-sans-compressed: 'wdth' var(--nrk-sans-width-compressed);
	--nrk-sans-condensed: 'wdth' var(--nrk-sans-width-condensed);
	--nrk-sans-semi-condensed: 'wdth' var(--nrk-sans-width-semi-condensed);
	--nrk-sans-extended: 'wdth' var(--nrk-sans-width-extended);
	--nrk-sans-ultra-extended: 'wdth' var(--nrk-sans-width-ultra-extended);
	--nrk-sans-features-super: 'ss01', 'ss02';
	--nrk-sans-features-animation: 'ss04';
	fill: currentColor;
	color: #061629;
	font-family: 'NRK Sans Variable', 'Helvetica Neue', Arial, sans-serif;
	font-style: normal;
	font-size: 1.125rem;
	font-weight: 400;
	line-height: 1.55;
	margin-top: .25rem;
}*/
</style>
<template>
	<div id="site-wrapper" class="">

		<div id="container-navbar" class="w-full py-6 bg-red-500 mb-16">

			<div id="navbar" class="mx-auto flex items-center px-6 max-w-[1000px] bg-red-500 justify-between">
				<span id="logo">
					<svg width="18" height="36" viewBox="0 0 18 36" fill="none" xmlns="http://www.w3.org/2000/svg"
						xmlns:xlink="http://www.w3.org/1999/xlink">
						<path d="M0 0.5H18V35.5H0V0.5Z" fill="url(#pattern0)" />
						<defs>
							<pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
								<use xlink:href="#image0_33_464" transform="scale(0.0555556 0.0285714)" />
							</pattern>
							<image id="image0_33_464" width="18" height="35"
								xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAjCAYAAACZ6FpfAAABuElEQVRIS5WWAVXDMBCGmQLAwaYAcFAUwBQACmAKGAoYCigK2BQwFDAUMAcggf8rTV+4Xpr03rtHl6Zf//uTS5kclMdUU5+Vp8oj5Vb5oqxBTAo5QD5agH1koYFVKehLk4F58aPBWQmIUlAzFIsSUCXCWwb0UALC2O8MaF4CgoEilHmxL/WIhzEamDUco8+Vu1JFQcm1LkgAO+WqvS7eRxmLyjfkaBCG3itDGwDYKrtWSBFjj+gj6k/FWjdugid2UgA96sZdVv+fOlapF4AoJ7dz4wdRVXuKkHxhbjBxo7xUXpl7rioUsf1pgxBAeGuIpS5YgDiO9YO91AUgJsaBQjZbiEoXtvSZxvYWZDi9n7VGbHm9jsi1yFQQDrU4gnf/BnMgT01y1VKleWrwBX96MaSoWA3UFGiUmiHQKDUpkHdGJ70JZnml0Ravxk13pXIbkuPzNppEK9ASg+Epsv68i1AZCi87jMY2HshTdKaH8InwVtT90vJ226RAnloQZQOLI/ntH/qnwXrVlJ7akJ4qz2wWoil7qEXYBnwQ4kMvhlHuXNmcXbnux4ulks/TSUv51F8Ov+4ry/gv0ktUVNzvVVcAAAAASUVORK5CYII=" />
						</defs>
					</svg>
				</span>
				<span class="flex items-center">
					<span id="new-post" class="me-2">
						<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M16.6667 4V6.66667H3.33341V24.5135L5.68384 22.6667H24.6667V13.3333H27.3334V24C27.3334 24.7364 26.7365 25.3333 26.0001 25.3333H6.60615L0.666748 30V5.33333C0.666748 4.59696 1.26371 4 2.00008 4H16.6667ZM23.3334 4V0H26.0001V4H30.0001V6.66667H26.0001V10.6667H23.3334V6.66667H19.3334V4H23.3334Z"
								fill="black" />
						</svg>
					</span>
					<span><img :src="profile_picture" alt="profil-bilde" class="w-12 h-auto"></span>
				</span>
			</div>
		</div>

		<div id="main" class="max-w-[1000px] mx-auto px-6 bg-gray-300 grid grid-cols-10 gap-6">

			<div id="content" class="col-start-1 col-span-6 px-6">
				<span class="mx-auto flex items-center justify-center mb-16">
					<h2 class="bg-red-500 text-[32px] px-4 py-2 m-2 rounded-md">
						Hjem
					</h2>
					<h3 class="text-2xl py-2 px-1 bg-red-500 rounded-md">
						Følger
					</h3>
				</span>

				<hr class="mb-16">

				<div class="article grid-cols-12 grid gap-8">

					<div id="left-col-article" class="col-start-1 col-span-9">
						<span class="flex items-center w-full mb-4">
							<span class="user-picture">
								<img :src="user_picture" alt="Bruker profilbilde" class="w-8 h-auto me-2">
							</span>
							<span class="flex items-center justify-between w-full">
								<span class="username">
									<p class="font-bold">Jon Smith</p>
								</span>
								<p class="font-light">2023-02-11</p>
							</span>
						</span>
						<div class="mb-4 w-full">
							<h3 class="text-[28px] mb-2">title master grand</h3>
							<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores, ad, repellendus culpa
								quod itaque laboriosam odit assumenda, fugit doloremque iste sapiente! Porro voluptas
								fugit ipsam odio repellat nam cumque consequatur!</p>
						</div>

						<span class="flex items-center justify-between">
							<span id="tag" class="text-sm py-0 px-1 bg-red-500 rounded-md">Typescript</span>
							<span class="flex items-center">
								<span id="save-article" class="me-2">
									<svg width="24" height="24" viewBox="0 0 24 24" fill="none"
										xmlns="http://www.w3.org/2000/svg">
										<path
											d="M7 19V13H17V19H19V7.82843L16.1716 5H5V19H7ZM4 3H17L21 7V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3ZM9 15V19H15V15H9Z"
											fill="black" />
									</svg>

								</span>



								<span id="article-options">

									<svg width="24" height="24" viewBox="0 0 24 24" fill="none"
										xmlns="http://www.w3.org/2000/svg">
										<path
											d="M4.5 10.5C3.675 10.5 3 11.175 3 12C3 12.825 3.675 13.5 4.5 13.5C5.325 13.5 6 12.825 6 12C6 11.175 5.325 10.5 4.5 10.5ZM19.5 10.5C18.675 10.5 18 11.175 18 12C18 12.825 18.675 13.5 19.5 13.5C20.325 13.5 21 12.825 21 12C21 11.175 20.325 10.5 19.5 10.5ZM12 10.5C11.175 10.5 10.5 11.175 10.5 12C10.5 12.825 11.175 13.5 12 13.5C12.825 13.5 13.5 12.825 13.5 12C13.5 11.175 12.825 10.5 12 10.5Z"
											fill="black" />
									</svg>


								</span>
							</span>
						</span>
					</div>

					<div id="right-col-article" class="col-span-3 mx-auto my-auto">
						<img :src="article_image" alt="Bilde til artikkel" class="w-full h-auto">
					</div>
				</div>

			</div>

			<div id="aside" class="col-span-4 h-[500px] px-6 bg-blue-500">

			</div>


		</div>

	</div>
</template>

<script setup lang="ts">
import profile_picture from '~/assets/placeholder-profile-picture.png'
import article_image from '~/assets/placeholder-image.jpg'

const user_picture = profile_picture

definePageMeta({
	layout: "blank"
})


</script>

<style scoped></style>
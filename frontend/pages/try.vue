<template>
	<div id="site-wrapper" class="">

		<div id="container-navbar" class="w-full py-4 bg-red-500 mb-16">

			<div id="navbar" class="mx-auto flex items-center px-6 max-w-[1000px] bg-red-500 justify-between">
				<span id="logo">
					<svg width="14" height="32" viewBox="0 0 18 36" fill="none" xmlns="http://www.w3.org/2000/svg"
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
					<span id="new-post" class="me-4">
						<svg width="24" height="24" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M16.6667 4V6.66667H3.33341V24.5135L5.68384 22.6667H24.6667V13.3333H27.3334V24C27.3334 24.7364 26.7365 25.3333 26.0001 25.3333H6.60615L0.666748 30V5.33333C0.666748 4.59696 1.26371 4 2.00008 4H16.6667ZM23.3334 4V0H26.0001V4H30.0001V6.66667H26.0001V10.6667H23.3334V6.66667H19.3334V4H23.3334Z"
								fill="black" />
						</svg>
					</span>
					<span><img :src="profile_picture" alt="profil-bilde" class="w-8 h-auto"></span>
				</span>
			</div>
		</div>

		<div id="main" class="max-w-[1000px] h-fit mx-auto px-6 bg-gray-300 grid grid-cols-10 gap-6">

			<div id="content" class="col-start-1 col-span-6 px-6 mx-auto">
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

			<div id="aside" class="col-span-4 h-fit px-6 bg-blue-500 mb-14 mx-auto">


				<div id="personal-user-card" class="mx-auto mb-16">
					<div class="mb-4 w-full flex items-center ">
						<img :src="profile_picture" class="w-20 h-auto">
						<div class="ml-2">
							<h2 id="card-username" class="text-4xl">Brukernavn</h2>
							<span>

								<p id="card-name">Ola Nordmann</p>
							</span>
						</div>
					</div>
					<p>Antall følgere: 10</p>
					<p>Antall innlegg: 14</p>
				</div>

				<div id="saved-posts" class="mx-auto w-full mb-8">
					<h3 class="text-center text-[28px] mb-9">Lagrede innlegg</h3>

					<div class="flex pb-8">
						<img :src="article_image" class="w-14 h-12">
						<div class="ml-2">
							<p class="font-bold">Burde vi ha blekkspruter i Norge?</p>
							<span class="flex">
								<span><svg width="24" height="24" viewBox="0 0 24 24" fill="none"
										xmlns="http://www.w3.org/2000/svg">
										<path
											d="M6.93912 14.0327C6.7072 14.6562 6.51032 15.233 6.33421 15.8154C7.29345 15.1188 8.43544 14.6766 9.75193 14.512C12.2652 14.1979 14.4976 12.5384 15.6279 10.4535L14.1721 8.99878L15.5848 7.58407C15.9185 7.24993 16.2521 6.91603 16.5858 6.58237C17.0151 6.15301 17.5 5.35838 18.0129 4.21479C12.4197 5.08172 8.99484 8.50636 6.93912 14.0327ZM17 8.99728L18 9.99658C17 12.9966 14 15.9966 10 16.4966C7.33146 16.8301 5.66421 18.6635 4.99824 21.9966H3C4 15.9966 6 1.99658 21 1.99658C20.0009 4.99392 19.0018 6.99303 18.0027 7.99391C17.6662 8.33038 17.3331 8.66372 17 8.99728Z"
											fill="black" />
									</svg>
								</span>
								<span>
									<p>:p Stian Gruve</p>
								</span>
							</span>
						</div>
					</div>

					<div class="flex pb-8">
						<img :src="article_image" class="w-14 h-12">
						<div class="ml-2">
							<p class="font-bold">Burde vi ha blekkspruter i Norge?</p>
							<span class="flex items-center">
								<span><svg width="24" height="24" viewBox="0 0 24 24" fill="none"
										xmlns="http://www.w3.org/2000/svg">
										<path
											d="M6.93912 14.0327C6.7072 14.6562 6.51032 15.233 6.33421 15.8154C7.29345 15.1188 8.43544 14.6766 9.75193 14.512C12.2652 14.1979 14.4976 12.5384 15.6279 10.4535L14.1721 8.99878L15.5848 7.58407C15.9185 7.24993 16.2521 6.91603 16.5858 6.58237C17.0151 6.15301 17.5 5.35838 18.0129 4.21479C12.4197 5.08172 8.99484 8.50636 6.93912 14.0327ZM17 8.99728L18 9.99658C17 12.9966 14 15.9966 10 16.4966C7.33146 16.8301 5.66421 18.6635 4.99824 21.9966H3C4 15.9966 6 1.99658 21 1.99658C20.0009 4.99392 19.0018 6.99303 18.0027 7.99391C17.6662 8.33038 17.3331 8.66372 17 8.99728Z"
											fill="black" />
									</svg>
								</span>
								<span class="flex ms-1">
									<p>Stian Gruve</p>
								</span>
							</span>
						</div>
					</div>
				</div>

				<div id="following-card" class="mx-auto w-full">
					<h3 class="text-[28px] text-center mb-9">Følger</h3>

					<span class="mb-4 flex items-center">
						<img :src="user_picture" class="w-6 h-auto">
						<p class="ms-2">Mats Ole Bak</p>
					</span>
					<span class="mb-4 flex items-center">
						<img :src="user_picture" class="w-6 h-auto">
						<p class="ms-2">Mats Ole Bak</p>
					</span>
					<span class="mb-4 flex items-center">
						<img :src="user_picture" class="w-6 h-auto">
						<p class="ms-2">Mats Ole Bak</p>
					</span>
					<span class="mb-4 flex items-center">
						<img :src="user_picture" class="w-6 h-auto">
						<p class="ms-2">Mats Ole Bak</p>
					</span>
				</div>

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
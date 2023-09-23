<template>
	<div id="site-wrapper" class="bg-background">

		<div id="container-navbar" class="w-full py-4 text-onPrimary bg-primary mb-16">

			<div id="navbar" class="mx-auto flex items-center max-w-[1000px] bg-primary justify-between">
				<span class="flex items-center">
					<span id="logo">
						<svg class="w-8 h-auto fill-onPrimary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19.9381 8H21C22.1046 8 23 8.89543 23 10V14C23 15.1046 22.1046 16 21 16H19.9381C19.446 19.9463 16.0796 23 12 23V21C15.3137 21 18 18.3137 18 15V9C18 5.68629 15.3137 3 12 3C8.68629 3 6 5.68629 6 9V16H3C1.89543 16 1 15.1046 1 14V10C1 8.89543 1.89543 8 3 8H4.06189C4.55399 4.05369 7.92038 1 12 1C16.0796 1 19.446 4.05369 19.9381 8ZM3 10V14H4V10H3ZM20 10V14H21V10H20ZM7.75944 15.7849L8.81958 14.0887C9.74161 14.6662 10.8318 15 12 15C13.1682 15 14.2584 14.6662 15.1804 14.0887L16.2406 15.7849C15.0112 16.5549 13.5576 17 12 17C10.4424 17 8.98882 16.5549 7.75944 15.7849Z"></path></svg>
					</span>
					<span id="searchbar" class="ms-8 "><input placeholder="Søk" class="border border-transparent rounded-2xl w-96 h-auto" type="text"></span>
				</span>

				<span class="flex items-center">
					<span id="new-post" class="me-4 flex items-center flex-col">
						<svg class="mb-1 w-7 h-auto fill-onPrimary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M14 3V5H4V18.3851L5.76282 17H20V10H22V18C22 18.5523 21.5523 19 21 19H6.45455L2 22.5V4C2 3.44772 2.44772 3 3 3H14ZM19 3V0H21V3H24V5H21V8H19V5H16V3H19Z"></path></svg>
						<span class="text-xs">Nytt innlegg</span>
					</span>
					<span class="flex items-center flex-col">
							<svg class="mb-1 w-8 h-auto fill-onPrimary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM12.1597 16C10.1243 16 8.29182 16.8687 7.01276 18.2556C8.38039 19.3474 10.114 20 12 20C13.9695 20 15.7727 19.2883 17.1666 18.1081C15.8956 16.8074 14.1219 16 12.1597 16ZM12 4C7.58172 4 4 7.58172 4 12C4 13.8106 4.6015 15.4807 5.61557 16.8214C7.25639 15.0841 9.58144 14 12.1597 14C14.6441 14 16.8933 15.0066 18.5218 16.6342C19.4526 15.3267 20 13.7273 20 12C20 7.58172 16.4183 4 12 4ZM12 5C14.2091 5 16 6.79086 16 9C16 11.2091 14.2091 13 12 13C9.79086 13 8 11.2091 8 9C8 6.79086 9.79086 5 12 5ZM12 7C10.8954 7 10 7.89543 10 9C10 10.1046 10.8954 11 12 11C13.1046 11 14 10.1046 14 9C14 7.89543 13.1046 7 12 7Z"></path></svg>					
						<span class="text-xs">Min profile</span>
					</span>
				</span>
			</div>
		</div>

		<div id="main" class="max-w-[1100px] h-fit mx-auto px-6 grid grid-cols-10 gap-28">

			<div id="content" class="col-span-6 mx-auto">

				<div class="article grid-cols-12 grid gap-8 mb-16">

					<div id="left-col-article" class="col-start-1 col-end-9">
						<span class="flex items-center w-full mb-2">
							<span class="user-picture flex items-center">
								<img :src="user_picture" alt="Bruker profilbilde" class=" w-6 h-auto me-2">
							</span>
							<span class="flex items-center justify-between w-full">
								<span class="flex items-center username">
									<p class=" font-bold">Jon Smith</p>
								</span>
								<p class=" font-light">2023-02-11</p>
							</span>
						</span>
						<div class="mb-4 w-full">
							<h3 class=" text-[28px] mb-2">title master grand</h3>
							<p class="mb-2 prose">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores, ad, repellendus culpa
								quod itaque laboriosam odit assumenda, fugit doloremque iste sapiente! Porro voluptas
								fugit ipsam odio repellat nam cumque consequatur!</p>
								<span class="text-sm text-primary-base text-primary">Les mer</span>
							</div>

						<span class="flex items-center justify-between">
								<span class="flex items-center">
									<span id="tag" class="text-xs py-1 px-1 bg-primary text-onPrimary rounded-md">Typescript</span>
								</span>

							<span class="flex items-center">
								<span id="save-article" class="me-2 w-auto h-auto mx-auto flex items-center justify-center">
									<svg width="24" height="24" viewBox="0 0 24 24" fill="none"
										xmlns="http://www.w3.org/2000/svg">
										<path
											d="M7 19V13H17V19H19V7.82843L16.1716 5H5V19H7ZM4 3H17L21 7V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3ZM9 15V19H15V15H9Z"
											fill="black" />
									</svg>

								</span>



								<span id="article-options" class="w-auto h-auto mx-auto flex items-center justify-center">

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

					<div id="right-col-article" class="col-span-4 flex items-center justify-center|">
						<img :src="article_image" alt="Bilde til artikkel" class="w-full h-auto">
					</div>

				</div>
				<hr class="mb-16">

			</div>

			<div id="aside" class="col-span-4 h-fit mb-14 mx-auto">


				<div id="personal-user-card" class="mx-auto mb-8">
					<div class="mb-4 w-full flex items-center ">
						<img :src="profile_picture" class="w-20 h-auto">
						<div class="ml-2">
							<h2 id="card-username" class=" text-4xl">Brukernavn</h2>
							<span>

								<p id="card-name" class="prose">Ola Nordmann</p>
							</span>
						</div>
					</div>
					<p>Antall følgere: 10</p>
					<p>Antall innlegg: 14</p>
				</div>
				<hr class="mb-8">

				<div id="saved-posts" class="mx-auto w-full mb-8">
					<h3 class=" text-[28px] mb-9">Lagrede innlegg</h3>

					<div class="w-full mx-auto">
						<div class="flex pb-8">
							<img :src="article_image" class="w-14 h-12">
							<div class="ml-2">
								<p class=" font-bold">Burde vi ha blekkspruter i Norge?</p>
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
						<p class="-mt-2 text-xs text-primary-base">Se alle</p>
					</div>
				</div>
				<hr class="mb-8">

				<div id="following-card" class="mx-auto w-full">
					<h3 class="text-[28px] mb-9">Følger</h3>
					<div>
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
					<span class="text-xs text-primary-base">Se alle</span>
				</div>

			</div>


		</div>




	</div>
</template>

<script setup lang="ts">

import profile_picture from '~/assets/placeholder-profile-picture.png'
// import article_image from '~/assets/placeholder-image.jpg'

const article_image = "https://picsum.photos/500/300"

const user_picture = profile_picture

definePageMeta({
	layout: "blank"
})


</script>

<style scoped></style>
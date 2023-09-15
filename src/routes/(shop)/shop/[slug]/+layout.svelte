<script lang="ts">
import { Footer, Nav } from '$lib/theme-config'
import { PageTransitions } from '$lib/components'
import {Footer as FooterV2} from "$lib/components"
import NavIcon from '$lib/assets/icons/nav-icon.svelte'

export let data;

let showMobileNavMenu = false;

let showCartSidebar = false
let openSidebar = false
</script>

<div class="{showCartSidebar || openSidebar ? 'h-screen overflow-hidden' : 'h-full'} antialiased">
	<Nav
		me="{data["me"]}"
		cart="{data["cart"]}"
		store="{data["store"]}"
		sticky={false}
		data={undefined}
		bind:showCartSidebar="{showCartSidebar}"
		bind:openSidebar="{openSidebar}"
	/>
		
	<div class="w-100 h-[500px] bg-gray-300 relative flex justify-center items-center font-jost">

		<h1 class="text-3xl font-bold relative z-[50]">
			{data.shop.name}
		</h1>

		{#if data.shop.banner}
			<img 
				class="w-[100%] h-[100%] object-cover absolute top-0 bottom-0 left-0 right-0"
				src={data.shop.banner}
				alt={`banner for ${data.shop.name}`}
			/>
		{/if}
	</div>


	<!-- Shop Nav -->
	<div class="w-100 sticky z-[80] top-0 h-[80px] bg-gray-100 px-3 md:px-12 flex flex-row justify-between items-center font-jost">

		<div class="nav-wrapper w-full h-[40px] flex flex-row justify-start items-center gap-12">
			{#if data.shop.icon}
				<a href={`/shop/${data.shop.slug}`} data-sveltekit-preload-data>
					<img 
					class="w-[100px] h-[100%] object-contain"
					src={data.shop.icon}
					alt={`icon for ${data.shop.name}`}
					/>
				</a>

			{:else}
				<a href={`/shop/${data.shop.slug}`} data-sveltekit-preload-data><h1 class="text-2xl font-bold max-w-[300px] min-w-[100px]">{data.shop.name}</h1></a>
			{/if}

			<ul class="desktop-shop-nav flex flex-row justify-start items-center gap-5 mt-1">
				<li class={`text-base transition duration-300 ${data.route === '/' ? 'text-primary-900' : ''}`}><a href={`/shop/${data.shop.slug}`} data-sveltekit-preload-data>HOME</a></li>
				<li class={`text-base transition duration-300 ${data.route.includes('products') ? 'text-primary-900' : ''}`}><a href={`/shop/${data.shop.slug}/products`} data-sveltekit-preload-data>ALL PRODUCTS</a></li>
				<li class={`text-base transition`}><div>CATEGORIES</div></li>
			</ul>

			<div class="mobile-shop-nav">
				<button class={`${showMobileNavMenu ? "text-primary-900" : ""} transition`} on:click="{() => (showMobileNavMenu = !showMobileNavMenu)}">
					<NavIcon />
				</button>

				{#if showMobileNavMenu}
				<ul class="absolute top-[100%] left-0 right-0 bg-gray-100 flex flex-col justify-start items-start">
					<li class={`text-base h-[60px] px-4 border-t w-full border-gray-300 flex justify-start items-center transition duration-300 ${data.route === '/' ? 'text-primary-900' : ''}`}>
						<a href={`/shop/${data.shop.slug}`} data-sveltekit-preload-data>HOME</a>
					</li>
					<li class={`text-base h-[60px] px-4 border-t w-full border-gray-300 flex justify-start items-center transition duration-300 ${data.route.includes('products') ? 'text-primary-900' : ''}`}>
						<a href={`/shop/${data.shop.slug}/products`} data-sveltekit-preload-data>ALL PRODUCTS</a>
					</li>
					<li class={`text-base h-[60px] px-4 border-t border-b w-full border-gray-300 flex justify-start items-center transition`}><div>CATEGORIES</div></li>
				</ul>
				{/if}

			</div>
		</div>
	</div>

	<PageTransitions url="{data["url"]}">
		<slot />
	</PageTransitions>

	<div class="hidden lg:block">
		<FooterV2
		/>
	</div>
</div>

<style>
.nav-wrapper {
	justify-content: space-between;
}

.desktop-shop-nav {
	display: none;
}

.mobile-shop-nav {
	display: block;
}

@media only screen and (min-width: 523px) {
.nav-wrapper {
	justify-content: start;
}
.desktop-shop-nav {
	display: flex;
}

.mobile-shop-nav {
	display: none;
}
}
</style>
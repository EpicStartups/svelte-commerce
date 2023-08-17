<script lang="ts">
// import { getMegamenuFromStore } from '$lib/store/megamenu'
import { browser } from '$app/environment'
import { CategoriesMobile, Hero, HeroBanners, PickedBanners } from '$lib/theme-config'
import { CategoryService } from '$lib/services'
import { Footer, MobileFooter } from '$lib/components'
import { onMount } from 'svelte'
import { page } from '$app/stores'
import { Skeleton, Textbox } from '$lib/ui'
import { generateSeoProps, toast } from '$lib/utils'
import dayjs from 'dayjs'
import Fuse from 'fuse.js'
import SEO from '$lib/components/SEO/index.svelte'
import type { Store } from '$lib/types.js'

let today = dayjs(new Date()).toISOString()
interface Data {
	shop: Store
}
export let data: Data;

let seoProps = generateSeoProps({
	title: data.shop.name,
	metaDescription: data.shop.name,
	keywords: data.shop.name
})

</script>

<SEO {...seoProps} />

<div class="w-100 h-[500px] bg-gray-300 relative flex justify-center items-center">

	<h1 class="text-3xl font-bold">
		{data.shop.name}
	</h1>

</div>

<div class="w-100 sticky top-0 h-[100px] bg-gray-100 px-12 flex flex-row justify-between items-center">
	<div class="w-[100px] h-[60px] bg-black">

	</div>
</div>

<div class="w-100 min-h-[1000px] p-4">
	<div class="">

	</div>
	<div class="product-list w-100 max-w-[1500px] mx-auto min-h-[200px] mt-4 grid gap-12 ">
		{#each data.shop.products as product}
			<a 
			href={`/product/${product.slug}`}
			class="w-100 h-[400px] grid grid-rows-[250px_auto] shadow hover:shadow-md rounded-xl"
			data-sveltekit-preload-data
			>
				<div class="w-100 h-100">
					<img class="w-[100%] h-[100%] object-contain" src={product.img} alt={`thumbnail of ${product.name}`}/>
				</div>
				<div class="flex flex-col justify-between items-start px-4 py-6">
					<div>
						<h4>{product.name}</h4>
						<p>{product.price.value}</p>
					</div>
					
				</div>
			</a>
		{/each}
	</div>
</div>

<style>

.product-list {
	grid-template-columns: 1fr;
}

@media only screen and (min-width: 610px) {
.product-list {
	grid-template-columns: repeat(2, 1fr);
}
}

@media only screen and (min-width: 930px) {
.product-list {
	grid-template-columns: repeat(3, 1fr);
}
}

@media only screen and (min-width: 1230px) {
.product-list {
	grid-template-columns: repeat(4, 1fr);
}
}



</style>
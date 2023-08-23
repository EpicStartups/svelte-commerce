<script lang="ts">
// import { getMegamenuFromStore } from '$lib/store/megamenu'
import { generateSeoProps, toast } from '$lib/utils'
import dayjs from 'dayjs'
import Fuse from 'fuse.js'
import SEO from '$lib/components/SEO/index.svelte'
import type { Store } from '$lib/types.js'
import ShopWidgets from '$lib/sections/shop/ShopWidgets.svelte'

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

<div class="w-100 sticky z-[80] top-0 h-[80px] bg-gray-100 px-12 flex flex-row justify-between items-center">

	<div class="w-[100px] h-[40px]">
		{#if data.shop.icon}
			<img 
			class="w-[100%] h-[100%] object-contain"
			src={data.shop.icon}
			alt={`icon for ${data.shop.name}`}
			/>
		{/if}
	</div>
</div>

<ShopWidgets widgets={data.shop.widgets}/>

<div class="w-full min-h-[1000px] p-4 font-jost">
	<h2 class="text-center my-8">All Products</h2>
	<div class="product-list w-100 max-w-[1500px] mx-auto min-h-[200px] mt-4 grid gap-12 ">
		{#each data.shop.products as product}
			<a 
			href={`/product/${product.slug}`}
			class="w-100 h-[400px] grid grid-rows-[250px_auto] shadow hover:shadow-md rounded-xl overflow-hidden"
			data-sveltekit-preload-data
			>
				<div class="w-100 h-100">
					<img class="w-[100%] h-[100%] object-cover" src={product.img} alt={`thumbnail of ${product.name}`}/>
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
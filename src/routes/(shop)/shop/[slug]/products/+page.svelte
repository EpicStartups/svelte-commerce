<script lang="ts">
import StarRating from "$lib/components/StarRating.svelte"

export let data;
</script>

<div class="w-full p-4 font-jost mt-10 mb-24">
	<h2 class="text-center my-8 text-3xl">All Products</h2>
	<div class="product-list w-100 max-w-[1500px] mx-auto mt-4 grid gap-12 ">
		{#each data.shop.products as product}
			<a 
			href={`/product/${product.slug}`}
			class="w-100 h-[400px] grid grid-rows-[250px_auto] shadow hover:shadow-md rounded-xl overflow-hidden"
			data-sveltekit-preload-data
			>
				<div class="w-100 h-100">
					<img class="w-[100%] h-[100%] object-cover" src={product.img} alt={`thumbnail of ${product.name}`}/>
				</div>
				<div class="flex flex-col justify-between items-start p-4">
					<div>
						<h4>{product.name}</h4>   
                        <StarRating rating={product.rating} size={'15px'}/>
						
					</div>
                    <div>
                        <p>{product.price.value}</p>
                        <p>orders completed ({product.orders_completed})</p>
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
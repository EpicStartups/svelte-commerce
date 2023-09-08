<script lang="ts">
import { page } from '$app/stores'
import CatelogNav from '$lib/components/CatelogNav.svelte'
import { ProductListingSearchPage } from '$lib/theme-config'

export let data
</script>

<ProductListingSearchPage data="{data}" />
<!-- <CatelogNav me="{$page?.data?.me}" cart="{$page?.data?.cart}" showCartSidebar="{undefined}" openSidebar="{undefined}">
	<div class="flex max-w-max flex-col items-start gap-1">
		{#if data.searchData}
			<h5 class="w-28 truncate capitalize leading-4">{data.searchData}</h5>
		{/if}

		<p>
			{#if data.products?.count}
				{data.products?.count}

				Items
			{:else}
				No Item
			{/if}
		</p>
	</div>
</CatelogNav> -->
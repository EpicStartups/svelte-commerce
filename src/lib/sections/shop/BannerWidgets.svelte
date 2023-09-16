<script lang="ts">
import type { ShopHeroWidget } from "$lib/types/shopBannerWidgets"
import ParallelQuote from "./bannerWidgets/ParallelQuote.svelte"
import SideQuote from "./bannerWidgets/SideQuote.svelte"
import SimpleQuote from "./bannerWidgets/SimpleQuote.svelte";

export let widgets: ShopHeroWidget[] = [];

</script>

<div class="w-full h-full overflow-x-hidden font-jost">
	{#each widgets as widget}
		{#if widget.type === "SimpleQuote"}
			<SimpleQuote props={widget} />
		{:else if widget.type === "SideQuote"}
			<SideQuote props={widget} />
		{:else if widget.type === "ParallelQuote"}
			<ParallelQuote props={widget} />
		{/if}
	{/each}
</div>

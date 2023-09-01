<script lang="ts">
import SideQuote from "./widgets/SideQuote.svelte"
import SimpleQuote from "./widgets/SimpleQuote.svelte";
import ParallelQuote from "./widgets/ParallelQuote.svelte";
import ImageGrid12 from "./widgets/ImageGrid12.svelte"
import ImageGrid6 from "./widgets/ImageGrid6.svelte"
import type { ProductWidget } from "$lib/types/productWidget"

export let widgets: ProductWidget[] = [];

</script>

<div class="w-full">    
	{#each widgets as widget}
		{#if widget.type === "SimpleQuote"}
			<SimpleQuote props={widget} />
		{:else if widget.type === "SideQuote"}
			<SideQuote props={widget} />
        {:else if widget.type === "ImageGrid6"}
            <ImageGrid6 props={widget}/>
        {:else if widget.type === "ImageGrid12"}
            <ImageGrid12 props={widget}/>
        {:else if widget.type === "ParallelQuote"}
            <ParallelQuote props={widget}/>
		{/if}
	{/each}
</div>

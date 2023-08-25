<script lang="ts">
import SideQuote from "./widgets/SideQuote.svelte"
import SimpleQuote from "./widgets/SimpleQuote.svelte";
import ParallelQuote from "./widgets/ParallelQuote.svelte";
import type { ProductWidget } from "./widgets/types"
import ImageGrid12 from "./widgets/ImageGrid12.svelte"
import ImageGrid6 from "./widgets/ImageGrid6.svelte"

export let widgets: ProductWidget[] = [];

</script>

<div class="w-full">    
	{#each widgets as widget}
		{#if widget.type === "SimpleQuote"}
			<SimpleQuote props={widget} />
		{:else if widget.type === "SideQuote"}
			<SideQuote props={widget} />
        {:else if widget.type === "ImageGrid6Props"}
            <ImageGrid6 props={widget}/>
        {:else if widget.type === "ImageGrid12Props"}
            <ImageGrid12 props={widget}/>
        {:else if widget.type === "ParallelQuote"}
            <ParallelQuote props={widget}/>
		{/if}
	{/each}
</div>

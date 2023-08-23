<script lang="ts">
import SideQuote from "./widgets/sideQuote.svelte"
import SimpleQuote from "./widgets/simpleQuote.svelte";
import type { StoreWidget } from "./widgets/types"

export let widgets: StoreWidget[] = [];

</script>

<div class="w-full">
	{#each widgets as widget}
		{#if widget.type === "SimpleQuote"}
			<SimpleQuote props={widget} />
		{:else if widget.type === "SideQuote"}
			<SideQuote props={widget} />
		{/if}
	{/each}
</div>

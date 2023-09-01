<script lang="ts">
import type { StoreWidget } from "$lib/types/shopWidgets"
import ImageGrid12 from "./widgets/ImageGrid12.svelte"
import ImageGrid6 from "./widgets/ImageGrid6.svelte"
import ParallelQuote from "./widgets/ParallelQuote.svelte"
import TextEditor from "./widgets/TextEditor.svelte"
import RowSliders from "./widgets/RowSliders.svelte"
import SideQuote from "./widgets/SideQuote.svelte"
import SimpleQuote from "./widgets/SimpleQuote.svelte";

export let widgets: StoreWidget[] = [];

</script>

<div class="w-full">
	{#each widgets as widget}
		{#if widget.type === "SimpleQuote"}
			<SimpleQuote props={widget} />
		{:else if widget.type === "SideQuote"}
			<SideQuote props={widget} />
		{:else if widget.type === "ImageGrid12"}
			<ImageGrid12 props={widget}/>
		{:else if widget.type === "ParallelQuote"}
			<ParallelQuote props={widget} />
		{:else if widget.type === "ImageGrid6"}
			<ImageGrid6 props={widget} />
		{:else if widget.type === "TextEditor"}
			<TextEditor props={widget} />
		{:else if widget.type === "RowSliders"}
			<RowSliders props={widget} />
		{/if}
	{/each}
</div>

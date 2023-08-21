<script lang="ts">
import MdStarBorder from 'svelte-icons/md/MdStarBorder.svelte'

export let rating: number = 0
export let size: string = "30px";
</script>

<div class="flex flex-row justify-start items-start text-start">
    <div class={`${rating >= 1 ? "text-primary-900" : "text-gray-500"}`} style={`height: ${size}`}>
        <MdStarBorder />
    </div>
    <div class={`${rating >= 2 ? "text-primary-900" : "text-gray-500"}`} style={`height: ${size}`}>
        <MdStarBorder />
    </div>
    <div class={`${rating >= 3 ? "text-primary-900" : "text-gray-500"}`} style={`height: ${size}`}>
        <MdStarBorder />
    </div>
    <div class={`${rating >= 4 ? "text-primary-900" : "text-gray-500"}`} style={`height: ${size}`}>
        <MdStarBorder />
    </div>
    <div class={`${rating >= 5 ? "text-primary-900" : "text-gray-500"}`} style={`height: ${size}`}>
        <MdStarBorder />
    </div>
</div>


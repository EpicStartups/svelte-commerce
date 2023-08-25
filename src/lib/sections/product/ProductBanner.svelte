<script lang="ts">
import { LazyImg } from "$lib/components"
import type { Product } from "$lib/types"
import {createEventDispatcher} from "svelte"

export let product: Product;
export let product_image_dimension: any;

const dispatch = createEventDispatcher();

const handleImageClick = (index: number) => {
    dispatch("imageClick", index);
}

</script>

<div class="col-span-1 h-auto lg:col-span-3">
    <div
        class="flex w-full grid-cols-2 flex-row gap-2 overflow-x-scroll scrollbar-none md:grid">
        {#if product?.images?.length}
            {#each product?.images as img, index}
                <button
                    type="button"
                    class="cursor-zoom-in overflow-hidden rounded md:flex-shrink w-full h-auto min-h-[300px] flex items-center justify-center shrink-0"
                    on:click="{() => handleImageClick(index)}">
                    {#if product_image_dimension === '1x1'}
                        <LazyImg
                            src="{img}"
                            alt="{product?.name} catelog {index}"
                            height="512"
                            width="512"
                            aspect_ratio="1:1"
                            class="object-cover object-center w-full h-auto first-line:text-xs" />
                    {:else}
                        <LazyImg
                            src="{img}"
                            alt="{product?.name}"
                            height="512"
                            class="object-contain object-top w-full h-auto first-line:text-xs" />
                    {/if}
                </button>
            {/each}
        {:else}
            <div
                class="w-full h-[512px] bg-zinc-100 flex flex-col items-center justify-center p-5 text-zinc-500 text-xs text-center">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6">
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                    ></path>
                </svg>

                <span>No image available</span>
            </div>
        {/if}
    </div>
</div>
<script lang="ts">
import type { MedusaProductSpecs } from '$lib/services/medusa/types'
import { fade } from 'svelte/transition';

export let specs: MedusaProductSpecs;
export let productName: string;

let showSpec: boolean = true;

const toggleSpecHandler = (val: boolean) => {
    if (val === true) {
        document.body.style.overflow = "hidden"
    } else {
        document.body.style.overflow = "auto"
    }
    showSpec = val;
}
console.log("specs: ", specs)
console.log("product spec: ", productName);
</script>

<div class="w-full min-h-[100px] px-6 py-4 flex flex-col justify-center items-center gap-12">
    <ul class="w-full flex flex-row justify-center items-center flex-wrap gap-4">
        <li class="spec-item flex flex-col justify-center items-center">
            <h3>24"</h3>
            <p>flat display</p>
        </li>
        <li class="spec-item flex flex-col justify-center items-center">
            <h3>FHD</h3>
            <p>1920 x 1080</p>
        </li>
        <li class="spec-item flex flex-col justify-center items-center">
            <h3>165Hz</h3>
            <p>refresh rate</p>
        </li>
        <li class="spec-item flex flex-col justify-center items-center">
            <h3>1ms GTG</h3>
            <p>response time</p>
        </li>
        <li class="spec-item flex flex-col justify-center items-center">
            <h3>16.7M</h3>
            <p>display colors</p>
        </li>
        <li class="spec-item flex flex-col justify-center items-center">
            <h3>105%</h3>
            <p>sRGB color gamut</p>
        </li>
    </ul>
    <button
        class="px-8 py-3 bg-dark-700 hover:bg-primary-900 transition-all duration-300 text-white rounded"
        on:click|preventDefault={() => toggleSpecHandler(true)}
    >
        See All Specs
    </button>
</div>


{#if showSpec}
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div 
    transition:fade={{duration: 100}}
    class={`fixed transform top-0 bottom-0 left-0 right-0 z-[99] bg-black/70 backdrop-blur-sm transition-all duration-300 overflow-y-auto px-4 py-20`}
    on:click|self={() => toggleSpecHandler(false)}
>

    <div class="w-full max-w-[1300px] mx-auto min-h-[80svh] relative">
        <button 
            class="w-[50px] h-[50px] absolute top-[-10px] right-0 text-white text-3xl font-bold flex justify-center items-center"
            on:click|self={() => toggleSpecHandler(false)}
        >
            X
        </button>
        <h2 class="text-white text-3xl text-center mb-12">Product Name</h2>
        <div class="w-full grid auto-rows-auto grid-cols-[1fr_1fr] gap-8">
            <div class="w-full">
                <h3 class="px-4 py-4 text-start text-white mb-4 bg-black/80">KEY SPECIFICATIONS</h3>
                <ul class="flex flex-col  gap-3">
                    <li class="border-b-2 flex justify-between items-center px-4 py-2">
                        <p class="text-lg text-gray-300">Screen Size</p>
                        <p class="text-lg text-white">24"</p>
                    </li>
                    <li class="border-b-2 flex justify-between items-center px-4 py-2">
                        <p class="text-lg text-gray-300">Screen Size</p>
                        <p class="text-lg text-white">24"</p>
                    </li>
                    <li class="border-b-2 flex justify-between items-center px-4 py-2">
                        <p class="text-lg text-gray-300">Screen Size</p>
                        <p class="text-lg text-white">24"</p>
                    </li>
                    <li class="border-b-2 flex justify-between items-center px-4 py-2">
                        <p class="text-lg text-gray-300">Screen Size</p>
                        <p class="text-lg text-white">24"</p>
                    </li>
                    <li class="border-b-2 flex justify-between items-center px-4 py-2">
                        <p class="text-lg text-gray-300">Screen Size</p>
                        <p class="text-lg text-white">24"</p>
                    </li>
                    <li class="border-b-2 flex justify-between items-center px-4 py-2">
                        <p class="text-lg text-gray-300">Screen Size</p>
                        <p class="text-lg text-white">24"</p>
                    </li>
                </ul>
            </div>

            <div class="w-full">
                <h3 class="px-4 py-4 text-start text-white mb-4 bg-black/80">KEY SPECIFICATIONS</h3>
                <ul>
                    <li>

                    </li>
                </ul>
            </div>

            <div class="w-full">
                <h3 class="px-4 py-4 text-start text-white mb-4 bg-black/80">KEY SPECIFICATIONS</h3>
                <ul>
                    <li>

                    </li>
                </ul>
            </div>

            <div class="w-full">
                <h3 class="px-4 py-4 text-start text-white mb-4 bg-black/80">KEY SPECIFICATIONS</h3>
                <ul>
                    <li>

                    </li>
                </ul>
            </div>

            <div class="w-full">
                <h3 class="px-4 py-4 text-start text-white mb-4 bg-black/80">KEY SPECIFICATIONS</h3>
                <ul class="flex flex-col  gap-3">
                    <li class="border-b-2 flex justify-between items-center px-4 py-2">
                        <p class="text-lg text-gray-300">Screen Size</p>
                        <p class="text-lg text-white">24"</p>
                    </li>
                    <li class="border-b-2 flex justify-between items-center px-4 py-2">
                        <p class="text-lg text-gray-300">Screen Size</p>
                        <p class="text-lg text-white">24"</p>
                    </li>
                    <li class="border-b-2 flex justify-between items-center px-4 py-2">
                        <p class="text-lg text-gray-300">Screen Size</p>
                        <p class="text-lg text-white">24"</p>
                    </li>
                    <li class="border-b-2 flex justify-between items-center px-4 py-2">
                        <p class="text-lg text-gray-300">Screen Size</p>
                        <p class="text-lg text-white">24"</p>
                    </li>
                    <li class="border-b-2 flex justify-between items-center px-4 py-2">
                        <p class="text-lg text-gray-300">Screen Size</p>
                        <p class="text-lg text-white">24"</p>
                    </li>
                    <li class="border-b-2 flex justify-between items-center px-4 py-2">
                        <p class="text-lg text-gray-300">Screen Size</p>
                        <p class="text-lg text-white">24"</p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>

{/if}


<style>
.spec-item {
    padding: 0rem 3rem;
    border-left: 2px solid rgb(177, 175, 175);
}

.spec-item:nth-child(1) {
    border-left: 0px;
}
</style>
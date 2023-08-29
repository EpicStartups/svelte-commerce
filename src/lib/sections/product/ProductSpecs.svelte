<script lang="ts">
import { description } from '$lib/config'
import type { MedusaProductSpecs } from '$lib/services/medusa/types'
import { fade } from 'svelte/transition';

export let specs: MedusaProductSpecs;
export let productName: string;

let showSpec: boolean = false;

const toggleSpecHandler = (val: boolean) => {
    if (val === true) {
        document.body.style.overflow = "hidden"
    } else {
        document.body.style.overflow = "auto"
    }
    showSpec = val;
}
</script>

<div class="w-full min-h-[100px] px-6 py-4 flex flex-col justify-center items-center gap-12">
    <ul class="w-full flex flex-row justify-center items-center flex-wrap gap-4">
        {#each specs.mainSpecs as spec}
        <li class="spec-item flex flex-col justify-center items-center">
            <h3>{spec.header}</h3>
            <p>{spec.description}</p>
        </li>  
        {/each}
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
    class={`fixed transform top-0 bottom-0 left-0 right-0 z-[99] bg-black/90 backdrop-blur-sm transition-all duration-300 overflow-y-auto px-4 py-20`}
    on:click|self={() => toggleSpecHandler(false)}
>

    <div class="w-full max-w-[1300px] mx-auto min-h-[80svh] relative">
        <button 
            class="w-[50px] h-[50px] absolute top-[-10px] right-0 text-white text-3xl font-bold flex justify-center items-center"
            on:click|self={() => toggleSpecHandler(false)}
        >
            X
        </button>
        <h2 class="text-white text-3xl text-center mb-12">{productName}</h2>
        <div class="w-full grid auto-rows-auto grid-cols-[1fr_1fr] gap-8">
            {#each specs.specs as spec (`table-${spec.title}`)}
            <div class="w-full">
                <h3 class="px-4 py-4 text-start text-white mb-4 bg-black/80">{spec.title}</h3>
                <ul class="flex flex-col  gap-3">
                    {#each spec.descriptions as desc (`description-${desc.key}-table-${spec.title}`)}
                    <li class="border-b-2 flex justify-between items-center px-4 py-2">
                        <p class="text-lg text-gray-300">{desc.key}</p>
                        <p class="text-lg text-white">{desc.value}</p>
                    </li>
                    {/each}
                </ul>
            </div>
            {/each}


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
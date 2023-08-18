<script lang="ts">
import { Splide, SplideSlide, SplideTrack, type Options as SplideOptions } from '@splidejs/svelte-splide';
import '@splidejs/svelte-splide/css';
import MdStarBorder from 'svelte-icons/md/MdStarBorder.svelte'
import StarRating from '$lib/components/StarRating.svelte';

/*
TYPES
*/
type Tab = "men" | "women" | "shoes" | "watches" | "jewelry";

/*
VARIABLES
*/
const splideOptions: SplideOptions = {
    rewind: true,
    arrows: false,
    perPage: 5,
    breakpoints: {
        550: {
            perPage: 1,
            perMove: 1,
        },
        1200: {
            perPage: 2,
            perMove: 2
        },
        1270: {
            perPage: 3
        },
        1600: {
            perPage: 4
        },
    },
    gap: "1rem"
}
let active: Tab = "men";

/*
HANDLERS
*/
const changeTab = (tab: Tab) => {
    active = tab;
}

</script>

<section class="home-featured-product lg:py-24 py-16 bg-primary-300 min-h-[500px] font-jost">
    <h2 class="text-center text-2xl">FEATURED PRODUCTS</h2>

    <div class="w-[100%] max-w-[500px] mx-auto flex justify-between items-center flex-wrap mt-8">
        <button 
            class={`${active === "men" ? "underline underline-offset-8 decoration-primary-900 decoration-2" : "text-black/50"} transition-all`}
            on:click|preventDefault="{() => changeTab("men")}"
        >
        MEN
        </button>
        <button 
            class={`${active === "women" ? "underline underline-offset-8 decoration-primary-900 decoration-2" : "text-black/50"} transition-all`}
            on:click|preventDefault="{() => changeTab("women")}"
        >
        WOMEN
        </button>
        <button 
            class={`${active === "shoes" ? "underline underline-offset-8 decoration-primary-900 decoration-2" : "text-black/50"} transition-all`}
            on:click|preventDefault="{() => changeTab("shoes")}"
        >
        SHOES
        </button>
        <button 
            class={`${active === "watches" ? "underline underline-offset-8 decoration-primary-900 decoration-2" : "text-black/50"} transition-all`}
            on:click|preventDefault="{() => changeTab("watches")}"
        >
        WATCHES
        </button>
        <button 
            class={`${active === "jewelry" ? "underline underline-offset-8 decoration-primary-900 decoration-2" : "text-black/50"} transition-all`}
            on:click|preventDefault="{() => changeTab("jewelry")}"
        >
        JEWELRY
        </button>
    </div>

    <Splide options={splideOptions} hasTrack={true} class="featured-product-splide h-[530px] max-w-[100vw] mt-12 px-6 ">
            {#each [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as num}
                <SplideSlide class="h-[480px] bg-white w-[100%] border ">
                    <div class="grid grid-rows-[65%_35%] h-full">
                        <div class="w-full h-full bg-gray-200 relative">

                            <div class="absolute top-[20px] left-[20px] px-4 py-1 bg-primary-900 text-white">
                                -20% 
                            </div>
                        </div>
                        <div class="pt-8 px-4">
                            <StarRating rating={5} size={"20px"}/>
                            <p class="text-lg text-dark-600 font-semibold tracking-wider mt-3">Product</p>
                            <p class="text-lg text-dark-600 font-semibold tracking-wider mt-1">RM xx</p>
                        </div>
                    </div>

                </SplideSlide>
            {/each}
    </Splide>
</section>

<style>
:global(.splide__pagination__page) {
    background-color: rgba(0, 0, 0, 0.3);
    margin-right: 8px;
}

:global(.splide__pagination__page.is-active) {
    background-color: #FF5500;
    width: 20px;
    border-radius: 10px;
}

.featured-product-splide {
    width: 500px;
}
</style>
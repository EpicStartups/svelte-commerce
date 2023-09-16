<script lang="ts">
import type { ParallelQuoteProps } from "$lib/types/shopBannerWidgets"


export let props: ParallelQuoteProps = {
    type: "ParallelQuote",
    bgImg: {
        src: "http://localhost:8080/src/lib/assets/home/join-bg.png",
        alt: "img of 250z"
    },
    firstQuote: {
        content: "<p>Hello</p>"
    },
    secondQuote: {
        content: "<p>Hello</p>"
    }
}

</script>

<div class="w-full relative h-full px-6 py-12">

    <div class="widget w-full h-full max-w-[1300px] mx-auto relative z-[50] grid grid-cols-[1fr_1fr] items-center gap-4 justify-center ">
        <div class="w-full h-full full-width-children flex flex-col justify-center items-start">
            {@html props.firstQuote.content}
        </div>

        <div class="w-full h-full full-width-children flex flex-col justify-center items-start">
            {@html props.secondQuote.content}
        </div>
    </div>


    {#if props.bgImg}
        <img 
            class="w-full h-full object-cover absolute z-[49] top-0 bottom-0 left-0 right-0"
            src={props.bgImg.src}
            alt={props.bgImg.alt ?? ""}
        />
    {/if}    
</div>

<style>
.widget {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
}

@media only screen and (min-width: 600px) {
.widget {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
}

}
</style>
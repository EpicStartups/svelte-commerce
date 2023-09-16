<script lang="ts">
import { parseTextWidgetInput } from "$lib/services/medusa/medusa-utils"
import type { SideQuoteProps } from "$lib/types/shopBannerWidgets"


export let props: SideQuoteProps = {
    type: "SideQuote",
    bgImg: {
        src: "http://localhost:8080/src/lib/assets/home/join-bg.png",
        alt: "img of 250z"
    },
    isReverse: false,
    text: {
        content: "<h1>Hello</h1>"
    }
}

</script>

<div class="w-full h-full relative px-6 py-8">

    <div class="widget w-full h-full max-w-[1300px] mx-auto h-full relative z-[50] grid grid-cols-[1fr_1fr] items-center gap-4 justify-center ">
        <div class="w-full h-full full-width-children flex flex-col justify-center items-start {props.isReverse ? "order-last" : ""}">
            {@html props.text.content}
        </div>

        <div class="w-full h-full flex justify-center items-center px-8 py-2 relative">
            {#if props.sideImg && props.sideImg.src}
                <img
                    src={props.sideImg.src}
                    alt={props.sideImg.alt ?? ""}
                    class="w-full h-full object-contain absolute top-0 bottom-0"
                />         
            {/if}
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
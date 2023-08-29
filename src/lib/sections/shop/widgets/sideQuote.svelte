<script lang="ts">
import { parseTextWidgetInput } from "$lib/services/medusa/medusa-utils"
import type { SideQuoteProps } from "./types"


export let props: SideQuoteProps = {
    type: "SideQuote",
    bgImg: {
        src: "http://localhost:8080/src/lib/assets/home/join-bg.png",
        alt: "img of 250z"
    },
    isReverse: false,
    heading: {
        text: "3 Years Warranty With Proven Top-class Support",
        color: "text-white"
    },
    description: {
        text: "We take Customer Service as a top priority, PRISM+ strives to deliver the highest level of service and support. Unlike a sell-and-forget distributor, youre purchasing directly from us, a local company. This gives us full control over the service and support process and ensures straight to the point service with no risk of getting pushed around various departments.",
        color: "text-white"
    }
}

</script>

<div class="w-full relative min-h-[280px] px-6 py-8">

    <div class="w-full min-h-[250px] max-w-[1300px] mx-auto h-full relative z-[50] grid grid-cols-[1fr_1fr] items-center gap-4 justify-center ">
        <div class="w-full flex flex-col justify-center items-start text-start {props.isReverse ? "order-last" : ""}">
            <h2 
                class="
                    mb-4 
                    {props.heading.color ?? ""} 
                    {props.heading.font ?? "font-jost"} 
                    {props.heading.weight ?? ""}
                "
                style={parseTextWidgetInput(props.heading)}
            >
            {props.heading.text}
            </h2>
            <p
                class="
                    {props.description.color ?? ""} 
                    {props.description.font ?? "font-jost"} 
                    {props.description.weight ?? ""}
                "
                style={parseTextWidgetInput(props.description)}
            >
            {props.description.text}
            </p>
        </div>

        <div>

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
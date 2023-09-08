<script lang="ts">
import { parseTextWidgetInput } from "$lib/services/medusa/medusa-utils"
import type { ParallelQuoteProps } from "$lib/types/productWidget"


export let props: ParallelQuoteProps = {
    type: "ParallelQuote",
    bgImg: {
        src: "http://localhost:8080/src/lib/assets/home/join-bg.png",
        alt: "img of 250z"
    },
    firstQuote: {
        heading: {
            text: "3 Years Warranty With Proven Top-class Support",
            color: "text-white"
        },
        description: {
            text: "We take Customer Service as a top priority, PRISM+ strives to deliver the highest level of service and support. Unlike a sell-and-forget distributor, youre purchasing directly from us, a local company. This gives us full control over the service and support process and ensures straight to the point service with no risk of getting pushed around various departments.",
            color: "text-white"
        }
    },
    secondQuote: {
        heading: {
            text: "3 Years Warranty With Proven Top-class Support",
            color: "text-white"
        },
        description: {
            text: "We take Customer Service as a top priority, PRISM+ strives to deliver the highest level of service and support. Unlike a sell-and-forget distributor, youre purchasing directly from us, a local company. This gives us full control over the service and support process and ensures straight to the point service with no risk of getting pushed around various departments.",
            color: "text-white"
        }
    }
}

</script>

<div class="w-full relative min-h-[280px] px-6 py-12">

    <div class="widget w-full min-h-[250px] max-w-[1300px] mx-auto h-full relative z-[50] grid grid-cols-[1fr_1fr] items-center gap-4 justify-center ">
        <div class="w-full flex flex-col justify-center items-start text-start">
            <h2 
                class="
                    mb-4 
                    {props.firstQuote.heading.color ?? ""} 
                    {props.firstQuote.heading.font ?? "font-jost"} 
                    {props.firstQuote.heading.weight ?? ""}
                "
                style={parseTextWidgetInput(props.firstQuote.heading)}
            >
            {props.firstQuote.heading.text}
            </h2>
            <p
                class="
                    {props.firstQuote.description.color ?? ""} 
                    {props.firstQuote.description.font ?? "font-jost"} 
                    {props.firstQuote.description.weight ?? ""}
                "
                style={parseTextWidgetInput(props.firstQuote.description)}
            >
            {props.firstQuote.description.text}
            </p>
        </div>

        <div class="w-full flex flex-col justify-center items-start text-start">
            <h2 
                class="
                    mb-4 
                    {props.secondQuote.heading.color ?? ""} 
                    {props.secondQuote.heading.font ?? "font-jost"} 
                    {props.secondQuote.heading.weight ?? ""}
                "
                style={parseTextWidgetInput(props.secondQuote.heading)}
            >
            {props.secondQuote.heading.text}
            </h2>
            <p
                class="
                    {props.secondQuote.description.color ?? ""} 
                    {props.secondQuote.description.font ?? "font-jost"} 
                    {props.secondQuote.description.weight ?? ""}
                "
                style={parseTextWidgetInput(props.secondQuote.description)}
            >
            {props.secondQuote.description.text}
            </p>
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
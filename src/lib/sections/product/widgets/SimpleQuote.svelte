<script lang="ts">
import { parseTextWidgetInput } from "$lib/services/medusa/medusa-utils"
import type { SimpleQuoteProps } from "$lib/types/productWidget"


export let props: SimpleQuoteProps = {
    type: "SimpleQuote",
    heading: {
        text: "3 Years Warranty With Proven Top-class Support"
    },
    description: {
        text: "We take Customer Service as a top priority, PRISM+ strives to deliver the highest level of service and support. Unlike a sell-and-forget distributor, youre purchasing directly from us, a local company. This gives us full control over the service and support process and ensures straight to the point service with no risk of getting pushed around various departments."
    }
}

</script>
<div class="w-full relative min-h-[250px] px-6 py-12 flex flex-col justify-center items-center text-center">
    <div class="w-full max-w-[1300px] mx-auto flex flex-col justify-center items-center text-center relative z-[50]">
        <h2 
            class="
                mb-4 text-3xl
                {props.heading.color ?? ""} 
                {props.heading.font ?? "font-jost"} 
                {props.heading.weight ?? ""}
            "
            style={parseTextWidgetInput(props.heading)}
        >
            {props.heading.text}
        </h2>
        <p
            class="text-base
                {props.description.color ?? ""} 
                {props.description.font ?? "font-jost"} 
                {props.description.weight ?? ""}
            "
            style={parseTextWidgetInput(props.description)}
        >
            {props.description.text}
        </p>
    </div>

    {#if props.bgImg}
        <img 
            class="w-full h-full object-cover absolute z-[49] top-0 bottom-0 left-0 right-0"
            src={props.bgImg.src}
            alt={props.bgImg.alt ?? ""}
        />
    {/if}
</div>
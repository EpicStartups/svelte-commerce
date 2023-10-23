<script lang="ts">
import { parseTextWidgetInput } from "$lib/services/medusa/medusa-utils"
import type { SimpleQuoteProps } from "$lib/types/shopBannerWidgets"


export let props: SimpleQuoteProps = {
    type: "SimpleQuote",
    text: {
        content: "<h1>Hello</h1>",
    }
}

</script>


<div class="w-full h-full relative px-6 py-8 flex flex-col justify-center items-center">
    <div class="w-full h-full full-width-children max-w-[1300px] mx-auto flex flex-col justify-center items-start relative z-[50]">
        {@html props.text.content}
    </div>

    {#if props.bgImg}
        <img 
            class="w-full h-full object-cover absolute z-[49] top-0 bottom-0 left-0 right-0"
            src={props.bgImg.src}
            alt={props.bgImg.alt ?? ""}
        />
    {/if}
</div>

<script lang="ts">
import { parseWidgetStyle } from "$lib/services/medusa/medusa-utils"
import type { TextEditorProps } from "$lib/types/shopWidgets"


export let props: TextEditorProps = {
    type: "TextEditor",
    content: "<p>Hello World</p>"
}

</script>
<div 
    class="w-full relative min-h-[250px] px-6 py-8 flex flex-col justify-center items-center text-center"
    style={parseWidgetStyle(props)}
>
    {@html props.content}

    {#if props.bgImg}
        <img 
            class="w-full h-full object-cover absolute z-[49] top-0 bottom-0 left-0 right-0"
            src={props.bgImg.src}
            alt={props.bgImg.alt ?? ""}
        />
    {/if}
</div>
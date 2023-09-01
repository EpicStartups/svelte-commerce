<script lang="ts">
import { parseTextWidgetInput } from "$lib/services/medusa/medusa-utils"
import type { ImageGridProps } from "$lib/types/shopWidgets"

export let props: ImageGridProps = {
    type: "ImageGrid6",
    header: {
        text: "As Seen On",
    },
    images: [1, 2, 3, 4, 5, 6].map((index) => {
        return {
            src: null,
            alt: `img${index + 1}`
        }
    })
}
</script>

<div class="w-full relative min-h-[280px] px-6 py-12">
    <h2 
        class="text-2xl text-center mb-4"
        style={parseTextWidgetInput(props.header)}
    >
        {props.header.text}
    </h2>
    <ul class="image-grid w-full grid gap-4">
        {#each props.images as img}
            <li class="h-full aspect-square grid-item shadow-lg p-3">
                {#if img.src}
                    <img 
                        class="w-full h-full object-contain"
                        src={img.src}
                        alt={img.alt}
                    />
                {/if}
            </li>
        {/each}
    </ul>
</div>

<style>
.image-grid {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 1fr 1fr;
}


@media only screen and (min-width: 630px) {
.image-grid {
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: 1fr;
}
}
</style>
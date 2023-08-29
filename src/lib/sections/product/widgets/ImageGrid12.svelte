<script lang="ts">
import { parseTextWidgetInput } from "$lib/services/medusa/medusa-utils"
import type { ImageGridProps } from "./types"

export let props: ImageGridProps = {
    type: "ImageGrid12Props",
    header: {
        text: "Loved By Celebrities & Influencers",
    },
    images: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((index) => {
        return {
            src: null,
            alt: `img${index + 1}`
        }
    })
}
</script>


<div class="w-full relative min-h-[280px] px-6 py-12">
    <h2 
        class="text-2xl text-center mb-7"
        style={parseTextWidgetInput(props.header)}
    >
        {props.header.text}
    </h2>
    <ul class="image-grid w-full grid  gap-4">
        {#each props.images as img}
            <li class="h-full aspect-square grid-item shadow-lg">
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

.grid-item:nth-child(7), 
.grid-item:nth-child(8),
.grid-item:nth-child(9), 
.grid-item:nth-child(10), 
.grid-item:nth-child(11), 
.grid-item:nth-child(12) {
    display: none;
}

@media only screen and (min-width: 490px) {
.image-grid {
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: 1fr 1fr 1fr;
}
.grid-item:nth-child(7), 
.grid-item:nth-child(8),
.grid-item:nth-child(9), 
.grid-item:nth-child(10), 
.grid-item:nth-child(11), 
.grid-item:nth-child(12) {
    display: block;
}
}

@media only screen and (min-width: 1040px) {
.image-grid {
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: 1fr 1fr;
}
}
</style>
<script lang="ts">
import { Splide, SplideSlide, type Options as SplideOptions } from '@splidejs/svelte-splide'
import '@splidejs/svelte-splide/css'
import type { RowSlidersProps } from '$lib/types/productWidget'
import { parseWidgetStyle } from '$lib/services/medusa/medusa-utils'

export const props: RowSlidersProps = {
	type: 'RowSliders',
	img: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((index) => {
        return {
            src: null,
            alt: `img ${index}`
        }
    })
}

const splideOptions: SplideOptions = {
	rewind: true,
	perPage: 5,
	autoplay: true,
	pauseOnHover: true,
	pagination: true,
	breakpoints: {
		550: {
			perPage: 1,
			perMove: 1
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
		}
	},
	gap: '1rem'
}
</script>

<div 
    class="w-full"
    style={parseWidgetStyle(props)}
>
    <Splide
        options="{splideOptions}"
        hasTrack="{true}"
        class="featured-product-splide h-[530px] max-w-[100vw] mt-12 px-6"
    >
        {#each props.img as num}
            <SplideSlide class="h-[480px] bg-white w-[100%] border">
                <div class="grid grid-rows-[65%_35%] bg-gray-200 h-full">
                    <div class="w-full h-full bg-gray-200"></div>
                </div>
            </SplideSlide>
        {/each}
    </Splide>
</div>

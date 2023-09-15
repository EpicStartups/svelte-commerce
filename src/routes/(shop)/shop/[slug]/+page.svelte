<script lang="ts">
// import { getMegamenuFromStore } from '$lib/store/megamenu'
import { generateSeoProps, toast } from '$lib/utils'
import dayjs from 'dayjs'
import Fuse from 'fuse.js'
import SEO from '$lib/components/SEO/index.svelte'
import type { Store } from '$lib/types.js'
import ShopWidgets from '$lib/sections/shop/ShopWidgets.svelte'

let today = dayjs(new Date()).toISOString()
interface Data {
	shop: Store
}
export let data: Data;

let seoProps = generateSeoProps({
	title: data.shop.name,
	metaDescription: data.shop.name,
	keywords: data.shop.name
})

</script>

<SEO {...seoProps} />

<ShopWidgets widgets={data.shop.widgets}/>
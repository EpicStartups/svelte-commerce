<script lang="ts">
import MyOrder from './_MyOrder.svelte'
import SEO from '$lib/components/SEO/index.svelte'
import type { MedusaOrder } from '$lib/services/medusa/types'

const seoProps = {
	title: 'Orders ',
	description: 'Orders '
}
interface Data {
	orders: MedusaOrder[],
	count: number
}
export let data: Data


</script>

<SEO {...seoProps} />

<section>
	<MyOrder data="{data}" />
</section>

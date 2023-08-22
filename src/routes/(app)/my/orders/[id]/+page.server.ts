import { OrdersService } from '$lib/services'
import type { MedusaFulfillment } from '$lib/services/medusa/types.js'
import { useBuildTimeline } from '$lib/utils/buildOrderTimeline.js'
import { error } from '@sveltejs/kit'
export const prerender = false

export async function load({ params, locals, cookies }) {
	const { id } = params
	const sid = cookies.get('connect.sid')
	// const storeId = locals['store']?.id

	const order = await OrdersService.fetchOrderWithFulFillments({
		id,
		sid
	})
	//console.log('order: ', order)
	const orderTracking: MedusaFulfillment[] | null = order.fulfillments ?? null
	//console.log('timelines: ', useBuildTimeline(order))
	//console.log('order: ', order)
	return {
		order,
		orderTracking,
		timelines: order ? useBuildTimeline(order) : undefined
	}
}

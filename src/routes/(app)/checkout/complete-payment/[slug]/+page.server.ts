import { OrdersService, ProductService, ReviewService } from '$lib/services'
import { redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

const isServer = import.meta.env.SSR // get the SSR value

export const load = async ({ params, url, parent, cookies }) => {
	const { slug } = params

	const res = await OrdersService.completePayment({
		cartId: slug,
		sid: cookies.get('connect.sid')
	})
	console.log('payment res: ', res)
	return {
		result: res
	}
}

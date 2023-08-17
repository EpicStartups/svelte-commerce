import { CartService, OrdersService } from '$lib/services'
import { mapMedusaJsStore, mapMedusajsCart } from '$lib/services/medusa/medusa-utils.js'
import type { MedusaCart, MedusaOrder } from '$lib/services/medusa/types.js'
import type { Cart } from '$lib/types.js'
import { HttpError, error, redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import { getMedusajsApi } from '$lib/utils/server'
import { StoreService } from '$lib/services'

export const prerender = false

export const load: PageServerLoad = async ({ url, request, locals, cookies, params }) => {
	const sid = cookies.get('connect.sid')
	const shopId = params.slug

	try {
		const store = await StoreService.getShopById({
			sid,
			shopId
		})
		console.log('store: ', store)
		return {
			shop: mapMedusaJsStore(store)
		}
	} catch (err) {
		console.error('shop error: ', err)
		if (err instanceof HttpError) {
			throw err
		} else {
			throw error(400, {
				message: 'Unknown Error'
			})
		}
	}
}

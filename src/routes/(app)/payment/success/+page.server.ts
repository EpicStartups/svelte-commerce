import { CartService, OrdersService } from '$lib/services'
import { mapMedusajsCart } from '$lib/services/medusa/medusa-utils.js'
import type { MedusaCart, MedusaOrder } from '$lib/services/medusa/types.js'
import type { Cart } from '$lib/types.js'
import { error, redirect } from '@sveltejs/kit'

export const prerender = false

export async function load({ url, request, locals, cookies }) {
	const orderId = url.searchParams.get('order_id')
	const status = url.searchParams.get('status')
	const paymentMode = url.searchParams.get('provider')
	const paymentReferenceId = url.searchParams.get('payment_reference_id')
	const sid = cookies.get('connect.sid')
	let cart: MedusaCart
	let err: any = undefined
	let loading: boolean = false
	let order: MedusaOrder

	try {
		loading = true
		// order = await OrdersService.paySuccessPageHit({
		// 	paymentMode,
		// 	status,
		// 	orderId,
		// 	paymentReferenceId,
		// 	storeId: locals.store?.id,
		// 	server: true,
		// 	sid
		// })
		order = await OrdersService.fetchOrder({
			storeId: locals['store']?.id,
			id: orderId,
			server: true,
			sid,
			origin: locals['origin']
		})
		console.log('order: ', order)
	} catch (e) {
		if (e.status === 401) {
			throw redirect(307, locals['store']?.loginUrl)
		}
		err = e
		throw error(400, e?.message || e)
		// return {
		// 	status: 400,
		// 	errors: new Error(e?.message || e)
		// }
	} finally {
		loading = false
	}

	try {
		cart = await CartService.newCart({
			storeId: locals['store']?.id,
			server: true,
			sid,
			origin: locals['origin']
		})
		//console.log('cart: ', cart)
		if (cart) {
			const cartObj: Cart = mapMedusajsCart(cart)
			locals['cartId'] = cartObj.cart_id
			locals['cartQty'] = cartObj.qty
			locals['cart'] = cartObj
			cookies.set('cartId', cartObj.cart_id, { path: '/' })
			cookies.set('cartQty', String(cartObj.qty), { path: '/' })
		}
	} catch (e) {
		return {
			loading,
			status,
			paymentMode,
			order,
			err,
			cart: locals['cart']
		}
	}
	return { loading, status, paymentMode, order, err, cart }
}

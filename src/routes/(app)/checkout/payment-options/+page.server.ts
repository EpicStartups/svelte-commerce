import {
	AddressService,
	CartService,
	PaymentMethodService,
	ProductService,
	REGION_ID,
	ShippingOptionsService
} from '$lib/services'
import { updateBilling } from '$lib/services/medusa/cart-service.js'
import { mapMedusajsCart } from '$lib/services/medusa/medusa-utils.js'
import { redirect } from '@sveltejs/kit'

export const prerender = false

export async function load({ params, parent, locals, url, request, cookies }) {
	const me = locals['me']

	if (!me) {
		const redirectUrl = `${locals['store']?.loginUrl || '/auth/login'}?ref=${url?.pathname}`
		throw redirect(307, redirectUrl)
	}

	try {
		const cartRes = await CartService.fetchRefreshCart({
			cookies,
			storeId: locals['store']?.id,
			server: true,
			sid: cookies.get('connect.sid'),
			origin: locals['origin']
		})
		//console.log('cartRes: ', cartRes)
		let cart = mapMedusajsCart(cartRes)

		locals['cart'] = cart

		const id = url.searchParams.get('address')

		const address = await AddressService.fetchAddress({
			storeId: locals['store']?.id,
			server: true,
			id,
			sid: cookies.get('connect.sid')
		})

		//console.log('address: ', address)

		const newCart = await updateBilling({
			sid: cookies.get('connect.sid'),
			cartId: cart.id,
			addressId: address.id
		})
		//console.log('newCart: ', newCart)
		cart = mapMedusajsCart(newCart)
		locals['cart'] = cart

		const paymentMethods = await PaymentMethodService.fetchPaymentMethods({
			storeId: locals['store'].id,
			server: true,
			sid: cookies.get('connect.sid')
		})

		//console.log('payment methods: ', paymentMethods)

		const paymentSessions = await PaymentMethodService.fetchPaymentSessions({
			storeId: locals['store'].id,
			server: true,
			sid: cookies.get('connect.sid'),
			cartId: cartRes.id
		})

		//console.log('payment sessions: ', paymentSessions.cart.payment_sessions)

		const shippingOptions = await ShippingOptionsService.fetchShippingOptions({
			regionId: REGION_ID,
			productIds: cartRes.items.map((item) => item.variant.product_id),
			sid: cookies.get('connect.sid'),
			is_return: false
		})

		//console.log('shipping options: ', shippingOptions)

		let err: any = undefined
		let prescription: any = undefined
		return {
			paymentMethods,
			shippingOptions,
			address,
			addressId: id,
			me,
			cart,
			paymentSessions,
			err,
			prescription,
			medusaCart: newCart
		}
	} catch (e) {
		console.log('error: ', e)
		if (e) {
			throw redirect(307, '/checkout/address')
		}
	}
}

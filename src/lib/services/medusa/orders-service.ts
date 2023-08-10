import { error } from '@sveltejs/kit'
import { getMedusajsApi, postMedusajsApi } from '$lib/utils/server'
import type { AllOrders, Error } from '$lib/types'
import type { MedusaAddress, MedusaCart, MedusaOrder } from './types'
import type { Stripe, StripeCardNumberElement, StripeCardElement } from '@stripe/stripe-js'
import { CartService } from '.'
import { appUrl } from '$lib/config'
import { updatePaymentProvider } from './cart-service'

export const fetchOrders = async ({ origin, storeId, server = false, sid = null }: any) => {
	try {
		// const med: { orders: MedusaOrder[]; count: number; offset: number; limit: number } =
		// 	await getMedusajsApi(`customers/me/orders`, {}, sid)
		const med: { orders: MedusaOrder[]; count: number; offset: number; limit: number } =
			await getMedusajsApi('customers/me/orders', {}, sid)
		const res = med.orders.filter(
			(order) => order.order_parent_id && order.order_parent_id !== null
		)

		return {
			data: res,
			count: res.length
			// pageSize: res.pageSize,
			// noOfPage: res.noOfPage,
			// page: res.page
		}
	} catch (e) {
		throw error(e.status, e.message)
	}
}

export const fetchOrder = async ({ origin, storeId, id, server = false, sid = null }: any) => {
	try {
		const med: { orders: MedusaOrder[] } = await getMedusajsApi(
			`customers/me/orders?id=${id}&expand=items.variant.product,shipping_address,billing_address`,
			{},
			sid
		)

		if (med.orders.length !== 1) {
			throw { status: 400, message: 'order is not single' }
		}
		return med.orders[0]
	} catch (e) {
		throw error(e.status, e.message)
	}
}

export const fetchTrackOrder = async ({ origin, storeId, id, server = false, sid = null }: any) => {
	try {
		let res: any = {}

		res = await getMedusajsApi(`orders/me`, {}, sid)

		return res.data || []
	} catch (e) {
		throw error(e.status, e.message)
	}
}

export const paySuccessPageHit = async ({
	origin,
	paymentMode,
	orderId,
	storeId,
	status,
	id,
	server = false,
	sid = null
}: any) => {
	try {
		let res: any = {}

		res = await getMedusajsApi(`orders/me`, {}, sid)

		return res || {}
	} catch (e) {
		throw error(e.status, e.message)
	}
}

export const codCheckout = async ({
	address,
	paymentMethod,
	prescription,
	storeId,
	origin,
	server = false,
	sid = null
}: any) => {
	try {
		let res: any = {}

		res = await getMedusajsApi(`orders/me`, {}, sid)

		return res || {}
	} catch (e) {
		throw error(e.status, e.message)
	}
}

export const cashfreeCheckout = async ({
	address,
	paymentMethod,
	prescription,
	storeId,
	origin,
	server = false,
	sid = null
}: any) => {
	try {
		let res: any = {}

		res = await getMedusajsApi(`orders/me`, {}, sid)

		return res || {}
	} catch (e) {
		throw error(e.status, e.message)
	}
}

export const razorpayCheckout = async ({
	address,
	paymentMethod,
	prescription,
	storeId,
	origin,
	server = false,
	sid = null
}: any) => {
	try {
		let res: any = {}

		res = await getMedusajsApi(`orders/me`, {}, sid)

		return res.data || []
	} catch (e) {
		throw error(e.status, e.message)
	}
}

export const razorpayCapture = async ({
	rpPaymentId,
	rpOrderId,
	storeId,
	origin,
	server = false,
	sid = null
}: any) => {
	try {
		let res: any = {}

		res = await getMedusajsApi(`orders/me`, {}, sid)

		return res.data || []
	} catch (e) {
		throw error(e.status, e.message)
	}
}

type CheckoutFailed = {
	type: 'cart'
	data: MedusaCart
}

type CheckoutSucceed = {
	type: 'order'
	data: any
}

interface StripeCheckoutServiceOption {
	clientSecret: string
	cartId: string
	sid?: string | null
	server?: boolean
	stripe: Stripe
	card: StripeCardElement
	cart: MedusaCart
	address: MedusaAddress
}

export const stripeCheckoutService = async ({
	server = false,
	cartId,
	sid = null,
	clientSecret,
	stripe,
	card,
	cart,
	address
}: StripeCheckoutServiceOption) => {
	try {
		if (!cart.customer_id || cart.customer_id === '') {
			const user = await getMedusajsApi(`customers/me`, {}, sid)
			const updateCartRes = await postMedusajsApi(
				`carts/${cartId}`,
				{
					customer_id: user.id
					// billing_address_id: address.id,
					// shipping_address_id: address.id
				},
				sid
			)
			console.log('updateCartRes: ', updateCartRes)
		}

		const updateProvider = await updatePaymentProvider({
			sid,
			cartId,
			providerId: 'stripe'
		})

		const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
			payment_method: {
				card: card,
				billing_details: {
					name: address.first_name + ' ' + address.last_name,
					address: {
						city: address.city ?? undefined,
						line1: address.address_1 ?? undefined,
						line2: address.address_2 ?? undefined,
						postal_code: address.postal_code ?? undefined,
						state: address.province ?? undefined
					},
					email: cart.email
				}
			}
		})
		console.log('payment intent: ', paymentIntent)
		console.log('payment error: ', error)
		if (error) {
			const pi = error.payment_intent
			if (!pi || (pi.status !== 'requires_capture' && pi.status !== 'succeeded')) {
				throw { status: 400, message: `paymentIntent error: ${error}` }
			}
		}
		if (paymentIntent.status !== 'requires_capture' && paymentIntent.status !== 'succeeded') {
			throw { status: 400, message: `paymentIntent failed: ${paymentIntent}` }
		}

		// complete cart
		const resp: CheckoutFailed | CheckoutSucceed = await postMedusajsApi(
			`carts/${cartId}/complete`,
			{},
			sid
		)
		if (resp.type === 'order') {
			return {
				refId: paymentIntent.id,
				orderId: resp.data.id as string
			}
		} else {
			console.log('complete cart res:', resp)
			throw { status: 400, message: `error completing cart: ${JSON.stringify(resp.data)}` }
		}
	} catch (e) {
		throw error(e.status, e.message)
	}
}

interface CompletePaymentInput {
	cartId: string
	sid?: string | null
}

export const completePayment = async ({ cartId, sid = null }: CompletePaymentInput) => {
	const resp: CheckoutFailed | CheckoutSucceed = await postMedusajsApi(
		`carts/${cartId}/complete`,
		{},
		sid
	)
	if (resp.type === 'order') {
		// return {
		// 	orderId: resp.data.id as string,
		// 	data: resp
		// }
	} else {
		// console.log('complete cart res:', resp)
		// throw { status: 400, message: `error completing cart: ${JSON.stringify(resp.data)}` }
		// return {
		// 	orderId: resp.data.id as string,
		// 	data: resp
		// }
	}

	return resp
}

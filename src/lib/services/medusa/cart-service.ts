import type { Cart, Error } from '$lib/types'
import { deleteMedusajsApi, getMedusajsApi, postMedusajsApi } from '$lib/utils/server'
import { error } from '@sveltejs/kit'
import { mapMedusajsCart } from './medusa-utils'
import { AddressService, REGION_ID } from '.'
import { fetchShippingOptions } from './shipping-options'
import type { MedusaAddress, MedusaCart } from './types'
import GlobalStore from '$lib/store/global'
import { handleApiError } from '$lib/utils'
import { setShippingOption } from './shipping-options'

export const fetchCartData = async ({ origin, storeId, server = false, sid = null }: any) => {
	try {
		let res: any = {}

		res = await getMedusajsApi(`cart`, {}, sid)

		return res || {}
	} catch (err) {
		throw handleApiError(err)
	}
}

export const fetchOne = async ({ origin, storeId, server = false, sid = null, cartId }: any) => {
	try {
		const cartRes: { cart: MedusaCart } = await getMedusajsApi(`carts/${cartId}`, sid)

		return cartRes.cart
	} catch (e) {
		console.error('fetchOne cart error: ', e)
		throw handleApiError(e)
	}
}

export const fetchRefreshCart = async ({
	origin,
	storeId,
	cookies,
	server = false,
	sid = null
}: any): Promise<MedusaCart | null> => {
	try {
		if (!cookies || !cookies.get('cartId') || cookies.get('cartId') == 'undefined') return null
		const cart_id = cookies.get('cartId')
		const cartRes: { cart: MedusaCart } = await getMedusajsApi(
			`carts/${cart_id}?expand=items.variant.product.store`
		)
		return cartRes.cart
	} catch (e) {
		console.error('fetchRefreshCart error: ', e)
		throw handleApiError(e)
	}
}

export const newCart = async ({
	origin,
	storeId,
	cookies,
	server = false,
	sid = null
}: any): Promise<MedusaCart | null> => {
	try {
		let cart: MedusaCart
		const shippingOptions = await fetchShippingOptions({
			regionId: REGION_ID,
			is_return: false
		})

		const cartRes: { cart: MedusaCart } = await postMedusajsApi(
			`carts`,
			{
				region_id: REGION_ID
			},
			sid
		)
		cart = cartRes.cart

		if (shippingOptions && shippingOptions.length > 0) {
			cart = await setShippingOption({
				sid,
				cartId: cartRes.cart.id,
				shippingOptionId: shippingOptions[0].id
			})
		}

		return cart
	} catch (e) {
		throw { status: 400, message: 'error creating new cart' }
	}
}

export const fetchMyCart = async ({ origin, storeId, server = false, sid = null }: any) => {
	try {
		let res: any = {}

		res = {} // await getMedusajsApi(`cart/me`, {}, sid)

		return res || {}
	} catch (err) {
		throw error(err.status, err.message)
	}
}

export const addToCartService = async ({
	pid,
	vid,
	qty,
	customizedImg,
	origin,
	storeId,
	server = false,
	cookies,
	me,
	sid = null
}: any) => {
	try {
		let cart_id = cookies.get('cartId')
		if (cart_id == 'undefined') cart_id = null

		const body = {
			variant_id: vid || pid,
			quantity: qty
		}
		let res: any = {}
		if (!cart_id) {
			let defaultAddress: MedusaAddress | undefined
			try {
				console.log('sid: ', sid)
				const shippingAddresses = await AddressService.fetchAddresses({
					sid
				})
				defaultAddress = shippingAddresses.selectedAddress
			} catch {
				console.log('creating cart for visitor...')
			}

			if (defaultAddress && defaultAddress.region_id) {
				const shippingOptions = await fetchShippingOptions({
					regionId: defaultAddress.region_id,
					is_return: false
				})

				const cartRes: { cart: MedusaCart } = await postMedusajsApi(
					`carts`,
					{
						region_id: defaultAddress.region_id
					},
					sid
				)

				if (shippingOptions && shippingOptions.length > 0) {
					const cart = await setShippingOption({
						sid,
						cartId: cartRes.cart.id,
						shippingOptionId: shippingOptions[0].id
					})
				}

				cart_id = cartRes.cart?.id
			} else {
				const cartRes: { cart: MedusaCart } = await postMedusajsApi(
					`carts`,
					{
						region_id: REGION_ID
					},
					sid
				)
				cart_id = cartRes.cart?.id
			}
		}

		const res_data: { cart: MedusaCart } = await postMedusajsApi(
			`carts/${cart_id}/line-items?expand=items.variant.product.store`,
			body,
			sid
		)

		//if (res_data.cart.ad)

		//console.log('resdata: ', res_data.cart.sh)

		const gs = GlobalStore.getter()
		if (gs.me && gs.me.id) {
			await postMedusajsApi(
				`carts/${cart_id}`,
				{
					customer_id: gs.me.id
				},
				sid
			)
		}

		res = mapMedusajsCart(res_data?.cart)

		return res || {}
	} catch (e) {
		console.error(e)
		throw handleApiError(e)
	}
}

export const applyCouponService = async ({
	code,
	origin,
	storeId,
	server = false,
	sid = null
}: any) => {
	try {
		let res: any = {}

		res = await getMedusajsApi(`cart/me`, {}, sid)

		return res || {}
	} catch (e) {
		throw handleApiError(e)
	}
}

export const removeCouponService = async ({
	code,
	origin,
	storeId,
	server = false,
	sid = null
}: any) => {
	try {
		let res: any = {}

		res = await getMedusajsApi(`cart/me`, {}, sid)

		return res || {}
	} catch (e) {
		throw handleApiError(e)
	}
}

interface UpdatePaymentProviderInput {
	sid?: string | null
	providerId: string
	cartId: string
}

export const updatePaymentProvider = async ({
	sid = null,
	providerId,
	cartId
}: UpdatePaymentProviderInput) => {
	try {
		const resp = await postMedusajsApi(
			`carts/${cartId}/payment-session`,
			{
				provider_id: providerId
			},
			sid
		)

		return resp
	} catch (err) {
		throw handleApiError(err)
	}
}

interface UpdateBillingInput {
	addressId: string
	sid?: string | null
	cartId: string
}
export const updateBilling = async ({ sid = null, addressId, cartId }: UpdateBillingInput) => {
	try {
		const resp = await postMedusajsApi(
			`carts/${cartId}`,
			{
				billing_address: addressId,
				shipping_address: addressId
			},
			sid
		)
		return resp.cart as MedusaCart
	} catch (err) {
		throw handleApiError(err)
	}
}

interface DeleteLineItemInput {
	sid?: string | null
	cartId: string
	lineItemId: string
}

export const deleteLineItem = async ({ sid = null, cartId, lineItemId }: DeleteLineItemInput) => {
	try {
		const res: { cart: MedusaCart } = await deleteMedusajsApi(
			`carts/${cartId}/line-items/${lineItemId}`,
			{},
			sid
		)
		console.log('delete line item: ', res)
		return mapMedusajsCart(res.cart)
	} catch (err) {
		throw handleApiError(err)
	}
}

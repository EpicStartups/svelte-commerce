import { handleApiError } from '$lib/utils'
import { getMedusajsApi, postMedusajsApi } from '$lib/utils/server'
import type { MedusaCart, MedusaShippingOption } from './types'
import { error } from '@sveltejs/kit'

interface FetchShippingOptionInputs {
	regionId: string
	productIds?: string[]
	sid?: string | null
	is_return: boolean
}

export const fetchShippingOptions = async (input: FetchShippingOptionInputs) => {
	try {
		const params = new URLSearchParams()
		params.append('region_id', input.regionId)
		params.append('is_return', input.is_return ? 'true' : 'false')

		// TOFIX
		// if (input.productIds) {
		// 	params.append('product_ids', input.productIds.map((id) => `${id}`).join(','))
		// }

		const res: { shipping_options: MedusaShippingOption[] } = await getMedusajsApi(
			`shipping-options?${params.toString()}`,
			{},
			input.sid
		)
		return res.shipping_options
	} catch (err) {
		throw error(err.status, err.message)
	}
}

interface SetShippingInput {
	server?: boolean
	sid?: string | null
	cartId: string
	shippingOptionId: string | null
}

export const setShippingOption = async (input: SetShippingInput) => {
	try {
		const res: { cart: MedusaCart } = await postMedusajsApi(
			`carts/${input.cartId}/shipping-methods`,
			{
				option_id: input.shippingOptionId
			},
			input.sid
		)
		console.log('set shipping option: ', res)
		return res.cart
	} catch (err) {
		throw handleApiError(err)
	}
}

import { CartService, REGION_ID, ShippingOptionsService } from '$lib/services'
import { error, fail, redirect } from '@sveltejs/kit'
import type { Action, Actions, PageServerLoad } from './$types'
import { mapMedusajsCart } from '$lib/services/medusa/medusa-utils'
import type { Cart } from '$lib/types'

export const load: PageServerLoad = async ({ url, request, locals, cookies, depends }) => {
	depends('cart:my')
	let loading = false
	let cart: Cart = locals['cart']
	try {
		loading = true
		const res = await CartService.fetchRefreshCart({
			storeId: locals['store']?.id,
			sid: cookies.get('connect.sid'),
			server: true,
			origin: locals['origin'],
			cookies
		})

		if (res) {
			cart = mapMedusajsCart(res)

			cookies.set('cartId', cart.cart_id, { path: '/' })
			cookies.set('cartQty', String(cart.qty), { path: '/' })
			// cookies.set('cart', JSON.stringify(cart), { path: '/' })
			locals['cartId'] = cart.cart_id
			locals['cartQty'] = cart.qty
			locals['cart'] = cart

			const shippingOptions = await ShippingOptionsService.fetchShippingOptions({
				regionId: REGION_ID,
				//productIds: cart.items.map((item) => item.variant.product_id),
				sid: cookies.get('connect.sid'),
				is_return: false
			})

			console.log('res: ', res)

			return {
				shippingOptions,
				cart
			}
		}
	} catch (e) {
		if (e?.status === 401) {
			throw redirect(307, '/auth/login')
		}
		throw error(400, e?.body?.message || e)
	} finally {
		loading = false
	}

	return { loadingCart: loading, cart }
}

const add: Action = async ({ request, cookies, locals }) => {
	const data = await request.formData()
	const pid = data.get('pid')
	const vid = data.get('vid')
	const variantsLength = +data.get('variantsLength')
	const currentVariantId = data.get('currentVariantId')
	const qty = +data.get('qty')
	const linkedItems = JSON.parse(data.get('linkedItems') as any)
	const options = JSON.parse(data.get('options') as any) //data.get('options') //
	const customizedImg = data.get('customizedImg')
	const sid = cookies.get('connect.sid')
	if (variantsLength > 0 && !currentVariantId) {
		return 'choose variant'
	}
	if (typeof pid !== 'string' || !pid) {
		return fail(400, { invalid: true })
	}
	try {
		const me = locals['me']
		let cart = await CartService.addToCartService({
			pid,
			vid: currentVariantId || vid,
			qty,
			options,
			customizedImg,
			storeId: locals['store']?.id,
			server: true,
			origin: locals['origin'],
			me,
			sid: cookies.get('connect.sid'),
			cookies // This is a special case to pass complete cookie
		})

		//return

		if (linkedItems?.length) {
			for (const i of linkedItems) {
				cart = await CartService.addToCartService({
					pid: i,
					vid: i,
					qty: 1,
					storeId: locals['store']?.id,
					server: true,
					origin: locals['origin'],
					me,
					cookies // This is a special case to pass complete cookie
				})
			}
		}

		if (cart) {
			const cartObj = {
				cartId: cart?.cart_id,
				items: cart?.items,
				qty: cart?.qty,
				tax: cart?.tax,
				subtotal: cart?.subtotal,
				total: cart?.total,
				currencySymbol: cart?.currencySymbol,
				discount: cart?.discount,
				savings: cart?.savings,
				selfTakeout: cart?.selfTakeout,
				shipping: cart?.shipping,
				unavailableItems: cart?.unavailableItems,
				formattedAmount: cart?.formattedAmount
			}
			locals['cart'] = cartObj
			locals['cartId'] = cartObj.cartId
			locals['cartQty'] = cartObj.qty
			cookies.set('cartId', cartObj.cartId, { path: '/' })
			cookies.set('cartQty', cartObj.qty, { path: '/' })
			return cartObj
		} else {
			return {}
		}
	} catch (e) {
		return {}
	}
}

const deleteItem: Action = async ({ request, cookies, locals }) => {
	const data = await request.formData()
	const lineItemId = data.get('id').toString()
	const cartId = data.get('cartId').toString()
	const sid = cookies.get('connect.sid')
	try {
		const cart = await CartService.deleteLineItem({
			sid,
			lineItemId,
			cartId
		})
		if (cart) {
			const cartObj = {
				cartId: cart?.cart_id,
				items: cart?.items,
				qty: cart?.qty,
				tax: cart?.tax,
				subtotal: cart?.subtotal,
				total: cart?.total,
				currencySymbol: cart?.currencySymbol,
				discount: cart?.discount,
				selfTakeout: cart?.selfTakeout,
				shipping: cart?.shipping,
				unavailableItems: cart?.unavailableItems,
				formattedAmount: cart?.formattedAmount
			}
			locals['cart'] = cartObj
			locals['cartId'] = cartObj.cartId
			locals['cartQty'] = cartObj.qty
			cookies.set('cartId', cartObj.cartId, { path: '/' })
			cookies.set('cartQty', String(cartObj.qty), { path: '/' })
			return cartObj
		} else {
			return {}
		}
	} catch (err) {
		console.error('error deleting item in cart: ', err)
		return {}
	}
}

export const actions: Actions = { add, delete: deleteItem }

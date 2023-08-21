import { error } from '@sveltejs/kit'
import { ProductService } from '$lib/services'
import { handleApiError } from '$lib/utils/index.js'

export const prerender = false

export async function load({ url, locals, cookies }) {
	const handle = url.searchParams.get('handle')
	const orderId = url.searchParams.get('oid')
	const ref = url.searchParams.get('ref')

	try {
		const product = await ProductService.fetchProduct3({
			server: true,
			slug: handle,
			origin: locals['origin'],
			sid: cookies.get('connect.sid')
		})

		//console.log('product: ', product)

		if (!product) throw error(404, 'Product not found')

		return {
			ref,
			product,
			orderId
		}
	} catch (e) {
		throw handleApiError(e)
	}
}

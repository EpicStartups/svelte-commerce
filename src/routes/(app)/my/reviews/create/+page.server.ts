import { error, type Action } from '@sveltejs/kit'
import { ProductService, ReviewService } from '$lib/services'
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

const saveReview: Action = async ({ request, cookies, locals }) => {
	const data = await request.formData()
	const rating = data.get('rating').toString()
	const heading = data.get('heading').toString()
	const description = data.get('description').toString()
	const productId = data.get('productId').toString()
	const orderId = data.get('orderId').toString()
	const sid = cookies.get('connect.sid')
	// console.log('data: ', {
	// 	rating,
	// 	heading,
	// 	description,
	// 	productId,
	// 	orderId,
	// 	sid
	// })
	try {
		const res = await ReviewService.createReview({
			rating: Number(rating),
			heading,
			message: description,
			productId,
			orderId,
			sid
		})

		//console.log('res: ', res)

		return res.review
	} catch (err) {
		console.error('error from server: ', err)
		throw err
	}
}

export const actions = { saveReview }

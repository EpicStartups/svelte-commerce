import { ProductService, ReviewService } from '$lib/services'
import { redirect } from '@sveltejs/kit'

const isServer = import.meta.env.SSR // get the SSR value

export async function load({ params, url, parent }) {
	const { slug } = params
	const variant =
		url.searchParams.get('variant') !== '' ? url.searchParams.get('variant') : undefined
	const parentData = await parent()
	const zip = parentData['zip']
	const sid = parentData['sid']
	const origin = parentData['origin']
	const store = parentData['store']
	const me = parentData['me']
	if (store?.isSecureCatalogue && !me) {
		throw redirect(307, `/auth/login?ref=${url?.pathname}`)
	}
	const storeId = store?.id
	const page = url.searchParams.get('page') || 1
	// const product = await ProductService.fetchProduct3({
	// 	origin,
	// 	server: isServer,
	// 	sid,
	// 	slug,
	// 	variant
	// })

	return {
		product: ProductService.fetchProduct3({
			origin,
			server: isServer,
			sid,
			slug,
			variant
		}),

		deliveryDetails: zip,

		streamed: {
			moreProductDetails: ProductService.fetchProduct2({
				origin,
				server: isServer,
				slug,
				storeId,
				variant
			}),

			productReviews: ReviewService.fetchProductReviews({
				origin,
				page,
				server: isServer,
				slug,
				storeId
			})
		}
	}
}

import { OrdersService, ReviewService, UserService, WishlistService } from '$lib/services'
import { error } from '@sveltejs/kit'

export async function load({ parent, cookies }) {
	//const { store, origin, sid } = await parent()
	const parentData = await parent()

	// const wishlists = await WishlistService.fetchWishlist({
	// 	origin,
	// 	sid: parentData['sid'],
	// 	storeId: parentData['store']?.id
	// })

	try {
		const orders = await OrdersService.fetchOrders({
			sid: cookies.get('connect.sid')
		})
		const reviews = await ReviewService.fetchReviews({
			sid: cookies.get('connect.sid')
		})
		//console.log('reviews: ', reviews)

		return {
			streamed: {
				orders: orders,
				wishlists: [],
				reviews: reviews
			}
		}
	} catch (err) {
		console.error('err: ', err)
		throw error(400, 'Something went wrong loading your account')
	}
}

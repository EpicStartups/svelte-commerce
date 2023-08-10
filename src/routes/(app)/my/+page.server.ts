import { OrdersService, ReviewService, WishlistService } from '$lib/services'

export async function load({ parent }) {
	//const { store, origin, sid } = await parent()
	const parentData = await parent()
	const orders = await OrdersService.fetchOrders({
		origin,
		sid: parentData['sid'],
		storeId: parentData['store']?.id
	})
	console.log('orders: ', orders)
	const wishlists = await WishlistService.fetchWishlist({
		origin,
		sid: parentData['sid'],
		storeId: parentData['store']?.id
	})
	return {
		streamed: {
			orders,
			wishlists,
			reviews: []
		}
	}
}

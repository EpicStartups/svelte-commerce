import {
	CollectionService,
	DealsService,
	FeedbackService,
	HomeService,
	ProductService,
	ReviewService,
	VendorService
} from '$lib/services'
const isServer = import.meta.env.SSR

export async function load({ parent }) {
	const { store, origin, sid } = await parent()
	const home = await CollectionService.fetchCollections({
		origin,
		storeId: store?.id,
		server: isServer
	})
	const products = await ProductService.fetchProducts({ origin })
	//console.log('products: ', products)
	return {
		streamed: {
			home: HomeService.fetchHome({ origin, storeId: store?.id, server: isServer }),

			// vendors: VendorService.fetchVendors({ origin, storeId: store?.id, server: isServer }),

			deals: DealsService.fetchDeals({ origin, storeId: store?.id, server: isServer }),
			products: ProductService.fetchProducts({ origin }),
			collections: CollectionService.fetchCollections({
				origin,
				storeId: store?.id,
				server: isServer
			}),

			feedbacks: FeedbackService.fetchFeedbacks({
				origin,
				storeId: store?.id,
				server: isServer
			})
		},

		origin
	}
}

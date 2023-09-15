import { StoreService } from '$lib/services'
import { mapMedusaJsStore } from '$lib/services/medusa/medusa-utils'
import { handleApiError } from '$lib/utils'
import type { LayoutServerLoad } from '../$types'

export const load: LayoutServerLoad = async ({ url, locals, cookies, params }) => {
	const sid = cookies.get('connect.sid')
	const shopId = params.slug
	const route = url.pathname.replace(`shop/${shopId}`, '')

	try {
		const store = await StoreService.getShopById({
			sid,
			shopId
		})
		//console.log('store: ', store.widgets)
		return {
			shop: mapMedusaJsStore(store),
			route
		}
	} catch (err) {
		console.error('shop error: ', err)
		throw handleApiError(err)
	}
}

import { getMedusajsApi } from '$lib/utils/server'
import { error } from '@sveltejs/kit'
import type { MedusaCountry, MedusaRegion } from './types'

export const fetchCountries = async ({ origin, storeId, server = false, sid = null }: any) => {
	try {
		const cres: { regions: MedusaRegion[] } = await getMedusajsApi(`regions`, {}, sid)
		const res: MedusaCountry[] = cres.regions.flatMap((region) => region.countries)
		console.log('countries: ', res)
		return res
	} catch (e) {
		throw error(e.status, e.message)
	}
}

export const fetchStates = async ({
	origin,
	storeId,
	countryCode,
	server = false,
	sid = null
}: any) => {
	try {
		let res: any = {}

		res = await getMedusajsApi(`regions`, {}, sid)

		return res?.data || []
	} catch (e) {
		throw error(e.status, e.message)
	}
}

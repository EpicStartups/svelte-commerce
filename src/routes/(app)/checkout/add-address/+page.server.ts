import { AddressService, CountryService } from '$lib/services'
import type { MedusaAddress, MedusaCountry } from '$lib/services/medusa/types.js'

export const prerender = false

export async function load({ cookies, locals, params, url }) {
	const store = locals['store']
	const id = url.searchParams.get('id')
	// const prescriptionId = url.searchParams.get('prescription')
	let address: MedusaAddress = {
		id: '',
		created_at: '',
		updated_at: '',
		deleted_at: '',
		customer_id: '',
		company: '',
		first_name: '',
		last_name: '',
		address_1: '',
		address_2: '',
		city: '',
		country_code: '',
		province: '',
		postal_code: '',
		phone: '',
		metadata: undefined
	}
	let states = []

	if (id === 'new') {
		;(address.id = 'new'), (address.province = null)
	} else {
		address = await AddressService.fetchAddress({
			id,
			storeId: store?.id,
			server: true,
			sid: cookies.get('connect.sid')
		})
	}

	const countries: MedusaCountry[] = await CountryService.fetchCountries({
		storeId: store?.id,
		server: true,
		sid: cookies.get('connect.sid')
	})

	if (countries?.length === 1) {
		address.country_code = countries[0].name || countries[0].iso_2
	} else if (countries?.length > 1) {
		const defaultCountry = countries.find((c) => {
			return c.name === 'MALAYSIA'
		})

		if (defaultCountry) {
			address.country_code = defaultCountry.name || defaultCountry.iso_2
		}
	}

	if (address?.country_code) {
		states = await CountryService.fetchStates({
			storeId: store?.id,
			server: true,
			sid: cookies.get('connect.sid'),
			countryCode: address?.country_code
		})
	}

	if (states?.length === 1) {
		//address.state = states[0].code || states[0].iso_2
	}

	console.log('address: ', address)

	return { address, countries, states, id }
}

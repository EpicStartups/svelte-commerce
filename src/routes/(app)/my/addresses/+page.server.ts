import { AddressService } from '$lib/services'
import { error, type Action } from '@sveltejs/kit'

export async function load({ cookies, locals }) {
	const { myAddresses, selectedAddress, count } = await AddressService.fetchAddresses({
		storeId: locals['store']?.id,
		server: true,
		sid: cookies.get('connect.sid')
	})

	myAddresses['count'] = count
	const addresses = {
		data: myAddresses.data,
		count
	}
	let err: any = undefined

	if (myAddresses) {
		return { addresses, selectedAddress, err }
	}

	throw error(404, 'Addresses not found')
}

const saveAddress: Action = async ({ request, cookies, locals }) => {
	const data = await request.formData()
	const address = data.get('address').toString()
	const city = data.get('city').toString()
	const country = data.get('country').toString()
	const email = data.get('email').toString()
	const firstName = data.get('firstName').toString()
	const id = data.get('id').toString()
	const lastName = data.get('lastName').toString()
	const locality = data.get('locality').toString()
	const phone = data.get('phone').toString()
	const state = data.get('state').toString()
	const zip = data.get('zip').toString()
	const sid = cookies.get('connect.sid')
	const res = await AddressService.saveAddress({
		address,
		city,
		country,
		email,
		firstName,
		id,
		lastName,
		locality,
		phone,
		state,
		zip,
		sid
	})

	// console.log('res of save address = ', res)

	return res
}

export const actions = { saveAddress }

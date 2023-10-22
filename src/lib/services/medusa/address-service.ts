import type { Address } from '$lib/types'
import { deleteMedusajsApi, getMedusajsApi, postMedusajsApi } from '$lib/utils/server'
import { error } from '@sveltejs/kit'
import type { MedusaAddress, MedusaCustomer, MedusaProfile } from './types'
import { handleApiError } from '$lib/utils'

export const fetchAddresses = async ({
	origin,
	storeId,
	server = false,
	sid = 's:rbsl8gACO6pZuNvSnQNo1LKTpxUKaQnl.3B6p9hkKCV4dQOGLNmCqA4fhj70AAhv2bSGRtCmom0I'
}: any) => {
	try {
		//let res: any = {}
		let selectedAddress: MedusaAddress | null = null
		let myAddresses: MedusaAddress[] = []

		const res: { customer: MedusaProfile } = await getMedusajsApi(`customers/me`, {}, sid)

		myAddresses = res?.customer?.shipping_addresses
		if (myAddresses?.length) {
			selectedAddress = myAddresses[0]
		}
		return {
			myAddresses: { data: myAddresses },
			selectedAddress,
			count: res.customer.shipping_addresses.length
		}
	} catch (e) {
		console.error(e)
		throw error(e.status, e.message)
	}
}

export const fetchAddress = async ({
	origin,
	storeId,
	server = false,
	sid = null,
	id
}: any): Promise<MedusaAddress> => {
	try {
		const res: { customer: MedusaCustomer } = await getMedusajsApi(`customers/me`, {}, sid)

		if (res?.customer?.shipping_addresses?.length) {
			const address = res.customer.shipping_addresses.find((address) => address.id === id)
			if (address) {
				return address
			} else {
				throw { status: 404, message: `cannot find address for id: ${id}` }
			}
		} else {
			throw { status: 404, message: `cannot find address for id: ${id}` }
		}
	} catch (e) {
		throw error(e.status, e.message)
	}
}

interface SaveAddressInput {
	address: string
	locality: string
	city: string
	country: string
	email?: string
	landmark?: string
	firstName: string
	lastName: string
	phone: string
	state: string
	zip: string
	sid?: string | null
	id?: string
}

export const saveAddress = async ({
	address,
	city,
	country,
	email,
	firstName,
	landmark,
	lastName,
	locality,
	phone,
	state,
	zip,
	id,
	sid = null
}: SaveAddressInput) => {
	try {
		const addr = {
			address_1: address,
			address_2: locality,
			city,
			country_code: country.toUpperCase(),
			first_name: firstName,
			landmark,
			last_name: lastName,
			phone,
			postal_code: zip,
			province: state
			//email
		}
		const res: { customer: MedusaProfile } = await postMedusajsApi(
			id !== 'new' ? `customers/me/addresses/${id}` : 'customers/me/addresses',
			id !== 'new' ? addr : { address: addr },
			sid
		)
		const shipping_addresses = res.customer.shipping_addresses
		if (shipping_addresses) {
			return shipping_addresses[0]
		} else {
			throw error(404, 'Error occured while saving address')
		}
	} catch (err) {
		throw error(err.status || 400, err.message)
	}
}

interface DeleteAddressInput {
	addressId: string
	sid?: string | null
}

export const deleteAddress = async ({ addressId, sid = null }: DeleteAddressInput) => {
	try {
		const res = await deleteMedusajsApi(`customers/me/addresses/${addressId}`, {}, sid)
		console.log('delete address res: ', res)
		return res
	} catch (err) {
		throw handleApiError(err)
	}
}

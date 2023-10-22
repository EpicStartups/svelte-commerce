import type { Me } from '$lib/types'
import { delBySid, getMedusajsApi, postMedusajsApi } from '$lib/utils/server'
import { error } from '@sveltejs/kit'
import type { MedusaCustomer, MedusaProfile } from './types'

export const fetchMeData = async ({
	origin,
	storeId,
	server = false,
	cookies
}: any): Promise<Me | null> => {
	try {
		const sid = cookies.get('connect.sid')
		const response: { customer: MedusaProfile } = await getMedusajsApi(`customers/me`, null, sid)
		const customer = response.customer
		//console.log('customer: ', customer)

		const me: Me = {
			firstName: customer.first_name,
			lastName: customer.last_name,
			active: customer.has_account,
			email: customer.email,
			phone: customer.phone,
			id: customer.id
		}

		//console.log('me: ', me)

		return me
	} catch (e) {
		console.error('e: ', e)
		return null
	}
}

export const signupService = async ({
	firstName,
	lastName,
	phone,
	email,
	password,
	passwordConfirmation,
	storeId,
	origin,
	server = false,
	sid = null
}: any) => {
	try {
		let res: any = {}

		const response = await postMedusajsApi(`customers`, {
			first_name: firstName,
			last_name: lastName,
			phone,
			email,
			password
		})
		res = response.customer
		res.firstName = res.first_name
		res.lastName = res.last_name
		res.active = res.has_account

		return res
	} catch (e) {
		throw error(e.status, e.message)
	}
}

export const loginService = async ({
	email,
	password,
	storeId,
	origin,
	server = false,
	sid = null
}: any) => {
	try {
		let res: any = {}

		const response = await postMedusajsApi(`auth`, {
			email,
			password
		})
		res = response.customer
		res.firstName = res.first_name
		res.lastName = res.last_name
		res.active = res.has_account
		res.sid = response.sid
		return res
	} catch (e) {
		if (e.status === 401) e.message = 'email or password is invalid'
		throw error(e.status, e.message)
	}
}

export const forgotPasswordService = async ({
	email,
	referrer,
	storeId,
	origin,
	server = false,
	sid = null
}: any) => {
	try {
		let res: any = {}

		res = await postMedusajsApi(`customers`, {})

		return res
	} catch (e) {
		throw error(e.status, e.message)
	}
}

export const changePasswordService = async ({
	oldPassword,
	password,
	passwordConfirmation,
	storeId,
	origin,
	server = false,
	sid = null
}: any) => {
	try {
		let res: any = {}

		res = await postMedusajsApi(`customers/me`, {})

		return res
	} catch (e) {
		throw error(e.status, e.message)
	}
}

export const getOtpService = async ({
	firstName,
	lastName,
	phone,
	email,
	password,
	passwordConfirmation,
	storeId,
	origin,
	server = false,
	sid = null
}: any) => {
	try {
		let res: any = {}

		res = {} // await postMedusajsApi(`customers`, {})

		return res
	} catch (e) {
		throw error(e.status, e.message)
	}
}

export const verifyOtpService = async ({
	phone,
	otp,
	storeId,
	origin,
	server = false,
	sid = null
}: any) => {
	try {
		let res: any = {}

		res = await postMedusajsApi(`customers`, {})

		return res
	} catch (e) {
		throw error(e.status, e.message)
	}
}

export const logoutService = async ({ storeId, origin, server = false, sid = null }: any) => {
	try {
		let res: any = {}

		res = await delBySid(`auth`, origin)

		return res
	} catch (e) {
		throw error(e.status, e.message)
	}
}

interface UpdateProfileServiceInput {
	sid?: string | null
	input: UpdateProfileInput
}

interface UpdateProfileInput {
	first_name?: string
	last_name?: string
	phone?: string
}

export const updateProfileService = async ({ input, sid = null }: UpdateProfileServiceInput) => {
	try {
		const res: { customer: MedusaCustomer } = await postMedusajsApi(`customers/me`, input, sid)

		return res.customer
	} catch (e) {
		throw error(e.status, e.message)
	}
}

import { getMedusajsApi, postMedusajsApi } from '$lib/utils/server'
import { serializeNonPOJOs } from '$lib/utils/validations'
import { error } from '@sveltejs/kit'
import type { FetchPaymentSessionResp } from './types'

export const fetchPaymentMethods = async ({ origin, storeId, server = false, sid = null }: any) => {
	try {
		// let res: any = {}

		// res = await getMedusajsApi(`customers/me/payment-methods`, {}, sid)
		// console.log('sid: ', sid)
		// const response = await fetch('http://localhost:9000/store/customers/me/payment-methods', {
		// 	method: 'GET',
		// 	credentials: 'include',
		// 	headers: { Cookie: `connect.sid=${sid}` }
		// })
		// console.log('resp: ', response)
		// const isJson = response.headers.get('content-type')?.includes('application/json')
		// const res = isJson ? await response.json() : await response.text()

		// if (res?.status > 399) {
		// 	throw { status: res.status, message: res }
		// } else if (response?.status > 399) {
		// 	throw { status: response.status, message: res }
		// } else {
		// 	return res
		// }

		//return res.data || []
		return []
	} catch (e) {
		console.log('paymentmethod err: ', e)
		throw error(e.status, e.message)
	}
}

interface FetchPaymentSessionsOptions {
	origin?: string
	storeId: string
	server: boolean
	sid: string | null
	cartId: string
}
export const fetchPaymentSessions = async ({
	origin,
	storeId,
	server = false,
	sid = null,
	cartId = ''
}: FetchPaymentSessionsOptions): Promise<FetchPaymentSessionResp> => {
	try {
		const resp: FetchPaymentSessionResp = await postMedusajsApi(
			`carts/${cartId}/payment-sessions`,
			{},
			sid
		)
		return resp
	} catch (err) {
		console.error('payment session err: ', err)
		throw err
	}
}

// export const addPaymentSession = async({
// 	origin,
// 	storeId,
// 	server = false,
// 	sid = null,
// 	cartId = ''
// }: FetchPaymentSessionsOptions) => {
// 	const resp = await postMedusajsApi(`store/carts/${cartId}/`)
// }

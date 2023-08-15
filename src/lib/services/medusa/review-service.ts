import { deleteMedusajsApi, getMedusajsApi } from '$lib/utils/server'
import { serializeNonPOJOs } from '$lib/utils/validations'
import { error } from '@sveltejs/kit'
import type { MedusaReview } from './types'
import { handleApiError } from '$lib/utils'

export const fetchReviews = async ({
	origin,
	storeId,
	pid,
	search,
	sort,
	currentPage,
	server = false,
	sid = null
}: any) => {
	try {
		const res: { reviews: MedusaReview[]; count: number; offset: number } = await getMedusajsApi(
			'reviews/me?expand=product',
			{},
			sid
		)

		return {
			data: res.reviews,
			count: res.count,
			pageSize: 10,
			noOfPage: res.count > 0 ? res.count / 10 > 1 ?? 1 : 1,
			page: res.offset > 0 ? Math.floor(res.offset / 10) + 1 : 1
		}
	} catch (e) {
		throw error(e.status, e.message)
	}
}

export const fetchProductReviews = async ({
	origin,
	storeId,
	pid,
	server = false,
	sid = null
}: any) => {
	try {
		let res: any = {}

		// res = await getMedusajsApi(`reviews/me`, {}, sid)

		// add dummy data schema for product review

		res = {
			reviewsSummary: [],
			product: {
				count: 0,
				data: [],
				noOfPage: 1
			},
			brand: {
				count: 0,
				noOfPage: 1
			},
			gallery: {
				count: 0,
				data: [],
				noOfPage: 1
			}
		}

		return res?.data || []
	} catch (e) {
		throw error(e.status, e.message)
	}
}

export const saveReview = async ({
	storeId,
	id,
	pid,
	message,
	rating,
	origin,
	server = false,
	sid = null
}: any) => {
	try {
		let res: any = {}

		res = await getMedusajsApi(`reviews/me`, {}, sid)

		return res
	} catch (e) {
		throw error(e.status, e.message)
	}
}

interface DeleteReviewInput {
	sid?: string | null
	id: string
}
export const deleteReview = async (input: DeleteReviewInput) => {
	try {
		const res = await deleteMedusajsApi(`reviews/${input.id}`, null, input.sid ?? null)
		console.log('deleteRes: ', res)
		return res
	} catch (err) {
		throw handleApiError(err)
	}
}

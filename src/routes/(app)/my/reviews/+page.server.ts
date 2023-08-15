import { error, redirect } from '@sveltejs/kit'
import { ReviewService } from '$lib/services'

export async function load({ cookies, locals }) {
	try {
		const reviews = await ReviewService.fetchReviews({
			sid: cookies.get('connect.sid')
		})

		return {
			reviews,
			isFetching: false,
			errors: undefined,
			sort: '-updatedAt'
		}
	} catch (e) {
		if (e.status === 401) {
			throw redirect(307, locals['store']?.loginUrl)
		} else {
			throw error(400, 'Error fetching your reviews')
		}
	}
}

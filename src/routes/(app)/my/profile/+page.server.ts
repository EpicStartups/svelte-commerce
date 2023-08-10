import { UserService } from '$lib/services'
import { error, redirect } from '@sveltejs/kit'
import dayjs from 'dayjs'

export async function load({ cookies, locals }) {
	const me = locals['me']
	const store = locals['store']

	try {
		const data = await UserService.fetchMeData({
			storeId: locals['store']?.id,
			server: true,
			sid: cookies.get('connect.sid'),
			cookies
		})

		return {
			profile: data
		}
	} catch (e) {
		if (e.status === 401) {
			throw redirect(307, store.loginUrl)
		}
		throw error(e.status, e.message)
	}
}

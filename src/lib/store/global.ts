import type { Me } from '$lib/types'
import { writable, get } from 'svelte/store'

interface GlobalStore {
	me?: Me
}

const store = writable<GlobalStore>({})

const setMe = (me?: Me) => {
	//console.log('me: ', me)
	if (me) {
		store.update((store) => {
			return {
				...store,
				me
			}
		})
	}
}

const getter = () => {
	return get(store)
}

export default { store, setMe, getter }

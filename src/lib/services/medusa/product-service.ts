import { error } from '@sveltejs/kit'
import { getMedusajsApi, postMedusajsApi } from '$lib/utils/server'
import type { AllProducts, Product } from '$lib/types'
import { mapMedusajsAllProducts, mapMedusajsProduct } from './medusa-utils'
import type { FetchProductsResp, MedusaProduct } from './types'

// Search product

export const searchProducts = async ({
	origin,
	query,
	searchData,
	storeId,
	server = false,
	sid = null
}: any) => {
	try {
		let res: AllProducts | {} = {}
		let products: Product[] = []
		let count = 0
		let facets = ''
		let pageSize = 0
		let category = ''
		let err = ''
		res = await postMedusajsApi(`products/search?q=${searchData}`, { q: searchData })
		// products = res?.hits
		// count = res?.count || 0
		// facets = res?.facets || []
		// pageSize = res?.pageSize || 25

		return { products, count, facets, pageSize, err }
	} catch (e) {
		if (typeof e.status === 'number' && e.status >= 400 && e.status <= 599) {
			throw error(e.status, e.message)
		} else {
			throw error(400, e)
		}
	}
}

export const fetchProducts = async ({ origin, slug, id, server = false, sid = null }: any) => {
	try {
		const response: FetchProductsResp = await getMedusajsApi(`products`)
		return mapMedusajsAllProducts(response)
	} catch (e) {
		if (typeof e.status === 'number' && e.status >= 400 && e.status <= 599) {
			throw error(e.status, e.message)
		} else {
			throw error(400, e)
		}
	}
}

// Fetch single product
interface FetchProductInput {
	origin?: string
	id?: string
	slug?: string
	server?: boolean
	sid?: string | null
	variant?: string
	currency?: string
}
export const fetchProduct = async ({
	origin,
	slug,
	id,
	server = false,
	sid = null,
	variant,
	currency
}: FetchProductInput) => {
	try {
		const med: FetchProductsResp = await getMedusajsApi(
			`products?handle=${slug}&expand=variants,variants.prices,images&currency_code=myr`
		)
		if (med.count !== 1) {
			throw error(400, `there are ${med.count} products for ${slug}`)
		}
		return mapMedusajsProduct(med.products[0], variant, currency)
	} catch (e) {
		if (typeof e.status === 'number' && e.status >= 400 && e.status <= 599) {
			throw error(e.status, e.message)
		} else {
			throw error(400, e)
		}
	}
}

// Fetch other single product

export const fetchProduct2 = async ({ origin, slug, id, server = false, sid = null }: any) => {
	try {
		let res: Product | {} = {}
		const med: FetchProductsResp = await getMedusajsApi(
			`products?handle=${slug}&expand=variants,variants.prices,images`
		)

		const productArray = med.products || [] // fetch the products array value from the med variable

		res = mapMedusajsProduct(productArray[0]) // assuming we only want the first product in the array

		return res || {}
	} catch (e) {
		if (typeof e.status === 'number' && e.status >= 400 && e.status <= 599) {
			throw error(e.status, e.message)
		} else {
			throw error(400, e)
		}
	}
}
// Fetch products based on category

export const fetchProductsOfCategory = async ({
	origin,
	storeId,
	query,
	categorySlug,
	server = false,
	sid = null
}: any) => {
	try {
		let res: any = {}
		let products: Product[] = []
		let count = 0
		let facets = ''
		let pageSize = 0
		let category = ''
		let err = ''
		res = await getMedusajsApi(`products?category_id[]=${categorySlug}`)
		count = res?.count
		products = res?.products.map((p) => mapMedusajsProduct(p))
		const offset = res?.offset
		const limit = res?.limit
		return { products, count, facets, pageSize, category, err }
	} catch (e) {
		if (typeof e.status === 'number' && e.status >= 400 && e.status <= 599) {
			throw error(e.status, e.message)
		} else {
			throw error(400, e)
		}
	}
}

// Fetch next product

export const fetchNextPageProducts = async ({
	origin,
	storeId,
	categorySlug,
	server = false,
	nextPage,
	searchParams = {},
	sid = null
}: any) => {
	try {
		let nextPageData = []
		let res: any = {}

		res = await getMedusajsApi(`products`)

		return {
			nextPageData: nextPageData || [],
			count: res.count,
			estimatedTotalHits: res.estimatedTotalHits,
			facets: res.facets
		}
	} catch (e) {
		if (typeof e.status === 'number' && e.status >= 400 && e.status <= 599) {
			throw error(e.status, e.message)
		} else {
			throw error(400, e)
		}
	}
}

// Fetch related products

export const fetchRelatedProducts = async ({
	origin,
	storeId,
	categorySlug,
	pid,
	server = false,
	sid = null
}: any) => {
	try {
		let relatedProductsRes: any = {}
		let relatedProducts: Product[] = []

		relatedProducts = await getMedusajsApi(`products`)
		console.log('relatedProducts: ', relatedProducts)
		return relatedProducts || []
	} catch (e) {
		if (typeof e.status === 'number' && e.status >= 400 && e.status <= 599) {
			throw error(e.status, e.message)
		} else {
			throw error(400, e)
		}
	}
}

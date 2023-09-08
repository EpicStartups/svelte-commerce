import { error } from '@sveltejs/kit'
import { getMedusajsApi, postMedusajsApi } from '$lib/utils/server'
import type { AllProducts, Product } from '$lib/types'
import { mapMedusajsAllProducts, mapMedusajsProduct } from './medusa-utils'
import type { FetchProductsResp, MedusaProduct } from './types'

// Search product

interface SearchProductInput {
	origin?: string
	query?: string
	searchData?: string
	storeId?: string
	server?: boolean
	sid?: string
	limit?: number
	page?: number
}

export interface SearchProductRes {
	products: MedusaProduct[]
	count: number
	facets: string
	pageSize: number
	err: any
	isLoading: boolean
}

export const searchProducts = async ({
	origin,
	query,
	searchData,
	storeId,
	limit = 3,
	page = 1,
	server = false,
	sid = null
}: SearchProductInput): Promise<SearchProductRes> => {
	try {
		const res: { products: MedusaProduct[]; count: number } = await postMedusajsApi(
			`products/search`,
			{
				q: query ?? '',
				limit,
				offset: (page - 1) * limit
			},
			null
		)
		//console.log('product: ', res.products[0])
		return {
			products: res.products,
			count: res.products.length,
			facets: '',
			pageSize: Math.ceil(res.count / limit),
			err: null,
			isLoading: undefined
		}
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
		console.log('med: ', med.products[0])
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

export const fetchProduct3 = async ({
	origin,
	slug,
	id,
	server = false,
	sid = null,
	variant,
	currency
}: FetchProductInput) => {
	try {
		const med: { product: MedusaProduct } = await getMedusajsApi(
			`fetch-product?handle=${slug}&currency_code=myr`
		)
		if (!med.product) {
			throw error(400, `there are no product for ${slug}`)
		}
		//console.log('med: ', med.product.reviews)
		return mapMedusajsProduct(med.product, variant, currency)
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

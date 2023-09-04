import type {
	AllOrders,
	AllProducts,
	Category,
	Order,
	Product,
	CartDiscount,
	Item,
	CartItem,
	Cart,
	ShippingOption,
	Store,
	Review
} from '$lib/types'
import type { WidgetStyle } from '$lib/types/baseWidgets'
import { toPrice } from '$lib/utils'
import { formatCurrency, type Currency } from '$lib/utils/currency'
import type {
	FetchProductsResp,
	MedusaCart,
	MedusaItem,
	MedusaProduct,
	MedusaReview,
	MedusaShippingOption,
	MedusaStore,
	WidgetText
} from './types'
export const mapMedusajsOrder = (o: any) => {
	let tmp: any
	if (o) {
		const ord: Order = {
			_id: o.id,
			status: o.status,
			paymentStatus: o.payment_status,
			cartId: o.cart_id,
			cart: tmp,
			customer: o.customer,
			address: o.address,
			// cart: o.cart,
			// customer_id: o.customer_id,
			// user: o.customer,
			orderItems: [],
			orderNo: '',
			updatedAt: o.updated_at,
			user: o.user,
			userEmail: o.email,
			billingAddress: o.billing_address.map((a: any) => {
				if (a)
					return {
						address: a.address_1,
						city: a.city,
						country: a.country_code,
						firstName: a.first_name,
						lastName: a.last_name,
						phone: a.phone,
						state: a.province,
						zip: a.postal_code
					}
			}),
			paySuccess: o.paid_total,
			totalAmountRefunded: o.refunded_total,
			amount: {
				currency: o.currency_code,
				discount: 100 * ((o.total - o.discount_total) / o.total),
				qty: o.items.length,
				shipping: o.shipping_total,
				subtotal: o.subtotal,
				tax: o.tax_total,
				total: o.total
			},
			items: o.items.map((i: any) => {
				if (i)
					return {
						_id: i.id,
						orderItemId: i.order_id,
						description: i.description,
						name: i.title,
						img: i.thumbnail,
						price: i.unit_price,
						total: i.total,
						subtotal: i.subtotal,
						tax: i.tax_total,
						qty: i.quantity
					}
			})
		}
		return ord
	} else {
		return {}
	}
}

export const mapMedusajsAllProducts = (p: FetchProductsResp) => {
	const allProd = {
		count: p.count,
		// currentPage: p.currentPage,
		// pageSize: p.pageSize,
		limit: p.limit,
		offset: p.offset,
		products: p.products.map((p: MedusaProduct) => mapMedusajsProduct(p))
		//facets: p.facets
	}
	return allProd
}

export const mapMedusajsProduct = (
	p: MedusaProduct,
	currentVariant?: string,
	currency: string = 'myr'
): Product => {
	const variant = currentVariant
		? p.variants.find((variant) => variant.id === currentVariant) ?? p.variants[0]
		: p.variants[0]
	const price = currency
		? variant.prices.find((price) => price.currency_code === currency) ?? variant.prices[0]
		: variant.prices[0]
	const currency2 = currency.toUpperCase() as Currency
	const metadata = variant.metadata ?? {}
	const store: Store = p.store
		? {
				id: p.store.id,
				name: p.store.name,
				slug: p.store.id,
				banner: '',
				icon: ''
		  }
		: undefined

	const prod: Product = {
		_id: p.id,
		id: p.id,
		createdAt: variant.created_at,
		updatedAt: variant.updated_at,
		deletedAt: variant.deleted_at,
		name: p.title,
		slug: p.handle,
		description: p.description,
		status: p.status,
		active: p.status === 'published' ? true : false,
		images: p.images?.map((i: any) => {
			if (i) return i.url
		}),
		img: p.thumbnail,
		discountable: p.discountable,
		externalId: p.external_id,
		variants: p.variants,
		sku: variant.sku,
		barcode: variant.barcode,
		ean: variant.ean,
		upc: variant.upc,
		hasStock: variant.inventory_quantity > 0,
		allowBackOrder: variant.allow_backorder,
		manageInventory: variant.manage_inventory,
		hsn: variant.hs_code,
		countryOfOrigin: variant.origin_country,
		midCode: p.mid_code,
		material: p.material,
		weight: variant.weight,
		height: variant.height,
		width: variant.width,
		length: variant.length,
		price: formatCurrency(price.amount, currency2),
		mrp: formatCurrency(variant.original_price_incl_tax, currency2),
		discount:
			variant.original_price_incl_tax && variant.calculated_price_incl_tax
				? (100 * (variant.original_price_incl_tax - variant.calculated_price_incl_tax)) /
				  variant.original_price_incl_tax
				: 0,

		options: p.variants.map((i) => {
			if (i)
				return {
					_id: i.id,
					name: i.title,
					inputType: '',
					values: []
				}
		}),
		metaTitle: metadata.title,
		metaDescription: metadata.description,
		metaKeywords: metadata.keywords,
		priceWithoutTax: formatCurrency(variant.original_price, currency2),
		mrpWithoutTax: formatCurrency(variant.calculated_price, currency2),
		originalTax: formatCurrency(variant.original_tax, currency2),
		calculatedTax: formatCurrency(variant.calculated_price, currency2),
		taxRates: variant.tax_rates,
		collectionId: p.collection_id,
		//categoryPool: {},
		typeId: p.type_id,
		// type: p.type,
		tags: p.tags?.map((i: any) => {
			if (i)
				return {
					type: 'Ribbon',
					name: i.value,
					img: '',
					colorCode: 'red',
					position: 1,
					active: false
				}
		}),
		// sales_channels: p.sales_channels,
		categoryPool: undefined,
		deliveryDetails: '',
		isWishlisted: false,
		store,
		stock: variant.inventory_quantity,
		reviews: p.reviews ? p.reviews.map((review) => mapMedusaJsReview(review)) : undefined,
		specifications: p.specifications,
		widgets: p.widgets ?? undefined,
		rating: p.rating ?? 0
	}
	return prod
}

export const mapMedusajsCategory = (c: any) => {
	if (c) {
		const r: Category = {
			id: c.id,
			name: c.name,
			slug: c.handle,
			children: c.category_children
				? c.category_children.map((i: any) => {
						if (i) return mapMedusajsCategory(i)
				  })
				: []
		}
		return r
	} else {
		return {}
	}
}

export const mapMedusajsAllOrders = (p: any) => {
	if (p) {
		const allOrd: AllOrders = {
			count: p.count,
			// currentPage: p.currentPage,
			// pageSize: p.pageSize,
			limit: p.limit,
			data: p.orders.forEach(mapMedusajsOrder)
		}
		return allOrd
	} else {
		return {}
	}
}

// Cart data
export const mapMedusajsCart = (c: MedusaCart): Cart => {
	return {
		id: c.id,
		uid: c.customer_id,
		cart_id: c.id,
		store: null,
		storeCurrency: c.region.currency_code,
		qty: c.items.reduce((total, item) => total + item.quantity, 0),
		currencyCode: c.region.currency_code,
		currencyName: c.region.currency_code,
		currencySymbol: null,
		discount: {
			code: null,
			amount: c.discount_total,
			formattedAmount: {
				value: c.discount_total,
				currency: c.region.currency_code
			}
		},
		subtotal: Number(toPrice(c.subtotal)),
		shipping: {
			price: Number(toPrice(c.shipping_total)),
			tax: c.shipping_tax_total,
			formattedPrice: formatCurrency(
				c.shipping_total,
				c.region.currency_code.toUpperCase() as Currency
			)
		},
		tax: c.tax_total,
		total: Number(toPrice(c.total)),
		offer_total: null,
		items: c.items?.map((item) =>
			mapMedusaJsItem(item, c.region.currency_code.toUpperCase() as Currency)
		),
		unavailableItems: [],
		active: true,
		sid: c.id,
		formattedAmount: {
			subtotal: formatCurrency(c.subtotal, c.region.currency_code.toUpperCase() as Currency),
			discount: formatCurrency(c.discount_total, c.region.currency_code.toUpperCase() as Currency),
			shipping: formatCurrency(c.shipping_total, c.region.currency_code.toUpperCase() as Currency),
			tax: formatCurrency(c.tax_total, c.region.currency_code.toUpperCase() as Currency),
			total: formatCurrency(c.total, c.region.currency_code.toUpperCase() as Currency)
		},
		needAddress: true,
		needPrescription: false,
		selfTakeout: false,
		codAvailable: false,
		createdAt: c.created_at,
		updatedAt: c.updated_at
	}
}

export const mapMedusaJsItem = (item: MedusaItem, currency: Currency = 'MYR'): CartItem => {
	return {
		id: item.id,
		pid: item.variant.product_id,
		vid: item.variant_id,
		name: item.variant.title,
		img: item.thumbnail,
		slug: item.variant.product.handle,
		imgCdn: item.thumbnail,
		price: formatCurrency(item.unit_price, currency),
		mrp: formatCurrency(item.unit_price, currency),
		customizedImg: item.thumbnail,
		isCustomized: false,
		orderStatus: [],
		qty: item.quantity,
		time: item.created_at,
		tax: formatCurrency(item.tax_total, currency),
		brandName: item.variant.product.store ? item.variant.product.store.name : '',
		type: 'store',
		formattedItemAmount: {
			mrp: formatCurrency(item.unit_price, currency),
			price: formatCurrency(item.unit_price, currency),
			tax: formatCurrency(item.tax_total, currency)
		},
		store: item.variant.product.store ? item.variant.product.store.name : '',
		storeSlug: item.variant.product.store ? item.variant.product.store.id : ''
	}
}

export const mapMedusaJsShippingOptions = (
	options: MedusaShippingOption[],
	currency: Currency = 'MYR'
): ShippingOption[] => {
	const res: ShippingOption[] = []
	for (const option of options) {
		res.push({
			id: option.id,
			createdAt: option.created_at,
			updatedAt: option.updated_at,
			deletedAt: option.deleted_at,
			name: option.name,
			regionId: option.region_id,
			profileId: option.profile_id,
			providerId: option.provider_id,
			priceType: option.price_type,
			amount: formatCurrency(option.amount, currency),
			isReturn: option.is_return,
			adminOnly: option.admin_only,
			data: option.data,
			metadata: option.metadata,
			priceInclTax: formatCurrency(option.price_incl_tax, currency),
			taxRates: option.tax_rates,
			taxAmount: formatCurrency(option.tax_amount, currency)
		})
	}
	return res
}

export const mapMedusaJsStore = (store: MedusaStore): Store => {
	return {
		id: store.id,
		name: store.name,
		icon: store.icon,
		banner: store.banner,
		slug: store.id,
		products: store.products.map((product) =>
			mapMedusajsProduct(product, undefined, store.default_currency_code)
		),
		createdAt: store.created_at,
		defaultCurrency: store.default_currency_code,
		widgets: store.widgets ?? []
	}
}

export const mapMedusaJsReview = (review: MedusaReview): Review => {
	return {
		active: true,
		message: review.description,
		title: review.heading,
		pid: review.product_id,
		rating: review.rating,
		user: `${review.customer.first_name} ${review.customer.last_name}`,
		vendor: '',
		variant: '',
		listing: '',
		store: ''
	}
}

export const parseTextWidgetInput = (text: WidgetText) => {
	return `
		${text.color ? `color: ${text.color};` : ''}
		${text.font ? `font-family: ${text.font};` : ''}
		${text.weight ? `font-weight: ${text.weight};` : ''}
	`
}

export const parseWidgetStyle = (style: WidgetStyle) => {
	return `
		${style.color ? `color: ${style.color};` : ''}
		${style.font ? `font-family: ${style.font};` : ''}
		${style.weight ? `font-weight: ${style.weight};` : ''}
	`
}

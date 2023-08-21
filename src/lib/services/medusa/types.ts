export type MedusaImage = {
	id: string
	created_at: string
	updated_at: string
	deleted_at: string | null
	url: string
	metadata: string | null
}

export interface MedusaCustomer {
	id: string
	created_at: string
	updated_at: string
	deleted_at: string | null
	email: string
	first_name: string
	last_name: string
	billing_address_id: string | null
	phone: string
	has_account: boolean
	metadata: Record<string, any> | null
	billing_address: any
	shipping_addresses: MedusaAddress[]
}

export interface MedusaStore {
	id: string
	created_at: string
	updated_at: string
	name: string
	default_currency_code: string
	swap_link_template: any
	invite_link_template: any
	default_location_id: any
	metadata: Record<string, any> | null
	default_sales_channel_id: string
	payment_link_template?: any
	banner?: string
	icon?: string
	products?: MedusaProduct[]
}

export type MedusaValue = {
	id: string
	created_at: string
	updated_at: string
	deleted_at: string | null
	value: string
	option_id: string
	variant_id: string
	metadata: string | null
}

export type MedusaOption = {
	id: string
	created_at: string
	updated_at: string
	deleted_at: string | null
	title: string
	product_id: string
	metadata: string | null
	values: MedusaValue[]
}

export type MedusaProfile = {
	id: string
	created_at: string
	updated_at: string
	deleted_at: string | null
	name: string
	type: string
	metadata: Record<string, any> | null
	first_name: string
	last_name: string
	has_account: boolean
	email: string
	phone: string
	shipping_addresses: MedusaAddress[]
	billing_addresses: MedusaAddress | null
}

export type MedusaPrice = {
	id: string
	created_at: string
	updated_at: string
	deleted_at: string | null
	currency_code: string
	amount: number
	min_quantity: number | null
	max_quantity: number | null
	price_list_id: string | null
	variant_id: string
	region_id: string | null
	price_list: string | null
}

export type MedusaVariant = {
	id: string
	created_at: string
	updated_at: string
	deleted_at: string | null
	title: string
	product_id: string
	sku: string | null
	barcode: string | null
	ean: string | null
	upc: string | null
	variant_rank: number
	inventory_quantity: number
	allow_backorder: boolean
	manage_inventory: boolean
	hs_code: string | null
	origin_country: string | null
	mid_code: string | null
	material: string | null
	weight: number | null
	length: number | null
	height: number | null
	width: number | null
	metadata: Record<string, any> | null
	options: MedusaValue[]
	prices: MedusaPrice[]
	original_price: number | null
	calculated_price: number | null
	original_price_incl_tax: number | null
	calculated_price_incl_tax: number | null
	original_tax: number | null
	calculated_tax: number | null
	tax_rates: number | null
	product: MedusaProduct
}

export type MedusaProduct = {
	id: string
	title: string
	subtitle: string | null
	status: string
	external_id: string | null
	description: string
	handle: string
	is_giftcard: boolean
	discountable: boolean
	thumbnail: string
	collection_id: string | null
	type_id: string | null
	weight: number
	length: number | null
	height: number | null
	width: number | null
	hs_code: string | null
	origin_country: string | null
	mid_code: string | null
	material: string | null
	created_at: string
	updated_at: string
	deleted_at: string | null
	metadata: Record<string, any> | null
	profile_id: string
	collection: string | null
	images: MedusaImage[]
	options: MedusaOption[]
	profiles: MedusaProfile[]
	tags: any[]
	type: string | null
	variants: MedusaVariant[]
	categories: any[]
	store_id: string | null
	store?: MedusaStore | null
	profile: MedusaProfile
	reviews?: MedusaReview[] | null
}

export type FetchProductsResp = {
	products: MedusaProduct[]
	count: number
	offset: number
	limit: number
}

export interface MedusaContext {
	ip: string
	user_agent: string
}

export interface MedusaTaxLine {
	rate: number
	name: string
	code: string
	item_id: string
}

export interface MedusaItem {
	id: string
	created_at: string
	updated_at: string
	cart_id: string
	order_id: string | null
	swap_id: string | null
	claim_order_id: string | null
	original_item_id: string | null
	order_edit_id: string | null
	title: string
	description: string
	thumbnail: string
	is_return: boolean
	is_giftcard: boolean
	should_merge: boolean
	allow_discounts: boolean
	has_shipping: boolean
	unit_price: number
	variant_id: string
	quantity: number
	fulfilled_quantity: number | null
	returned_quantity: number | null
	shipped_quantity: number | null
	metadata: Record<string, any>
	adjustments: any[]
	tax_lines: MedusaTaxLine[]
	variant: MedusaVariant
	subtotal: number
	discount_total: number
	total: number
	original_total: number
	original_tax_total: number
	tax_total: number
	raw_discount_total: number
	sku?: string
}

export interface MedusaCountry {
	id: number
	iso_2: string
	iso_3: string
	num_code: number
	name: string
	display_name: string
	region_id: string
}

export interface MedusaPaymentProvider {
	id: string
	is_installed: boolean
}

export interface MedusaRegion {
	id: string
	created_at: string
	updated_at: string
	deleted_at: string | null
	name: string
	currency_code: string
	tax_rate: number
	tax_code: string | null
	gift_cards_taxable: boolean
	automatic_taxes: boolean
	tax_provider_id: string | null
	metadata: Record<string, any> | null
	countries: MedusaCountry[]
	payment_providers: MedusaPaymentProvider[]
	tax_rates: any[]
	fulfillment_providers: any[]
}

export interface MedusaSalesChannel {
	id: string
	created_at: string
	updated_at: string
	deleted_at: string | null
	name: string
	description: string
	is_disabled: boolean
	metadata: Record<string, any> | null
}

export interface MedusaCart {
	object: string
	id: string
	created_at: string
	updated_at: string
	deleted_at: string | null
	email: string | null
	billing_address_id: string | null
	shipping_address_id: string | null
	region_id: string
	customer_id: string | null
	payment_id: string | null
	type: string
	completed_at: string | null
	payment_authorized_at: string | null
	idempotency_key: string | null
	context: MedusaContext
	metadata: Record<string, any> | null
	sales_channel_id: string
	billing_address: any | null
	discounts: any[]
	gift_cards: any[]
	items: MedusaItem[]
	payment: any | null
	payment_sessions: any[]
	region: MedusaRegion
	sales_channel: MedusaSalesChannel
	shipping_address: any | null
	shipping_methods: any[]
	subtotal: number
	discount_total: number
	item_tax_total: number
	shipping_total: number
	shipping_tax_total: number
	gift_card_total: number
	gift_card_tax_total: number
	tax_total: number
	total: number
}

export interface MedusaAddress {
	id: string
	created_at: string
	updated_at: string
	deleted_at: string | null
	customer_id: string
	company: string | null
	first_name: string | null
	last_name: string | null
	address_1: string | null
	address_2: string | null
	city: string | null
	country_code: string | null
	province: string | null
	postal_code: string | null
	phone: string | null
	metadata: Record<string, any> | null
	email?: string | null
	region_id?: string | null
}

export interface FetchPaymentSessionResp {
	cart: Cart
	data: FetchPaymentSessionData
}

export interface Cart {
	object: string
	id: string
	created_at: string
	updated_at: string
	deleted_at: any
	email: any
	billing_address_id: any
	shipping_address_id: any
	region_id: string
	customer_id: any
	payment_id: any
	type: string
	completed_at: any
	payment_authorized_at: any
	idempotency_key: any
	context: MedusaContext
	metadata: any
	sales_channel_id: string
	billing_address: any
	discounts: any[]
	gift_cards: any[]
	items: MedusaItem[]
	payment: any
	payment_sessions: MedusaPaymentSession[]
	payment_session: MedusaPaymentSession
	region: MedusaRegion
	sales_channel: MedusaSalesChannel
	shipping_address: any
	shipping_methods: any[]
	subtotal: number
	discount_total: number
	item_tax_total: number
	shipping_total: number
	shipping_tax_total: number
	gift_card_total: number
	gift_card_tax_total: number
	tax_total: number
	raw_discount_total: number
	total: number
}

export interface MedusaContext {
	ip: string
	user_agent: string
}

export interface MedusaTaxLine {
	rate: number
	name: string
	code: string
	item_id: string
}

export interface MedusaPaymentSession {
	id: string
	created_at: string
	updated_at: string
	cart_id: string
	provider_id: string
	is_selected: boolean
	is_initiated: boolean
	status: string
	data: MedusaPaymentSessionData
	idempotency_key: any
	amount: number
	payment_authorized_at: any
}

export interface MedusaPaymentSessionData {
	id: string
	amount: number
	object: string
	review: any
	source: any
	status: string
	created: number
	invoice: any
	currency: string
	customer: string
	livemode: boolean
	metadata: Record<string, any> | null
	shipping: any
	processing: any
	application: any
	canceled_at: any
	description: any
	next_action: any
	on_behalf_of: any
	client_secret: string
	latest_charge: any
	receipt_email: any
	transfer_data: any
	amount_details: MedusaAmountDetails
	capture_method: string
	payment_method: any
	transfer_group: any
	amount_received: number
	amount_capturable: number
	last_payment_error: any
	setup_future_usage: any
	cancellation_reason: any
	confirmation_method: string
	payment_method_types: string[]
	statement_descriptor: any
	application_fee_amount: any
	payment_method_options: MedusaPaymentMethodOptions
	automatic_payment_methods: any
	statement_descriptor_suffix: any
}

export interface MedusaAmountDetails {
	tip: any
}

export interface MedusaPaymentMethodOptions {
	card: MedusaCard
}

export interface MedusaCard {
	network: any
	installments: any
	mandate_options: any
	request_three_d_secure: string
}

export interface MedusaPaymentProvider {
	id: string
	is_installed: boolean
}

export interface FetchPaymentSessionData {
	object: string
	id: string
	created_at: string
	updated_at: string
	deleted_at: any
	email: any
	billing_address_id: any
	shipping_address_id: any
	region_id: string
	customer_id: any
	payment_id: any
	type: string
	completed_at: any
	payment_authorized_at: any
	idempotency_key: any
	context: MedusaContext
	metadata: any
	sales_channel_id: string
	billing_address: any
	discounts: any[]
	gift_cards: any[]
	items: MedusaItem[]
	payment: any
	payment_sessions: MedusaPaymentSession[]
	payment_session: MedusaPaymentSession
	region: MedusaRegion
	sales_channel: MedusaSalesChannel
	shipping_address: any
	shipping_methods: any[]
	subtotal: number
	discount_total: number
	item_tax_total: number
	shipping_total: number
	shipping_tax_total: number
	gift_card_total: number
	gift_card_tax_total: number
	tax_total: number
	total: number
}

export interface MedusaShippingOption {
	id: string
	created_at: string
	deleted_at: string
	updated_at: string
	name: string
	region_id: string
	profile_id: string
	provider_id: string
	price_type: string
	amount: number
	is_return: boolean
	admin_only: boolean
	data: MedusaShippingOptionData
	metadata: Record<string, any> | null
	requirements: any[]
	price_incl_tax: number
	tax_rates: MedusaTaxLine[]
	tax_amount: number
}

export interface MedusaShippingOptionData {
	id: string
}

export interface MedusaOrder {
	id: string
	created_at: string
	updated_at: string
	status: OrderStatus
	fulfillment_status: FulfillmentStatus
	payment_status: PaymentStatus
	display_id: number
	cart_id: string | null
	customer_id: string
	email: string
	region_id: string
	currency_code: string
	tax_rate: any
	store_id: string
	claims: any[]
	customer: any
	discount: any[]
	fulfillments: MedusaFulfillment[] | null
	gift_card_transactions: any[]
	gits_cards: any[]
	items: MedusaItem[]
	payments: any[]
	refunds: any[]
	region: MedusaRegion
	shipping_address: MedusaAddress
	shipping_methods: any[]
	billing_address: MedusaBillingAddress | null
	store: MedusaStore
	swaps: any[]
	subtotal: number
	discount_total: number
	shipping_total: number
	refunded_total: number
	paid_total: number
	refundable_amount: number
	gift_card_total: number
	git_card_tax_total: number
	tax_total: number
	raw_discount_total: number
	total: number
	order_parent_id: string | null
	reviews?: MedusaReview[] | null
}

export interface MedusaReview {
	rating: number
	id: number
	created_ay: string
	updated_at: string
	customer_id: string
	heading: string
	description: string
	order_id: string
	product_id: string
	product: MedusaProduct
	customer: MedusaCustomer
}

export interface MedusaFulfillment {
	id: string
	created_at: string
	updated_at: string
	claim_order_id: any
	swap_id: any
	order_id: string
	no_notification: boolean
	provider_id: string
	location_id: string
	tracking_numbers: any[]
	data: any
	shipped_at: string
	canceled_at: any
	metadata: Record<string, any>
	idempotency_key: any
	tracking_links: MedusaTrackingLink[] | null
	items: MedusaItem[]
}

export interface MedusaTrackingLink {
	id: string
	created_at: string
	updated_at: string
	deleted_at: string | null
	url: string | null
	tracking_number: string
	idempotency_key: any
	metadata: Record<string, any>
}

export interface MedusaBillingAddress {
	region_id: string
	id: string
	created_at: string
	updated_at: string
	deleted_at: string | null
	customer_id: string
	company: string | null
	first_name: string
	last_name: string
	address_1: string
	address_2: string | null
	city: string
	country_code: string
	province: string
	postal_code: string
	phone: string
	metadata: Record<string, any>
}

export enum OrderStatus {
	PENDING = 'pending',
	COMPLETED = 'completed',
	ARCHIVED = 'archived',
	CANCELED = 'canceled',
	REQUIRES_ACTION = 'requires_action'
}
export enum FulfillmentStatus {
	NOT_FULFILLED = 'not_fulfilled',
	PARTIALLY_FULFILLED = 'partially_fulfilled',
	FULFILLED = 'fulfilled',
	PARTIALLY_SHIPPED = 'partially_shipped',
	SHIPPED = 'shipped',
	PARTIALLY_RETURNED = 'partially_returned',
	RETURNED = 'returned',
	CANCELED = 'canceled',
	REQUIRES_ACTION = 'requires_action'
}
export enum PaymentStatus {
	NOT_PAID = 'not_paid',
	AWAITING = 'awaiting',
	CAPTURED = 'captured',
	PARTIALLY_REFUNDED = 'partially_refunded',
	REFUNDED = 'refunded',
	CANCELED = 'canceled',
	REQUIRES_ACTION = 'requires_action'
}

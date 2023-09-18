<script lang="ts">
import { currency, date } from '$lib/utils'
import { LazyImg } from '$lib/components'
import { onMount } from 'svelte'
import { page } from '$app/stores'
import { PrimaryButton, BackButton } from '$lib/ui'
import dayjs from 'dayjs'
import noAddToCartAnimate from '$lib/assets/no/add-to-cart-animate.svg'
import OrderListSkeleton from '../_OrderListSkeleton.svelte'
import OrderTracking from '../_OrderTracking.svelte'
import productNonVeg from '$lib/assets/product/non-veg.png'
import productVeg from '$lib/assets/product/veg.png'
import ReturnTracking from '../_ReturnTracking.svelte'
import SEO from '$lib/components/SEO/index.svelte'
import TransparentButton from '../_TransparentButton.svelte'
import { FulfillmentStatus, type MedusaOrder } from '$lib/services/medusa/types'
import { formatCurrency } from '$lib/utils/currency'
import { completeOrder } from '$lib/services/medusa/orders-service'
import { OrdersService } from '$lib/services'

export let data

let clazz
export { clazz as class }

const seoProps = {
	title: 'Details ',
	metaDescription: 'Details '
}

// let deliveryBy = null
let now = null
let selectedProduct = null
let showDemoScheduler = false
let loading = false

function head() {
	return {
		title: 'Order Details'
	}
}

onMount(() => {
	// deliveryBy = dayjs().add(7, 'day').format('dddd, MMM D, YYYY')
	now = dayjs()
})

const calcStatus = (order: MedusaOrder) => {
	if (order.status === "completed") {
		return "completed"
	}
	if (order.fulfillments[0].delivered_at) {
		return "delivered"
	}
	if (order.status === "pending") {
		switch (order.fulfillment_status) {
			case FulfillmentStatus.NOT_FULFILLED:
			case FulfillmentStatus.PARTIALLY_FULFILLED:
			case FulfillmentStatus.FULFILLED:
				return "processing"
			case FulfillmentStatus.PARTIALLY_SHIPPED:
				return "partially shipped"
			case FulfillmentStatus.SHIPPED:
				return "shipped"
			default:
				return "processing"
		}
	}
}

const completeOrderHandler = () => {
	loading = true;
	completeOrder({orderId: data.order.id}).then((order) => {
		OrdersService.fetchOrderWithFulFillments({
			id: order.id,
		}).then((updatedOrder) => {
			console.log("order: ", updatedOrder)
			data.order = updatedOrder
		}).catch((err) => {
			console.error("error fetching new order: ", err);
		}).finally(() => {
			loading = false;
		})
	}).catch((error) => {

	})
}
</script>

<SEO {...seoProps} />


<div class="{clazz}">
	{#if loading}
		<OrderListSkeleton />
	{:else if data.order}
		<section class="font-jost tracking-wider">
			<!-- <BackButton to="/my/orders?sort=-updatedAt" class="mb-2" /> -->

			<div class="mb-5 overflow-hidden rounded border sm:mb-10">
				<div class="flex flex-wrap items-center justify-between border-b bg-zinc-100 px-5 py-3">
					<h6>Order No : #{data.order?.display_id}</h6>

					<h6>Order Date : {date(data.order?.created_at)}</h6>
				</div>

				<!-- Order detail  -->

				<div class="grid grid-cols-1 divide-y lg:grid-cols-2 lg:divide-y-0 lg:divide-x">
					<div class="col-span-1 flex flex-col divide-y divide-dashed">
						{#each data.order?.items ?? [] as item}
							<div class="flex gap-2 p-5 lg:gap-5">
								<a
								href="{`/product/${item.variant.product.handle}`}"
								aria-label="Click to view the product details"
								class="shrink-0"
								>
									<LazyImg
										src="{item.thumbnail}"
										alt=""
										width="96"
										class="h-auto w-24 object-contain object-top" />

								</a>

								<div class="flex w-full flex-1 flex-col gap-1 xl:pr-4">
									<div class="mb-1 flex justify-between gap-2 sm:gap-4">
										<a
											href="{`/product/${item.variant.product.handle}`}"
											aria-label="Click to view the product details"
											class="flex-1 hover:underline underline-offset-8 transition-all decoration-primary-900 text-zinc-500">
											{item.title}
										</a>

										<!-- {#if $page?.data?.store?.isFnb && item.foodType}
											<div>
												{#if item.foodType === 'veg'}
													<img src="{productVeg}" alt="veg" class="h-5 w-5" />
												{:else if item.foodType === 'nonveg'}
													<img src="{productNonVeg}" alt="non veg" class="h-5 w-5" />
												{/if}
											</div>
										{/if} -->
									</div>

									<div class="flex flex-wrap gap-1 items-center">
										{#if item.variant}
											<!-- <p>Variant: </p> -->
											<p class="px-3 py-1 rounded bg-primary-900 text-white">{item.variant.title}</p>
										{/if}
									</div>

									<!-- {#if data.order.store}
										<p>
											Seller :

											<a
												href="{`/vendor/${data.order.store_id}`}"
												aria-label="Click to view the vendor's profile"
												class="font-medium">
												{data.order.store.name}
											</a>
										</p>
									{/if} -->

									<!-- {#if item?.usedOptions?.length}
										<div class="mt-2 flex flex-col gap-2">
											{#each item?.usedOptions as option}
												{#if option?.val?.length && option?.val !== undefined && option?.val != ''}
													<div class="flex flex-wrap gap-2">
														<h6>{option.name}:</h6>

														{#if option.val}
															{#each option.val as v}
																{#if v}
																	<div class="font-bold">
																		{v}
																	</div>
																{/if}
															{/each}
														{/if}
													</div>
												{/if}
											{/each}
										</div>
									{/if} -->

									<div class="flex flex-wrap items-center gap-2 text-xs mt-3">
										<span class="text-base font-bold whitespace-nowrap">
											{currency(item.total / 100, data.order.currency_code.toUpperCase())}
										</span>

										<!-- {#if item?.mrp > item?.price}
											<span class="whitespace-nowrap text-zinc-500 line-through">
												<strike>
													{currency(item.mrp, $page.data?.store?.currencySymbol)}
												</strike>
											</span>

											{#if Math.floor(((item.mrp - item.price) / item.mrp) * 100) > 0}
												<span class="whitespace-nowrap text-secondary-500">
													({Math.floor(((item.mrp - item.price) / item.mrp) * 100)}% off)
												</span>
											{/if}
										{/if} -->
									</div>

									{#if data.order.status === 'completed' && data.order.reviews.find((review) => review.product_id === item.variant.product_id)}
										<div>
											<a href="/my/reviews" data-sveltekit-preload-data class="text-base">Product Reviewed</a>
										</div>
									{:else if data.order.status === "completed"}
										<div class="mt-2 xl:mt-0 xl:w-1/3">
											<a
												href="/my/reviews/create?handle={item.variant.product.handle}&oid={data.order.id}&ref=/my/orders/{data.order.id}"
												aria-label="Click to visit rate & review product"
												class="whitespace-nowrap font-semibold text-indigo-500 focus:outline-none hover:underline">
												Rate & Review Product
											</a>
										</div>
									{:else if data.order.fulfillments.length && data.order.fulfillments.length === 1 && data.order.fulfillments[0].delivered_at}
										<button 
											class="whitespace-nowrap font-semibold text-primary-900 focus:outline-none hover:underline underline-offset-4 w-[100px]"
											on:click="{completeOrderHandler}"
										>
											Complete Order
										</button>
									{/if}
								</div>
							</div>
						{/each}
					</div>

					<div class="col-span-1 flex flex-col gap-5 p-5 lg:gap-10">
						<div>
							<h5 class="mb-2">Seller</h5>
							<div class="grid grid-cols-[30px_auto] items-center gap-5">
								{#if data.order.store?.icon}
									<img
									class="w-full object-cover"
									src={data.order.store.icon}
									alt={`picture of shop ${data.order.store.name} in Shopolah marketplace`}
									/>
								{:else}
									<div class="bg-gray-200 h-[40px] w-[40px] rounded-full overflow-hidden">

									</div>
								{/if}
								<a href={`/shop/${data.order.store.id}`} class="text-lg text-dark-700 hover:text-primary-900 transition-all">{data.order.store.name}</a>
							</div>
						</div>
						<div>
							<h5 class="mb-2">Delivery Address</h5>

							<p class="flex flex-col">
								<span>
									{data.order.shipping_address.first_name}
									{data.order?.shipping_address.last_name}

									<br />

									{data.order?.shipping_address?.address_1}, {data.order?.shipping_address?.city},
									{data.order?.shipping_address?.country_code}, {data.order?.shipping_address?.province}

									<br />

									{data.order?.shipping_address?.postal_code}
								</span>
							</p>

							{#if data.order?.shipping_address?.phone}
								<p>
									{data.order?.shipping_address?.phone}
								</p>
							{/if}
						</div>

						<div>
							<h5 class="mb-2">Billing Address</h5>

							<p class="flex flex-col">
								<span>
									{data.order?.billing_address?.first_name}
									{data.order?.billing_address?.last_name}

									<br />

									{data.order?.billing_address?.address_1}, {data.order?.billing_address?.address_2},
									{data.order?.billing_address?.province}, {data.order?.billing_address?.city}

									<br />

									{data.order?.billing_address?.postal_code}
								</span>
							</p>

							{#if data.order?.billing_address?.phone}
								<p>
									{data.order?.billing_address?.phone}
								</p>
							{/if}
						</div>

						<div>
							<h5 class="mb-2">Receipt</h5>

							<div class="flex flex-col">
								<p>Subtotal: {formatCurrency(data.order.subtotal, data.order.currency_code.toUpperCase()).value}</p>
								<p>Shipping: {formatCurrency(data.order.shipping_total, data.order.currency_code.toUpperCase()).value}</p>
								<p>Total: {formatCurrency(data.order.total, data.order.currency_code.toUpperCase()).value}</p>
							</div>
						</div>

						<!-- <div>
							<h5 class="mb-2">Vendor Details :</h5>

							<p class="flex flex-col">
								<span>
									{data.order?.store.name},

									{data.order?.vendorAddress?.address}, {data.order?.vendorAddress?.town},

									{data.order?.vendorAddress?.city}, {data.order?.vendorAddress?.state}</span>

								<span>{data.order?.vendorAddress?.zip}</span>
							</p>

							{#if data.order?.vendorPhone}
								<h6 class="mt-2">
									Phone number: <span> {data.order?.vendorPhone}</span>
								</h6>
							{/if}
						</div> -->
					</div>
				</div>
			</div>

			<!-- Order Tracker -->

			<div>
				<!-- {#if !!data.order?.foodType && data.order?.status !== 'delivered' && data.order?.expectedDeliveryDate}
					<div class="mb-5 flex items-center gap-2 flex-wrap">
						<h5>Expected Delivery Date :</h5>

						<p>
							{date(data.order?.expectedDeliveryDate)}
						</p>
					</div>
				{/if} -->

				<div class="mt-5 sm:mt-10 flex flex-wrap gap-10">
					{#if data.timelines && data.timelines.length}
						<OrderTracking tracks="{data.timelines}" />
					{/if}

					<!-- {#if !data.order?.isReplaceOrReturn}
					{:else}
						<ReturnTracking order="{data.order}" />
					{/if} -->
					<!-- <ReturnTracking order="{data.order}" /> -->

					<div class="flex flex-col gap-2">
						<!-- {#if data.order?.invoiceLink}
							<a
								href="{data.order?.invoiceLink}"
								aria-label="Click to download invoice"
								target="blank"
								class="block">
								<PrimaryButton class="w-48" type="button">Download Invoice</PrimaryButton>
							</a>
						{/if}

						{#if data.order?.replaceValidTill != null && now <= data.order?.replaceValidTill && !data.order?.isReplaceOrReturn}
							<a
								href="/my/exchange?orderId=${data.order?.orderId}&itemId=${data.order?.itemId}"
								aria-label="Click to visit exchange"
								class="block">
								<TransparentButton class="w-48" type="button" border>Exchange</TransparentButton>
							</a>
						{/if} -->

						<!-- {#if data.order?.returnValidTill != null && now <= data.order?.returnValidTill && !data.order?.isReplaceOrReturn}
							<a
								href="/my/return?orderId=${data.order?.orderId}&itemId=${data.order?.itemId}"
								aria-label="Click to visit return"
								class="block">
								<TransparentButton class="w-48" type="button" border>Return</TransparentButton>
							</a>
						{/if} -->
							<!-- <a
								href="/my/exchange?orderId=${data.order?.id}"
								aria-label="Click to visit exchange"
								class="block">
								<TransparentButton class="w-48" type="button" border>Exchange</TransparentButton>
							</a> -->
						{#if calcStatus(data.order) === "processing"}
							<a
								href="/my/return?orderId=${data.order?.id}"
								aria-label="Click to visit return"
								class="block">
								<TransparentButton class="w-48" type="button" border>Cancel</TransparentButton>
							</a>
						{:else}
							<a
								href="/my/return?orderId=${data.order?.id}"
								aria-label="Click to visit return"
								class="block">
								<TransparentButton class="w-48" type="button" border>Return</TransparentButton>
							</a>
						{/if}
					</div>
				</div>
			</div>
		</section>
	{:else}
		<div class="flex h-[70vh] flex-col items-center justify-center text-center">
			<img src="{noAddToCartAnimate}" alt="empty wishlist" class="mb-5 h-60 object-contain" />

			<h2 class="mb-2">Your have't Ordered Yet !!</h2>

			<p class="mb-5">Add items to it now</p>

			<a href="/" aria-label="Click to visit home" data-sveltekit-preload-data>
				<PrimaryButton class="w-40 py-2 text-sm">Shop Now</PrimaryButton>
			</a>
		</div>
	{/if}
</div>

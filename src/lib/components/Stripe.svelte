<script lang="ts">
import { createEventDispatcher, onMount } from 'svelte'
import { fly } from 'svelte/transition'
import { goto, invalidateAll } from '$app/navigation'
import { OrdersService } from './../services'
import { page } from '$app/stores'
import { PrimaryButton } from '$lib/ui'
import { toast } from '$lib/utils'
import Error from './Error.svelte'
import {
	loadStripe,
	type Stripe,
	type StripeCardElement,
	type PaymentMethod
} from '@stripe/stripe-js'
import type { MedusaAddress, MedusaCart } from '$lib/services/medusa/types'

const dispatch = createEventDispatcher()

export let isStripeSelected = false
export let stripePublishableKey: string //process.env.VITE_STRIPE_PUBLISHABLE_KEY
export let clientSecret: string
export let cartId: string
export let address: MedusaAddress
export let cart: MedusaCart

let card: StripeCardElement
let isCardValid = false
let loading = false
let mounted = false
let paySuccess = false
let stripeCardMounting = true
let stripeReady: boolean = true

let errorMessage = { text: '', show: false }
let errors
let stripe: Stripe

const payWithStripe = async (pm: PaymentMethod) => {
	try {
		loading = true
		toast('Contacting Payment Server...', 'warning')
		const res = await OrdersService.stripeCheckoutService({
			address,
			clientSecret,
			cartId,
			card,
			stripe,
			cart
		})
		paySuccess = true
		console.log('success: ', res)
		goto(
			`/payment/success?payment_reference_id=${res.refId}&order_id=${res?.orderId}&provider=stripe`
		)
	} catch (e: any) {
		errorMessage = { show: true, text: e.toString() }
	} finally {
		loading = false
	}
}

onMount(() => {
	mounted = true
	loadStripe(stripePublishableKey).then((obj) => {
		stripe = obj
		loadStripeElements()
	})
})

function submit() {
	loading = true
	stripe.createPaymentMethod({ type: 'card', card }).then(async function (result) {
		if (result.error) {
			// Inform the customer that there was an error.
			errorMessage.text = result.error.message
			errorMessage.show = true
		} else {
			// Redirect the customer to the authorization URL.
			errorMessage.show = false
			errorMessage.text = ''
			await payWithStripe(result.paymentMethod)
		}
		loading = false
	})
}

function loadStripeElements() {
	var elements = stripe.elements()
	card = elements.create('card', {
		style: {
			base: {
				fontWeight: '500',
				fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
				fontSize: '16px',
				fontSmoothing: 'antialiased',
				':-webkit-autofill': {
					color: '#fce883'
				},
				'::placeholder': {
					color: 'grey'
				}
			},
			invalid: {
				iconColor: '#FFC7EE',
				color: '#FFC7EE'
			}
		},
		hidePostalCode: true
	})
	card.mount('#mount-point-for-stripe-elements')

	card.on('change', function (event: any) {
		isCardValid = event.complete
		dispatch('isStripeCardValid', isCardValid)
		if (event.error) {
			errorMessage.show = true
			errorMessage.text = event.error.message
		} else {
			errorMessage.show = false
			errorMessage.text = ''
		}
	})
}
</script>

<form
	transition:fly="{{ y: 50, duration: 150 }}"
	on:submit|preventDefault="{submit}"
	class="rounded border p-4 shadow-md flex flex-col gap-4
	{isStripeSelected ? 'block' : 'hidden'}">
	{#if errorMessage.show}
		<Error err="{errorMessage.text}" />
	{/if}

	<label for="mount-point-for-stripe-elements" class="font-semibold"> Enter Cart Details </label>

	<div id="mount-point-for-stripe-elements">
		<!-- A Stripe Element will be inserted here. -->
	</div>

	<div id="error-message" role="alert" class="text-sm text-red-500"></div>

	<PrimaryButton
		type="submit"
		loading="{loading}"
		disabled="{loading || !stripeReady || !isCardValid}"
		class="w-60">
		Make Payment
	</PrimaryButton>
</form>

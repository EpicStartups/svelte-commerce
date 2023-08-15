<script lang="ts">
import { createEventDispatcher } from 'svelte'
import { del } from '$lib/utils/api'
import { Error } from '$lib/components'
import { goto } from '$app/navigation'
import { page } from '$app/stores'
import AddressSkeleton from './_AddressSkeleton.svelte'
import type { MedusaAddress } from '$lib/services/medusa/types'
import { AddressService } from '$lib/services'
import type { Cart } from '$lib/types'

const dispatch = createEventDispatcher()

export let address: MedusaAddress
export let loading: boolean
export let selectedAddress: MedusaAddress
export let cart: Cart

let removing: boolean = false
let err: any = undefined

async function remove(id: string) {
	if (confirm('Are you sure to delete?')) {
		try {
			removing = true
			await AddressService.deleteAddress({
				addressId: id,
			})
			dispatch('deleteAddress', id)
		} catch (e) {
			err = e
		} finally {
			removing = false
		}
	}
}

async function addressChanged(address: MedusaAddress) {
	dispatch('addressChanged', {
		address
	})
}

$: processedAddressed = selectedAddress ? selectedAddress.id : undefined;
</script>

<Error err="{err}" />

{#if loading}
	<AddressSkeleton />
{:else if address}
	<div class="border-b p-4 sm:p-6">	
		<label class="flex w-full cursor-pointer flex-row gap-2 sm:gap-4">
			<input
				bind:group="{processedAddressed}"
				type="radio"
				value={address.id}
				name="address"
				class="mt-1.5 h-4 w-4 focus:outline-none focus:ring-0 focus:ring-offset-0"
				on:change|preventDefault="{() => addressChanged(address)}" 
			/>

			<div class="flex w-full cursor-pointer flex-col gap-1 font-light">
				<h6 class="flex-1 capitalize">
					{address.first_name}
					{address.last_name}
				</h6>

				<p>
					{#if address.address_1}
						{address.address_1}
					{/if}
					{#if address.address_2}
						, {address.address_2}
					{/if}
					{#if address.city}
						, {address.city}
					{/if}
					{#if address.province}
						, {address.province}
					{/if}
					{#if address.postal_code}
						- {address.postal_code}
					{/if}
				</p>

				<p>
					{address.phone}
				</p>
			</div>
		</label>

		<div class="ml-6 mt-5 flex items-center gap-5 text-sm sm:ml-8">
			<button
				type="button"
				class="w-full rounded border py-2 px-4 font-semibold tracking-wide text-zinc-800 transition duration-300 focus:outline-none hover:border-zinc-800"
				on:click="{() => goto(`/checkout/add-address?id=${address.id}`)}">
				EDIT
			</button>

			<button
				type="button"
				class="w-full rounded border border-transparent py-2 px-4 font-semibold tracking-wide text-zinc-500 transition duration-300 focus:outline-none hover:text-zinc-800"
				on:click="{() => remove(address.id)}">
				{#if removing}
					<div class="flex justify-center">
						<svg
							style="height: 20px; width: 20px"
							class="-ms-1 animate-spin text-zinc-500"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24">
							<circle
								class="opacity-25"
								cx="12"
								cy="12"
								r="10"
								stroke="currentColor"
								stroke-width="4"></circle>
							<path
								class="opacity-75"
								fill="currentColor"
								d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
							></path>
						</svg>
					</div>
				{:else}
					<span>REMOVE</span>
				{/if}
			</button>
		</div>
	</div>
{/if}

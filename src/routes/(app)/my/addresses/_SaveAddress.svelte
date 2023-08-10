<script lang="ts">
import { AddressService, CountryService } from '$lib/services'
import { applyAction, enhance } from '$app/forms'
import { createEventDispatcher } from 'svelte'
import { Error } from '$lib/components'
import { goto } from '$app/navigation'
import { page } from '$app/stores'
import { PrimaryButton, Textarea, Textbox } from '$lib/ui'
import { toast } from '$lib/utils'
import type { MedusaAddress, MedusaCountry } from '$lib/services/medusa/types'

const dispatch = createEventDispatcher()

export let address: MedusaAddress;
export let countries: MedusaCountry[] = []
export let states: any[] = []

let err = null
let formChanged = false
let loading = false
let loadingStates = false

async function onCountryChange(country) {
	try {
		err = null
		loadingStates = true
		address.province = null
		states = await CountryService.fetchStates({
			countryCode: country,
			storeId: $page.data?.store?.id,
			origin: $page.data?.origin
		})
	} catch (e) {
		err = e
	} finally {
		loadingStates = false
	}
}

async function SaveAddress(address) {
	try {
		loading = true
		err = null

		let id = address._id || address.id || 'new'
		const { city, country, email, firstName, lastName, locality, phone, state, zip } = address
		console.log("address: ", address)
		toast('Saving Address Info...', 'info')

		const newAddress = await AddressService.saveAddress({
			address: address.address,
			city,
			country,
			email,
			firstName,
			lastName,
			locality,
			phone,
			state,
			zip,
			id
		})

		const newAddressId = newAddress.id || newAddress.id

		toast('Address Info Saved.', 'success')
		dispatch('saved', { id, newAddressId })
	} catch (e) {
		console.log('error', e)
		err = e?.body
		toast(err, 'error')
	} finally {
		loading = false
		formChanged = false
	}
}
</script>

<div>
	<Error err="{err}" />

	<form
		action="/my/addresses?/saveAddress"
		method="POST"
		use:enhance="{() => {
			return async ({ result }) => {
				const data = result["data"]
				if (data) {
					const id = address.id ?? 'new'
					const newAddressId = data?._id || data?.id

					toast('Address Info Saved.', 'success')
					dispatch('saved', { id, newAddressId })
					await applyAction(result)
				}
			}
		}}">
		<!-- <form on:submit|preventDefault="{() => SaveAddress(address)}"> -->
		<div class="mb-5 flex flex-col gap-2 lg:mb-10">
			<!-- First Name -->

			<div class="flex flex-col sm:flex-row gap-2 sm:gap-5">
				<h6 class="sm:w-52 sm:shrink-0">
					First Name

					<span class="text-accent-500">*</span>
				</h6>

				<div class="w-full">
					<Textbox
						type="text"
						placeholder="Enter First Name"
						bind:value="{address.first_name}"
						autoFocus
						required 
						maxlength={500}
					/>
				</div>
			</div>

			<!-- Last Name -->

			<div class="flex flex-col sm:flex-row gap-2 sm:gap-5">
				<h6 class="sm:w-52 sm:shrink-0">
					Last Name

					<span class="text-accent-500">*</span>
				</h6>

				<div class="w-full">
					<Textbox 
						placeholder="Enter Last Name" 
						bind:value="{address.last_name}" 
						required 
						maxlength={500}
					/>
				</div>
			</div>

			<!-- Email -->

			<div class="flex flex-col sm:flex-row gap-2 sm:gap-5">
				<h6 class="sm:w-52 sm:shrink-0">Email</h6>

				<div class="w-full">
					<Textbox 
						type="email" 
						placeholder="Enter Email" 
						bind:value="{address.email}" 
						maxlength={500}
					/>
				</div>
			</div>

			<!-- Phone -->

			<div class="flex flex-col sm:flex-row gap-2 sm:gap-5">
				<h6 class="sm:w-52 sm:shrink-0">
					Phone

					<span class="text-accent-500">*</span>
				</h6>

				<div class="w-full">
					<Textbox
						type="tel"
						placeholder="Enter Phone"
						maxlength="13"
						bind:value="{address.phone}"
						required />

					<p class="mt-1">E.g.+nnxxxxxxxxxx</p>
				</div>
			</div>

			<!-- Address -->

			<div class="flex flex-col sm:flex-row gap-2 sm:gap-5">
				<h6 class="sm:w-52 sm:shrink-0">
					Address

					<span class="text-accent-500">*</span>
				</h6>

				<Textarea placeholder="Enter Address" bind:value="{address.address_1}" required />
			</div>

			<!-- Locality -->

			<div class="flex flex-col sm:flex-row gap-2 sm:gap-5">
				<h6 class="sm:w-52 sm:shrink-0">Locality</h6>

				<div class="w-full">
					<Textbox 
						placeholder="Enter Locality" 
						bind:value="{address.address_2}" 
						maxlength={100}
					/>
				</div>
			</div>

			<!-- City -->

			<div class="flex flex-col sm:flex-row gap-2 sm:gap-5">
				<h6 class="sm:w-52 sm:shrink-0">City</h6>

				<div class="w-full">
					<Textbox 
						placeholder="Enter City" 
						bind:value="{address.city}" 
						maxlength={100}
					/>
				</div>
			</div>

			<!-- Country -->

			<div class="flex flex-col sm:flex-row gap-2 sm:gap-5">
				<h6 class="sm:w-52 sm:shrink-0">
					Country

					<span class="text-accent-500">*</span>
				</h6>

				{#if countries?.length}
					<select
						disabled="{countries?.length === 1}"
						class="w-full rounded border border-zinc-200 bg-white p-2 text-sm placeholder-zinc-400 transition duration-300 placeholder:font-normal focus:outline-none focus:ring-1 focus:ring-primary-500 hover:bg-zinc-50"
						bind:value="{address.country_code}"
						on:change="{() => onCountryChange(address.country_code)}"
						required>
						<option value="{null}" disabled selected>-- Select a Country --</option>

						{#each countries as c, i}
							{#if c}
								<option value="{c.iso_2}" selected={c.name === address.country_code}>
									{c.display_name}
								</option>
							{/if}
						{/each}
					</select>
				{:else}
					<a
						href="/contact-us"
						aria-label="contact us"
						class="py-2 text-sm text-zinc-500 hover:text-zinc-800 hover:underline">
						Contact the website admin to enable your country
					</a>
				{/if}
			</div>

			<!-- State -->

			{#if states?.length}
				<div class="flex flex-col sm:flex-row gap-2 sm:gap-5">
					<h6 class="sm:w-52 sm:shrink-0">
						State/Province

						<span class="text-accent-500">*</span>
					</h6>

					<select
						class="w-full rounded border border-zinc-200 bg-white p-2 text-sm placeholder-zinc-400 transition duration-300 placeholder:font-normal focus:outline-none focus:ring-1 focus:ring-primary-500 hover:bg-zinc-50"
						bind:value="{address.province}"
						disabled="{!address.country_code || loadingStates}"
						required>
						<option value="{null}" disabled selected>-- Select a State --</option>
						{#each states as s}
							{#if s}
								<option value="{s.name}">
									{s.name}
								</option>
							{/if}
						{/each}
					</select>
				</div>
			{/if}

			<!-- ZIP -->

			<div class="flex flex-col sm:flex-row gap-2 sm:gap-5">
				<h6 class="sm:w-52 sm:shrink-0">
					ZIP

					<span class="text-accent-500">*</span>
				</h6>

				<div class="w-full">
					<Textbox
						type="tel"
						placeholder="Enter zip"
						maxlength="6"
						bind:value="{address.postal_code}"
						required />
				</div>
			</div>
		</div>

		<input type="hidden" name="address" value="{address.address_1}" />
		<input type="hidden" name="city" value="{address.city}" />
		<input type="hidden" name="country" value="{address.country_code}" />
		<input type="hidden" name="email" value="{address.email}" />
		<input type="hidden" name="firstName" value="{address.first_name}" />
		<input type="hidden" name="lastName" value="{address.last_name}" />
		<input type="hidden" name="locality" value="{address.address_2}" />
		<input type="hidden" name="phone" value="{address.phone}" />
		<input type="hidden" name="state" value="{address.province}" />
		<input type="hidden" name="zip" value="{address.postal_code}" />
		<input type="hidden" name="id" value="{address.id ?? 'new'}" />

		<PrimaryButton type="submit" loading="{loading}" class="w-60">Save Address</PrimaryButton>
	</form>
</div>

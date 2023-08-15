<script lang="ts">
import { invalidateAll } from "$app/navigation"
import { mapMedusaJsShippingOptions } from "$lib/services/medusa/medusa-utils"
import { setShippingOption } from "$lib/services/medusa/shipping-options"
import type { MedusaShippingOption } from "$lib/services/medusa/types"
import type { ShippingOption } from "$lib/types"
import { toast } from "$lib/utils"
import type { Currency } from "$lib/utils/currency"


export let shippingOptions: MedusaShippingOption[];
export let currency: string;
export let cartId: string;
export let selectedShippingOption: MedusaShippingOption;
let loading: boolean = false;

const onChange = (option: ShippingOption) => {
    loading = true
    setShippingOption({
        cartId,
        shippingOptionId: option.id
    }).catch((err) => {
        console.error(err)
        toast("Error setting shipping option", "error")
    }).finally(() => {
        invalidateAll().finally(() => {
            loading = false
        })
    })
}

$: processed = mapMedusaJsShippingOptions(shippingOptions, currency.toUpperCase() as Currency).sort((a, b) => a.amount.raw - b.amount.raw)
$: processOptions = selectedShippingOption ? selectedShippingOption.id : undefined;
</script>

<h2 class="mb-5">Shipping Options
    {#if loading}
        <span class="opacity-50 color-black text-base">Loading...</span>
    {/if}
    
</h2>


{#if shippingOptions.length && shippingOptions.length > 0}
    <div class="flex w-full flex-col gap-4">
        {#each processed as so}
            <label
                class="flex w-full cursor-pointer items-center gap-2 rounded border border-zinc-200 p-3 shadow-md transition duration-300 hover:bg-primary-50 sm:gap-4">
                <input
                    bind:group="{processOptions}"
                    type="radio"
                    value="{so.id}"
                    name="shipping-option"
                    class="h-4 w-4 focus:outline-none focus:ring-0 focus:ring-offset-0"
                   on:change|preventDefault="{() => onChange(so)}"
                />

                <div class="flex w-full flex-1 items-center justify-between gap-4">
                    <div class="flex-1">
                        <h3 style="color:black">
                            {so.name}
                        </h3>   
                        <p>{so.amount.value}</p>
                    </div>

                    <div class="shrink-0">
                        <div
                            class="flex h-12 w-12 p-2 items-center justify-center rounded-full border bg-zinc-200 text-center text-xs uppercase">
                            <span class="w-full truncate">
                                {so.name}
                            </span>
                        </div>
                    </div>
                </div>
            </label>

        {/each}
    </div>
{:else}
    <div class="flex flex-col h-1/2 items-center justify-center p-4 text-zinc-500 text-center">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            class="mb-2 h-10 w-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2">
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
        </svg>

        <h6 class="mb-2 capitalize">We are very sorry!!</h6>

        <p>
            <span> We not yet support delivery to your location</span>

            <a href="/contact-us" class="block underline hover:text-zinc-800">
                Please do send us request so that we will look into it!
            </a>
        </p>
    </div>
{/if}
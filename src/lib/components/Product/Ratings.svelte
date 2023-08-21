<script lang="ts">
import type { Review } from "$lib/types"
import StarRating from "../StarRating.svelte"

export let reviews: Review[] = []

</script>

<div class="w-full px-4 pb-4 pt-12 border-t">
    {#if reviews.length === 0}
        <h2 class="mb-4">Customer Reviews</h2>
        <div class="w-full h-[200px] flex justify-center items-center bg-gray-100">
            <h3 class="text-dark-800">The product not yet has any review.</h3>
        </div>
        {:else}
        <h2 class="mb-8">Customer Reviews</h2>
        <div class="w-full flex flex-col justify-start items-start gap-10">
            {#each reviews as review}
                <div class="w-full min-h-[100px]">
                    <div class="h-[40px] grid grid-cols-[30px_auto] w-full gap-5 items-center mb-2">
                        <div class="h-[40px] w-[40px] bg-gray-200 rounded-full">

                        </div>
                        <h3 class="mt-2">{review.user}</h3>
                    </div>
                    <StarRating rating={review.rating ?? 0} size={'20px'}/>
                    <h4>{review.title}</h4>
                    <p class="text-base">{review.message}</p>
                </div>
            {/each}
        </div>
    {/if}
</div>


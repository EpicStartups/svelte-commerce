<script lang="ts">
import { ProductDetails } from '$lib/theme-config'
import type { Product } from '$lib/types'

interface Data {
    pathname: string,
    product: Product,
    deliveryDetails: any,
    streamed: {
        moreProductDetails: Promise<any>,
        productReviews: Promise<any>
    }
}
export let data: Data;
</script>

<ProductDetails data="{data}" />

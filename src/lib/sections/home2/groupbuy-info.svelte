<script>
import GroupBuy from "$lib/icons/GroupBuy.svelte"
import OrderList from "$lib/icons/OrderList.svelte"
import Saving from "$lib/icons/Saving.svelte"
</script>
<section class="w-full font-jost lg:py-16 py-8 px-4">
    <div class="w-full max-w-[1100px] mx-auto text-center">
        <h2 class="heading relative w-full text-center text-3xl max-w-[700px] mx-auto mb-10">How does Group Buy Work?</h2>
        <div class="info-grid grid w-full min-h-[300px] gap-6">
            <div class="item h-[300px] p-3 flex flex-col justify-between items-center gap-8">
                <div>
                    <GroupBuy />
                </div>
                <div class="w-full h-full flex flex-col justify-start items-center text-center gap-3">
                    <h3 class="text-xl font-bold">Choose a product and buy it in Group Buy mode</h3>
                    <p class="text-base">Browse and choose a product that catches your interest. Add to cart in Group Buy mode.</p>
                </div>
            </div>
            <div class="item h-[300px] p-3 flex flex-col justify-between items-center gap-8">
                <div>
                    <OrderList />
                </div>
                <div class="w-full h-full flex flex-col justify-start items-center text-center gap-3">
                    <h3 class="text-xl font-bold">Reach the Minimum Order Quantity</h3>
                    <p class="text-base">Share it with your friends to reach minimum order quantity</p>
                </div>
            </div>
            <div class="item h-[300px] p-3 flex flex-col justify-between items-center gap-8">
                <div>
                    <Saving />
                </div>
                <div class="w-full h-full flex flex-col justify-start items-center text-center gap-3">
                    <h3 class="text-xl font-bold">Enjoy the savings!</h3>
                    <p class="text-base">When the minimum order quantity is met, everyone in the group can get their purchase</p>
                </div>
            </div>
        </div>
    </div>
</section>

<style>
.info-grid {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(3, 1fr);
}

.item {
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
}

@media only screen and (min-width: 1100px) {
.info-grid {
    grid-template-rows: 1fr;
    grid-template-columns: repeat(3, 1fr);
}
.item {
    max-width: none;
}
}

.heading::after {
    content: " ";
    position: absolute;
    bottom: -17px;
    left: 50%;
    transform: translateX(-50%);
    height: 2px;
    width: 100px;
    background-color: #FF5500;
}
</style>
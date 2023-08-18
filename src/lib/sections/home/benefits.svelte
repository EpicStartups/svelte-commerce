<script lang="ts">
import GoPackage from 'svelte-icons/go/GoPackage.svelte'
import MdRotateLeft from 'svelte-icons/md/MdRotateLeft.svelte'
import MdAttachMoney from 'svelte-icons/md/MdAttachMoney.svelte'
import MdHeadsetMic from 'svelte-icons/md/MdHeadsetMic.svelte'

</script>

<section class="home-benefits w-full max-w-[1500px]  mx-auto p-4 grid gap-4 lg:my-16 my-8 font-jost justify-center">
    <div class="benefit w-full h-[80px] grid grid-cols-[80px_auto] gap-4">
        <div class="w-full h-full text-dark-700 flex justify-end items-center">
            <div class="w-[50px] h-[50px]">
                <GoPackage />
            </div>
        </div>
        <div class="flex flex-col justify-between items-start py-4 w-[250px]">
            <h3 class="text-dark-700 tracking-wider">GROUP BUYS</h3>
            <p class="text-dark-300">Pay less when you buy in groups</p>
        </div>
    </div>
    <div class="benefit w-full h-[80px] grid grid-cols-[80px_auto] gap-4">
        <div class="w-full h-full text-dark-700 flex justify-end items-center">
            <div class="w-[50px] h-[50px]">
                <MdRotateLeft />
            </div>
        </div>
        <div class="flex flex-col justify-between items-start py-4 w-[250px]">
            <h3 class="text-dark-700 tracking-wider">RETURN PRODUCT</h3>
            <p class="text-dark-300">Retail, a Product Return Process</p>
        </div>
    </div>
    <div class="benefit w-full h-[80px] grid grid-cols-[80px_auto] gap-4">
        <div class="w-full h-full text-dark-700 flex justify-end items-center">
            <div class="w-[50px] h-[50px]">
                <MdAttachMoney />
            </div>
        </div>
        <div class="flex flex-col justify-between items-start py-4 w-[250px]">
            <h3 class="text-dark-700 tracking-wider">EARN MONEY SHARING</h3>
            <p class="text-dark-300">Earn passively sharing links!</p>
        </div>
    </div>
    <div class="benefit w-full h-[80px] grid grid-cols-[80px_auto] gap-4">
        <div class="w-full h-full text-dark-700 flex justify-end items-center">
            <div class="w-[50px] h-[50px]">
                <MdHeadsetMic />
            </div>
        </div>
        <div class="flex flex-col justify-between items-start py-4 w-[250px]">
            <h3 class="text-dark-700 tracking-wider">QUALITY SUPPORT</h3>
            <p class="text-dark-300">Support Options Including 24/7</p>
        </div>
    </div>

</section>

<style>
.benefit {
    justify-content: center;
}


.home-benefits {
    grid-template-columns: repeat(1, 1fr);
    gap: 40px;
}

@media only screen and (min-width: 740px) {
.home-benefits {
	grid-template-columns: repeat(2, 1fr);
}
}

@media only screen and (min-width: 1525px) {
.home-benefits {
	grid-template-columns: repeat(4, 1fr);
}
}
</style>
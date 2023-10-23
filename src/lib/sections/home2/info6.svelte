<script>
import Kitchen from "$lib/icons/Kitchen.svelte"
import Mountain from "$lib/icons/Mountain.svelte"
import Skincare from "$lib/icons/Skincare.svelte"
import WashingMachine from "$lib/icons/WashingMachine.svelte"
import Phone from "$lib/icons/phone.svelte"
import Stationery from "$lib/icons/stationery.svelte"
import Tools from "$lib/icons/tools.svelte"
import Travel from "$lib/icons/travel.svelte"

</script>


<section class="w-full min-h-[100px] font-jost lg:py-16 py-8 px-4">
    <div class="w-full text-center mb-10">
        <p class="text-primary-900 text-base mb-2">OUR PRODUCTS</p>
        <h2 class="text-3xl">Explore Our Selections Of Products</h2>
    </div>

    <div class="info-grid w-full max-w-[1300px] mx-auto grid">
        <div class="grid-item relative">
            <div class="absolute top-0 bottom-0 right-0 left-0 bg-gray-200 z-[0] grid-item-bg"></div>
            <div class="relative z-[1] w-full h-full grid-item p-3">
                <div class="icon">
                    <Skincare />
                </div>
                <p class="text-black mt-4 text-center">Beauty & Personal Care</p>
            </div>
        </div>
        <div class="grid-item relative">
            <div class="absolute top-0 bottom-0 right-0 left-0 bg-yellow-400 z-[0] grid-item-bg"></div>
            <div class="relative z-[1] w-full h-full grid-item p-3">
                <div class="icon">
                     <Phone />
                </div>
               
                <p class="text-black mt-4 text-center">Electronics</p>
            </div>
        </div>
        <div class="grid-item relative">
            <div class="absolute top-0 bottom-0 right-0 left-0 bg-gray-200 z-[0] grid-item-bg"></div>
            <div class="relative z-[1] w-full h-full grid-item p-3">
                <div class="icon">
                    <WashingMachine />
                </div>
                <p class="text-black mt-4 text-center">Household</p>
            </div>
        </div>
        <div class="grid-item relative">
            <div class="absolute top-0 bottom-0 right-0 left-0 bg-primary-900 z-[0] grid-item-bg"></div>
            <div class="relative z-[1] w-full h-full grid-item p-3">
                <div class="icon">
                    <Kitchen />
                </div>
                <p class="text-white mt-4 text-center">Home & Kitchen</p>
            </div>
        </div>
        <div class="grid-item relative">
            <div class="absolute top-0 bottom-0 right-0 left-0 bg-yellow-400 z-[0] grid-item-bg"></div>
            <div class="relative z-[1] w-full h-full grid-item p-3">
                <div class="icon">
                    <Mountain />
                </div>
                <p class="text-black mt-4 text-center">Outdoors</p>
            </div>
        </div>
        <div class="grid-item relative">
            <div class="absolute top-0 bottom-0 right-0 left-0 bg-gray-200 z-[0] grid-item-bg"></div>
            <div class="relative z-[1] w-full h-full grid-item p-3">
                <div class="icon">
                    <Stationery />
                </div>
                <p class="text-black mt-4 text-center">Stationary</p>
            </div>
        </div>

        <div class="grid-item relative">
            <div class="absolute top-0 bottom-0 right-0 left-0 bg-primary-900 z-[0] grid-item-bg"></div>
            <div class="relative z-[1] w-full h-full grid-item p-3">
                <div class="icon">
                    <Tools />
                </div>
                <p class="text-white mt-4 text-center">Tools</p>
            </div>
        </div>

        <div class="grid-item relative">
            <div class="absolute top-0 bottom-0 right-0 left-0 bg-gray-200 z-[0] grid-item-bg"></div>
            <div class="relative z-[1] w-full h-full grid-item p-3">
                <div class="icon">
                    <Travel />
                </div>
                <p class="text-black mt-4 text-center">Travels</p>
            </div>
        </div>
    </div>

</section>

<style>
.info-grid {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(4, 1fr);
}

.grid-item p {
    font-size: 1rem;
}

.icon {
    height: 40px;
    width: 40px;
}

@media only screen and (min-width: 950px) {  
.info-grid {
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(2, 1fr);
}
}

@media only screen and (min-width: 950px) {  
.grid-item p {
    font-size: 1.5rem;
    line-height: 2rem;
}

.icon {
    height: 64px;
    width: 64px;
}
}

.grid-item {
    width: 100%;
    aspect-ratio: 1/1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}

.grid-item-bg {
    transition: all 0.2s ease;
}
.grid-item:hover .grid-item-bg {
    opacity: 0.5;
}
</style>
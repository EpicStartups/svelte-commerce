<script>
import potrait1 from "$lib/assets/home2/potrait1.png"
import potrait2 from "$lib/assets/home2/potrait2.png"
import potrait3 from "$lib/assets/home2/potrait3.png"
import Button1 from "$lib/components/buttons/Button1.svelte"
</script>

<div class="w-full min-h-[100px]">
    <section class="info2 w-full max-w-[1500px] mx-auto p-4 font-jost lg:py-16 py-8">
        <h2 class="text-center text-3xl max-w-[700px] w-full mx-auto mb-10">Step into an E-Commerce environment designed for everyone to earn and thrive.</h2>
        <div class="info-grid grid w-full min-h-[300px] gap-6">
            <div class="item h-[300px] bg-gray-200 relative overflow-hidden hover:bg-primary-900 transition duration-200 p-8 grid grid-cols-[auto_40%]">
                <img src={potrait1} class="absolute bottom-0 left-0 w-[90%] h-[90%] z-[0]" alt="potrait 1"/>
                <div>

                </div>
                <div class="item-content relative z-[1] flex flex-col justify-center items-start w-full h-full">
                    <p class="sub-content text-primary-900 font-bold mb-2  transition duration-200">FOR SHOPPERS</p>
                    <p class="content text-black font-bold mb-3 text-lg transition duration-200">COLLABORATE, SAVE, AND WIN</p>
                    <Button1>
                        LEARN MORE
                    </Button1>
                </div>
            </div>
            <div class="item h-[300px] bg-gray-200 relative overflow-hidden hover:bg-primary-900 transition duration-200 p-8 grid grid-cols-[auto_40%]">
                <img src={potrait2} class="absolute bottom-0 left-[-40px] w-[80%] h-[80%] z-[0]" alt="potrait 1"/>
                <div>

                </div>
                <div class="item-content relative z-[1] flex flex-col justify-center items-start w-full h-full">
                    <p class="sub-content text-primary-900 font-bold mb-2  transition duration-200">FOR SELLERS</p>
                    <p class="content text-black font-bold mb-3 text-lg transition duration-200">THRIVE WITH YOUR CUSTOMERS!</p>
                    <Button1>
                        LEARN MORE
                    </Button1>
                </div>
            </div>
            <div class="item h-[300px] bg-gray-200 relative overflow-hidden hover:bg-primary-900 transition duration-200 p-8 grid grid-cols-[auto_40%]">
                <img src={potrait3} class="absolute bottom-0 left-[-30px] w-[80%] h-[80%] z-[0]" alt="potrait 1"/>
                <div>

                </div>
                <div class="item-content relative z-[1] flex flex-col justify-center items-start w-full h-full">
                    <p class="sub-content text-primary-900 font-bold mb-2  transition duration-200">FOR INFLUENCERS</p>
                    <p class="content text-black font-bold mb-3 text-lg transition duration-200">SHOP, SHARE AND EARN!</p>
                    <Button1>
                        LEARN MORE
                    </Button1>
                </div>
            </div>
        </div>
    </section>
</div>

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

.item:hover .item-content .sub-content,
.item:hover .item-content .content {
    color: white
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
</style>
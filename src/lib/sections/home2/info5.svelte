
<script lang="ts">
import Info5Bg from "$lib/assets/home2/info5-bg.png"
</script>

<section class="info-3 grid w-full min-h-[500px] font-jost bg-gray-100">
    <div class="w-full max-w-[800px] h-full flex flex-col justify-center items-start p-8 lg:px-20 px-8">
        <p class="text-primary-900 text-base mb-3">FOR SHOPPERS</p>
        <h3 class="text-black text-3xl font-bold mb-2 max-w-[500px]">Explore Exclusive Collections of Unique Products</h3>
        <p class="text-black-900 text-xl font-bold">Explore our meticulously curated brands, offering an exceptional selection of one-of-a-kind products. With thorough quality checks in place, rest assured that every item has been carefully vetted! Discover the joy of finding truly extraordinary treasures that will elevate your shopping experience to new heights.</p>
    </div>
    <div class="image w-full h-full overflow-hidden">
        <img src={Info5Bg} class="w-full h-full object-contain" alt="info 3 background">
    </div>
</section>

<style>
.info-3 {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
}

.image {
    grid-row: 1;
    height: 400px;
}

@media only screen and (min-width: 750px) { 
.info-3 {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
}

.image {
    grid-row: auto;
    height: 100%;
}
}
</style>

<script lang="ts">
import Info3Bg from "$lib/assets/home2/info3-bg.png"
</script>

<section class="info-3 grid w-full min-h-[500px] font-jost bg-gray-100">
    <div class="image w-full h-full overflow-hidden">
        <img src={Info3Bg} class="w-full h-full object-cover" alt="info 3 background">
    </div>
    <div class="w-full max-w-[800px] h-full flex flex-col justify-center items-start p-8 lg:px-16 px-8">
        <p class="text-primary-900 text-base mb-3">FOR SHOPPERS</p>
        <h3 class="text-black text-3xl font-bold mb-2 max-w-[500px]">Join our collective buying experience for incredible savings</h3>
        <p class="text-black-900 text-xl font-bold">Embrace the power of collective buying and unlock incredible savings as you join our community-driven platform. Shop together with like-minded individuals, tap into exclusive deals, and experience the thrill of saving big as a collective.</p>
    </div>
</section>

<style>
.info-3 {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
}

.image {
    height: 400px;
}

@media only screen and (min-width: 750px) { 
.info-3 {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
}
.image {
    height: 100%;
}
}
</style>
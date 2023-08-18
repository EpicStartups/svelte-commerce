<script lang="ts">
import Button1 from '$lib/components/buttons/Button1.svelte'
import { Splide, SplideSlide, SplideTrack, type Options as SplideOptions } from '@splidejs/svelte-splide';
import '@splidejs/svelte-splide/css';

const splideOptions: SplideOptions = {
    rewind: true,
    arrows: true,
    breakpoints: {
        480: {
            arrows: false
        }
    }
}
</script>


<div class="w-100 h-[100vh] h-[100svh] max-h-[800px] bg-gray-200">
<Splide options={splideOptions} class="h-[100vh] h-[100svh] max-h-[800px]">
    <SplideSlide class="hero-splide-slide h[100vh] h-[100svh] max-h-[800px]">
        <div class="hero-slide h-[100%] w-[100%] max-w-[1500px] p-4 mx-auto grid gap-8">
            <div class="font-jost flex flex-col justify-center items-start p-2">
                <p class="text-black text-xl underline underline-offset-8 decoration-primary-800">NEW ARRIVAL</p>
                <h1 class="text-6xl mt-6">NEW INDOOR TOP <span class="deal-word">DEAL</span></h1>
                <p class="text-xl text-black mt-4">Get up to 50% off Today Only</p>
                <Button1 className="mt-8">
                    SHOP NOW
                </Button1>
            </div>
        </div>
    </SplideSlide>
    <SplideSlide class="h-[100vh] h-[100svh] max-h-[800px]">
        <div class="hero-slide bg-gray-200 h-[100%]"></div>
    </SplideSlide>
</Splide>
</div>

<style>

.deal-word::after {
    content: "!";
    color: #FF5400;
    margin-left: 20px;
    font-weight: 900;
}


/*
HERO SLIDE
*/
.hero-slide {
    grid-template-columns: 1fr;
    padding: 2rem 1rem;
}

@media only screen and (min-width: 480px) {
.hero-slide {
    grid-template-columns: 1fr 1fr;
    padding: 2rem 4rem;
}
}
</style>
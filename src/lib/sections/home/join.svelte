<script lang="ts">
import Button1 from "$lib/components/buttons/Button1.svelte"
import background from "$lib/assets/home/join-bg.png";

</script>


<section class="w-full h-[400px] bg-gray-200 flex flex-col justify-center items-center relative">
    <div class="relative z-[1] flex flex-col justify-center items-center font-jost text-center">
        <h1 class="text-white font-bold text-5xl">SAVE BIG WHEN YOU JOIN FORCES</h1>
        <div class="bg-dark-500 text-white px-8 py-2 mt-5 ">
            <p class="banner text-white relative">SAVE UP TO 50% ON EVERY PRODUCT</p>
        </div>
        <a href="auth/signup?ref=/" data-sveltekit-preload-data>
            <Button1 className="mt-4">
                SIGN UP
            </Button1>
        </a>

    </div>


    <img 
        class="absolute top-0 bottom-0 right-0 left-0 h-full w-full object-cover z-[0]"
        src={background}
        alt="shopolah bg"
    />
</section>

<style>
.banner::before {
    content: " ";
    height: 10px;
    width: 10px;
    border-radius: 9999rem;
    background-color: #FF5500;
    display: block;
    position: absolute;
    left: -15px;
    top: 50%;
    transform: translateY(-50%);
}

.banner::after {
    content: " ";
    height: 10px;
    width: 10px;
    border-radius: 9999rem;
    background-color: #FF5500;
    display: block;
    position: absolute;
    right: -15px;
    top: 50%;
    transform: translateY(-50%);
}
</style>
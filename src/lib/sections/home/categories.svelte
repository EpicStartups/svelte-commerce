<script>
import Button1 from "$lib/components/buttons/Button1.svelte"

</script>
<section class="home-categories grid w-[100%] p-4 gap-4 font-jost">
    <div class="h-[280px] w-100 bg-gray-200 flex flex-col justify-end items-end p-9">
        <div>
            <p class="text-2xl mb-2 text-black/70 font-[600] ">Category</p>
            <Button1>
                SHOP NOW
            </Button1>
        </div>
    </div>
    <div class="h-[280px] w-100 bg-gray-200 flex flex-col justify-end items-end p-9">
        <div>
            <p class="text-2xl mb-2 text-black/70 font-[600] ">Category</p>
            <Button1>
                SHOP NOW
            </Button1>
        </div>
    </div>
    <div class="h-[280px] w-100 bg-gray-200 flex flex-col justify-end items-end p-9">
        <div>
            <p class="text-2xl mb-2 text-black/70 font-[600] ">Category</p>
            <Button1>
                SHOP NOW
            </Button1>
        </div>
    </div>
    <div class="h-[280px] w-100 bg-gray-200 flex flex-col justify-end items-end p-9">
        <div>
            <p class="text-2xl mb-2 text-black/70 font-[600] ">Category</p>
            <Button1>
                SHOP NOW
            </Button1>
        </div>
    </div>
</section>

<style>

/*
HOME CATEGORIES
*/
.home-categories {
    grid-template-columns: repeat(1, 1fr);
}

@media only screen and (min-width: 645px) {
.home-categories {
	grid-template-columns: repeat(2, 1fr);
}
}

@media only screen and (min-width: 1130px) {
.home-categories {
	grid-template-columns: repeat(4, 1fr);
}
}
</style>
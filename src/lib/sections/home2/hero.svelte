<script lang="ts">
interface Slide {
  background: string;
  imgSrc?: string;
  subTitle?: string;
  title?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  hasButton?: boolean;
}

export let slides: Array<Slide>;

</script>

<section class="h9-slider-area">
  <div class="h9-slider-active">
    {#each slides as slide}
       <div
          class="h9-slider-item pb-10 lg:pb-0  min-h-[700px]"
          data-background={slide.background}
        >
          <div class="container mt-[-100px] lg:mt-[-60px]">
            <div class="flex flex-col lg:flex-row-reverse items-center justify-center lg:px-7 ">
              <div
                class=" h-full "
                data-animation-in="fadeInLeft"
                data-delay-in=".2"
                data-duration-in="1.5"
              >
                <img
                  src={slide.imgSrc}
                  alt=""
                  class="h9-slider-img opacity-30 md:opacity-100 mt-0"
                />
              </div>

              <div class="lg:mt-[100px]">
                <div class="h7-slider-content flex flex-col gap-4">
                  <div class="lg:w-fit flex flex-col gap-1/2">
                    <span
                      class="text-center text-[12px] text-black font-bold "
                      data-animation-in="fadeInUp"
                      data-delay-in=".4"
                      data-duration-in="1.5"
                    >
                      {slide.subTitle}
                    </span>
                    <div
                      data-animation-in="fadeInUp"
                      data-delay-in=".4"
                      data-duration-in="1.5"
                      class="w-fit lg:w-full border-b-2 border-[#FF5400]"
                    />
                  </div>
                  <h2
                    class="text-3xl md:text-5xl tracking-[2px] font-semibold"
                    data-animation-in="fadeInUp"
                    data-delay-in=".6"
                    data-duration-in="1.5"
                  >
                    {slide.title}
                  </h2>
                  <p
                    class="text-[10px] text-black font-bold"
                    data-animation-in="fadeInUp"
                    data-delay-in=".8"
                    data-duration-in="1.5"
                  >
                    {slide.description}
                  </p>
                  {#if slide.hasButton}
                    <a
                      href={slide.buttonLink}
                      class="btn lg:w-fit"
                      data-animation-in="fadeInUp"
                      data-delay-in="1.2"
                      data-duration-in="1.5"
                    >
                      {slide.buttonText}
                    </a>
                    {:else}
                    <a
                      href={slide.buttonLink}
                      class="btn lg:w-fit"
                      data-animation-in="fadeInUp"
                      data-delay-in="1.2"
                      data-duration-in="1.5"
                      style={"visibility: hidden;"}
                    >
                      {slide.buttonText}
                    </a>
                  {/if}
                </div>
              </div>
            </div>
          </div>
        </div> 
    {/each}
  </div>
</section>

<style>

</style>

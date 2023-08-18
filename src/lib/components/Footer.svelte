<script lang="ts">
import Logo from "$lib/assets/shopolah-logo.png";
import PaymentMethods from "./PaymentMethods.svelte"
</script>

<footer class="w-full py-4 px-4" >
	<div class="w-full flex justify-center items-center h-[50px]">
		<img
			class="h-full object-cover"
			src={Logo}
			alt="logo of Shopolah"
		/>
	</div>
	<div class="w-full max-w-[1300px] mx-auto border-t-2 mt-10 py-8 flex flex-row justify-between items-start flex-wrap">
		<div class="flex flex-col justify-start items-start w-[150px]">
			<h3 class="text-lg text-dark-500 mb-5 font-[600]">ABOUT</h3>
			<nav>
				<ul class="flex flex-col justify-start items-start gap-3 ">
					<li><a href="/" class="text-dark-300">Platform</a></li>
					<li><a href="/" class="text-dark-300">Influencers</a></li>
					<li><a href="/" class="text-dark-300">Seller</a></li>
				</ul>
			</nav>
		</div>
		<div class="flex flex-col justify-start items-start w-[250px]">
			<h3 class="text-lg text-dark-500 mb-5">FOLLOW US</h3>
			<p>Get Free Shipping on all your orders!</p>
		</div>
	</div>
</footer>

<div class="w-full h-[70px] bg-gray-200 px-4">
	<div class="w-full h-full max-w-[1300px] mx-auto flex justify-between items-center">
		<p>&copy; 2023 <a class="text-primary-900" href="/">SHOPOLAH</a>. ALL RIGHTS RESERVED</p>
		<PaymentMethods />
	</div>
</div>
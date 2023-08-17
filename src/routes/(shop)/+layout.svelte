<script lang="ts">
import { Footer, Nav } from '$lib/theme-config'
import { PageTransitions } from '$lib/components'

export let data

let showCartSidebar = false
let openSidebar = false
</script>

<div class="{showCartSidebar || openSidebar ? 'h-screen overflow-hidden' : 'h-full'} antialiased">
	<Nav
		me="{data["me"]}"
		cart="{data["cart"]}"
		store="{data["store"]}"
		sticky={false}
		data={undefined}
		bind:showCartSidebar="{showCartSidebar}"
		bind:openSidebar="{openSidebar}"
		 />

	<PageTransitions url="{data["url"]}">
		<slot />
	</PageTransitions>

	<div class="hidden lg:block">
		<Footer 
			me={data["me"]}
			store={data["store"]}
			megamenu={[]}
			popularSearches={undefined}
		/>
	</div>
</div>

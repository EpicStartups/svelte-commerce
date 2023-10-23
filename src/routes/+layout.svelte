<style>
/* .minimum-width-rem {
	min-width: 360px;
} */

@font-face {
	font-family: 'Jost';
	src: url('../lib/assets/fonts/jost/Jost-Italic-VariableFont_wght.ttf') format('truetype');
	font-weight: normal;
	font-style: italic;
}

@font-face {
	font-family: 'Jost';
	src: url('../lib/assets/fonts/jost/Jost-VariableFont_wght.ttf') format('truetype');
	font-weight: normal;
	font-style: normal;
}
</style>

<script lang="ts">
// import { pwaInfo } from 'virtual:pwa-info'
import './../app.css'
import FetchInit from '$lib/components/FetchInit.svelte'
import { BackToTop, LazyImg } from '$lib/components' // Can not dynamically import Google Analytics, it throws gtag not found error, not even party town
import { browser } from '$app/environment'
import { CategoryService } from '$lib/services'
import { FacebookPixel } from '@beyonk/svelte-facebook-pixel'
import { GOOGLE_ANALYTICS_ID } from '$lib/config'
import { GoogleAnalytics } from '@beyonk/svelte-google-analytics'
import { navigating } from '$app/stores'
import { onMount } from 'svelte'
import { page } from '$app/stores'
import { ToastContainer, FlatToast } from 'svelte-toasts'
import noStoreFound from '$lib/assets/no/no_store_found.png'
import PreloadingIndicator from '$lib/PreloadingIndicator.svelte'
import storeClosed from '$lib/assets/store-closed.png'
import whatsappIcon from '$lib/assets/social-media/whatsapp.png'
import globalStore from '$lib/store/global'

// console.log('$page', $page)

export let data
// console.log('zzzzzzzzzzzzzzzzzz', data)

$: innerWidth = 0
// $: isAndroid = false

let customfont = $page.data.store?.fontFamily || ''
let showBackToTopButton = true

$: if (innerWidth < 1024) {
	showBackToTopButton = false
} else {
	showBackToTopButton = true
}

// let ReloadPrompt

onMount(async () => {
	// 	// if (pwaInfo) {
	// 	// 	const { registerSW } = await import('virtual:pwa-register')
	// 	// 	registerSW({
	// 	// 		immediate: true,
	// 	// 		onRegistered(r) {
	// 	// 		},
	// 	// 		onRegisterError(error) {
	// 	// 		}
	// 	// 	})
	// 	// }
	// 	if (browser) {
	// 		// Get the User-Agent header from the request
	// 		// const userAgent = navigator.userAgent || navigator.vendor || window.opera
	// 		// // console.log('userAgent', userAgent)
	// 		// // Check if the User-Agent indicates an Android device
	// 		// // const isAndroid = userAgent.includes('Android')
	// 		// if (/android/i.test(userAgent) && $page.url.host !== 'm.zapvi.in') {
	// 		// 	// Attempt to open the app using the custom URL scheme
	// 		// 	window.location.href = `zapviin://m.zapvi.in/?slug=${$page.url.pathname.substring(1)}`
	// 		// }
	// 	}
	globalStore.setMe(data['me'])
})

// $: webManifest = pwaInfo ? pwaInfo.webManifest.linkTag : ''

// Add the Partytown script to the DOM head
// let scriptEl

// onMount(() => {
// 	if (scriptEl) {
// 		scriptEl.textContent = partytownSnippet()
// 	}
// })

// let GoogleAnalytics

// onMount(async () => {
// 	const GoogleAnalyticsEmodule = await import('$lib/components/GoogleAnalytics.svelte')

// 	GoogleAnalytics = GoogleAnalyticsEmodule.default
// })

// import PartytownSnippet from 'partytown-sveltekit/PartytownSnippet.svelte'
// import { GOOGLE_ANALYTICS_ID } from '$lib/config'

// if (typeof window !== 'undefined' && window) {
// 	// @ts-ignore
// 	window.dataLayer = window.dataLayer || []
// 	// @ts-ignore
// 	function gtag() {
// 		window.dataLayer.push(arguments)
// 	}
// 	gtag('js', new Date())
// 	gtag('config', GOOGLE_ANALYTICS_ID, {
// 		page_title: document.title,
// 		page_path: $page.url.pathname
// 	})
// }
</script>

<svelte:head>
	<link rel="icon" type="image/x-icon" href="{$page.data.store?.favicon}" />
	<link rel="shortcut icon" type="image/x-icon" href="{$page.data.store?.favicon}" />
	<meta name="theme-color" content="{$page.data.store?.themeColor}" />
	<link rel="apple-touch-icon" href="{$page.data.store?.favicon}" />
	<meta name="apple-mobile-web-app-title" content="{$page.data.store?.websiteName}" />
	<meta name="application-name" content="{$page.data.store?.websiteName}" />
	<link
		href="https://fonts.googleapis.com/css2?family={$page.data.store.fontFamily ||
			'Montserrat'}:wght@100;200;300;400;500;600;700;800;900&display=swap"
		rel="stylesheet" />

	<!-- {@html webManifest} -->
</svelte:head>

<!-- <svelte:head>
	<script>
	partytown = {
		forward: ['dataLayer.push'],
		resolveUrl: (url) => {
			const siteUrl = $page.data?.origin

			if (url.hostname === 'www.googletagmanager.com') {
				const proxyUrl = new URL(`${siteUrl}/gtm`)

				const gtmId = new URL(url).searchParams.get('id')
				gtmId && proxyUrl.searchParams.append('id', gtmId)

				return proxyUrl
			} else if (url.hostname === 'www.google-analytics.com') {
				const proxyUrl = new URL(`${siteUrl}/ga`)

				return proxyUrl
			}

			return url
		}
	}
	</script>

	<script bind:this="{scriptEl}"></script>
	<script
		type="text/partytown"
		src="https://www.googletagmanager.com/gtag/js?id=G-BG3JKWLYPF"></script>
	<script type="text/partytown">
	window.dataLayer = window.dataLayer || []

	function gtag() {
		dataLayer.push(arguments)
	}

	gtag('js', new Date())
	gtag('config', 'G-BG3JKWLYPF', {
		page_path: window.location.pathname
	})
	</script>
</svelte:head> -->

<svelte:window bind:innerWidth="{innerWidth}" />

<main style="font-family: {customfont};">
	{#if $page.data.store?.googleAnalytics?.active}
		<GoogleAnalytics properties="{[$page.data.store?.googleAnalytics.id.val]}" />

		<!-- <GoogleAnalytics googleAnalyticsId="{$page.data.store?.googleAnalytics.id}" /> -->
	{/if}

	{#if $page.data.store?.facebookPixel?.active}
		<FacebookPixel pixels="{[$page.data.store?.facebookPixel.id]}" />
	{/if}

	{#if $navigating}
		<PreloadingIndicator />
	{/if}

	<section class="minimum-width-rem relative flex min-h-screen flex-col bg-white antialiased">
		<div class="h-rem w-full flex-1">
			<slot />
		</div>
	</section>

	<!-- <PartytownSnippet /> -->

	{#if showBackToTopButton}
		<BackToTop />
	{/if}

	<ToastContainer let:data>
		<FlatToast data="{data}" />
	</ToastContainer>

	<!-- {#if ReloadPrompt}
	<svelte:component this="{ReloadPrompt}" />
{/if} -->

	<FetchInit />
</main>

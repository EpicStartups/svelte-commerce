// vite.config.js
import { sveltekit } from "file:///home/popos/projects/es/svelte-commerce/node_modules/@sveltejs/kit/src/exports/vite/index.js";
import { defineConfig, loadEnv } from "file:///home/popos/projects/es/svelte-commerce/node_modules/vite/dist/node/index.js";
import { partytownVite } from "file:///home/popos/projects/es/svelte-commerce/node_modules/@builder.io/partytown/utils/index.mjs";
import { SvelteKitPWA } from "file:///home/popos/projects/es/svelte-commerce/node_modules/@vite-pwa/sveltekit/dist/index.mjs";
var vite_config_default = defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const HTTP_ENDPOINT = env.PUBLIC_MEDUSAJS_API_URL || "https://shopolah-medusa-v1.epicstartups.co";
  return {
    plugins: [
      sveltekit(),
      SvelteKitPWA({
        registerType: "autoUpdate",
        workbox: {
          globPatterns: ["**/*.{ico,png,svg,webp}"]
        },
        srcDir: "./src",
        // mode: 'development',
        scope: "/",
        base: "/",
        devOptions: {
          // enabled: true,
          type: "module",
          navigateFallback: "/"
        },
        // if you have shared info in svelte config file put in a separate module and use it also here
        kit: {}
      })
      // partytownVite({
      // 	dest: join(process.cwd(), 'static', '~partytown')
      // })
    ]
    // server: {
    // 	host: true,
    // 	port: 3000,
    // 	proxy: {
    // 		'/api': HTTP_ENDPOINT,
    // 		'/sitemap': 'https://s3.ap-south-1.amazonaws.com/litekart.in'
    // 	}
    // }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9wb3Bvcy9wcm9qZWN0cy9lcy9zdmVsdGUtY29tbWVyY2VcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9ob21lL3BvcG9zL3Byb2plY3RzL2VzL3N2ZWx0ZS1jb21tZXJjZS92aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vaG9tZS9wb3Bvcy9wcm9qZWN0cy9lcy9zdmVsdGUtY29tbWVyY2Uvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBzdmVsdGVraXQgfSBmcm9tICdAc3ZlbHRlanMva2l0L3ZpdGUnXHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZywgbG9hZEVudiB9IGZyb20gJ3ZpdGUnXHJcbmltcG9ydCB7IGpvaW4gfSBmcm9tICdwYXRoJ1xyXG5pbXBvcnQgeyBwYXJ0eXRvd25WaXRlIH0gZnJvbSAnQGJ1aWxkZXIuaW8vcGFydHl0b3duL3V0aWxzJ1xyXG5pbXBvcnQgeyBTdmVsdGVLaXRQV0EgfSBmcm9tICdAdml0ZS1wd2Evc3ZlbHRla2l0J1xyXG4vKiogQHR5cGUge2ltcG9ydCgndml0ZScpLlVzZXJDb25maWd9ICovXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBjb21tYW5kLCBtb2RlIH0pID0+IHtcclxuXHRjb25zdCBlbnYgPSBsb2FkRW52KG1vZGUsIHByb2Nlc3MuY3dkKCksICcnKVxyXG5cdGNvbnN0IEhUVFBfRU5EUE9JTlQgPSBlbnYuUFVCTElDX01FRFVTQUpTX0FQSV9VUkwgfHwgJ2h0dHBzOi8vc2hvcG9sYWgtbWVkdXNhLXYxLmVwaWNzdGFydHVwcy5jbydcclxuXHRyZXR1cm4ge1xyXG5cdFx0cGx1Z2luczogW1xyXG5cdFx0XHRzdmVsdGVraXQoKSxcclxuXHRcdFx0U3ZlbHRlS2l0UFdBKHtcclxuXHRcdFx0XHRyZWdpc3RlclR5cGU6ICdhdXRvVXBkYXRlJyxcclxuXHRcdFx0XHR3b3JrYm94OiB7XHJcblx0XHRcdFx0XHRnbG9iUGF0dGVybnM6IFsnKiovKi57aWNvLHBuZyxzdmcsd2VicH0nXVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0c3JjRGlyOiAnLi9zcmMnLFxyXG5cdFx0XHRcdC8vIG1vZGU6ICdkZXZlbG9wbWVudCcsXHJcblx0XHRcdFx0c2NvcGU6ICcvJyxcclxuXHRcdFx0XHRiYXNlOiAnLycsXHJcblx0XHRcdFx0ZGV2T3B0aW9uczoge1xyXG5cdFx0XHRcdFx0Ly8gZW5hYmxlZDogdHJ1ZSxcclxuXHRcdFx0XHRcdHR5cGU6ICdtb2R1bGUnLFxyXG5cdFx0XHRcdFx0bmF2aWdhdGVGYWxsYmFjazogJy8nXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHQvLyBpZiB5b3UgaGF2ZSBzaGFyZWQgaW5mbyBpbiBzdmVsdGUgY29uZmlnIGZpbGUgcHV0IGluIGEgc2VwYXJhdGUgbW9kdWxlIGFuZCB1c2UgaXQgYWxzbyBoZXJlXHJcblx0XHRcdFx0a2l0OiB7fVxyXG5cdFx0XHR9KVxyXG5cdFx0XHQvLyBwYXJ0eXRvd25WaXRlKHtcclxuXHRcdFx0Ly8gXHRkZXN0OiBqb2luKHByb2Nlc3MuY3dkKCksICdzdGF0aWMnLCAnfnBhcnR5dG93bicpXHJcblx0XHRcdC8vIH0pXHJcblx0XHRdXHJcblx0XHQvLyBzZXJ2ZXI6IHtcclxuXHRcdC8vIFx0aG9zdDogdHJ1ZSxcclxuXHRcdC8vIFx0cG9ydDogMzAwMCxcclxuXHRcdC8vIFx0cHJveHk6IHtcclxuXHRcdC8vIFx0XHQnL2FwaSc6IEhUVFBfRU5EUE9JTlQsXHJcblx0XHQvLyBcdFx0Jy9zaXRlbWFwJzogJ2h0dHBzOi8vczMuYXAtc291dGgtMS5hbWF6b25hd3MuY29tL2xpdGVrYXJ0LmluJ1xyXG5cdFx0Ly8gXHR9XHJcblx0XHQvLyB9XHJcblx0fVxyXG59KVxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXVTLFNBQVMsaUJBQWlCO0FBQ2pVLFNBQVMsY0FBYyxlQUFlO0FBRXRDLFNBQVMscUJBQXFCO0FBQzlCLFNBQVMsb0JBQW9CO0FBRTdCLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsU0FBUyxLQUFLLE1BQU07QUFDbEQsUUFBTSxNQUFNLFFBQVEsTUFBTSxRQUFRLElBQUksR0FBRyxFQUFFO0FBQzNDLFFBQU0sZ0JBQWdCLElBQUksMkJBQTJCO0FBQ3JELFNBQU87QUFBQSxJQUNOLFNBQVM7QUFBQSxNQUNSLFVBQVU7QUFBQSxNQUNWLGFBQWE7QUFBQSxRQUNaLGNBQWM7QUFBQSxRQUNkLFNBQVM7QUFBQSxVQUNSLGNBQWMsQ0FBQyx5QkFBeUI7QUFBQSxRQUN6QztBQUFBLFFBQ0EsUUFBUTtBQUFBO0FBQUEsUUFFUixPQUFPO0FBQUEsUUFDUCxNQUFNO0FBQUEsUUFDTixZQUFZO0FBQUE7QUFBQSxVQUVYLE1BQU07QUFBQSxVQUNOLGtCQUFrQjtBQUFBLFFBQ25CO0FBQUE7QUFBQSxRQUVBLEtBQUssQ0FBQztBQUFBLE1BQ1AsQ0FBQztBQUFBO0FBQUE7QUFBQTtBQUFBLElBSUY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFTRDtBQUNELENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==

<script lang="ts">
export let className: string = ""
</script>

<button class={`bg-white px-4 py-3 ${className}`}>
    <slot />
</button>

<style>
button {
    box-shadow: 0px 3px 27px 0px #0000002B;
    transition: all 0.3s ease;
}

button:hover {
    transform: scale(1.01);
    box-shadow: 0px 10px 27px 0px #0000002B;
}
</style>
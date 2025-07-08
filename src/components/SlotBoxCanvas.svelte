<script>
    import { onMount, onDestroy } from "svelte";
    import { slotBoxSDK } from "slotbox-sdk";
    export let slotboxConfig = {};
    let canvas;
    let sdkInitialized = false;

    onMount(async () => {
        if (!sdkInitialized) {
            await slotBoxSDK.init(canvas, slotboxConfig);
            sdkInitialized = true;
        }
    });

    onDestroy(() => {
        if (sdkInitialized && slotBoxSDK.destroy) {
            slotBoxSDK.destroy();
            sdkInitialized = false;
        }
    });

    function handleResize() {
        if (sdkInitialized && slotBoxSDK.resize) {
            slotBoxSDK.resize();
        }
    }
</script>

<svelte:window on:resize={handleResize} />

<div class="slotbox-container">
    <canvas bind:this={canvas} class="slotbox-canvas"></canvas>
</div>

<style>
    .slotbox-container {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #1e1e1e;
    }
    .slotbox-canvas {
        max-width: 100vw;
        max-height: 80vh;
        display: block;
    }
</style>

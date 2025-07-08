<script>
  import { createEventDispatcher, onMount } from "svelte";
  export let w = 120;
  export let h = 120;
  export let spinning = false;
  export let onSpinEnd = () => {};

  // Change this to match your image symbols in public/
  const SYMBOLS = [
    "/upload1.png",
    "/upload2.png",
    "/upload3.png",
    "/upload4.png",
    "/upload5.png",
  ];
  const reelCount = 5;
  const gap = 2;
  const totalGap = gap * (reelCount - 1);
  $: reelWidth = (w - totalGap) / reelCount;

  let currentSymbols = Array(reelCount).fill(0);
  let localSpinning = false;

  $: if (spinning && !localSpinning) {
    // Start spinning animation
    localSpinning = true;
    let spinsLeft = Array(reelCount)
      .fill()
      .map((_, i) => 20 + Math.floor(Math.random() * 20) + i * 10);

    function animate() {
      let stillSpinning = false;
      for (let i = 0; i < reelCount; i++) {
        if (spinsLeft[i] > 0) {
          currentSymbols[i] = (currentSymbols[i] + 1) % SYMBOLS.length;
          spinsLeft[i]--;
          stillSpinning = true;
        }
      }
      if (stillSpinning) {
        setTimeout(animate, 60);
      } else {
        localSpinning = false;
        onSpinEnd();
      }
    }
    animate();
  }

  // Optionally randomize symbols on mount
  onMount(() => {
    currentSymbols = Array(reelCount)
      .fill()
      .map(() => Math.floor(Math.random() * SYMBOLS.length));
  });
</script>

<div class="flex absolute inset-0" style="gap: {gap}px;">
  {#each Array(reelCount) as _, i}
    <div
      class="flex items-center justify-center"
      style="width: {reelWidth}px; height: 100%; background: rgba(255,255,255,0.12); border-radius: 4px;"
    >
      <img
        src={SYMBOLS[currentSymbols[i]]}
        alt="symbol"
        style="max-width: 85%; max-height: 85%;"
      />
    </div>
  {/each}
</div>

<script>
  import { createEventDispatcher, onMount } from 'svelte';
  export let w = 120;
  export let h = 120;
  export let spinning = false;
  export let onSpinEnd = () => {};

  const reelCount = 5;
  const gap = 2;
  const totalGap = gap * (reelCount - 1);
  $: reelWidth = (w - totalGap) / reelCount;

  const SYMBOLS = ["🍒", "🍋", "🔔", "⭐", "💎", "7️⃣"];
  let currentSymbols = Array(reelCount).fill(0);
  let localSpinning = false;

  $: if (spinning && !localSpinning) {
    // Start spinning animation
    localSpinning = true;
    let spinsLeft = Array(reelCount).fill().map((_, i) => 20 + Math.floor(Math.random() * 20) + i * 10);

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
</script>

<div class="flex absolute inset-0" style="gap: {gap}px;">
  {#each Array(reelCount) as _, i}
    <div
      class="flex items-center justify-center"
      style="width: {reelWidth}px; height: 100%; background: rgba(255,255,255,0.12); border-radius: 4px; font-size: {h/2.5}px;"
    >
      {SYMBOLS[currentSymbols[i]]}
    </div>
  {/each}
</div>
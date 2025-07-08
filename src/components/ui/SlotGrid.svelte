<script>
  export let w = 120;
  export let h = 120;
  export let reels = []; // Array of arrays: reels[reelIndex][symbolIndex]
  export let symbolsList = [];
  export let visibleCount = 3;
  const reelCount = 5;
  const gap = 2;
  const totalGap = gap * (reelCount - 1);
  $: reelWidth = (w - totalGap) / reelCount;
  $: symbolHeight = h / visibleCount;
</script>

<div class="absolute inset-0 flex" style="gap: {gap}px;">
  {#each reels as reel, i}
    <div
      class="flex flex-col items-center justify-center"
      style="width: {reelWidth}px; height: 100%; background: rgba(255,255,255,0.13); border-radius: 4px;"
    >
      {#each reel as symbolIndex}
        <div
          class="flex items-center justify-center"
          style="height: {symbolHeight}px; font-size: {symbolHeight * 0.7}px;"
        >
          {symbolsList[symbolIndex]}
        </div>
      {/each}
    </div>
  {/each}
</div>

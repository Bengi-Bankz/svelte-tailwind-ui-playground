<script>
  export let w = 120;
  export let h = 120;
  export let reels = [];
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
          style="height: {symbolHeight}px;"
        >
          <img
            src={symbolsList[symbolIndex]}
            alt="symbol"
            style="max-width: 85%; max-height: 85%; object-fit: contain;"
          />
        </div>
      {/each}
    </div>
  {/each}
</div>

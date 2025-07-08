<script>
  import FrameVariant from "../FrameVariant.svelte";
  import MenuVariant from "../MenuVariant.svelte";
  import BalanceBetBlock from "../BalanceBetBlock.svelte";
  import SpinButtonVariants from "../SpinButtonVariants.svelte";
  import WinModalVariant from "../WinModalVariant.svelte";
  import SlotGrid from "./SlotGrid.svelte";

  export let elements = [];

  const componentMap = {
    Balance: BalanceBetBlock,
    Menu: MenuVariant,
    Frame: FrameVariant,
    Spin: SpinButtonVariants,
    WinModal: WinModalVariant,
  };

  // --- Slot machine state ---
  let spinning = false;
  const REEL_COUNT = 5;
  const VISIBLE_COUNT = 3;
  const SYMBOLS = ["🍒", "🍋", "🔔", "⭐", "💎", "7️⃣"];

  // Each reel is an array of symbol indexes
  let reels = Array(REEL_COUNT)
    .fill()
    .map(() =>
      Array(VISIBLE_COUNT)
        .fill(0)
        .map(() => Math.floor(Math.random() * SYMBOLS.length)),
    );

  // Find the Frame and SpinButton from placed elements
  $: frameEl = elements.find((el) => el.type === "Frame");
  $: spinButtonEl = elements.find((el) => el.type === "Spin");

  function getRandomSymbol() {
    return Math.floor(Math.random() * SYMBOLS.length);
  }

  function triggerSpin() {
    if (spinning || !frameEl) return;
    spinning = true;
    // For each reel, decide how many steps to spin
    let spinsLeft = Array(REEL_COUNT)
      .fill()
      .map((_, i) => 20 + Math.floor(Math.random() * 20) + i * 10);

    function animate() {
      let stillSpinning = false;
      let newReels = reels.map((reel, i) => {
        let updated = [...reel];
        if (spinsLeft[i] > 0) {
          updated.unshift(getRandomSymbol());
          updated = updated.slice(0, VISIBLE_COUNT);
          spinsLeft[i]--;
          stillSpinning = true;
        }
        return updated;
      });
      reels = newReels; // triggers Svelte reactivity!
      if (stillSpinning) {
        setTimeout(animate, 60);
      } else {
        spinning = false;
      }
    }
    animate();
  }
</script>

<div class="sdk-preview">
  <div
    class="sdk-canvas"
    style="width:1920px; height:1080px; position:relative;"
  >
    {#each elements as el (el.id)}
      {#if el.type === "Frame"}
        <div
          style="
            position:absolute;
            left:{el.x}px; top:{el.y}px;
            width:{el.w}px; height:{el.h}px;
          "
        >
          <FrameVariant
            option={el.option}
            w={el.w}
            h={el.h}
            isPortrait={false}
          />
          <!-- SlotGrid overlays inside the Frame -->
          <SlotGrid
            w={el.w}
            h={el.h}
            {reels}
            symbolsList={SYMBOLS}
            visibleCount={VISIBLE_COUNT}
          />
        </div>
      {:else if el.type === "Spin"}
        <div
          style="
            position:absolute;
            left:{el.x}px; top:{el.y}px;
            width:{el.w}px; height:{el.h}px;
            display:flex; align-items:center; justify-content:center;
          "
        >
          <SpinButtonVariants
            option={el.option}
            w={el.w}
            h={el.h}
            isPortrait={false}
            on:click={triggerSpin}
            disabled={spinning}
          />
        </div>
      {:else}
        <div
          style="
            position:absolute;
            left:{el.x}px; top:{el.y}px;
            width:{el.w}px; height:{el.h}px;
          "
        >
          <svelte:component
            this={componentMap[el.type]}
            option={el.option}
            w={el.w}
            h={el.h}
            isPortrait={false}
          />
        </div>
      {/if}
    {/each}
  </div>
</div>

<style>
  .sdk-preview {
    width: 100vw;
    height: 100vh;
    background: #18191b;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: auto;
  }
  .sdk-canvas {
    box-shadow: 0 0 18px #000c;
    background: #111;
    position: relative;
    max-width: 100vw;
    max-height: 100vh;
  }
</style>

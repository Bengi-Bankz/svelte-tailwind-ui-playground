<script>
  import FrameVariant from "../FrameVariant.svelte";
  import MenuVariant from "../MenuVariant.svelte";
  import BalanceBetBlock from "../BalanceBetBlock.svelte";
  import SpinButtonVariants from "../SpinButtonVariants.svelte";
  import WinModalVariant from "../WinModalVariant.svelte";

  export let elements = [];

  const CANVAS_WIDTH = 1920;
  const CANVAS_HEIGHT = 1080;

  // Map type to Svelte component
  const componentMap = {
    Balance: BalanceBetBlock,
    Menu: MenuVariant,
    Frame: FrameVariant,
    Spin: SpinButtonVariants,
    WinModal: WinModalVariant,
  };
</script>

<div class="sdk-preview">
  <div
    class="sdk-canvas"
    style="width:{CANVAS_WIDTH}px; height:{CANVAS_HEIGHT}px; position:relative;"
  >
    {#each elements as el (el.id)}
      {#if el.type === "Frame"}
        <div
          style="position:absolute; left:{el.x}px; top:{el.y}px; width:{el.w}px; height:{el.h}px;"
        >
          <FrameVariant option={el.option} w={el.w} h={el.h} />
          <!-- Slot grid overlays inside Frame -->
          <div
            class="slot-grid"
            style="position:absolute; inset:0; pointer-events:none;"
          >
            {#each Array(5) as _, rowIdx}
              <div class="slot-row" style="height:20%;">
                {#each Array(5) as _, colIdx}
                  <div class="slot-cell" style="width:20%; height:100%;"></div>
                {/each}
              </div>
            {/each}
          </div>
        </div>
      {:else}
        <div
          style="position:absolute; left:{el.x}px; top:{el.y}px; width:{el.w}px; height:{el.h}px;"
        >
          <svelte:component
            this={componentMap[el.type]}
            option={el.option}
            w={el.w}
            h={el.h}
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
  .slot-grid {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 2px;
    justify-content: center;
    align-items: center;
    pointer-events: none;
  }
  .slot-row {
    display: flex;
    gap: 2px;
    width: 100%;
  }
  .slot-cell {
    background: #222;
    border-radius: 3px;
    border: 2px solid #fff;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>

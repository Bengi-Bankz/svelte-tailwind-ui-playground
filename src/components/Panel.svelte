<script>
  import { placedElements } from "../lib/shared/placedElements";
  import { get, writable } from "svelte/store";
  import { uiConfigStore } from "../lib/shared/uiConfigStore";

  import FrameVariant from "./FrameVariant.svelte";
  import MenuVariant from "./MenuVariant.svelte";
  import BalanceBetBlock from "./BalanceBetBlock.svelte";
  import SpinButtonVariants from "./SpinButtonVariants.svelte";
  import WinModalVariant from "./WinModalVariant.svelte";
  import DraggableWrapper from "./ui/DraggableWrapper.svelte";
  import SdkPreview from "./ui/SdkPreview.svelte";

  const elementTypes = ["Balance", "Menu", "Frame", "Spin", "WinModal"];

  const variantOptions = {
    Balance: ["option-1", "option-2", "option-3", "option-4", "option-5"],
    Menu: ["option-1", "option-2", "option-3", "option-4", "option-5"],
    Frame: ["option-1", "option-2", "option-3", "option-4", "option-5"],
    Spin: ["option-1", "option-2", "option-3", "option-4", "option-5"],
    WinModal: ["option-1", "option-2", "option-3", "option-4", "option-5"],
  };

  let selectedElement = "Balance";
  let selectedOption = variantOptions["Balance"][0];
  let selectedView = "mobile";

  $: selectedOption = variantOptions[selectedElement]?.[0] ?? "";

  const selectedElementData = writable(null);

  const componentMap = {
    Balance: BalanceBetBlock,
    Menu: MenuVariant,
    Frame: FrameVariant,
    Spin: SpinButtonVariants,
    WinModal: WinModalVariant,
  };

  let showSDK = false;

  // --- No changes below here except the scaling in the builder preview ---
  function handleAdd() {
    const current = get(placedElements);
    const view = current[selectedView];

    if (!view.some((el) => el.type === selectedElement)) {
      const containerWidth = selectedView === "mobile" ? 255.45 : 1248;
      const containerHeight = selectedView === "mobile" ? 553.8 : 702;
      const defaultWidth = 120;
      const defaultHeight = 120;
      const initialX = Math.min(100, containerWidth - defaultWidth);
      const initialY = Math.min(100, containerHeight - defaultHeight);

      const newEl = {
        id: `${selectedElement}-${Date.now()}`,
        type: selectedElement,
        option: selectedOption,
        x: initialX,
        y: initialY,
        w: defaultWidth,
        h: defaultHeight,
      };
      view.push(newEl);
      placedElements.set({ ...current });
      selectedElementData.set(newEl);
    }
  }

  function exportSnapshot() {
    const snapshot = get(placedElements);
    const json = JSON.stringify(snapshot, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "layout-snapshot.json";
    link.click();
    URL.revokeObjectURL(url);
  }

  function handleReset() {
    placedElements.set({ mobile: [], desktop: [] });
    selectedElementData.set(null);
  }

  function updateElement(id, view, updates) {
    const current = get(placedElements);
    const viewElements = current[view];
    const elementIndex = viewElements.findIndex((el) => el.id === id);

    if (elementIndex !== -1) {
      const containerWidth = view === "mobile" ? 255.45 : 1248;
      const containerHeight = view === "mobile" ? 553.8 : 702;

      let constrainedUpdates = { ...updates };

      if (
        constrainedUpdates.x !== undefined ||
        constrainedUpdates.w !== undefined
      ) {
        const newX = constrainedUpdates.x ?? viewElements[elementIndex].x;
        const newW = constrainedUpdates.w ?? viewElements[elementIndex].w;
        constrainedUpdates.x = Math.max(
          0,
          Math.min(containerWidth - newW, newX),
        );
      }

      if (
        constrainedUpdates.y !== undefined ||
        constrainedUpdates.h !== undefined
      ) {
        const newY = constrainedUpdates.y ?? viewElements[elementIndex].y;
        const newH = constrainedUpdates.h ?? viewElements[elementIndex].h;
        constrainedUpdates.y = Math.max(
          0,
          Math.min(containerHeight - newH, newY),
        );
      }

      viewElements[elementIndex] = {
        ...viewElements[elementIndex],
        ...constrainedUpdates,
      };
      placedElements.set({ ...current });

      if ($selectedElementData && $selectedElementData.id === id) {
        selectedElementData.set(viewElements[elementIndex]);
      }
    }
  }

  function handleNext() {
    uiConfigStore.set(get(placedElements));
    showSDK = true;
  }

  // Scaling factor for builder preview
  const DESKTOP_SCALE = 0.65;
  const MOBILE_SCALE = 0.65;
</script>

{#if !showSDK}
  <div class="flex flex-col items-center w-full">
    <!-- TOP BAR -->
    <div
      class="flex gap-2 bg-gray-900 w-full px-4 py-3 text-white items-center justify-center"
    >
      <select bind:value={selectedElement} class="text-black px-2 py-1 rounded">
        {#each elementTypes as type}
          <option value={type}>{type}</option>
        {/each}
      </select>

      <select bind:value={selectedOption} class="text-black px-2 py-1 rounded">
        {#each variantOptions[selectedElement] as opt}
          <option value={opt}>{opt}</option>
        {/each}
      </select>

      <select bind:value={selectedView} class="text-black px-2 py-1 rounded">
        <option value="mobile">Mobile</option>
        <option value="desktop">Desktop</option>
      </select>

      <button
        on:click={handleAdd}
        class="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
      >
        Add
      </button>
      <button
        on:click={handleReset}
        class="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
      >
        Clear
      </button>
    </div>

    <!-- SCALE NOTE -->
    <div class="text-xs text-gray-400 mt-2 mb-4">
      Preview scaled to <strong>65%</strong> — actual layout: 1920×1080 desktop /
      393×852 mobile
    </div>

    <!-- DISPLAY -->
    <div class="flex justify-center gap-12 my-4">
      <!-- MOBILE -->
      <div
        class="relative border-4 border-white"
        style="width:{255.45 * MOBILE_SCALE}px; height:{553.8 *
          MOBILE_SCALE}px; background:black;"
      >
        <p class="absolute top-2 left-2 text-xs text-white/60">Mobile</p>
        {#each $placedElements.mobile as el (el.id)}
          <DraggableWrapper
            id={el.id}
            x={el.x * MOBILE_SCALE}
            y={el.y * MOBILE_SCALE}
            w={el.w * MOBILE_SCALE}
            h={el.h * MOBILE_SCALE}
            minWidth={el.type === "Balance" ? 255.45 * MOBILE_SCALE : 40}
            containerWidth={255.45 * MOBILE_SCALE}
            containerHeight={553.8 * MOBILE_SCALE}
            onClick={() => selectedElementData.set(el)}
            onUpdate={(updates) =>
              // Undo the scaling when saving (convert back to 1:1)
              updateElement(el.id, "mobile", {
                ...updates,
                x:
                  updates.x !== undefined
                    ? updates.x / MOBILE_SCALE
                    : undefined,
                y:
                  updates.y !== undefined
                    ? updates.y / MOBILE_SCALE
                    : undefined,
                w:
                  updates.w !== undefined
                    ? updates.w / MOBILE_SCALE
                    : undefined,
                h:
                  updates.h !== undefined
                    ? updates.h / MOBILE_SCALE
                    : undefined,
              })}
          >
            <svelte:component
              this={componentMap[el.type]}
              option={el.option}
              isPortrait={true}
              w={el.w * MOBILE_SCALE}
              h={el.h * MOBILE_SCALE}
            />
          </DraggableWrapper>
        {/each}
      </div>

      <!-- DESKTOP -->
      <div
        class="relative border-4 border-white"
        style="width:{1248 * DESKTOP_SCALE}px; height:{702 *
          DESKTOP_SCALE}px; background:black;"
      >
        <p class="absolute top-2 left-2 text-xs text-white/60">Desktop</p>
        {#each $placedElements.desktop as el (el.id)}
          <DraggableWrapper
            id={el.id}
            x={el.x * DESKTOP_SCALE}
            y={el.y * DESKTOP_SCALE}
            w={el.w * DESKTOP_SCALE}
            h={el.h * DESKTOP_SCALE}
            minWidth={el.type === "Balance" ? 255.45 * DESKTOP_SCALE : 40}
            containerWidth={1248 * DESKTOP_SCALE}
            containerHeight={702 * DESKTOP_SCALE}
            onClick={() => selectedElementData.set(el)}
            onUpdate={(updates) =>
              // Undo the scaling when saving (convert back to 1:1)
              updateElement(el.id, "desktop", {
                ...updates,
                x:
                  updates.x !== undefined
                    ? updates.x / DESKTOP_SCALE
                    : undefined,
                y:
                  updates.y !== undefined
                    ? updates.y / DESKTOP_SCALE
                    : undefined,
                w:
                  updates.w !== undefined
                    ? updates.w / DESKTOP_SCALE
                    : undefined,
                h:
                  updates.h !== undefined
                    ? updates.h / DESKTOP_SCALE
                    : undefined,
              })}
          >
            <svelte:component
              this={componentMap[el.type]}
              option={el.option}
              isPortrait={false}
              w={el.w * DESKTOP_SCALE}
              h={el.h * DESKTOP_SCALE}
            />
          </DraggableWrapper>
        {/each}
      </div>
    </div>

    <!-- SNAPSHOT -->
    <button
      on:click={exportSnapshot}
      class="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 mt-2 rounded shadow"
    >
      📤 Export Snapshot
    </button>

    <button
      on:click={handleNext}
      class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 mt-2 rounded shadow"
    >
      ➡️ Next: Load in SlotBox SDK
    </button>

    <!-- LOGS -->
    <div
      class="bg-black text-green-400 text-sm mt-6 w-5/6 p-4 border-t border-green-700 font-mono whitespace-pre overflow-auto max-h-[300px]"
    >
      Selected Element:
      {#if $selectedElementData}
        {JSON.stringify($selectedElementData, null, 2)}
      {:else}
        No element selected
      {/if}

      &#10;&#10;--- Mobile Elements ---&#10;
      {#each $placedElements.mobile as el}
        {JSON.stringify(el)}{/each}

      &#10;--- Desktop Elements ---&#10;
      {#each $placedElements.desktop as el}
        {JSON.stringify(el)}{/each}
    </div>
  </div>
{:else}
  <SdkPreview elements={$uiConfigStore.desktop} />
{/if}

<script>
  import { placedElements } from "../lib/shared/placedElements";
  import { get, writable } from "svelte/store";

  import FrameVariant from "./FrameVariant.svelte";
  import MenuVariant from "./MenuVariant.svelte";
  import BalanceBetBlock from "./BalanceBetBlock.svelte";
  import SpinButtonVariants from "./SpinButtonVariants.svelte";
  import WinModalVariant from "./WinModalVariant.svelte";
  import DraggableWrapper from "./ui/DraggableWrapper.svelte";

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

  function handleAdd() {
    const current = get(placedElements);
    const view = current[selectedView];

    if (!view.some((el) => el.type === selectedElement)) {
      // Get container dimensions based on selected view
      const containerWidth = selectedView === "mobile" ? 255.45 : 1248;
      const containerHeight = selectedView === "mobile" ? 553.8 : 702;

      // Default dimensions
      const defaultWidth = 120;
      const defaultHeight = 120;

      // Ensure initial position is within bounds
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
      // Get container dimensions based on view
      const containerWidth = view === "mobile" ? 255.45 : 1248;
      const containerHeight = view === "mobile" ? 553.8 : 702;

      // Apply constraints to updates
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

      // Update selected element data if it's the one being modified
      if ($selectedElementData && $selectedElementData.id === id) {
        selectedElementData.set(viewElements[elementIndex]);
      }
    }
  }
</script>

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
    Preview scaled to <strong>65%</strong> — actual layout: 1280×720 desktop / 393×852
    mobile
  </div>

  <!-- DISPLAY -->
  <div class="flex justify-center gap-12 my-4">
    <!-- MOBILE -->
    <div
      class="relative border-4 border-white w-[255.45px] h-[553.8px] bg-black text-white text-center"
    >
      <p class="absolute top-2 left-2 text-xs text-white/60">Mobile</p>
      {#each $placedElements.mobile as el (el.id)}
        <DraggableWrapper
          id={el.id}
          x={el.x}
          y={el.y}
          w={el.w}
          h={el.h}
          minWidth={el.type === "Balance" ? 255.45 : 40}
          containerWidth={255.45}
          containerHeight={553.8}
          onClick={() => selectedElementData.set(el)}
          onUpdate={(updates) => updateElement(el.id, "mobile", updates)}
        >
          <svelte:component
            this={componentMap[el.type]}
            option={el.option}
            isPortrait={true}
            w={el.w}
            h={el.h}
          />
        </DraggableWrapper>
      {/each}
    </div>

    <!-- DESKTOP -->
    <div
      class="relative border-4 border-white w-[1248px] h-[702px] bg-black text-white text-center"
    >
      <p class="absolute top-2 left-2 text-xs text-white/60">Desktop</p>
      {#each $placedElements.desktop as el (el.id)}
        <DraggableWrapper
          id={el.id}
          x={el.x}
          y={el.y}
          w={el.w}
          h={el.h}
          minWidth={el.type === "Balance" ? 255.45 : 40}
          containerWidth={1248}
          containerHeight={702}
          onClick={() => selectedElementData.set(el)}
          onUpdate={(updates) => updateElement(el.id, "desktop", updates)}
        >
          <svelte:component
            this={componentMap[el.type]}
            option={el.option}
            isPortrait={false}
            w={el.w}
            h={el.h}
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

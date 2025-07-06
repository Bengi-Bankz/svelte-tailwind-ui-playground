<script>
  import SpinButtonVariants from "./SpinButtonVariants.svelte";

  let selectedElement = "";
  let selectedOption = "";
  let selectedPlacement = "";
  let selectedMath = "";

  const getPlacementStyle = (placement, isPortrait = true) => {
    const base = isPortrait ? { w: 200, h: 300 } : { w: 300, h: 200 };

    const pos = {
      "top-left": "top-0 left-0",
      "top-middle": "top-0 left-1/2 -translate-x-1/2",
      "top-right": "top-0 right-0",
      "middle-left": "top-1/2 left-0 -translate-y-1/2",
      "middle-middle": "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
      "middle-right": "top-1/2 right-0 -translate-y-1/2",
      "bottom-left": "bottom-0 left-0",
      "bottom-middle": "bottom-0 left-1/2 -translate-x-1/2",
      "bottom-right": "bottom-0 right-0",
    };

    return `absolute ${pos[placement] || ""}`;
  };
</script>

<section class="flex-1 p-4 text-white">
  <h2 class="text-lg mb-4">Control Panel</h2>

  <!-- Dropdowns -->
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
    <!-- Element Dropdown -->
    <div>
      <label class="block text-sm font-medium mb-1 text-blue-400">Element</label
      >
      <select
        bind:value={selectedElement}
        class="w-full p-2 rounded bg-blue-600 text-white border border-blue-300"
      >
        <option value="" disabled selected>Select Element</option>
        <option value="bet-button">Bet Button</option>
      </select>
    </div>

    <!-- Option Dropdown -->
    <div>
      <label class="block text-sm font-medium mb-1 text-green-400"
        >Options</label
      >
      <select
        bind:value={selectedOption}
        class="w-full p-2 rounded bg-green-600 text-white border border-green-300"
      >
        <option value="" disabled selected>Select Option</option>
        <option value="option-1">Option 1</option>
        <option value="option-2">Option 2</option>
        <option value="option-3">Option 3</option>
        <option value="option-4">Option 4</option>
        <option value="option-5">Option 5</option>
      </select>
    </div>

    <!-- Placement -->
    <div>
      <label class="block text-sm font-medium mb-1 text-yellow-400"
        >Placement</label
      >
      <select
        bind:value={selectedPlacement}
        class="w-full p-2 rounded bg-yellow-500 text-black border border-yellow-300"
      >
        <option value="" disabled selected>Select Placement</option>
        <option value="top-left">Top Left</option>
        <option value="top-middle">Top Middle</option>
        <option value="top-right">Top Right</option>
        <option value="middle-left">Middle Left</option>
        <option value="middle-middle">Middle Center</option>
        <option value="middle-right">Middle Right</option>
        <option value="bottom-left">Bottom Left</option>
        <option value="bottom-middle">Bottom Middle</option>
        <option value="bottom-right">Bottom Right</option>
      </select>
    </div>

    <!-- Math -->
    <div>
      <label class="block text-sm font-medium mb-1 text-red-400">Math</label>
      <select
        bind:value={selectedMath}
        class="w-full p-2 rounded bg-red-600 text-white border border-red-300"
      >
        <option value="" disabled selected>Select Math Option</option>
        {#each Array(10) as _, i}
          <option value={`math-${i + 1}`}>Math Option {i + 1}</option>
        {/each}
      </select>
    </div>
  </div>

  <!-- Dual Preview -->
  <div class="flex flex-col md:flex-row items-center justify-center gap-6">
    <!-- Portrait -->
    <div
      class="relative bg-gray-800 border-2 border-white rounded-lg w-[200px] h-[300px] overflow-hidden"
    >
      {#if selectedElement === "bet-button" && selectedOption}
        <div class={getPlacementStyle(selectedPlacement, true)}>
          <SpinButtonVariants option={selectedOption} />
        </div>
      {/if}

      <div
        class="absolute bottom-0 w-full p-2 bg-black bg-opacity-60 text-xs text-center"
      >
        <div><b>Portrait</b></div>
        <div><b>Element:</b> {selectedElement || "None"}</div>
        <div><b>Placement:</b> {selectedPlacement || "None"}</div>
      </div>
    </div>

    <!-- Landscape -->
    <div
      class="relative bg-gray-800 border-2 border-white rounded-lg w-[300px] h-[200px] overflow-hidden"
    >
      {#if selectedElement === "bet-button" && selectedOption}
        <div class={getPlacementStyle(selectedPlacement, false)}>
          <SpinButtonVariants option={selectedOption} />
        </div>
      {/if}

      <div
        class="absolute bottom-0 w-full p-2 bg-black bg-opacity-60 text-xs text-center"
      >
        <div><b>Landscape</b></div>
        <div><b>Element:</b> {selectedElement || "None"}</div>
        <div><b>Placement:</b> {selectedPlacement || "None"}</div>
      </div>
    </div>
  </div>
</section>

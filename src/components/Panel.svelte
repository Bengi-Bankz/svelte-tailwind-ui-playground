<script>
  import SpinButtonVariants from "./SpinButtonVariants.svelte";

  let selectedElement = "";
  let selectedOption = "";
  let selectedPlacement = "";
  let selectedMath = "";

  const getPlacementStyle = (placement, isPortrait = true) => {
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

    <div>
      <label class="block text-sm font-medium mb-1 text-green-400"
        >Options</label
      >
      <select
        bind:value={selectedOption}
        class="w-full p-2 rounded bg-green-600 text-white border border-green-300"
      >
        <option value="" disabled selected>Select Option</option>
        {#each Array(5) as _, i}
          <option value={`option-${i + 1}`}>Option {i + 1}</option>
        {/each}
      </select>
    </div>

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

    <div>
      <label class="block text-sm font-medium mb-1 text-red-400">Math</label>
      <select
        bind:value={selectedMath}
        class="w-full p-2 rounded bg-red-600 text-white border border-red-300"
      >
        {#each Array(10) as _, i}
          <option value={`math-${i + 1}`}>Math Option {i + 1}</option>
        {/each}
      </select>
    </div>
  </div>

  <!-- Preview Boxes -->
  <div class="flex flex-col md:flex-row items-center justify-center gap-16">
    <!-- Landscape (scaled larger) -->
    <div
      class="relative bg-gray-900 border-4 border-white rounded-xl w-[1008px] h-[560px] overflow-hidden"
    >
      {#if selectedElement === "bet-button" && selectedOption}
        <div
          class={`transform scale-[1.02] origin-center ${getPlacementStyle(selectedPlacement, false)}`}
        >
          {#key selectedOption}
            <SpinButtonVariants option={selectedOption} isPortrait={false} />
          {/key}
        </div>
      {/if}
    </div>

    <!-- Portrait (iPhone 15 size) -->
    <div
      class="relative bg-gray-900 border-4 border-white rounded-xl w-[280px] h-[560px] overflow-hidden"
    >
      {#if selectedElement === "bet-button" && selectedOption}
        <div
          class={`transform scale-[0.75] origin-center ${getPlacementStyle(selectedPlacement, true)}`}
        >
          {#key selectedOption}
            <SpinButtonVariants option={selectedOption} isPortrait={true} />
          {/key}
        </div>
      {/if}
    </div>
  </div>
</section>

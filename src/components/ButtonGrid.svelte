<script>
  let selectedElement = "";
  let selectedOption = "";
  let selectedPlacement = "";
  let selectedMath = "";
</script>

<!-- Dropdown Grid -->
<div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
  <!-- Element Dropdown -->
  <div>
    <label class="block text-sm font-medium mb-1 text-blue-400">Element</label>
    <select
      bind:value={selectedElement}
      class="w-full p-2 rounded bg-blue-600 text-white border border-blue-300"
    >
      <option value="" disabled selected>Select Element</option>
      <option value="bet-button">Bet Button</option>
      <option value="bet-input">Bet Input</option>
      <option value="balance-display">Balance Display</option>
      <option value="auto-button">Auto Button</option>
      <option value="bonus-buy-button">Bonus Buy Button</option>
      <option value="menu">Menu</option>
      <option value="jackpot-display">Jackpot Display</option>
      <option value="frame">Frame</option>
      <option value="win-modal">Win Modal</option>
    </select>
  </div>

  <!-- Options Dropdown -->
  <div>
    <label class="block text-sm font-medium mb-1 text-green-400">Options</label>
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

  <!-- Placement Dropdown -->
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

  <!-- Math Dropdown -->
  <div>
    <label class="block text-sm font-medium mb-1 text-red-400">Math</label>
    <select
      bind:value={selectedMath}
      class="w-full p-2 rounded bg-red-600 text-white border border-red-300"
    >
      <option value="" disabled selected>Select Math Option</option>
      <option value="math-1">Math Option 1</option>
      <option value="math-2">Math Option 2</option>
      <option value="math-3">Math Option 3</option>
      <option value="math-4">Math Option 4</option>
      <option value="math-5">Math Option 5</option>
      <option value="math-6">Math Option 6</option>
      <option value="math-7">Math Option 7</option>
      <option value="math-8">Math Option 8</option>
      <option value="math-9">Math Option 9</option>
      <option value="math-10">Math Option 10</option>
    </select>
  </div>
</div>

<!-- Dual Preview Mode -->
<div class="flex flex-col md:flex-row items-center justify-center gap-6">
  <!-- Portrait Preview -->
  <div
    class="relative bg-gray-800 border-2 border-white rounded-lg w-[200px] h-[300px]"
  >
    <div
      class="absolute bottom-0 w-full p-2 bg-black bg-opacity-60 text-white text-xs text-center"
    >
      <div><span class="font-bold">Portrait</span></div>
      <div>
        <span class="font-bold">Element:</span>
        {selectedElement || "None"}
      </div>
      <div>
        <span class="font-bold">Placement:</span>
        {selectedPlacement || "None"}
      </div>
    </div>
  </div>

  <!-- Landscape Preview -->
  <div
    class="relative bg-gray-800 border-2 border-white rounded-lg w-[300px] h-[200px]"
  >
    <div
      class="absolute bottom-0 w-full p-2 bg-black bg-opacity-60 text-white text-xs text-center"
    >
      <div><span class="font-bold">Landscape</span></div>
      <div>
        <span class="font-bold">Element:</span>
        {selectedElement || "None"}
      </div>
      <div>
        <span class="font-bold">Placement:</span>
        {selectedPlacement || "None"}
      </div>
    </div>
  </div>
</div>

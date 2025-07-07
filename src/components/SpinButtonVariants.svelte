<script>
    export let option = "option-1";
    export let isPortrait = true;

    const styles = {
        "option-1": {
            shape: "square",
            class: "bg-gradient-to-br from-yellow-400 to-red-600 border-yellow-300",
        },
        "option-2": {
            shape: "square",
            class: "bg-gradient-to-br from-green-400 to-emerald-700 border-green-200",
        },
        "option-3": {
            shape: "circle",
            class: "bg-gradient-to-br from-purple-600 to-pink-400 border-pink-200",
        },
        "option-4": {
            shape: "circle",
            class: "bg-gradient-to-br from-blue-600 to-indigo-400 border-indigo-300",
        },
        "option-5": {
            shape: "rect",
            class: "bg-gradient-to-r from-cyan-600 to-blue-400 border-cyan-300",
        },
    };

    const btn = styles[option];

    const mainSize = isPortrait
        ? {
              square: "w-16 h-16 text-sm",
              circle: "w-16 h-16 text-sm",
              rect: "w-28 h-10 text-xs",
          }
        : {
              square: "w-24 h-24 text-lg",
              circle: "w-24 h-24 text-lg",
              rect: "w-44 h-14 text-lg",
          };
</script>

{#if btn}
    <div
        class="flex items-center justify-center gap-2 p-2 max-w-full max-h-full"
    >
        <!-- Minus Button -->
        <button
            class="text-white bg-gray-700 w-10 h-10 rounded-full hover:bg-red-500 shrink-0 text-xl leading-none"
            aria-label="decrease"
        >
            −
        </button>

        <!-- SPIN Button -->
        <div
            class={`flex items-center justify-center font-bold text-white border-4 ${btn.class} ${mainSize[btn.shape]} ${
                btn.shape === "circle"
                    ? "rounded-full"
                    : btn.shape === "rect"
                      ? "rounded-xl"
                      : "rounded-md"
            }`}
        >
            SPIN
        </div>

        <!-- Plus Button -->
        <button
            class="text-white bg-gray-700 w-10 h-10 rounded-full hover:bg-green-500 shrink-0 text-xl leading-none"
            aria-label="increase"
        >
            +
        </button>

        <!-- Auto Button -->
        <button
            class="text-yellow-200 bg-black w-10 h-10 rounded-full hover:bg-yellow-700 shrink-0 text-sm leading-none"
            aria-label="auto"
        >
            ♻
        </button>

        <!-- Bonus Buy Button -->
        <button
            class="text-pink-300 bg-black w-10 h-10 rounded-full hover:bg-pink-700 shrink-0 text-sm leading-none"
            aria-label="bonus"
        >
            ★
        </button>
    </div>
{/if}

<script>
    export let option = "option-1";
    export let isPortrait = true;

    const styles = {
        "option-1": {
            shape: "square",
            arrows: "left-right",
            class: "bg-gradient-to-br from-yellow-400 to-red-600 border-yellow-300",
        },
        "option-2": {
            shape: "square",
            arrows: "up-down",
            class: "bg-gradient-to-br from-green-400 to-emerald-700 border-green-200",
        },
        "option-3": {
            shape: "circle",
            arrows: "left-right",
            class: "bg-gradient-to-br from-purple-600 to-pink-400 border-pink-200",
        },
        "option-4": {
            shape: "circle",
            arrows: "up-down",
            class: "bg-gradient-to-br from-blue-600 to-indigo-400 border-indigo-300",
        },
        "option-5": {
            shape: "rect",
            arrows: "left-right",
            class: "bg-gradient-to-r from-cyan-600 to-blue-400 border-cyan-300",
        },
    };

    const btn = styles[option];

    // Dynamic size logic
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
        class={`flex items-center justify-center gap-2 p-2 max-w-full max-h-full ${
            btn.arrows === "up-down" ? "flex-col" : ""
        }`}
    >
        {#if btn.arrows === "left-right"}
            <button
                class="text-white bg-gray-700 w-8 h-8 rounded-full hover:bg-red-500 shrink-0"
                aria-label="decrease"
            >
                ⬅
            </button>
        {/if}
        {#if btn.arrows === "up-down"}
            <button
                class="text-white bg-gray-700 w-8 h-8 rounded-full hover:bg-red-500 shrink-0"
                aria-label="increase"
            >
                ⬆
            </button>
        {/if}

        <!-- Main SPIN button -->
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

        {#if btn.arrows === "left-right"}
            <button
                class="text-white bg-gray-700 w-8 h-8 rounded-full hover:bg-green-500 shrink-0"
                aria-label="increase"
            >
                ➡
            </button>
        {/if}
        {#if btn.arrows === "up-down"}
            <button
                class="text-white bg-gray-700 w-8 h-8 rounded-full hover:bg-green-500 shrink-0"
                aria-label="decrease"
            >
                ⬇
            </button>
        {/if}
    </div>
{/if}

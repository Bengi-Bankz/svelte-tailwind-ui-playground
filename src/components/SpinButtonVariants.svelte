<script>
    export let option = "option-1";
    export let isPortrait = true;
    export let w = 120;
    export let h = 120;

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

    // Responsive sizing based on component dimensions
    $: buttonSize = Math.max(25, Math.min(50, Math.min(w * 0.15, h * 0.4)));
    $: spinButtonWidth = Math.max(80, w * 0.5);
    $: spinButtonHeight = Math.max(40, h * 0.5);
    $: fontSize = Math.max(12, Math.min(20, h * 0.2));
    $: smallFontSize = Math.max(10, Math.min(16, h * 0.15));
    $: padding = Math.max(2, w * 0.01);
</script>

{#if btn}
    <div
        class="flex items-center justify-center w-full h-full"
        style="gap: {Math.max(4, w * 0.02)}px; padding: {padding}px;"
    >
        <!-- Minus Button -->
        <button
            class="text-white bg-gray-700 rounded-full hover:bg-red-500 shrink-0 leading-none"
            style="width: {buttonSize}px; height: {buttonSize}px; font-size: {fontSize}px;"
            aria-label="decrease"
        >
            −
        </button>

        <!-- SPIN Button -->
        <div
            class={`flex items-center justify-center font-bold text-white border-4 ${btn.class} ${
                btn.shape === "circle"
                    ? "rounded-full"
                    : btn.shape === "rect"
                      ? "rounded-xl"
                      : "rounded-md"
            }`}
            style="width: {spinButtonWidth}px; height: {spinButtonHeight}px; font-size: {fontSize}px;"
        >
            SPIN
        </div>

        <!-- Plus Button -->
        <button
            class="text-white bg-gray-700 rounded-full hover:bg-green-500 shrink-0 leading-none"
            style="width: {buttonSize}px; height: {buttonSize}px; font-size: {fontSize}px;"
            aria-label="increase"
        >
            +
        </button>

        <!-- Auto Button -->
        <button
            class="text-yellow-200 bg-black rounded-full hover:bg-yellow-700 shrink-0 leading-none border-2 border-white"
            style="width: {buttonSize}px; height: {buttonSize}px; font-size: {smallFontSize}px;"
            aria-label="auto"
        >
            ♻
        </button>

        <!-- Bonus Buy Button -->
        <button
            class="text-pink-300 bg-black rounded-full hover:bg-pink-700 shrink-0 leading-none border-2 border-white"
            style="width: {buttonSize}px; height: {buttonSize}px; font-size: {smallFontSize}px;"
            aria-label="bonus"
        >
            ★
        </button>
    </div>
{/if}

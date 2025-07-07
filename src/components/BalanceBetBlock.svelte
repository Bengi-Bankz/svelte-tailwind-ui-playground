<script>
    export let option = "option-1";
    export let isPortrait = true;
    export let value = "";
    export let onInput = () => {};

    import { variantStyles, sizeByShape } from "../lib/shared/variantStyles.js";

    const style = variantStyles[option];
    const sizeClass = sizeByShape(style?.shape, isPortrait);

    const handleMultiplier = (type) => {
        let current = parseFloat(value) || 0;
        if (type === "2x") current *= 2;
        if (type === "half") current /= 2;
        if (type === "max") current = 9999; // You can replace this with actual max logic
        value = current.toFixed(2);
        onInput(value);
    };
</script>

{#if style}
    <div
        class={`flex flex-col items-center justify-center p-2 gap-1 ${style.class} ${sizeClass} rounded-md`}
    >
        <!-- Balance Display -->
        <div class="text-white text-xs md:text-sm font-semibold">
            BALANCE: <span class="font-bold">1234.56</span>
        </div>

        <!-- Bet Input Row -->
        <div class="flex items-center gap-1">
            <input
                type="text"
                bind:value
                on:input={(e) => onInput(e.target.value)}
                class="bg-black text-white text-center rounded px-2 py-1 w-20 md:w-28 text-xs md:text-sm border border-white focus:outline-none"
            />

            <!-- Bet Action Buttons -->
            <div class="flex gap-1">
                <button
                    class="bg-gray-700 hover:bg-blue-600 text-white px-2 py-1 text-xs rounded"
                    on:click={() => handleMultiplier("2x")}>2x</button
                >
                <button
                    class="bg-gray-700 hover:bg-blue-600 text-white px-2 py-1 text-xs rounded"
                    on:click={() => handleMultiplier("half")}>½</button
                >
                <button
                    class="bg-gray-700 hover:bg-blue-600 text-white px-2 py-1 text-xs rounded"
                    on:click={() => handleMultiplier("max")}>Max</button
                >
            </div>
        </div>
    </div>
{/if}

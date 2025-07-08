<script>
    export let option = "option-1";
    export let isPortrait = true;
    export let w = 120;
    export let h = 120;
    export let balance = 0;
    export let bet = "";
    export let disabled = false;

    import { createEventDispatcher } from "svelte";
    import { variantStyles } from "../lib/shared/variantStyles.js";
    const dispatch = createEventDispatcher();

    const style = variantStyles[option];

    function setBet(val) {
        dispatch("betInput", +val);
    }

    function handleMultiplier(type) {
        let current = parseFloat(bet) || 0;
        if (type === "2x") current *= 2;
        if (type === "half") current /= 2;
        if (type === "max") current = Math.max(balance, 0);
        current = Math.max(0, Math.floor(current * 100) / 100);
        setBet(current);
    }
</script>

{#if style}
    <div
        class={`rounded-md overflow-hidden ${style.class}`}
        style="width: {w}px; height: {h}px;"
    >
        <div
            class="flex flex-col h-full w-full text-white"
            style="padding: {Math.max(
                4,
                Math.min(8, w * 0.05),
            )}px; gap: {Math.max(8, h * 0.1)}px;"
        >
            <!-- Balance Display -->
            <div
                class="font-semibold flex-shrink-0"
                style="font-size: {Math.max(12, Math.min(24, h * 0.15))}px;"
            >
                BALANCE: <span
                    class="font-bold"
                    style="font-size: {Math.max(16, Math.min(32, h * 0.2))}px;"
                    >{balance.toFixed(2)}</span
                >
            </div>

            <!-- Bet Row -->
            <div
                class="flex items-center flex-shrink-0"
                style="gap: {Math.max(4, w * 0.02)}px;"
            >
                <input
                    type="number"
                    min="1"
                    step="1"
                    bind:value={bet}
                    on:input={(e) => setBet(e.target.value)}
                    class="flex-1 min-w-0 bg-black text-white text-center rounded border border-white focus:outline-none"
                    style="font-size: {Math.max(
                        8,
                        Math.min(14, h * 0.1),
                    )}px; height: {Math.max(
                        20,
                        h * 0.25,
                    )}px; padding: {Math.max(2, h * 0.02)}px {Math.max(
                        4,
                        w * 0.02,
                    )}px;"
                    {disabled}
                />

                <!-- Buttons -->
                <div class="flex" style="gap: {Math.max(2, w * 0.01)}px;">
                    <button
                        class="bg-gray-700 hover:bg-blue-600 text-white rounded"
                        style="font-size: {Math.max(
                            8,
                            Math.min(12, h * 0.08),
                        )}px; height: {Math.max(
                            20,
                            h * 0.25,
                        )}px; padding: {Math.max(2, w * 0.01)}px {Math.max(
                            4,
                            w * 0.02,
                        )}px;"
                        on:click={() => handleMultiplier("2x")}
                        type="button"
                        {disabled}>2x</button
                    >
                    <button
                        class="bg-gray-700 hover:bg-blue-600 text-white rounded"
                        style="font-size: {Math.max(
                            8,
                            Math.min(12, h * 0.08),
                        )}px; height: {Math.max(
                            20,
                            h * 0.25,
                        )}px; padding: {Math.max(2, w * 0.01)}px {Math.max(
                            4,
                            w * 0.02,
                        )}px;"
                        on:click={() => handleMultiplier("half")}
                        type="button"
                        {disabled}>½</button
                    >
                    <button
                        class="bg-gray-700 hover:bg-blue-600 text-white rounded"
                        style="font-size: {Math.max(
                            8,
                            Math.min(12, h * 0.08),
                        )}px; height: {Math.max(
                            20,
                            h * 0.25,
                        )}px; padding: {Math.max(2, w * 0.01)}px {Math.max(
                            4,
                            w * 0.02,
                        )}px;"
                        on:click={() => handleMultiplier("max")}
                        type="button"
                        {disabled}>Max</button
                    >
                </div>
            </div>
        </div>
    </div>
{/if}

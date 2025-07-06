<script>
    export let option = "option-1";

    const buttons = [
        { type: "square", label: "SPIN", id: "option-1" },
        { type: "square", label: "SPIN", id: "option-2" },
        { type: "circle", label: "SPIN", id: "option-3" },
        { type: "circle", label: "SPIN", id: "option-4" },
        { type: "rect", label: "SPIN", id: "option-5" },
    ];
</script>

{#each buttons as btn (btn.id)}
    {#if btn.id === option}
        {#if btn.type === "square"}
            <div
                class="w-20 h-20 bg-gradient-to-br from-yellow-400 to-red-600 border-4 border-yellow-300 shadow-[0_0_12px_rgba(255,0,0,0.5)] text-white font-bold text-md flex items-center justify-center rounded-md"
            >
                {btn.label}
            </div>
        {:else if btn.type === "circle"}
            <div
                class="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 border-4 border-white shadow-[0_0_12px_rgba(255,255,255,0.3)] text-white font-bold text-md flex items-center justify-center rounded-full"
            >
                {btn.label}
            </div>
        {:else if btn.type === "rect"}
            <div
                class="w-40 h-14 bg-gradient-to-r from-blue-600 to-cyan-400 border-4 border-white shadow-[0_0_12px_rgba(0,255,255,0.4)] text-white font-bold text-lg flex items-center justify-center rounded-xl"
            >
                {btn.label}
            </div>
        {/if}
    {/if}
{/each}

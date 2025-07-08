<script>
    export let option = "option-1";
    export let isPortrait = true;
    export let w = 120;
    export let h = 120;

    const styles = {
        "option-1":
            "border-yellow-400 bg-gradient-to-br from-yellow-100/10 to-red-400/20",
        "option-2":
            "border-green-400 bg-gradient-to-br from-green-100/10 to-emerald-400/20",
        "option-3":
            "border-pink-400 bg-gradient-to-br from-purple-100/10 to-pink-400/20",
        "option-4":
            "border-indigo-400 bg-gradient-to-br from-blue-100/10 to-indigo-400/20",
        "option-5":
            "border-cyan-400 bg-gradient-to-br from-cyan-100/10 to-blue-400/20",
    };

    // Responsive sizing based on component dimensions
    $: fontSize = Math.max(10, Math.min(24, h * 0.1));
    $: borderWidth = Math.max(2, Math.min(6, Math.min(w * 0.01, h * 0.01)));
    $: borderRadius = Math.max(8, Math.min(20, Math.min(w * 0.05, h * 0.05)));

    // --- SLOT LOGIC ---
    const reelCount = 5;
    const gap = 2;
    const totalGap = gap * (reelCount - 1);
    $: reelWidth = (w - totalGap) / reelCount;
</script>

<div
    class={`overflow-hidden ${styles[option]} flex items-center justify-center text-white font-bold border-solid relative`}
    style="width: {w}px; height: {h}px; font-size: {fontSize}px; border-width: {borderWidth}px; border-radius: {borderRadius}px;"
>
    <div class="absolute inset-0 flex" style="gap: {gap}px;">
        {#each Array(reelCount) as _, i}
            <div
                class="reel-bg"
                style="width: {reelWidth}px; height: 100%; background: rgba(255,255,255,0.05); border-radius: 4px;"
            ></div>
        {/each}
    </div>
    <span class="z-10">FRAME</span>
</div>

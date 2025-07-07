<script>
    export let option = "option-1";
    export let isPortrait = true;
    export let w = 120;
    export let h = 120;

    const styles = {
        "option-1": "bg-yellow-500/90 border-yellow-300 text-black",
        "option-2": "bg-emerald-500/90 border-green-300 text-black",
        "option-3": "bg-pink-500/90 border-pink-300 text-white",
        "option-4": "bg-indigo-600/90 border-indigo-300 text-white",
        "option-5": "bg-cyan-500/90 border-cyan-300 text-black",
    };

    // Responsive sizing based on component dimensions
    $: fontSize = Math.max(12, Math.min(28, h * 0.2));
    $: borderWidth = Math.max(2, Math.min(6, Math.min(w * 0.01, h * 0.02)));
    $: borderRadius = Math.max(6, Math.min(16, Math.min(w * 0.04, h * 0.08)));
</script>

<div
    class={`shadow-xl ${styles[option]} flex items-center justify-center font-extrabold border-solid`}
    style="width: {w}px; height: {h}px; font-size: {fontSize}px; border-width: {borderWidth}px; border-radius: {borderRadius}px;"
>
    WIN: $123.45
</div>

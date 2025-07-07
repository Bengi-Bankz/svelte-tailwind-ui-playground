<script>
    export let option = "option-1";
    export let isPortrait = true;

    const styles = {
        "option-1": "bg-yellow-500/90 border-yellow-300 text-black",
        "option-2": "bg-emerald-500/90 border-green-300 text-black",
        "option-3": "bg-pink-500/90 border-pink-300 text-white",
        "option-4": "bg-indigo-600/90 border-indigo-300 text-white",
        "option-5": "bg-cyan-500/90 border-cyan-300 text-black",
    };

    const modalSize = isPortrait
        ? "w-[220px] h-[100px]"
        : "w-[400px] h-[120px]";
</script>

<div
    class={`rounded-lg border-4 shadow-xl ${styles[option]} ${modalSize} flex items-center justify-center font-extrabold text-xl`}
>
    WIN: $123.45
</div>

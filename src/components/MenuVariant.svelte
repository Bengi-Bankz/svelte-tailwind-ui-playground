<script>
    export let option = "option-1";
    export let isPortrait = true;

    const styles = {
        "option-1": "bg-yellow-500 border-yellow-300 text-black",
        "option-2": "bg-emerald-600 border-green-300 text-white",
        "option-3": "bg-pink-500 border-pink-300 text-white",
        "option-4": "bg-indigo-700 border-indigo-300 text-white",
        "option-5": "bg-cyan-500 border-cyan-300 text-black",
    };

    const btnSize = isPortrait ? "w-28 h-10 text-sm" : "w-40 h-14 text-lg";
</script>

<button
    class={`rounded-md border-4 font-bold shadow-md ${styles[option]} ${btnSize}`}
>
    ☰ MENU
</button>

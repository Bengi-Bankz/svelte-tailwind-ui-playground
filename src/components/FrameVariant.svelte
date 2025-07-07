<script>
    export let option = "option-1";
    export let isPortrait = true;

    const styles = {
        "option-1":
            "border-4 border-yellow-400 bg-gradient-to-br from-yellow-100/10 to-red-400/20",
        "option-2":
            "border-4 border-green-400 bg-gradient-to-br from-green-100/10 to-emerald-400/20",
        "option-3":
            "border-4 border-pink-400 bg-gradient-to-br from-purple-100/10 to-pink-400/20",
        "option-4":
            "border-4 border-indigo-400 bg-gradient-to-br from-blue-100/10 to-indigo-400/20",
        "option-5":
            "border-4 border-cyan-400 bg-gradient-to-br from-cyan-100/10 to-blue-400/20",
    };

    const baseSize = isPortrait ? "w-[250px] h-[250px]" : "w-[500px] h-[300px]";
</script>

<div
    class={`rounded-xl overflow-hidden ${styles[option]} ${baseSize} flex items-center justify-center text-white text-xs`}
>
    FRAME
</div>

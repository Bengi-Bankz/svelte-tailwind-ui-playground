<script>
    export let option = "option-1";
    export let isPortrait = true;

    // For dropdown logic
    let open = false;

    // Example dropdown items, can be made dynamic via prop if needed
    export let items = [
        { label: "paytable", value: "paytable" },
        { label: "rtp-math", value: "rtp-math" },
        { label: "info", value: "info" },
        { label: "Settings", value: "settings" },
        { label: "Exit", value: "exit" },
    ];

    function toggleMenu() {
        open = !open;
    }
    function selectItem(item) {
        open = false;
        // You can emit an event here if you want to handle selection in parent
        // dispatch("select", item);
        alert(`You selected: ${item.label}`);
    }

    const styles = {
        "option-1": "bg-yellow-500 border-yellow-300 text-black",
        "option-2": "bg-emerald-600 border-green-300 text-white",
        "option-3": "bg-pink-500 border-pink-300 text-white",
        "option-4": "bg-indigo-700 border-indigo-300 text-white",
        "option-5": "bg-cyan-500 border-cyan-300 text-black",
    };

    const btnSize = isPortrait ? "w-28 h-10 text-sm" : "w-40 h-14 text-lg";
</script>

<div class="relative inline-block">
    <button
        class={`rounded-md border-4 font-bold shadow-md ${styles[option]} ${btnSize}`}
        on:click={toggleMenu}
    >
        ☰ MENU
    </button>
    {#if open}
        <div
            class="menu-dropdown absolute left-0 mt-2 w-32 rounded-md shadow-lg bg-white z-50 border border-gray-300"
        >
            {#each items as item}
                <div
                    class="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-800"
                    on:click={() => selectItem(item)}
                >
                    {item.label}
                </div>
            {/each}
        </div>
    {/if}
</div>

<style>
    .menu-dropdown {
        animation: fadeIn 0.12s;
    }
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(-8px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
</style>

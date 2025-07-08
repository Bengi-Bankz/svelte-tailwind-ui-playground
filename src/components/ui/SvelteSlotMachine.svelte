<script>
    export let config = { desktop: [] };

    // Find desktop elements from config (you may need to adjust this based on your config shape)
    let elements = config.desktop || [];

    // Group into rows for a 5x5 grid (assumes elements are ordered row-wise)
    let grid = [];
    $: {
        grid = [];
        for (let i = 0; i < 5; i++) {
            grid.push(elements.slice(i * 5, i * 5 + 5));
        }
    }

    function spin() {
        // For demo: randomize symbol text/colors
        grid = grid.map((row) =>
            row.map((cell) => ({
                ...cell,
                option: Math.random() > 0.5 ? "option-1" : "option-2",
                randomValue: Math.floor(Math.random() * 100),
            })),
        );
    }
</script>

<div class="machine-wrapper">
    <h2 class="title">PIXl SLOT MACHINE 5x5!</h2>
    <div class="slot-frame">
        <div class="slot-grid">
            {#each grid as row}
                <div class="row">
                    {#each row as cell}
                        <div
                            class="cell"
                            style="background: {cell?.color || '#222'};"
                        >
                            <div class="symbol">{cell?.option || "?"}</div>
                            <div class="value">{cell?.randomValue ?? ""}</div>
                        </div>
                    {/each}
                </div>
            {/each}
        </div>
    </div>
    <button class="spin-btn" on:click={spin}>SPIN!</button>
</div>

<style>
    .machine-wrapper {
        width: 100vw;
        height: 100vh;
        background: #18191b;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .title {
        font-size: 2.2rem;
        font-family: sans-serif;
        font-weight: bold;
        color: #67f8e6;
        margin-bottom: 2rem;
        letter-spacing: 2px;
        text-shadow: 2px 2px 8px #000;
    }
    .slot-frame {
        background: #ff5b5b;
        border: 4px solid #222;
        border-radius: 18px;
        padding: 20px 30px;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 2rem;
    }
    .slot-grid {
        display: flex;
        flex-direction: column;
        gap: 6px;
    }
    .row {
        display: flex;
        gap: 6px;
    }
    .cell {
        width: 65px;
        height: 65px;
        background: #222;
        border-radius: 5px;
        border: 2px solid #fff;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        color: #fff;
        font-size: 1.3rem;
        box-shadow: 1px 1px 6px #0008;
    }
    .spin-btn {
        margin-top: 10px;
        padding: 15px 50px;
        font-size: 1.4rem;
        font-weight: bold;
        color: #fff;
        background: #00c900;
        border: none;
        border-radius: 6px;
        box-shadow: 0 2px 10px #0005;
        transition: background 0.2s;
        cursor: pointer;
    }
    .spin-btn:hover {
        background: #00a700;
    }
</style>

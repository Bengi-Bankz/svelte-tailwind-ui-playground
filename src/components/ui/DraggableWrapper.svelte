<script>
    export let x = 100;
    export let y = 100;
    export let w = 120;
    export let h = 120;
    export let id;
    export let onClick = () => {};

    let isDragging = false;
    let isResizing = false;
    let offset = { x: 0, y: 0 };

    function onMouseDown(e) {
        isDragging = true;
        offset = {
            x: e.clientX - x,
            y: e.clientY - y,
        };
    }

    function onMouseMove(e) {
        if (isDragging) {
            x = e.clientX - offset.x;
            y = e.clientY - offset.y;
        }
        if (isResizing) {
            w = Math.max(40, e.clientX - x);
            h = Math.max(40, e.clientY - y);
        }
    }

    function onMouseUp() {
        isDragging = false;
        isResizing = false;
    }

    function startResize(e) {
        isResizing = true;
        e.stopPropagation();
    }

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
</script>

<div
    class="absolute border border-white rounded overflow-hidden"
    style="left: {x}px; top: {y}px; width: {w}px; height: {h}px;"
    on:mousedown={onMouseDown}
    on:click={() => onClick(id)}
>
    <slot />

    <div
        class="absolute right-0 bottom-0 w-3 h-3 bg-white cursor-nwse-resize"
        on:mousedown={startResize}
    />
</div>

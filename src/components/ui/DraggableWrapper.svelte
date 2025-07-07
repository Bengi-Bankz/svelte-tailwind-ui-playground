<script>
    import { onDestroy } from "svelte";

    export let x = 100;
    export let y = 100;
    export let w = 120;
    export let h = 120;
    export let id;
    export let onClick = () => {};
    export let onUpdate = () => {};
    export let minWidth = 40;
    export let minHeight = 40;
    export let containerWidth = 800;
    export let containerHeight = 600;

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
            const newX = e.clientX - offset.x;
            const newY = e.clientY - offset.y;

            // Constrain within container bounds
            x = Math.max(0, Math.min(containerWidth - w, newX));
            y = Math.max(0, Math.min(containerHeight - h, newY));
        }
        if (isResizing) {
            const newWidth = Math.max(minWidth, e.clientX - x);
            const newHeight = Math.max(minHeight, e.clientY - y);

            // Constrain size within container bounds
            w = Math.min(containerWidth - x, newWidth);
            h = Math.min(containerHeight - y, newHeight);
        }
    }

    function onMouseUp() {
        if (isDragging || isResizing) {
            // Update the parent when dragging or resizing ends
            onUpdate({ x, y, w, h });
        }
        isDragging = false;
        isResizing = false;
    }

    function startResize(e) {
        isResizing = true;
        e.stopPropagation();
    }

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    // Cleanup event listeners
    onDestroy(() => {
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseup", onMouseUp);
    });
</script>

<div
    class="absolute border border-white rounded overflow-hidden"
    style="left: {x}px; top: {y}px; width: {w}px; height: {h}px;"
    on:mousedown={onMouseDown}
    on:click={() => onClick(id)}
    on:keydown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
            onClick(id);
        }
    }}
    role="button"
    tabindex="0"
>
    <slot />

    <div
        class="absolute right-0 bottom-0 w-3 h-3 bg-white cursor-nwse-resize"
        on:mousedown={startResize}
        role="button"
        tabindex="0"
        aria-label="Resize element"
    />
</div>

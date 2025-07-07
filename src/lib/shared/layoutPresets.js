export const layoutPresets = {
    preset1: {
        name: "Default Bottom Layout",
        portrait: {
            spinButton: { position: "bottom-middle", variant: "option-1" },
            balanceBetBlock: { position: "bottom-left", variant: "option-1" },
            frame: { position: "middle-middle", variant: "option-1" },
            menu: { position: "bottom-right", variant: "option-1" },
            winModal: { position: "middle-middle", variant: "option-1" },
        },
        landscape: {
            spinButton: { position: "bottom-middle", variant: "option-1" },
            balanceBetBlock: { position: "bottom-left", variant: "option-1" },
            frame: { position: "middle-middle", variant: "option-1" },
            menu: { position: "bottom-right", variant: "option-1" },
            winModal: { position: "middle-middle", variant: "option-1" },
        },
    },

    preset2: {
        name: "Right Side Layout",
        portrait: {
            spinButton: { position: "bottom-middle", variant: "option-2" },
            balanceBetBlock: { position: "bottom-left", variant: "option-2" },
            frame: { position: "top-middle", variant: "option-2" },
            menu: { position: "middle-right", variant: "option-2" },
            winModal: { position: "top-middle", variant: "option-2" },
        },
        landscape: {
            spinButton: { position: "middle-right", variant: "option-2" },
            balanceBetBlock: { position: "bottom-right", variant: "option-2" },
            frame: { position: "middle-middle", variant: "option-2" },
            menu: { position: "bottom-middle", variant: "option-2" },
            winModal: { position: "middle-middle", variant: "option-2" },
        },
    },

    preset3: {
        name: "Top Stack Layout",
        portrait: {
            spinButton: { position: "middle-middle", variant: "option-3" },
            balanceBetBlock: { position: "top-middle", variant: "option-3" },
            frame: { position: "middle-middle", variant: "option-3" },
            menu: { position: "top-left", variant: "option-3" },
            winModal: { position: "middle-middle", variant: "option-3" },
        },
        landscape: {
            spinButton: { position: "top-middle", variant: "option-3" },
            balanceBetBlock: { position: "top-right", variant: "option-3" },
            frame: { position: "middle-middle", variant: "option-3" },
            menu: { position: "bottom-left", variant: "option-3" },
            winModal: { position: "middle-middle", variant: "option-3" },
        },
    },
};

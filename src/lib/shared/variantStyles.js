export const variantStyles = {
    "option-1": {
        shape: "square",
        class: "bg-gradient-to-br from-yellow-400 to-red-600 border-yellow-300 text-white",
    },
    "option-2": {
        shape: "square",
        class: "bg-gradient-to-br from-green-400 to-emerald-700 border-green-200 text-white",
    },
    "option-3": {
        shape: "circle",
        class: "bg-gradient-to-br from-purple-600 to-pink-400 border-pink-200 text-white",
    },
    "option-4": {
        shape: "circle",
        class: "bg-gradient-to-br from-blue-600 to-indigo-400 border-indigo-300 text-white",
    },
    "option-5": {
        shape: "rect",
        class: "bg-gradient-to-r from-cyan-600 to-blue-400 border-cyan-300 text-white",
    },
};

// Instead of setting width/height, return just sizing logic like font size
export function sizeByShape(shape, isPortrait) {
    const sizes = isPortrait
        ? {
            square: "text-sm",
            circle: "text-sm",
            rect: "text-xs",
        }
        : {
            square: "text-lg",
            circle: "text-lg",
            rect: "text-lg",
        };

    return sizes[shape] || "text-base";
}

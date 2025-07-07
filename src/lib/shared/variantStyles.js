// src/lib/shared/variantStyles.js

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

export function sizeByShape(shape, isPortrait) {
    const sizes = isPortrait
        ? {
            square: "w-16 h-16 text-sm",
            circle: "w-16 h-16 text-sm",
            rect: "w-28 h-10 text-xs",
        }
        : {
            square: "w-24 h-24 text-lg",
            circle: "w-24 h-24 text-lg",
            rect: "w-44 h-14 text-lg",
        };

    return sizes[shape] || "w-20 h-20";
}

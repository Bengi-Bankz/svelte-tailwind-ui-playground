import { writable } from 'svelte/store';

export const placedElements = writable({
    mobile: [],
    desktop: []
});

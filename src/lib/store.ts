import { writable } from 'svelte/store';
import type { StoreInterface } from './interfaces';

export const appStore = writable<StoreInterface>({ links: [] });

import { type Writable, writable, get } from "svelte/store";

/**
 * Creates a Svelte store that is automatically backed by and synchronized with wxt/storage.
 *
 * @param key The key to use in storage. It must be prefixed with `local:`, `sync:`, etc.
 * @param initialValue The initial value to use if no value is found in storage.
 * @returns A Writable Svelte store and a readable store for initialization status.
 */
export function persistent<T>(
  key: `local:${string}` | `sync:${string}` | `session:${string}` | `managed:${string}`,
  initialValue: T
): { store: Writable<T>; isInitialized: Writable<boolean> } {
  const isInitialized = writable(false);
  const store = writable(initialValue, () => {
    // This runs when the first subscriber subscribes.
    (async () => {
      const value = await storage.getItem<T>(key);
      store.set(value ?? initialValue);
      isInitialized.set(true);
    })();
  });

  // Update storage whenever the Svelte store changes, but only after initialization
  store.subscribe((value) => {
    if (get(isInitialized)) {
      storage.setItem(key, value);
    }
  });
  
  // Watch for changes from other extension contexts
  storage.watch(key, (newValue: T | null) => {
    store.set(newValue ?? initialValue);
  });


  return { store, isInitialized };
} 
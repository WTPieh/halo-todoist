import { type Writable, writable } from "svelte/store";

/**
 * Creates a Svelte store that is automatically backed by and synchronized with wxt/storage.
 *
 * @param key The key to use in storage. It must be prefixed with `local:`, `sync:`, etc.
 * @param initialValue The initial value to use if no value is found in storage.
 * @returns A Writable Svelte store.
 */
export function persistent<T>(
  key: `local:${string}` | `sync:${string}` | `session:${string}` | `managed:${string}`,
  initialValue: T
): Writable<T> {
  const store: Writable<T> = writable(initialValue);

  // Load the initial value from storage
  (async () => {
    const value = await storage.getItem<T>(key);
    store.set(value ?? initialValue);
  })();

  // Watch for changes in storage from other parts of the extension
  storage.watch(key, (newValue: T | null) => {
    store.set(newValue ?? initialValue);
  });

  // Update storage whenever the Svelte store changes
  store.subscribe((value) => {
    storage.setItem(key, value);
  });

  return store;
} 
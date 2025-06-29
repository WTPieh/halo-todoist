export default defineContentScript({
  matches: ['*://*.gcu.edu/*'],
  runAt: 'document_end',
  main() {
    browser.runtime.sendMessage("HALO_LOADED");
  },
});
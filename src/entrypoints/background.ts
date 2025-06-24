export default defineBackground(() => {
  console.log('Hello background!', { id: browser.runtime.id });
  const clientId = import.meta.env.VITE_TODOIST_CLIENT_ID;
  browser.runtime.onMessage.addListener((message, sender, send) => {
    if (message.type === 'force-prompt') {
      const cookies = ['tduser', 'tdoistd', 'device_id'];
      cookies.forEach(cookie => {
        browser.cookies.remove({
          url: 'https://app.todoist.com',
          name: cookie,
        }, (response) => {
          console.log(`response, removed cookie: ${cookie}`, response);
        });
      });
      send({
        response: true,
      });
    }
  });
});

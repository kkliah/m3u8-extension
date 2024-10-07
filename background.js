chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    if (details.url.includes('.m3u8')) {
      chrome.storage.local.get(['m3u8Urls'], (result) => {
        const urls = result.m3u8Urls || [];
        if (!urls.includes(details.url)) {
          urls.push(details.url);
          chrome.storage.local.set({ m3u8Urls: urls });
        }
      });
    }
  },
  { urls: ["<all_urls>"] }
);
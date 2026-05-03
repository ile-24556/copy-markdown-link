function extractCanonicalURL(): string | null {
  const element = document.querySelector("link[rel='canonical']");
  if (!(element instanceof HTMLLinkElement)) {
    return null;
  }
  return element.href;
}

browser.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.action === "extractCanonicalURL") {
    sendResponse({ url: extractCanonicalURL() });
  }
});

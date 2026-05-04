function extractCanonicalURL(): string | null {
  const element = document.querySelector("link[rel='canonical']");
  if (!(element instanceof HTMLLinkElement)) {
    return null;
  }
  return element.href;
}

browser.runtime.onMessage.addListener((message: MessageReq, _sender, sendResponse) => {
  if (message.action === "extractCanonicalURL") {
    const response: MessageRes = { url: extractCanonicalURL() };
    sendResponse(response);
  }
});

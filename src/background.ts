browser.pageAction.onClicked.addListener(async (tab: browser.tabs.Tab) => {
  if (tab.id == null) {
    console.error("Tab ID is not available.");
    return;
  }
  if (tab.title == null) {
    console.error("Tab title is not available.");
    return;
  }
  if (tab.url == null) {
    console.error("Tab URL is not available.");
    return;
  }

  await browser.scripting.executeScript({
    files: ["dist/content.js"],
    target: { tabId: tab.id },
  });
  const message: MessageReq = { action: "extractCanonicalURL" };
  const response: MessageRes = await browser.tabs.sendMessage(tab.id, message);

  const link = `[${tab.title}](${decideURL(response.url, tab.url)})`;
  await navigator.clipboard.writeText(link);
  console.log("Link has been copied:", link);
});

function decideURL(canonicalURLString: string | null, tabURLString: string): string {
  const tabURL = new URL(tabURLString);
  if (canonicalURLString == null) {
    tabURL.search = "";
    return tabURL.href;
  }

  const canonicalURL = new URL(canonicalURLString);
  if (canonicalURL.hash !== "") {
    return canonicalURL.href;
  }
  canonicalURL.hash = tabURL.hash;
  return canonicalURL.href;
}

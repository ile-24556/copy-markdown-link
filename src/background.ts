browser.pageAction.onClicked.addListener(async (tab: browser.tabs.Tab) => {
  if (tab.id == null) {
    console.error("Tab ID is not available.");
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
  const response = await browser.tabs.sendMessage(tab.id, { action: "extractCanonicalURL" });
  const link = `[${tab.title}](${response.url || tab.url})`;
  await navigator.clipboard.writeText(link);
  console.log("Link has been copied:", link);
});

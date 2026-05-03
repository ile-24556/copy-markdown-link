browser.pageAction.onClicked.addListener(async (tab: browser.tabs.Tab) => {
  const response = await browser.tabs.sendMessage(tab.id!, { action: "extractCanonicalURL" });
  const link = `[${tab.title}](${response.url || tab.url})`;
  await navigator.clipboard.writeText(link);
  console.log("Link has been copied:", link);
});

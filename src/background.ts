browser.pageAction.onClicked.addListener(async (tab: browser.tabs.Tab) => {
  const link = `[${tab.title}](${tab.url})`;
  await navigator.clipboard.writeText(link);
  console.log("Link has been copied:", link);
});

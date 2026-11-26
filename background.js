const READER_URL = chrome.runtime.getURL("reader.html");

async function openReader() {
  const tabs = await chrome.tabs.query({ url: READER_URL });
  if (tabs.length > 0 && tabs[0].id) {
    await chrome.tabs.update(tabs[0].id, { active: true });
    if (tabs[0].windowId) {
      await chrome.windows.update(tabs[0].windowId, { focused: true });
    }
    return;
  }

  await chrome.tabs.create({ url: READER_URL });
}

chrome.action.onClicked.addListener(openReader);
chrome.commands.onCommand.addListener((command) => {
  if (command === "open-reader") openReader();
});

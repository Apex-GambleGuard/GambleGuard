chrome.runtime.onInstalled.addListener(() => {
    console.log("✅ GambleGuard installed");
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {

    if (changeInfo.status !== "complete") {
        return;
    }

    if (!tab.url) {
        return;
    }

    console.log("🌍 Besuchte Webseite:", tab.url);

});
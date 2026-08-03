let blockedDomains = [];

async function loadRules() {
    const response = await fetch(chrome.runtime.getURL("src/rules.json"));
    const data = await response.json();
    blockedDomains = data.blockedDomains;
    console.log("📋 Regeln geladen:", blockedDomains);
}

chrome.runtime.onInstalled.addListener(async () => {
    await loadRules();
    console.log("✅ GambleGuard installiert");
});

chrome.runtime.onStartup.addListener(async () => {
    await loadRules();
});

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {

    if (changeInfo.status !== "complete") return;
    if (!tab.url) return;

    const url = new URL(tab.url);
    const hostname = url.hostname.replace("www.", "");

    console.log("🌍", hostname);

    if (blockedDomains.includes(hostname)) {
        console.log("🚫 Blockiert:", hostname);

        chrome.tabs.update(tabId, {
            url: chrome.runtime.getURL("src/block.html")
        });
    }

});blockedDomains = [
 "bet365.com",
 "tipico.de",
 "stake.com"
]
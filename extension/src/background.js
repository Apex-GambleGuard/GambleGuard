let blockedDomains = [];

const ruleFiles = [
    "src/data/blocked-domains.json",
    "src/data/casinos.json",
    "src/data/sportsbooks.json",
    "src/data/crypto-casinos.json",
    "src/data/poker.json",
    "src/data/bingo.json",
    "src/data/lottery.json",
    "src/data/esports.json",
    "src/data/mirrors.json",
    "src/data/skin-gambling.json"
];

async function loadRules() {
    // Das bauen wir als Nächstes um
}

async function loadRules() {
    const response = await fetch(chrome.runtime.getURL("src/data/blocked-domains.json"));
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
    
    if (blockedDomains.length === 0) {
    await loadRules();
}

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

});
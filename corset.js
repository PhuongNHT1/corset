
// Copyright 2013 Sleepless Inc. All Rights Reserved

settings = lsGet("corset_settings");

function init() {
	log("init");

	host = settings.host || "";

    chrome.browserAction.setBadgeText({ text:host });

    //show options page on icon click
	function showOptions() {
		chrome.tabs.create({ url:chrome.extension.getURL('/options.html') });
	}
    chrome.browserAction.onClicked.removeListener(showOptions);
    chrome.browserAction.onClicked.addListener(showOptions);

	function onHeadersReceivedHandler(info) {
		var headers = info.responseHeaders;
		headers.push("Access-Control-Allow-Origin", "*");
		return { responseHeaders:headers };
	}

	// remove listener
    if (chrome.webRequest.onHeadersReceived.hasListener(onHeadersReceivedHandler)) {
        chrome.webRequest.onHeadersReceived.removeListener(onHeadersReceivedHandler)
    }
	if(host) {
		// re-add listener
		var url = "http://" + url + "/*";
		chrome.webRequest.onHeadersReceived.addListener(
			onHeadersReceivedHandler, { urls:[url] }, ["blocking", "responseHeaders"]
		);
	}

}

// listen for updates from options page
chrome.extension.onRequest.addListener(function (request, sender, sendResponse) {
	log("Rcvf from options page: "+request.json());
	settings.host = request.host;
	lsSet("corset_settings", settings);
    init();
    sendResponse("Saved host: "+host);
});


init();

log("Ready");


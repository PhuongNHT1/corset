
// Copyright 2013 Sleepless Inc. All Rights Reserved

host = elem("host");
msg = elem("msg");

settings = lsGet("corset_settings");
host.value = settings.host || "";

host.onchange = function() {
	var h = host.value.trim();
	try {
		chrome.extension.sendRequest({host: h}, function(response){
			msg.innerHTML = response;
			setTimeout(function() {msg.innerHTML = "";}, 3000);
		});
	} catch (e) {
	}
}


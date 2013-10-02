
// Copyright 2013 Sleepless Inc. All Rights Reserved

Object.prototype.json = function() { return JSON.stringify(this) }
String.prototype.obj = function() { try { return JSON.parse(this) } catch(e) { } return null }

lsSet = function(key, obj) {
	var json = (obj || "{}").json();
	console.log("lsSet: "+json);
	localStorage[key] = json;
}

lsGet = function(key) {
	var json = localStorage[key] || "{}";
	console.log("lsGet: "+json);
	return json.obj();
}

elem = function(id) { return document.getElementById(id); }

log = function(s) { console.log("Corset: "+s); }


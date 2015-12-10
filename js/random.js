/*jshint browser: true*/

function random() {
	var randNo = Math.floor(Math.random() * window.$scope.events.length);
	window.$scope.obscure();
	window.$scope.displayInfoPanel(window.$scope.events, randNo);
}
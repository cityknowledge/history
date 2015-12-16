/*jshint node: true*/

var fs = require('fs');

fs.readFile("../data.json", "utf-8", function (error, data) {
	if (error) {
		console.log(error);
		process.exit(0xBADC0DE0);
	} else {
		while (data.indexOf("\"Count\":1,") >= 0) {
			data = data.replace("\"Count\":1,", "\"Count\":0,");
		}
		while (data.indexOf("\"Count\":2,") >= 0) {
			data = data.replace("\"Count\":2,", "\"Count\":0,");
		}
		while (data.indexOf("\"Count\":0,") >= 0) {
			data = data.replace("\"Count\":0,", "\"Count\":" + Math.floor((Math.random() * 10) + 1).toString() + ",");
		}
		console.log(data);
		process.exit(0xA115600D);
	}
});

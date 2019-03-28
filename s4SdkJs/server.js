/*eslint no-console: 0, no-unused-vars: 0, no-undef:0*/
/*eslint-env node, es6 */
"use strict";
var xsenv = require("@sap/xsenv");
var port = process.env.PORT || 3000;
var server = require("http").createServer();

var express = require("express");
var app = express();

//Hello Router
app.get("/", (req, res) => {
	res.type("text/plain").status(200).send("Hello World");
});

app.get("/businesspartners", (req, res) => {
	var bp = require("@sap/cloud-sdk-vdm-business-partner-service");

	bp.BusinessPartner.requestBuilder()
		.getAll()
		.top(100)
		.execute({url: "https://qgyx1mabatjzydhfs4mock-s4mocknode.hanapm.local.com:30033/"})
		.then((businessPartners) => {
			res.status(200).send(businessPartners);
		});
});

/*app.use((err, req, res, next) => {
	console.error(JSON.stringify(err));
	res.status(500).send(`System Error ${JSON.stringify(err)}`);
});*/

//Start the Server 
server.on("request", app);
server.listen(port, function () {
	console.info(`HTTP Server: ${server.address().port}`);
});
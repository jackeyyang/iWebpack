const headerScss = require("./header.scss");
const tpl = require("./header.html");

function header(){
	return {
		name: "header",
		tpl: tpl
	}
}

module.exports = header;
// const headerScss = require("./header.scss");
// const tpl = require("./header.html");
import headerScss from "./header.scss";
import tpl from "./header.html";

function header(){
	return {
		name: "header",
		tpl: tpl
	}
}

export default header;
// module.exports = header;
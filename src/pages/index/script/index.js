const headerTpl = require("../../../layers/header/header.js");

var core = {
    init: function(){
        $('#parent').click(function(){
            alert(11);
        });
        $('#child').click(function(e){
            e.stopPropagation();
            alert(222);
        });
        var headerLayer = headerTpl();
        $("#header").html(headerLayer.tpl);
    },
}
core.init();
module.exports = core;
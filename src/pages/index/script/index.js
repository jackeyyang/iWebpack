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

        $.ajax({
            url: '/jeecg/fMessageController.do?fMessageIndexDatagrid&pageSize=10&offset=0&order=desc&rows=10&page=1&field=id%2CcreateName%2CcreateDate%2Ctitle%2Copt%2CredirectUrl%2CindexSkip%2CreadStatus&_=1560756674739',
            //url: '/api/xxx',
            dataType: 'json',
            data:{},
            success: function (data) {
                console.log(data,'success')
            },
            error: function (error) {
                console.log(error,'error')
            }
        })
    },
}
core.init();
module.exports = core;
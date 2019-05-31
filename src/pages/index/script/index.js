var core = {
    init: function(){
        $('#parent').click(function(){
            alert(11);
        });
        $('#child').click(function(e){
            e.stopPropagation();
            alert(222);
        });
    },
}
core.init();
module.exports = core;

document.addEventListener('DOMComponentsLoaded', function(){
    var toButton = $(".btn_to");
    var deck = document.querySelector("x-deck");

    toButton.click(function(){
        var num = $(this).data("to");
        var behavior = $(this).data("bh");
        deck.shuffleTo(num);
        if(behavior == "new" && num == 2){
            $(".title").html("新建账目");
            $("#button_left")
                .removeClass("button")
                .addClass("button-prev")
                .html("Home")
                .data("to",1)
                .data("bh","tohome")
                .show();
            $("#button_right").hide();
        }else if(behavior = "tohome" && num == 1){
            $(".title").html("2013年度");
            $("#button_left")
                .removeClass("button-prev")
                .addClass("button")
                .html('<i class="icon-list-ul"></i>')
                .data("to",0)
                .data("bh","list")
                .hide();
            $("#button_right").show();
        }else if(behavior = "edit" && num == 2){
            var t = $(this).find("h4").html();
            var p = $(this).find(".price").html();
            $(".title").html("编辑");
            $("#button_left")
                .removeClass("button")
                .addClass("button-prev")
                .html("Home")
                .data("to",1)
                .data("bh","tohome")
                .show();
            $("#button_right").hide();
            $("#input_month").val(t);
            $("#input_count").val(p);
        }

    });

});

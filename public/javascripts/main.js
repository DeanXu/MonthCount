document.addEventListener('DOMComponentsLoaded', function(){
    var toButton = $(".btn_to");
    var deck = document.querySelector("x-deck");
    var _id = parseInt(localStorage._id) || 0;
    toButton.live("click",function(){
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
            $("#save").data("type","new");
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
            $("#input_month, #input_count").val("");
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
            $("#save").data("type","edit");
            $("#save").data("id",$(this).parent().data("id"));
        }
    });
    $("#save").click(function(){
      var month = $("#input_month").val();
      var count = $("#input_count").val();
      var type = $("#save").data("type");
      if(month == "" || count == ""){
        alert("请将信息填写完整！");
        return ;
      }
      $("#input_month, #input_count").val("");
      if(type == "new"){
        _id = _id+1;
        $(".list").append(temp(_id, month, count));
        localStorage._id = _id;
        save({
          id : _id,
          month : month,
          count : count
        });
      }else if(type == "edit"){
        var id = $("#save").data("id");
        $(".list").find("li[data-id="+id+"]").find("h4").html(month);
        $(".list").find("li[data-id="+id+"]").find(".price").html(count);
        save({
          id : id,
          month : month,
          count : count
        });
      }else{
        return ;
      }
      $("#button_left").click();
    });

    function save(data){
      if(localStorage.data){
        var id = data.id;
        var d = localStorage.data;
        var j = JSON.parse(d);
        j[id] = data;

        localStorage.data = JSON.stringify(j);
      }else{
        var j  = {};
        j[data.id] = data;
        localStorage.data = JSON.stringify(j);
      }
    }

    function clear(){
      localStorage.clear();
    }
    
    function init(){
      if(localStorage.data){
        var d = JSON.parse(localStorage.data);
        var html = "";
        $.each(d,function(k,v){
          html += temp(k, v.month, v.count);
        });
        $(".list").append(html);
      }
    }

    function temp(_id,month,count){
        var temp = '<li data-id="'+_id+'">\
                    <a href="#" class="btn_to" data-to="2" data-bh="edit">\
                      <h4>'+month+'</h4>\
                      总: &yen;<span class="price">'+count+'</span>\
                      <span class="chevron"></span>\
                    </a>\
                  </li>';
        return temp;
    }
    init();
});

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
            var t = $(this).find("h4").find("span").html();
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
      if(type == "new"){
        _id = _id+1;
        localStorage._id = _id;
        save({
          id : _id,
          month : month,
          count : count
        },"new");
      }else if(type == "edit"){
        var id = $("#save").data("id");
        var nOre = "edit";
        var e_month = $(".list").find("li[data-id="+id+"]").find("h4").find("span").html();

        if(month != e_month)
          nOre = "new";

        save({
          id : id,
          month : month,
          count : count
        },nOre);
      }else{
        return ;
      }
    });

    function save(data,stat){
      var stop = false;
      if(localStorage.data){
        var d = localStorage.data;
        var j = JSON.parse(d);

        $.each(j,function(k,v){
          if(v.month == data.month && stat == "new")
            stop = true;
        });
      }else{
        var j  = {};
      }

      if(stop){
        alert("该月份的金额已经存在");
        return ;
      }

      j[data.id] = data;
      localStorage.data = JSON.stringify(j);
      init();
      $("#button_left").click();
      $("#input_month, #input_count").val("");
    }

    function clear(){
      localStorage.clear();
    }
    
    function init(){
      $(".list").html("");
      if(localStorage.data){
        var d = JSON.parse(localStorage.data);
        var html = "";
        var new_d = [];
        $.each(d, function(k,v){
          new_d[v.month] = v;
        });
        $.each(new_d,function(k,v){
          if(v)
            html += temp(v.id, v.month, v.count);
        });
        $(".list").append(html);
      }
    }

    function temp(_id,month,count){
        var temp = '<li data-id="'+_id+'">\
                    <a href="#" class="btn_to" data-to="2" data-bh="edit">\
                      <h4><span>'+month+'</span>月份</h4>\
                      总: &yen;<span class="price">'+count+'</span>\
                      <span class="chevron"></span>\
                    </a>\
                  </li>';
        return temp;
    }
    init();

    //document.addEventListener('touchmove', function(e) { e.preventDefault(); }, true);

});

/**
 * Created by Charle on 2019-08-16.
 */
var map;
var template;
(function() {
    $('body').on('click', '.portlet > .portlet-title > .tools > .collapse, .portlet .portlet-title > .tools > .expand', function(e) {
        e.preventDefault();
        var el = $(this).closest(".portlet").children(".portlet-body");
        if ($(this).hasClass("collapse")) {
            $(this).removeClass("collapse").addClass("expand");
            el.slideUp(200);
        } else {
            $(this).removeClass("expand").addClass("collapse");
            el.slideDown(200);
        }
    });

    $('body').on('click', '.portlet > .portlet-title > .tools > a.remove', function(e) {
        e.preventDefault();
        var rightPanel = $("#rightPanel");
        rightPanel.css("display","none");
    });


    var mapConfig={
        saveUrl:ctx+"gis/mapInfo/save",
        readMapUrl:ctx+"gis/mapInfo/readMap",
        readUrl:ctx+"gis/mapInfo/read",
        hasLayerControl:true
    };

    map=leaflet.Factory.init(mapConfig);
    template=new leaflet.mapTemplate();
    template.init(map,{});

    $.fn.loadMap=function(data){
        map.readMap(data);
    };

    $.fn.load=function(){
        map.read();
    };

    $.fn.switchLayer = function (mapId) {
        map.LAYERS.switchLayer(mapId,map.getMap());
    }

})(jQuery);

/**
 * Created by Charle on 2019-10-17.
 */
var websocketListener = websocketListener || {};
(function () {
    var _wbSocket;
    websocketListener.initWebSocket = function (config) {
        var ws = new wsHelper.ws();
        ws.init({
            url: config.webSocketUrl,
            onmessage: function (evt) {
                if (evt.data && evt.data != "HeartBeat") {
                    var jsonStr = JSON.parse(evt.data);
                    if (jsonStr.opt == "map") {
                        var allDeleteIds = [];
                        var deleteIds = jsonStr.delete;
                        var addAndUpdate = jsonStr.addAndUpdate;

                        if (deleteIds) {
                            allDeleteIds = allDeleteIds.concat(deleteIds);
                        }

                        var radarData;
                        var zoneId;
                        if (addAndUpdate) {
                            for (var k in addAndUpdate) {
                                allDeleteIds.push(addAndUpdate[k].id);
                                if(addAndUpdate[k].deviceCode=="ER"){
                                    radarData = addAndUpdate[k];
                                }
                            }
                        }

                        //修改探测区位置
                        if(radarData){
                            zoneId = radarData.zoneId;
                            var productMarker = template.getShapeMarkerByKey(zoneId);
                            if(productMarker){
                                var newLatlng = L.latLng(radarData.location.split(" ")[0], radarData.location.split(" ")[1]);
                                productMarker.setLatLng(newLatlng)
                            }
                        }

                        template.removeMarkersByArr(allDeleteIds);

                        if (addAndUpdate) {
                            var makers = template.dataFormat(addAndUpdate, template.getCenter());
                            map.loadData(makers);
                        }
                    } else if (jsonStr.opt == "detection") {
                        $.fn.load();
                    } else if (jsonStr.opt == "deploy") {
                        var zone = jsonStr.detectionZone;
                        if (zone) {
                            var status = zone.status;
                            var deviceId = jsonStr.deviceId;
                            var zoneId = zone.id;
                            var detectionZoneStatus = jsonStr.detectionZoneStatus;

                            var productMarker = template.getShapeMarkerByKey(zoneId);

                            //修改探测区对应的产品图标
                            if(productMarker){
                                productMarker.setIcon(map.ICONS.make("originIcon", {
                                    iconUrl:"/template/detection/img/device_online_small.png"}));
                                if(status=="0"){
                                    productMarker.setIcon(map.ICONS.make("originIcon", {
                                        iconUrl:"/template/detection/img/device_offline_small.png"}));
                                }
                                if(detectionZoneStatus=="2"){
                                    productMarker.setIcon(map.ICONS.make("originIcon", {
                                        iconUrl:"/template/detection/img/device_error_small.png"}));
                                }
                            }

                            map.LAYERS.eachMarker(function (marker, layer) {
                                var obj = marker.options.info;
                                var radarObj;
                                if (obj instanceof leaflet.Shape && obj.getKey() == deviceId) {
                                    radarObj = marker;
                                }

                                if(radarObj){
                                    radarObj.setStyle({
                                        fillColor: status == "1" ? "#98aa29" : "#aaaaaa"
                                    });

                                    var areas = radarObj.options.info.getContainAreas(map);
                                    for (var m in areas) {
                                        var color = "";
                                        if (status == "1") {

                                            if (areas[m].options.info.getDetectionType() == "filter") {
                                                color = "#33ff00";
                                            } else {
                                                color = "#bb6d44";
                                            }
                                        } else {
                                            color = "#aaaaaa";
                                        }

                                        areas[m].setStyle({
                                            color: color,
                                            fill: false
                                        });
                                    }
                                }
                            })
                        }
                    }else if(jsonStr.opt = "refreshMap"){
                        if(opt=="product"){
                            var from = $("#from").attr("value");
                            var type = $("#type").attr("value");
                            var productId = $("#productId").attr("value");
                            $.fn.loadProductMap({from:from,type:type,productId:productId});
                            $.fn.loadProduct();
                        }else{
                            $.fn.loadMain({from:"main"});
                            $.fn.load();
                        }
                    }

                    console.info(evt.data);
                }
            },
            onerror: function () {

            },
            onclose: function () {

            }
        });

        _wbSocket = ws.getWsObj();

        if (!_wbSocket) {
            setTimeout(function () {
                _wbSocket = ws.getWsObj();
            }, 1000)
        }
    }
})();
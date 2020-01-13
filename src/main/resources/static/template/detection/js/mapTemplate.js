/**
 * Created by Charle on 2019-08-26.
 */
var leaflet=leaflet||{};
(function () {
    leaflet.mapTemplate = function () {
        var _self=this;
        var _map;
        var _type="base";
        var _center = "";
        var _param={};

        this.getMap=function(){
                return _map;
        };
        this.getParams=function(){
            return _params;
        };
        this.getType=function(){
            return _type;
        };
        this.setType=function(type){
            _type=type;
        }
        this.getMap=function(){
            return _map;
        };

        this.init = function (map,params) {
            if(!map) return;
            _map=map;
            _params=params||{};
            var self=this;
            _map.doBeforeSave=function(params,ajaxParams){
                //保存时，吧标准地图格式转化为后台接收的格式
                var markers=self.dataAssemble(params.data);
                delete(params.data);
                var deleted=self.dataAssemble(_map.getDeletedData());
                params.markers=markers.concat(deleted);
                ajaxParams.data=JSON.stringify(params);
                ajaxParams.dataType="json";
                ajaxParams.contentType="application/json;charset=utf-8";
            };
            _map.doDuringRead=function(response,data){
                //取到数据后，加载数据前，格式化数据以满足地图格式要求
                if(data.readDataOnly){

                    data.markers=[];
                    var markers=response.markers||[];
                    data.contextMenus = response.contextMenus||[];
                    data.markers=_self.dataFormat(markers,_center);

                }else{
                    var maps=response.maps||[];
                    if(maps.length>0){
                        _center = maps[0].centerLocation;
                        if(_center.length==0){
                            _center = "112,28";
                        }
                        var zoomIndex = maps[0].zoomLevel;
                        _map.getMap().setView(_center.split(","),zoomIndex,{});
                        if(maps[0].type=="jt"){//禁止拖动
                            _map.getMap().dragging.disable();
                            _map.getMap().touchZoom.disable();
                            _map.getMap().doubleClickZoom.disable();
                            _map.getMap().scrollWheelZoom.disable();
                        }
                    }
                    var layers=response.layers||[];
                    data.layers=maps.concat(layers);
                }
            };
            this.setExtra(_params);
            this.setIcons();
        };

        //往前端发送数据
        this.dataAssemble=function(originData){
            var map=this.getMap();
            var data=[];
            for(var i in originData){
                if(originData[i].type=="area"){
                    data.push({
                        deleted:originData[i].isDeleted==true?true:false,
                        id:originData[i].key,
                        name:originData[i].name,
                        type:originData[i].type,
                        text:originData[i].text,
                        location:originData[i].location,
                        template:originData[i].template,
                        styles:JSON.stringify(originData[i].styles||{}),

                        layerId:originData[i].layer,
                        shape:originData[i].shape,
                        center:originData[i].center,
                        direction:originData[i].direction,
                        radius:originData[i].radius,
                        angle:originData[i].angle,
                        length:originData[i].length,
                        width:originData[i].width,
                        points:originData[i].points,
                        detectionType:originData[i].detectionType,
                        parentId:originData[i].parentId,
                        tempId:originData[i].tempId,
                        zoneId:originData[i].zoneId,
                        deviceType:originData[i].deviceType,
                        deviceCode:originData[i].deviceCode,
                        status:originData[i].status
                    });
                }else{
                    data.push({
                        deleted:originData[i].isDeleted==true?true:false,
                        id:originData[i].key,
                        name:originData[i].name,
                        type:originData[i].type,
                        text:originData[i].text,
                        location:originData[i].location,
                        template:originData[i].template,
                        modelId:originData[i].data.modelId,
                        //iconUrl:originData[i].data.iconUrl,
                        detectionType:originData[i].detectionType,
                        parentId:originData[i].parentId,
                        styles:JSON.stringify(originData[i].styles||{}),
                        zoneId:originData[i].zoneId,
                        layerId:originData[i].layer,
                        deviceType:originData[i].deviceType,
                        deviceCode:originData[i].deviceCode,
                        productId: originData[i].productId
                    });
                }
            }
            return data;
        };
        this.setIcons=function(){
            var map=this.getMap();
            map.ICONS.setTemplate("originIcon",function(params){
                return new L.divIcon({
                    divId:params.divId,
                    html:''
                        +'<div class="marker-clean">'
                        +'<div class="clean-image-origin" style="width:36px;height:36px;transform:rotate('+(params.direction||0)+'deg);">'
                        +'<img draggable="false" src="'+(params.iconUrl)+'"/>'
                        +'</div>'
                        +'</div>',
                    className:'non-outline',
                    iconSize: [36, 36],
                    iconAnchor: [18, 18],
                    popupAnchor: [0, 0]
                });
            });
        };

        this.setConfigs=function(){
            var map=this.getMap();
            //目标
            map.CONFIGS.set("target",{
                dataBinding:function(data){
                    var bindingData={
                        text:data.text||"标绘",
                        count:data.count||"1",
                        color:data.color||"red",
                        iconUrl:data.iconUrl||""
                    };
                    return bindingData;
                }
            });
        };
        this.setClusters=function(){};
        this.setExtra=function(){};

        this.dataFormat=function(markers,center){
            var map=this.getMap();
            var data=[];
            center = center.indexOf(",")>0?center.replace(","," "):center;
            for(var i in markers){
                var deviceCode = markers[i].deviceCode;
                if(deviceCode){
                    if(!(deviceCode.indexOf("EV")!=-1 || deviceCode.indexOf("ER")!=-1)){
                        continue;
                    }
                }

                var markerType=markers[i].type;
                var tempPos = markers[i].location||center;
                var ctPos = tempPos.indexOf(",")>0?tempPos.replace(","," "):tempPos;
                var resultPos = ctPos.indexOf(" ")>0?ctPos:center;

                var tempCenterPos = markers[i].center||center;
                var centerPos = tempCenterPos.indexOf(",")>0?tempCenterPos.replace(","," "):tempCenterPos;
                var centerPos = centerPos.indexOf(" ")>0?centerPos:center;

                if(markerType=="area"){
                    var status = markers[i].status;
                    var styles = {};
                    // var color = "#98aa29";
                    var color = "#1a6b00";
                    if(markers[i].detectionType=="filter"){
                        color = "#33ff00"
                    }else if(markers[i].detectionType=="alert"){
                        color = "#bb6d44"
                    }

                    if(status=="1"){
                        styles = {
                            weight:2,
                            color:color,
                            fill:markers[i].detectionType=="detection"?true:false,
                        }
                    }else if(status=="0"){
                        styles = {
                            weight:2,
                            color:"#aaaaaa",
                            fill:true
                        }
                    }
                    data.push({
                        isShape:true,
                        key:markers[i].id,
                        layer:markers[i].layerId,
                        type:markers[i].type,
                        name:markers[i].name,
                        text:markers[i].text,
                        location:resultPos,
                        template:markers[i].template,
                        detectionType:markers[i].detectionType||"",
                        styles:styles,
                        shape:markers[i].shape,
                        center:centerPos,
                        points:markers[i].points,
                        direction:markers[i].direction,
                        radius:markers[i].radius,
                        angle:markers[i].angle,
                        length:markers[i].length,
                        width:markers[i].width,
                        detectionType:markers[i].detectionType,
                        parentId:markers[i].parentId,
                        productId:markers[i].productId,
                        zoneId: markers[i].zoneId,
                        deviceType:markers[i].deviceType,
                        deviceCode:markers[i].deviceCode,
                        status:markers[i].status
                    })
                }else{
                    if(markers[i].deviceType=="device"){
                        if(markers[i].deviceCode=="EV_BC"){
                            iconUrl = "/template/detection/img/camera.png";
                        }else{
                            iconUrl = "/template/detection/img/zone_camera.png";
                        }
                    }
                    data.push({
                        isShape:false,
                        key:markers[i].id,
                        layer:markers[i].layerId,
                        type:markers[i].type,
                        name:markers[i].name,
                        text:markers[i].text,
                        location:resultPos,
                        template:markers[i].template,
                        productId:markers[i].productId,
                        detectionType:markers[i].detectionType,
                        zoneId: markers[i].zoneId,
                        styles:JSON.parse(markers[i].styles||"{}"),
                        template:"originIcon",
                        deviceType:markers[i].deviceType,
                        deviceCode:markers[i].deviceCode,
                        data:{
                            text:markers[i].name,
                            iconUrl:iconUrl,
                            direction:markers[i].direction
                        }
                    })
                }
            }
            return data;
        };

        //组装style

        //判断是否存在此区域或目标标绘
        this.hasMarker = function (key) {
            var map = this.getMap();
            if(key){
                map.LAYERS.eachMarker(function (marker,layer) {
                    var obj = marker.options.info;
                    if(obj && list.indexOf(obj.getKey())!=-1){
                        return true;
                    }
                })
            }
            return false;
        }

        //以下为外部调用接口
        this.removeMarkers=function(keys){
            var map=this.getMap();
            if(keys){
                var list=keys.split(",");
                map.LAYERS.eachMarker(function(marker,layer){
                    var obj=marker.options.info;
                    if(obj && list.indexOf(obj.getKey())!=-1){
                        marker.removeFrom(layer);
                    }
                });
            }
        }
        this.addMarkers=function(list){
            var map=this.getMap();
            var markers=_self.dataFormat(list);
            map.loadData(markers);
        }
    }
})()
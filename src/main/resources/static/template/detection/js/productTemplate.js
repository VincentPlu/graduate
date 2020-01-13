/**
 * Created by Charle on 2019-08-26.
 */
var leaflet=leaflet||{};
(function () {
    leaflet.productTemplate = function () {
        var _self=this;
        var _map;
        var _tree;
        var _type="base";
        var _param={};
        var center = "";

        function getStylesByTypeAndStatus(type,status) {
            var newStyles= {};
            $.extend(true,newStyles,_config[type].styles);
            if(status == "0"){
                var fillColor = "#aaaaaa";
                var color = "#cccccc";
                newStyles.fillColor = fillColor;
                newStyles.color = color;
            }
            return newStyles;
        }

        var _config={
            "detection":{
                isVisible:true,
                styles:{
                    fill:true,
                    stroke:true,
                    color:"#626675",
                    opacity:0.2,
                    weight:2,
                    // fillColor:"#98aa29",
                    // fillOpacity:0.5
                    fillColor : "#1a6b00"
                }
            },
            "alert":{
                isVisible:true,
                styles:{
                    fill:false,
                    stroke:true,
                    weight:2,
                    color:"#bb6d44",
                    opacity:0.6
                }
            },
            "filter":{
                isVisible:true,
                styles:{
                    fill:false,
                    stroke:true,
                    color:"#33ff00",
                    weight:2,
                    opacity:0.6
                }
            }
        }

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
        this.getNodes = function () {
            return _nodes;
        };
        this.setNodes = function (nodes) {
            _nodes = nodes;
        };
        this.getTree = function () {
            return _tree;
        }

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
            _map.doDuringRead=function(response,data) {

                if(data.readDataOnly){
                    //取到数据后，加载数据前，格式化数据以满足地图格式要求
                    data.markers = [];
                    data.palettes = {};

                    var markers = response.markers || [];
                    data.markers = _self.dataFormat(markers, center);

                }else {
                    var maps = response.maps || [];
                    if (maps.length > 0) {
                        center = maps[0].centerLocation;
                        if(center.length==0){
                            center = "112,28";
                        }
                        if(response.productCenter){
                            center = response.productCenter;
                        }
                        var zoomIndex = maps[0].zoomLevel;
                        _map.getMap().setView(center.split(","), zoomIndex, {});
                        if (maps[0].type == "jt") {//禁止拖动
                            _map.getMap().dragging.disable();
                            _map.getMap().touchZoom.disable();
                            _map.getMap().doubleClickZoom.disable();
                            _map.getMap().scrollWheelZoom.disable();
                        }
                    }

                    var layers = response.layers || [];
                    data.layers = maps.concat(layers);

                }
            }
            this.setExtra(_params);
            this.setIcons();
        };

        this.getCenter = function () {
            return center;
        }

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
                        tempId:originData[i].tempId
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

                        layerId:originData[i].layer,
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
            map.ICONS.setTemplate("alertIcon",function(params){
                return new L.divIcon({
                    divId:params.divId,
                    html:''
                    +'<div class="marker-clean">'
                    +'<div class="clean-image-origin" style="width:18px;height:18px;transform:rotate('+(params.direction||0)+'deg);">'
                    +'<img draggable="false" src="'+(params.iconUrl)+'"/>'
                    +'</div>'
                    +'</div>',
                    className:'non-outline',
                    iconSize: [18, 18],
                    iconAnchor: [9, 9],
                    popupAnchor: [0, 0],
                });
            });

            map.ICONS.setTemplate("alertInfo",function(params){
                return new L.divIcon({
                    divId:"info_"+params.devId+"_"+params.targetId,
                    html:''
                        +"<div id='target_"+params.targetId+"'class=\"alert alert-info alert-dismissible show\" style='opacity: 0.8;width:180px;font-size: 12px;'>"
                        +"<button type='button' class='close' onclick= " + " 'removeInfoMarker(\"info_"+ params.devId+"_"+params.targetId +"\")'" +"data-dismiss='alert'>&times;</button>"
                        +"<div>"+"距    离:"+Number(params.distance).toFixed(2)+"米</div>"
                        +"<div>"+"当前角度:"+Number(params.startDirection).toFixed(2)+"度</div>"
                        +"<div>"+"移动速度:"+Number(params.speed).toFixed(2)+"m/s</div>"
                        +"<div>"+"报警设备:"+params.detectionName+"</div>"
                        +"<div>"+"报警事件:"+params.event+"</div>"
                        +'</div>',
                    className:'non-outline',
                    iconSize: [0, 0],
                    iconAnchor: [0, 0],
                    popupAnchor: [0, 0],
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
                var markerType=markers[i].type;
                var tempPos = markers[i].location||center;
                var ctPos = tempPos.indexOf(",")>0?tempPos.replace(","," "):tempPos;
                var resultPos = ctPos.indexOf(" ")>0?ctPos:center;

                var tempCenterPos = markers[i].center||center;
                var centerPos = tempCenterPos.indexOf(",")>0?tempCenterPos.replace(","," "):tempCenterPos;
                var centerPos = centerPos.indexOf(" ")>0?centerPos:center;

                if(markerType=="area"){
                    var status = markers[i].status;
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
                        styles:getStylesByTypeAndStatus(markers[i].detectionType,status),
                        shape:markers[i].shape,
                        center:centerPos,
                        points:markers[i].points,
                        direction:markers[i].direction,
                        radius:markers[i].radius,
                        angle:markers[i].angle,
                        length:markers[i].length,
                        width:markers[i].width,
                        parentId:markers[i].parentId,
                        productId:markers[i].productId,
                        zoneId: markers[i].zoneId,
                    })
                }else{
                    var iconUrl = "/template/detection/img/camera.png";
                    if(markers[i].deviceCode=="EV_BC"){
                        iconUrl = "/template/detection/img/camera.png";
                    }else{
                        iconUrl = "/template/detection/img/zone_camera.png";
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
                        productTypeCode:markers[i].productTypeCode,
                        detectionType:markers[i].detectionType,
                        deviceCode:markers[i].deviceCode,
                        zoneId: markers[i].zoneId,
                        styles:JSON.parse(markers[i].styles||"{}"),
                        template:"originIcon",
                        data:{
                            text:markers[i].name,
                            iconUrl:iconUrl
                            // direction:markers[i].direction //旋转角度
                        }
                    })
                }
            }
            return data;
        };

        //判断是否存在此区域或目标标绘
        this.hasMarker = function (key) {
            var map = this.getMap();
            var result = false;
            if(key){
                map.LAYERS.eachMarker(function (marker,layer) {
                    var obj = marker.options.info;
                    if(obj && obj.getKey()== key){
                        result = true;
                    }
                })
            }
            return result;
        };

        //判断是否存在此区域或目标标绘
        this.getShapeByKey = function (key) {
            var resultObj=null;
            var map = this.getMap();
            if(key){
                map.LAYERS.eachMarker(function (marker,layer) {
                    var obj = marker.options.info;
                    if(obj && obj.getKey()== key){
                        resultObj = obj;
                    }
                })
            }
            return resultObj;
        };

        //判断是否存在此区域或目标标绘
        this.getShapeMarkerByKey = function (key) {
            var resultObj=null;
            var map = this.getMap();
            if(key){
                map.LAYERS.eachMarker(function (marker,layer) {
                    var obj = marker.options.info;
                    if(obj && obj.getKey()== key){
                        resultObj =  marker;
                    }
                })
            }
            return resultObj;
        };

        this.removeMarkersByArr = function (keys) {
            var map = this.getMap();
            if (keys) {
                map.LAYERS.eachMarker(function (marker, layer) {
                    var obj = marker.options.info;
                    if (obj && keys.indexOf(obj.getKey()) != -1) {
                        marker.removeFrom(layer);
                    }
                });
            }
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
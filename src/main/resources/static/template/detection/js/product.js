/**
 * Created by Charle on 2019-08-16.
 */
var map;
var template;
var opt="product";
(function() {
    var alertData = {};//{lastTime:,data[]}
    var detectionData = {};
    var polylineApix = "polyline_";
    var shapeKey = "detectionShape";
    var infoApix = "info_";
    var detectionAngle = 20;
    var camraRotateTime = {};
    // var detectionColor=["#ff0000","#FFFC09","#AC2CC3"];
    var detectionColor=["#98aa29","#70c2fc","#AC2CC3"];
    var lastNotifyTime = new Date().getTime();

    var config = {
        "01": {
            icon: "/template/detection/img/person.png",
            styles: {
                draggable: false,
                fill: false,
                // color: "#376c31",
                color : "#ff0000",
                weight: 3
            }
        },
        "02": {
            icon: "/template/detection/img/car.png",
            styles: {
                draggable: false,
                fill: false,
                color: "#04396d",
                weight: 3
            }
        },
        "40": {
            icon: "/template/detection/img/aircraft_small.png",
            styles: {
                draggable: false,
                fill: false,
                color: "#5c1d01",
                weight: 3
            }
        },
        "other":{
            icon:"/template/detection/img/others_small.png",
            styles:{
                draggable:false,
                fill : false,
                color : "#ac2cc3",
                weight : 2
            }
        }
    };

    var mapConfig={
        saveUrl:ctx+"public/map/save",
        readMapUrl:ctx+"public/map/readMap",
        readUrl:ctx+"public/map/read",
        hasLayerControl:true
    };

    map=leaflet.Factory.init(mapConfig);

    template=new leaflet.productTemplate();
    template.init(map,{});

    $.fn.loadProductMap=function(data){
        map.readMap(data);
    };

    $.fn.loadProduct=function(){
        map.read();
    }

    $.fn.switchLayer = function (mapId) {
        map.LAYERS.switchLayer(mapId,map.getMap());
    }

    var mqtt = new leaflet.mqtt();
    var options = {
        onMessageArrived:function (message) {

            try{
                var data  = JSON.parse(message.payloadString);
                var markers = [];
                var keys = "";
                var polylineKeys = "";
                var infoKeys="";
                var infoKey="";

                if(data.content){//处理系统通知消息
                    var postUrl = ctx+"public/map/readProductVosByDetectionId";
                    var params = {};
                    switch(data.type){
                        case "1001":
                        case "1002":
                        case "1003":
                        case "1004":
                        case "1005":
                        case "1006":
                            postUrl = ctx+"public/map/readProductVosByDeviceId";
                            params = {deviceId:data.content.deviceId};
                            break;
                        case "1010":
                        case "1012":
                        case "1014":
                            postUrl = ctx+"public/map/readProductVosByDetectionId";
                            params = {detectionId:data.content.detectionId};
                            break;
                    }

                    //刷新地图
                    if(new Date().getTime() - lastNotifyTime>1000){
                        $.ajax({
                            type:"POST",
                            url:postUrl,
                            data:params,
                            success: function (response) {
                                if(!response.data || !response.data.markers){
                                    return;
                                }
                                var markers = response.data.markers || [];
                                //删除探测区相关标绘
                                var deleteKeys = ",";
                                for(var index in response.data.markers){
                                    deleteKeys+=response.data.markers[index].id+",";
                                }

                                template.removeMarkers(deleteKeys.substr(0,deleteKeys.length-1));

                                var formateDatas = template.dataFormat(markers,template.getCenter());

                                //读取数据：标绘，形状
                                map.loadData(formateDatas);
                            }
                        });
                        lastNotifyTime = new Date().getTime();
                    }
                    return
                }

                //显示探测区(根据经纬度显示，根据设备id获取设备)
                var shape = template.getShapeByKey(data.devId);
                if(!shape){//如果不存在不告警
                    return;
                }

                for(var index in data.targets){
                    var obj = data.targets[index];
                    var tempId = data.devId + "_" + obj.targetId;
                    keys+=tempId+",";
                    infoKey=infoApix+tempId;
                    polylineKeys +=polylineApix+tempId+",";
                    var loc = (obj.targetLatitude||"0")+" "+(obj.targetLongitude||"0");
                    var temp = {
                        data:{
                            iconUrl:config[obj.targetType]?config[obj.targetType].icon:config["other"].icon,
                            info:obj,
                            dev_id:data.devId
                        },
                        styles:{
                            draggable:false
                        },
                        isShape:false,
                        key:tempId,
                        layer:"target",
                        detectionType:"alertTarget",
                        location:loc,
                        type:"target",
                        isTarget:true,
                        template:"alertIcon"
                    }
                    markers.push(temp);

                    //判断文字是否存在
                    if(template.hasMarker(infoKey)){
                        infoKeys+=infoKey+",";
                        var targetObj = template.getShapeMarkerByKey(tempId);
                        var infoData = {
                            data:targetObj?targetObj.options.info.assembleInfo(temp.data):"",
                            isShape:false,
                            key:infoApix+tempId,
                            layer:"target",
                            detectionType:"alertTarget",
                            location:loc,
                            type:"targetInfo",
                            isTarget:true,
                            isVisible:true,
                            template:"alertInfo"
                        };
                        markers.push(infoData);
                    }

                    //添加到轨迹显示中去
                    if(!alertData.hasOwnProperty(tempId)){
                        alertData[tempId] = {
                            lastTime:new Date().getTime(),
                            positions:[]
                        };
                    }else{
                        alertData[tempId].lastTime = new Date().getTime();
                    }
                    alertData[tempId].positions.push(loc);

                }

                keys+=shapeKey;

                polylineKeys = polylineKeys.substr(0,polylineKeys.length-1);
                infoKeys = infoKeys.substr(0,infoKeys.length-1);

                //组装ployline数据
                for(var key in alertData){
                    var positions = alertData[key].positions;
                    var ploylineShape = {
                        isShape:true,
                        key:polylineApix+key,
                        layer:"area",
                        shape:"polyline",
                        points:positions,
                        styles:{
                            stroke:true,
                            fill:false,
                            color:config[obj.targetType]?config[obj.targetType].styles.color:config["other"].styles.color,
                            opacity:config[obj.targetType]?config[obj.targetType].styles.opacity:config["other"].styles.opacity
                        },
                        isVisible:true,
                    }
                    markers.push(ploylineShape);
                }

                template.removeMarkers(keys);
                template.removeMarkers(polylineKeys);
                template.removeMarkers(infoKeys);

                var traceTarget = data.traceTarget;
                var detectionCameras = data.cameras;

                if(traceTarget && detectionCameras ){
                    var detectionKeys = "";
                    for(var m in detectionCameras) {
                        var cameraId = detectionCameras[m].cameraId;
                        var cameraObj = template.getShapeMarkerByKey(cameraId);

                        if (cameraObj) {
                            detectionKeys += shapeKey + "_" + cameraId + ",";
                            var cameraLoc = cameraObj.options.info.getLocation();
                            var startDirection = MapUtils.computeAzimuth(cameraLoc.split(" ")[1],cameraLoc.split(" ")[0],
                                traceTarget.targetLongitude,traceTarget.targetLatitude);
                            //画检测区
                            var shape = {
                                isShape: true,
                                key: shapeKey + "_" + cameraId,
                                layer: "area",
                                //形状
                                shape: "semicircle",
                                //方向
                                direction: startDirection - detectionAngle/2,
                                //半径
                                radius: MapUtils.getDistance(cameraLoc.split(" ")[1],
                                    cameraLoc.split(" ")[0], traceTarget.targetLongitude, traceTarget.targetLatitude)*1000,
                                //中心点
                                center: cameraObj.options.info.getLocation(),
                                //可视
                                isVisible: true,

                                styles: {
                                    fillOpacity:0.3,
                                    fillColor:detectionColor[m]
                                },
                                angle: detectionAngle
                            }

                            if (detectionData.hasOwnProperty(shapeKey + "_" + cameraId)) {
                                detectionData[shapeKey + "_" + cameraId].lastTime = new Date().getTime();
                            } else {
                                detectionData[shapeKey + "_" + cameraId] = {
                                    lastTime: new Date().getTime()
                                }
                            }

                            markers.push(shape);

                            //旋转摄像头
                            if(cameraObj.options.info.getDeviceCode() == "EV_BC"){
                                cameraObj.setRotationAngle(startDirection-120);
                            }else{
                                cameraObj.setRotationAngle(startDirection-180);
                            }

                            camraRotateTime[cameraId] =  new Date().getTime();
                        }
                    }

                    if(detectionKeys.length>0){
                        detectionKeys = detectionKeys.substr(0,detectionKeys.length-1);
                    }
                    template.removeMarkers(detectionKeys);
                }

                map.loadData(markers);
            }catch(e){

            }
        }
    }

    //清除轨迹与警告
    setInterval(function () {
        var keys = "";
        var polylineKeys = "";
        var detectionKeys  = "";
        var infoKeys = "";

        for(var m in alertData){
            var time = new Date().getTime();
            if(time - alertData[m].lastTime>5000){
                //删除marker,polyline
                keys +=m+",";
                polylineKeys +=polylineApix+m+",";
                infoKeys+=infoApix+m+",";
            }
        }

        //相机探测区域
        for(var k in detectionData){
            var time = new Date().getTime();
            if(time - detectionData[k].lastTime>1500){
                detectionKeys +=k+",";
            }
        }

        keys = keys.substr(0,keys.length-1);
        polylineKeys = polylineKeys.substr(0,polylineKeys.length-1);
        detectionKeys = detectionKeys.substr(0,detectionKeys.length-1);
        infoKeys = infoKeys.substr(0,infoKeys.length-1);

        if(keys.length>0){
            var dataKeys = keys.split(",");
            for(var n in dataKeys){
                delete alertData[dataKeys[n]];
            }
        }

        if(detectionKeys.length>0){
            var dataKeys = detectionKeys.split(",");
            for(var l in dataKeys){
                delete detectionData[dataKeys[l]];
            }
        }
        template.removeMarkers(keys);
        template.removeMarkers(polylineKeys);
        template.removeMarkers(detectionKeys);
        template.removeMarkers(infoKeys);

        //摄像头复原
        for(var h in camraRotateTime){
            var time = new Date().getTime();
            if(time - camraRotateTime[h]>4000){
                var cameraObj = template.getShapeMarkerByKey(h);
                if(cameraObj){
                    cameraObj.setRotationAngle(0);
                }
            }
        }
    },1000);

    mqtt.init(options);
})();

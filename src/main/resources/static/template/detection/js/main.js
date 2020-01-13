/**
 * Created by Charle on 2019-08-27.
 */
var map;
var template;
var opt="main";
(function() {
    var alertData = {};//{lastTime:,data[]}
    var detectionData = {};
    var polylineApix = "polyline_";
    var shapeKey = "detectionShape";
    var infoApix = "info_";
    var detectionAngle = 20;
    // var detectionColor=["#ff0000","#FFFC09","#AC2CC3"];
    var detectionColor=["#98aa29","#70c2fc","#AC2CC3"];
    var camraRotateTime = {};
    var lastNotifyTime = new Date().getTime();
    var config = {
        "01":{
            icon:"/template/detection/img/person.png",
            styles:{
                draggable:false,
                fill : false,
                // color : "#376c31",
                color : "#ff0000",
                weight : 3
            }
        },
        "02":{
            icon:"/template/detection/img/car.png",
            styles:{
                draggable:false,
                fill : false,
                color : "#04396d",
                weight : 3
            }
        },
        "40":{
            icon:"/template/detection/img/aircraft_small.png",
            styles:{
                draggable:false,
                fill : false,
                color : "#5c1d01",
                weight : 3
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

    var lockReconnect = false;//避免重复连接
    var mapConfig={
        saveUrl:ctx+"public/map/save",
        readUrl:ctx+"public/map/read",
        readMapUrl:ctx+"public/map/readMap",
        hasLayerControl:false,
        hasMousePosition:false,
        hasScaleInfo:false
    };

    map=leaflet.Factory.init(mapConfig);
    template=new leaflet.mainTemplate();
    template.init(map,{webSocketUrl:"ws://127.0.0.1:8080/msg"});

    $.fn.loadMain=function(data){
        map.readMain(data);
    }

    $.fn.load=function(){
        map.read();
    }

    //搜索回车事件
    $("#searchName").keydown(function(event) {
        if (event.keyCode == 13) {
            var searchName = $("#searchName").val();
            map.LAYERS.eachMarker(function (marker,layer) {
                var obj = marker.options.info;
                if(obj.getName() && obj.getName().indexOf(searchName)!=-1){
                    var location = obj.getLocation();
                    map.getMap().panTo([location.split(" ")[0],location.split(" ")[1]]);
                }
            });
        }
    });

    var mqtt = new leaflet.mqtt();
    var options = {
        onMessageArrived:function (message) {
            try{
                var data  = JSON.parse(message.payloadString);
                var markers = [];
                var infos = [];
                var keys = "";
                var polylineKeys = "";
                var infoKey="";
                var infoKeys = "";

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

                for(var index in data.targets){
                    var obj = data.targets[index];
                    var icon = "";
                    //重新修改targetId
                    var tempId  =  data.devId + "_" + obj.targetId;
                    keys+=tempId+",";
                    infoKey=infoApix+tempId;
                    polylineKeys+=polylineApix+tempId+",";
                    var loc = (obj.targetLatitude||"0")+" "+(obj.targetLongitude||"0");
                    var temp = {
                        data:{
                            iconUrl:config[obj.targetType]?config[obj.targetType].icon:config["other"].icon,
                            info:obj,
                            dev_id:data.devId
                        },
                        styles:config[obj.targetType]?config[obj.targetType].styles:config["other"].styles,
                        isShape:false,
                        key:tempId,
                        layer:"target",
                        detectionType:"alertTarget",
                        location:loc,
                        type:"target",
                        isTarget:true,
                        isVisible:true,
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

                    //添加到轨迹显示中去·
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

                //detection keys//相机检测区域
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
                        isVisible:true
                    }
                    markers.push(ploylineShape);
                }

                template.removeMarkers(keys);
                template.removeMarkers(polylineKeys);
                template.removeMarkers(infoKeys);

                var traceTarget = data.traceTarget;
                var detectionCameras = data.cameras;

                //扫射区更新
                if(traceTarget && detectionCameras ){
                    var detectionKeys = "";
                    for(var m in detectionCameras){
                        var cameraId = detectionCameras[m].cameraId;
                        var cameraObj = template.getShapeMarkerByKey(cameraId);

                        if(cameraObj){
                            detectionKeys+=shapeKey+"_"+cameraId+",";
                            //画检测区
                            var cameraLoc = cameraObj.options.info.getLocation();
                            var startDirection = MapUtils.computeAzimuth(cameraLoc.split(" ")[1],cameraLoc.split(" ")[0],
                                traceTarget.targetLongitude,traceTarget.targetLatitude);
                            var shape = {
                                isShape:true,
                                key:shapeKey+"_"+cameraId,
                                layer:"area",
                                //形状
                                shape:"semicircle",
                                //方向
                                direction:startDirection-detectionAngle/2,
                                //半径
                                radius:MapUtils.getDistance(cameraLoc.split(" ")[1],cameraLoc.split(" ")[0],
                                    traceTarget.targetLongitude,traceTarget.targetLatitude)*1000,
                                //中心点
                                center:cameraObj.options.info.getLocation(),
                                //可视
                                isVisible:true,

                                styles:{
                                    fillOpacity:0.3,
                                    fillColor:detectionColor[m]
                                },
                                angle:detectionAngle
                            }

                            if(detectionData.hasOwnProperty(shapeKey+"_"+cameraId)){
                                detectionData[shapeKey+"_"+cameraId].lastTime = new Date().getTime();
                            }else{
                                detectionData[shapeKey+"_"+cameraId] = {
                                    lastTime:new Date().getTime()
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

    mqtt.init(options);

    //消失目标与轨迹
    setInterval(function () {
        var markerKeys = "";
        var polylineKeys = "";
        var infoKeys = "";
        for(var m in alertData){
            var time = new Date().getTime();
            if(time - alertData[m].lastTime>5000){
                //删除marker,polyline
                markerKeys +=m+",";
                polylineKeys +=polylineApix+m+",";
                infoKeys+=infoApix+m+",";
            }
        }

        //探测区数据
        for(var k in detectionData){
            var time = new Date().getTime();
            if(time - detectionData[k].lastTime>1500){
                //删除marker,polyline
                markerKeys +=k+",";
            }
        }

        markerKeys = markerKeys.substr(0,markerKeys.length-1);
        polylineKeys = polylineKeys.substr(0,polylineKeys.length-1);
        infoKeys = infoKeys.substr(0,infoKeys.length-1);

        if(markerKeys.length>0){
            var dataKeys = markerKeys.split(",");
            for(var n in dataKeys){
                if(alertData.hasOwnProperty(dataKeys[n])){
                    delete alertData[dataKeys[n]];
                }
            }

            for(var m in dataKeys){
                if(detectionData.hasOwnProperty(dataKeys[m])){
                    delete detectionData[dataKeys[m]];
                }
            }
        }

        template.removeMarkers(markerKeys);
        template.removeMarkers(polylineKeys);
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

    function send() {
        var s = document.getElementById("msg").value;
        if (s) {
            s = "{time:" + new Date().Format("yyyy-mm-dd hh:mm:ss") + ", content:" + (s) + ", from: web console}";
            message = new Paho.MQTT.Message(s);
            message.destinationName = topic;
            client.send(message);
            document.getElementById("msg").value = "";
        }
    }

    var count = 0;

    function start() {
        window.tester = window.setInterval(function () {
            if (client.isConnected) {
                var s = {"dev_id":"10001","router":"RAD_10001_10000232|RULE_10002_23423322","last_dev_id":"10002","lasttime":"142342342323234","time":"142342342323235","target_num":"2","event":"01","targets":[{"target_id":"1001","target_x":"12","target_y":"32","target_widht":"100","target_height":"333","target_distance":"40","target_longitude":"33","target_latitude":"135","target_orientation":"50","target_pitch_angle":"103","target_heigtarget_originht":"01","target_type":"01"},{"target_id":"1001","target_x":"12","target_y":"32","target_widht":"100","target_height":"333","target_distance":"40","target_longitude":"33","target_latitude":"135","target_orientation":"50","target_pitch_angle":"103","target_heigtarget_originht":"01","target_type":"01"}]};
                message = new Paho.MQTT.Message(s);
                message.destinationName = topic;
                client.send(message);
            }
        }, 1000);
    }

    function stop() {
        window.clearInterval(window.tester);
    }

    //定时画圆弧
/*    //画圆弧定时画
    var initRadius = 30;
    var gap = 30;
    var zoomShapes = {};

    setInterval(function (){
        var temps = [];

        map.LAYERS.eachMarker(function (marker,layer) {
            var obj = marker.options.info;
            if(obj && obj instanceof leaflet.Shape && obj.getShape()==="circle"){
                temps.push(marker);
            }
        })

        if(temps.length==0){
            for(var m in zoomShapes){
                zoomShapes[m].obj.removeFrom(map.LAYERS.get("area"));
            }
        }
        //画弧形
        for(var m in temps){
            var obj = temps[m].options.info;
            //删除
            if(zoomShapes.hasOwnProperty(obj.getKey())){
                zoomShapes[obj.getKey()].obj.removeFrom(map.LAYERS.get(obj.getLayer()));
            }

            var opts = {
                color:"#00ff00",
                fill:false,
                weight:3
            };

            var radius = initRadius;
            if(zoomShapes[obj.getKey()]){
                radius = zoomShapes[obj.getKey()].radius;
            }

            if(radius>obj.getRadius()){
                radius = initRadius;
            }

            opts.radius = radius;
            var direction = obj.getDirection();
            var angle = obj.getAngle();
            var center = (obj.getCenter() || "0 0").split(" ");
            opts.startAngle = direction;
            opts.stopAngle = direction + angle;
            var result = L.semiCircle(center, opts);

            //添加
            var layerKey = obj.getLayer() || map.LAYERS.getDefaultPlotLayerKey();
            var layer = map.LAYERS.get(layerKey);
            result.addTo(layer);

            zoomShapes[obj.getKey()] = {
                obj:result,
                radius:radius+gap
            }
        }
    },80);*/

})()
/**
 * Created by Charle on 2019-08-26.
 */
var leaflet = leaflet || {};
(function () {
    //地图上的标绘maker类
    leaflet.Marker = function (options) {
        //自身引用
        var _self = this;
        //外部参数引用
        var _options = options || {};
        //私有变量
        var _key = "";//唯一标示
        var _name = "";//标绘名称
        var _text = "";//标绘文本
        var _layer = "";//所属图层的唯一标示
        var _location = "0 0";//地图上所处经纬度
        var _template = "";//使用的模板的唯一标示
        var _contextParentId = "";
        var _type = "";//标绘类型，可根据类型设定标绘的各类事件响应，动作，样式
        var _styles = {};//{name:value} 个性化的样式信息
        var _contexts = [];//右键菜单
        var _events = {};//事件映射
        var _data = {};//{name:value} 用户业务属性
        var _subs = [];//子标绘，子标绘丛属于父标绘，跟随父标绘移动和删除

        var _isSelected = false;
        var _isDeleted = false;
        var _isVirtual = false;
        var _productId = "";
        var _detectionType = "";
        var _zoneId = "";
        var _status = "";
        var _productTypeCode = "";
        var _deviceType = "";
        var _deviceCode = "";

        //私有方法
        var _init = function () {//初始化方法
            _key = _options.key || _key;
            _name = _options.name || _name;
            _text = _options.text || _text;
            _layer = _options.layer || _layer;
            _location = _options.location || _location;
            _template = _options.template || _template;
            _type = _options.type || _type;
            _styles = _options.styles || _styles;
            _contexts = _options.contexts || _contexts;
            _events = _options.events || _events;
            _data = _options.data || _data;
            _subs = _options.subs || _subs;
            _productId = _options.productId || _productId;
            _detectionType = _options.detectionType || _detectionType;
            _zoneId = _options.zoneId || _zoneId;
            _status = _options.status || _status;
            _productTypeCode = _options.productTypeCode || _productTypeCode;
            _deviceType = _options.deviceType || _deviceType;
            _deviceCode = _options.deviceCode || _deviceCode;
            if (_options.isVirtual == true) {
                _isVirtual = true;
            }
            return _self;
        };
        //私有变量的get set方法
        _self.getKey = function () {
            return _key;
        };
        _self.setKey = function (key) {
            _key = key || _key;
        };
        _self.getName = function () {
            return _name;
        };
        _self.setName = function (name) {
            _name = name || _name;
        };
        _self.getText = function () {
            return _text;
        };
        _self.setText = function (text) {
            _text = text;
        };
        _self.getLayer = function () {
            return _layer;
        };
        _self.setLayer = function (layer) {
            _layer = layer || _layer;
        };
        _self.getLocation = function () {
            return _location;
        };
        _self.setLocation = function (location) {
            _location = location || _location;
        };
        _self.getTemplate = function () {
            return _template;
        };
        _self.setTemplate = function (template) {
            _template = template || _template;
        };
        _self.setContextParentId = function (parentId) {
            _contextParentId = parentId || _contextParentId;
        };
        _self.getContextParentId = function () {
            return _contextParentId;
        };
        _self.setDetectionType = function (type) {
            _detectionType = type || _detectionType;
        };
        _self.getDetectionType = function () {
            return _detectionType;
        };
        _self.getType = function () {
            return _type;
        };
        _self.setType = function (type) {
            _type = type || _type;
        };
        _self.getStyles = function () {
            return _styles;
        };
        _self.setStyles = function (styles) {
            _styles = styles || _styles;
        };
        _self.getContexts = function () {
            return _contexts;
        };
        _self.setContexts = function (contexts) {
            _contexts = contexts || _contexts;
        };
        _self.getEvents = function () {
            return _events;
        };
        _self.setEvents = function (events) {
            _events = events || _events;
        };
        _self.getData = function () {
            return _data;
        };
        _self.setData = function (data) {
            _data = data || _data;
        }
        _self.getSubs = function () {
            return _subs;
        };
        _self.setSubs = function (subs) {
            _subs = subs || _subs;
        };
        _self.isSelected = function () {
            return _isSelected
        };
        _self.setSelected = function (isSelected) {
            _isSelected = isSelected;
        };
        _self.isDeleted = function () {
            return _isDeleted
        };
        _self.setDeleted = function (isDeleted) {
            _isDeleted = isDeleted
        };
        _self.isVirtual = function () {
            return _isVirtual
        };
        _self.setVirtual = function (isVirtual) {
            _isVirtual = isVirtual;
        };
        _self.setProductId = function (productId) {
            _productId = productId;
        };
        _self.getProductId = function () {
            return _productId;
        };
        _self.setZoneId = function (zoneId) {
            _zoneId = zoneId;
        };
        _self.getZoneId = function () {
            return _zoneId;
        };
        _self.setStatus = function (status) {
            _status = status;
        };
        _self.getStatus = function () {
            return _status
        };
        _self.setProductTypeCode = function(productTypeCode){
            _productTypeCode = productTypeCode;
        };
        _self.getProductTypeCode = function(){
            return _productTypeCode;
        }
        _self.getInfo = function () {
            var info = _data.info;
            if(info){
                return _self.assembleInfo(_data);
            }else{
                return _name;
            }
        };
        _self.getDeviceType=function(){
            return _deviceType;
        }
        _self.setDeviceType=function(deviceType){
            _deviceType = deviceType;
        }
        _self.getDeviceCode=function(){
            return _deviceCode;
        }
        _self.setDeviceCode=function(deviceCode){
            _deviceCode = deviceCode;
        }

        _self.assembleInfo = function(data) {
            var info = {
                devId:data.dev_id,
                targetId:data.info.targetId,
                detectionName:"",
                event:"",
                startDirection:"",
                distance:"",
                speed:""
            };
            var obj = data.info;
            var devId = data.dev_id;
            var keys = map.LAYERS.getPlotLayerKeys();
            var detectionObj;

            for (var i in keys) {
                var layer = map.LAYERS.get(keys[i]);
                var markers = layer.getLayers();
                for (var j in markers) {
                    var leafObj = markers[j];
                    if (leafObj.options.info && leafObj.options.info instanceof leaflet.Shape) {
                        if (leafObj.options.info.getKey() == devId) {
                            detectionObj = leafObj;
                            break;
                        }
                    }
                }
            }

            //添加信息
            var targetInfo = "";
            switch (obj.targetType) {
                case "01":
                    targetInfo = "人员入侵";
                    break;
                case "02":
                    targetInfo = "车辆入侵";
                    break;
                case "40":
                    targetInfo = "无人机入侵";
                    break;
                default:
                    targetInfo = "其它入侵";
                    break;
            }
            info.event = targetInfo;
            if(obj.targetXSpeed && obj.targetYSpeed && obj.targetZSpeed){
                info.speed = Math.sqrt(Math.pow(obj.targetXSpeed,2)+Math.pow(obj.targetYSpeed,2)+Math.pow(obj.targetZSpeed,2));
            }else{
                info.speed=0;
            }

            if(detectionObj){
                info.detectionName = detectionObj.options.info.getName();

                var detectionLoc = detectionObj.options.info.getCenter();
                var startDirection = MapUtils.computeAzimuth(detectionLoc.split(" ")[1],detectionLoc.split(" ")[0],
                    obj.targetLongitude,obj.targetLatitude);
                var distance = MapUtils.getDistance(detectionLoc.split(" ")[1],detectionLoc.split(" ")[0],
                    obj.targetLongitude,obj.targetLatitude)*1000;

                info.startDirection = startDirection;
                info.distance = distance;
            }
            return info;
        };
        _self.makeSubJsonObjs = function (json, subs) {
            if (subs) {
                for (var i in subs) {
                    json.subs.push(subs[i].makeJsonObj(subs[i]));
                }
            }
        };
        _self.makeJsonObj = function (obj) {
            var json = {
                key: obj.getKey(),
                name: obj.getName(),
                text: obj.getText(),
                layer: obj.getLayer(),
                location: obj.getLocation(),
                template: obj.getTemplate(),
                type: obj.getType(),
                styles: obj.getStyles(),
                contexts: obj.getContexts(),
                events: obj.getEvents(),
                data: obj.getData(),
                subs: [],
                isSelected: obj.isSelected(),
                isDeleted: obj.isDeleted(),
                isVirtual: obj.isVirtual(),
                productId: obj.getProductId(),
                detectionType: obj.getDetectionType()
            }
            obj.makeSubJsonObjs(json, obj.getSubs())
            return json;
        };
        _self.toJson = function () {
            return this.makeJsonObj(this);
        };
        return _init();
    };
    //地图上的形状shape类（圆形，扇形，椭圆形，矩形，多边形，折线），继承Marker类
    leaflet.Shape = function (options) {
        //自身引用
        var _self = this;
        //外部参数引用
        var _options = options || {};
        //私有变量
        var _shape = "";//polyline,polygon,rectangle,circle,semicircle,ellipse
        var _center = "0 0";//中心点(圆形，扇形，椭圆形，矩形)
        var _points = [];//有序坐标点(多边形，矩形，折线)
        var _direction = 0;//扇形的起始边角度，椭圆的长轴角度
        var _radius = 500;//半径（圆形，扇形）
        var _angle = 160;//扇形开口角度（扇形）
        var _length = 0;//椭圆长轴长度（椭圆形）
        var _width = 0;//椭圆短轴长度（椭圆形）
        var _parentId = "";
        var _tempId = "";

        //私有方法
        var _init = function () {//初始化方法
            var marker = new leaflet.Marker(_options);
            _shape = _options.shape || _shape;
            _center = _options.center || _center;
            _points = _options.points || _points;
            _direction = _options.direction || _direction;
            _radius = _options.radius || _radius;
            _angle = _options.angle || _angle;
            _length = _options.length || _length;
            _width = _options.width || _width;
            _parentId = _options.parentId || _parentId;
            _tempId = _options.tempId || _tempId;
            for (var key in marker) {
                if (_self[key] == null) _self[key] = marker[key];
            }
            return _self;
        };
        //私有变量的get set方法
        _self.getShape = function () {
            return _shape;
        };
        _self.setShape = function (shape) {
            _shape = shape || _shape;
        };
        _self.getCenter = function () {
            return _center;
        };
        _self.setCenter = function (center) {
            _center = center || _center;
        };
        _self.getPoints = function () {
            return _points;
        };
        _self.setPoints = function (points) {
            _points = points || _points;
        };
        _self.getDirection = function () {
            return _direction;
        };
        _self.setDirection = function (direction) {
            _direction = direction || _direction;
        };
        _self.getRadius = function () {
            return _radius;
        };
        _self.setRadius = function (radius) {
            _radius = radius || _radius;
        };
        _self.getAngle = function () {
            return _angle;
        };
        _self.setAngle = function (angle) {
            _angle = angle || _angle;
        };
        _self.getLength = function () {
            return _length;
        };
        _self.setLength = function (length) {
            _length = length || _length;
        };
        _self.getWidth = function () {
            return _width;
        };
        _self.setWidth = function (width) {
            _width = width || _width;
        };
        _self.setParentId = function (parentId) {
            _parentId = parentId || _parentId;
        };
        _self.getParentId = function () {
            return _parentId;
        };
        _self.setTempId = function (tempId) {
            _tempId = tempId;
        };
        _self.getTempId = function () {
            return _tempId;
        };
        _self.getContainAreas = function (mf) {
            var areas = [];
            var keys = mf.LAYERS.getPlotLayerKeys();
            for (var i in keys) {
                var layer = mf.LAYERS.get(keys[i]);
                var markers = layer.getLayers();
                for (var j in markers) {
                    var leafObj = markers[j];
                    if (leafObj.options.info && leafObj.options.info instanceof leaflet.Shape) {
                        if (leafObj.options.info.getParentId() == this.getKey() &&
                            leafObj.options.info.getShape() == "polygon") {
                            areas.push(leafObj);
                        }
                    }
                }
            }
            return areas;
        };
        _self.getSlibingMarkers = function (mf) {
            var areas = [];
            var keys = mf.LAYERS.getPlotLayerKeys();
            for (var i in keys) {
                var layer = mf.LAYERS.get(keys[i]);
                var markers = layer.getLayers();
                for (var j in markers) {
                    var leafObj = markers[j];
                    if (leafObj instanceof L.MarkerClusterGroup) {
                        var clusterLayers = leafObj.getLayers();
                        for (var k in clusterLayers) {
                            var tempObj = clusterLayers[k];
                            if (tempObj.options.info && tempObj.options.info.getProductId() == this.getProductId() &&
                                tempObj.options.info.getKey() != this.getKey()) {
                                areas.push(tempObj);
                            }
                        }
                    } else {
                        if (leafObj.options.info && leafObj.options.info.getProductId() == this.getProductId() &&
                            leafObj.options.info.getKey() != this.getKey()) {
                            areas.push(leafObj);
                        }
                    }
                }
            }
            return areas;
        }
        _self.makeJsonObj = function (obj) {
            var json = {
                key: obj.getKey(),
                name: obj.getName(),
                text: obj.getText(),
                layer: obj.getLayer(),
                location: obj.getLocation(),
                template: obj.getTemplate(),
                type: obj.getType(),
                styles: obj.getStyles(),
                contexts: obj.getContexts(),
                events: obj.getEvents(),
                data: obj.getData(),
                subs: [],
                isSelected: obj.isSelected(),
                isDeleted: obj.isDeleted(),
                isVirtual: obj.isVirtual(),
                parentId: obj.getParentId(),
                detectionType: obj.getDetectionType(),
                tempId: obj.getTempId(),
                shape: obj.getShape(),
                center: obj.getCenter(),
                points: obj.getPoints(),
                direction: obj.getDirection(),
                radius: obj.getRadius(),
                angle: obj.getAngle(),
                length: obj.getLength(),
                width: obj.getWidth()
            }
            json.isShape = true;
            obj.makeSubJsonObjs(json, obj.getSubs())
            return json;
        };
        return _init();
    };

    //标绘自定义html icon模板
    var Icons = function (options) {
        //自身引用
        var _self = this;
        //外部参数引用
        var _options = options || {};
        //私有变量
        //类型，矩形详情，纯净图片，形状游标
        var _template = {
            "textBox": function (params) {
                return new L.divIcon({
                    divId: params.divId,
                    html: ''
                    + '<span style="background: ' + (params.backColor || "#e7e7e7") + ';border:1.5px solid ' + (params.borderColor || "rgba(84,84,84,1)") + ';border-radius: 3px;padding:5px;white-space:nowrap;color:' + (params.textColor || "#a52e2e") + ';font-size:' + (params.textSize || 14) + 'px">' + (params.text || "文本") + '</span>',
                    className: 'non-outline',
                    iconSize: [0, 0],
                    iconAnchor: [0, 0],
                    popupAnchor: [0, 0]
                });
            },
            "textLabel": function (params) {
                return new L.divIcon({
                    divId: params.divId,
                    html: ''
                    + '<span style="white-space:nowrap;color:' + (params.textColor || "black") + ';font-size:' + (params.textSize || 14) + 'px">' + (params.text || "文本") + '</span>',
                    className: 'non-outline',
                    iconSize: [0, 0],
                    iconAnchor: [0, 0],
                    popupAnchor: [0, 0]
                });
            },
            "rectDetail": function (params) {
                return _makeRectWithCircle(params);
            },
            "cleanImg": function (params) {
                params.isLite = true;
                return _makeRectWithCircle(params);
            },
            "shapedArrow": function (params) {
                return _makeShapedWithArrow(params)
            },
            "circleIcon": function (params) {
                return _makeCircle(params)
            }
        };

        //私有方法
        //形状带游标箭头的icon
        var _makeShapedWithArrow = function (params) {
            params.divId = params.divId || "";
            params.direction = params.direction || 0;
            var svg = _self.drawSVGShape({shape: params.shape, fill: params.fill});
            var outerColor = "";
            if (params.fill) {
                outerColor = 'style="filter: drop-shadow(100px 0 0 ' + params.fill + ');"';
            }
            return new L.divIcon({
                divId: params.divId,
                html: ''
                + '<div id="' + params.divId + '" class="marker-arrow">'
                + '<div class="arrow-outter" style="transform:rotate(' + (params.direction) + 'deg);">'
                + '<img draggable="false" ' + outerColor + ' src="' + (params.arrowUrl) + '">'
                + '</div>'
                + '<div class="arrow-inner">'
                + svg
                + '</div>'
                + '</div>',
                className: 'non-outline',
                iconSize: [0, 0],
                iconAnchor: [18, 18],
                popupAnchor: [0, 0],
            });
        }
        //圆角矩形带类型图标的icon
        var _makeRectWithCircle = function (params) {
            params.divId = params.divId || "";
            params.serial = params.serial || "001";
            params.iconCls = params.iconCls || "fa-user";
            var boderColor = '';
            var iconColor = '';
            if (params.color) {
                boderColor = 'style="border: solid 2.5px ' + params.color + ';"';
                iconColor = 'style="filter: drop-shadow(100px 0 0 ' + params.color + ');"';
            }
            var logo = '<div class="marker-logo"><i class="fa ' + params.iconCls + '"></i></div>'
            if (params.logoUrl) {
                logo = '<div class="marker-logo"><img ' + iconColor + ' draggable="false" src="' + (params.logoUrl) + '"></div>';
            }
            var icon = '<div class="marker-icon" ' + boderColor + '><i class="fa ' + params.iconCls + '"></i>';
            if (params.iconUrl) {
                icon = '<div class="marker-icon" ' + boderColor + '><img ' + iconColor + ' draggable="false" src="' + (params.iconUrl) + '"></div>';
            }
            var markerClass = "marker-detail";
            if (params.isLite == true) {
                markerClass = "marker-lite";
            }
            var halo = '<div class="halo"></div>'
            return new L.divIcon({
                divId: params.divId,
                html: ''
                + '<div id="' + params.divId + '" class="' + markerClass + '">'
                + halo
                + logo
                + '<h>ID:</h>'
                + '<span>' + (params.serial) + '</span>'
                + icon
                + '</div>',
                className: 'non-outline',
                iconSize: [0, 0],
                iconAnchor: [14, 14],
                popupAnchor: [0, 0],
            });
        };

        var _makeCircle = function (params) {
            var icon = new L.divIcon({
                divId: params.divId,
                html: ''
                + '<div class="marker-clean">'
                + '<div style="width:100px;height:100px;position:absolute">'
                + '<div>'
                + '<canvas id="' + params.divId + '" width="100" height="100" style="left: 0px; top: 0px; position: absolute;"></canvas>'
                + '</div>'
                + '<table style="width:100%;height:100%;border:solid 0px;">'
                + '<tr valign=middle align=center>'
                + '<td><img  draggable="false" src="' + params.iconUrl + '" style="width:30px;height:30px"></td>'
                + '</tr>'
                + '</table>'
                + '</div>'
                + '</div>',
                className: 'non-outline',
                iconAnchor: [50, 50]
            });
            return icon;
        }
        //公有方法
        _self.setTemplate = function (type, template) {
            _template[type] = template;
        };
        _self.make = function (type, params) {
            params = params || {};
            var icon;
            var template = _template[type];
            if (template) {
                icon = template(params);
            }
            return icon;
        };
        //画svg形状
        _self.drawSVGShape = function (params) {
            var result = '';
            var width = params.width || 20;
            var height = params.height || 20;
            var stroke = params.stroke || "black";
            var fill = params.fill || "green";
            params.shape = params.shape || "rectangle";
            switch (params.shape) {
                case "circle": {
                    var padding = 4;
                    var strokeWidth = 1.8;
                    result = '<ellipse class="circle" cx="' + (width) / 2 + '" cy="' + (height) / 2 + '" rx="' + (width - padding) / 2 + '" ry="' + (height - padding) / 2 + '" stroke-width="' + strokeWidth + '" stroke="' + stroke + '" fill="' + fill + '" />'
                    break;
                }
                case "rectangle": {
                    var padding = 3;
                    var strokeWidth = 1.8;
                    result = '<rect class="rectangle"  x="' + padding + '" y="' + padding + '" width="' + (width - padding * 2) + '" height="' + (height - padding * 2) + '" stroke-width="' + strokeWidth + '" stroke="' + stroke + '" fill="' + fill + '" />'
                    break;
                }
                case "triangle": {
                    var strokeWidth = 1.8;
                    result = '<polygon points="' + (strokeWidth + "," + (width - 2 * strokeWidth)) + ' ' + ((width - 2 * strokeWidth) + "," + (width - 2 * strokeWidth)) + ' ' + ((width / 2 - strokeWidth / 2) + "," + strokeWidth) + '" stroke-width="' + strokeWidth + '" stroke="' + stroke + '" fill="' + fill + '"/>';
                    break;
                }
                case "diamond": {
                    var strokeWidth = 1.8;
                    result = '<polygon points="' + (0.5 * width + "," + strokeWidth) + ' ' + (strokeWidth + "," + 0.5 * height) + ' ' + (0.5 * width + "," + (height - strokeWidth)) + ' ' + ((width - strokeWidth) + "," + 0.5 * height) + '" stroke-width="' + strokeWidth + '" stroke="' + stroke + '" fill="' + fill + '"/>';
                    break;
                }
                case "bomb": {
                    var strokeWidth = 1.4;
                    var pointStr = "";
                    var pointList = [{"x": 0.4999999999999999, "y": 0}, {
                        "x": 0.577425656818339,
                        "y": 0.3392239669730528
                    }, {"x": 0.8909157412340148, "y": 0.18825509907063315}, {
                        "x": 0.6739738716752358,
                        "y": 0.46029159907573813
                    }, {"x": 0.9874639560909118, "y": 0.6112604669781571}, {
                        "x": 0.6395162127404403,
                        "y": 0.6112604669781572
                    }, {"x": 0.7169418695587793, "y": 0.9504844339512095}, {
                        "x": 0.5000000000000001,
                        "y": 0.6784479339461047
                    }, {"x": 0.2830581304412211, "y": 0.9504844339512096}, {
                        "x": 0.36048378725955993,
                        "y": 0.6112604669781574
                    }, {"x": 0.012536043909088246, "y": 0.6112604669781574}, {
                        "x": 0.32602612832476413,
                        "y": 0.46029159907573813
                    }, {"x": 0.10908425876598499, "y": 0.18825509907063337}, {
                        "x": 0.422574343181661,
                        "y": 0.33922396697305246
                    }, {"x": 0.4999999999999999, "y": 0}];
                    for (var i in pointList) {
                        pointStr += (width * pointList[i].x + "," + width * pointList[i].y + " ")
                    }
                    result = '<polygon points="' + pointStr + '" stroke-width="' + strokeWidth + '" stroke="' + stroke + '" fill="' + fill + '"/>';
                    break;
                }
                default: {

                }
            }
            return '<svg width="' + width + 'px" height="' + height + 'px">' + result + '</svg>';
        };
        return _self;
    };

    //配置选项
    var Configs = function (options) {
        //自身引用
        var _self = this;
        //外部参数引用
        var _options = options || {};
        //私有变量
        //类型，默认有标绘和形状两种配置
        var _types = ["shape", "marker"];
        var _configs = {
            "shape": {
                fillColor: '#3388ff',
                color:'#3388ff',
                weight: 2,
                opacity: 0.5,
                fill: true,
                fillOpacity: 0.2,
                deletable: false,
                draggable: false,
                editable: false,
                events: {
                    click: [],
                },
                context: {
                }
            },
            "marker": {
                deletable: false,
                draggable: false,
                editable: false,
                dataBinding: null,
                events: {
                    click: ["markerClick"],
                    contextmenu: [""]
                },
                context: {
                }
            }
        }

        //私有方法
        //公有方法
        _self.set = function (key, value) {
            if (_types.indexOf(key) == -1) {
                _types.push(key);
            }
            _configs[key] = value;
        }
        _self.get = function (key) {
            return _configs[key];
        }
        _self.merge = function (keys) {
            var configs = {};
            for (var i in keys) {
                var temp = _configs[keys[i]] || [];
                for (var k in temp) {
                    if (temp[k] && (typeof temp[k] == "object")) {
                        configs[k] = configs[k] || {};
                        for (var sk in temp[k]) {
                            configs[k][sk] = temp[k][sk];
                        }
                    } else {
                        configs[k] = temp[k];
                    }
                }
            }
            return configs;
        }
        _self.remove = function (key) {
            delete(_configs[key]);
        }
        _self.confings = function (key, value) {
            return _configs;
        };
        return _self;
    };

    //事件或消息处理函数的容器
    var Events = function (options) {
        //自身引用
        var _self = this;
        //外部参数引用
        var _options = options || {};
        //私有变量
        var _events = {
            mapCreated: function (obj, event) {
                console.info("测试map创建事件");
            },
            markerClick: function (obj, event) {
                var mf = event.target._map.mapFactory;
                if(obj.options.info.getDetectionType()=="detection"){
                    mf.getWebSocket().send(
                        JSON.stringify({
                            productTypeCode:obj.options.info.getProductTypeCode(),
                            productId:obj.options.info.getProductId()
                        }))
                }else if(obj.options.info.getType()=="target"){
                    var targetId = obj.options.info.getKey();
                    var infoData = {
                        data:obj.options.info.assembleInfo(obj.options.info.getData()),
                        isShape:false,
                        key:"info_"+targetId,
                        layer:"target",
                        detectionType:"alertTarget",
                        location:obj.options.info.getLocation(),
                        type:"targetInfo",
                        isTarget:true,
                        isVisible:true,
                        template:"alertInfo"
                    };
                    map.loadData([infoData]);
                }
            },
            markerContext: function (obj, event) {
                console.info("测试标绘右击事件");
            }
        };//事件容器
        var _mappings = {
            map: {
                created: ["mapCreated"]
            }
        };//对象类型值，和使用的事件模板名的映射关系，比图地图对象对象type默认为map，其他标绘则使用type字段
        //私有方法
        //公有方法
        _self.add = function (name, handler) {
            _events[name] = handler;
        };
        _self.get = function (name) {
            return _events[name];
        };
        _self.fire = function (name, obj, event) {
            if (_events[name]) _events[name](obj, event);
        };
        _self.setMapping = function (type, originEventName, eventNames) {
            _mappings[type] = _mappings[type] || {};
            _mappings[type][originEventName] = eventNames;
        };
        _self.addMapping = function (type, originEventName, eventNames) {
            _mappings[type] = _mappings[type] || {};
            _mappings[type][originEventName] = _mappings[type][originEventName] || [];
            for (var i in eventNames) {
                if (_mappings[type][originEventName].indexOf(eventNames[i]) == -1) {
                    _mappings[type][originEventName].push(eventNames[i]);
                }
            }
            //_mappings[type][originEventName]=_mappings[type][originEventName].concat(eventNames);
        };
        _self.removeMapping = function (type, originEventName) {
            if (originEventName) {
                if (_mappings[type]) delete(_mappings[type][originEventName]);
            } else {
                delete(_mappings[type]);
            }
        };
        _self.getMapping = function (type, originEventName) {
            if (_mappings[type]) return _mappings[type][originEventName]
        };
        return _self;
    };

    //索引容器
    var Clusters = function (options) {
        //自身引用
        var _self = this;
        //外部参数引用
        var _options = options || {};
        var _clusters = {};
        var _iconCreaters = {};
        _self.get = function (key) {
            return _clusters[key];
        };
        _self.remove = function (key) {
            delete(_clusters[key])
        };
        _self.set = function (key, obj) {
            if (_clusters[key]) return false;
            _clusters[key] = obj;
            return true;
        };
        _self.reset = function () {
            _clusters = {};
        };
        _self.getIconCreater = function (key) {
            return _iconCreaters[key];
        };
        _self.setIconCreater = function (key, fn) {
            _iconCreaters[key] = fn;
        };
    };

    //图层容器
    var Layers = function (options) {
        //自身引用
        var _self = this;
        //外部参数引用
        var _options = options || {};
        //私有变量
        var _mapLayerKeys = [];//地图图层key
        var _plotLayerKeys = [];//标绘图层key
        var _extraLayerKeys = [];//额外图层key，用户可自行添加，不影响基本标会图层，一般用于临时显示图层
        var _layers = {};//图层实体容器
        var _configs = {};//图层实体容器
        var _modifyTools = {};//图层编辑工具
        var _deleteTools = {};//图层删除工具
        var _currentMapLayerKey;
        var _defaultPlotLayerKey;
        //私有方法
        var _addMapLayer = function (config, map) {
            var key = config.id;
            var layer;
            if (_mapLayerKeys.indexOf(key) == -1) {
                layer = new L.TileLayer.WMS(config.serverUrl, {
                    layers: config.serverName,
                    format: 'image/png',
                    transparent: true,
                    tms: true,
                    attribution: config,
                    maxZoom: 22,
                    minZoom: 0,
                    unlimited: true
                });
                if (_mapLayerKeys.indexOf(key) == -1) {
                    _mapLayerKeys.push(key);
                }
                _layers[key] = layer;
                _configs[key] = config;
            }
            if (_currentMapLayerKey == null) {
                _currentMapLayerKey = key;
                layer.addTo(map)
                _configs[key].checked = true;
            }
            return layer;
        };

        var _addPlotLayer = function (config, map) {
            var key = config.id;
            var layer;
            if (_mapLayerKeys.indexOf(key) == -1) {
                layer = L.featureGroup();
                if (_plotLayerKeys.indexOf(key) == -1) {
                    _plotLayerKeys.push(key);
                }
                _layers[key] = layer;
                _configs[key] = config;
                //添加标绘图层时 初始化图层的编辑删除工具
                _deleteTools[key] = new L.EditToolbar.Delete(map, {
                    featureGroup: _layers[key]
                });
                _modifyTools[key] = new L.EditToolbar.Edit(map, {
                    featureGroup: _layers[key]
                });
            }
            if (_defaultPlotLayerKey == null) {
                _defaultPlotLayerKey = key;
            }
            layer.addTo(map);
            _configs[key].checked = true;
            return layer
        };
        //公有方法
        _self.reset = function () {
            _mapLayerKeys = [];//地图图层key
            _plotLayerKeys = [];//标绘图层key
            _extraLayerKeys = [];
            _layers = {};//图层实体容器
            _configs = {};//图层实体容器
            _modifyTools = {};//图层编辑工具
            _deleteTools = {};//图层删除工具
            _currentMapLayerKey = null;
            _defaultPlotLayerKey = null;
        };
        _self.create = function (config, map) {
            var result;
            if (config.category == "base") {
                result = _addMapLayer(config, map);
            } else {
                result = _addPlotLayer(config, map);
            }
            return result;
        };
        _self.switchLayer = function (id, map) {
            array = _mapLayerKeys;
            if (_layers[id]) {
                for (var i in array) {
                    if (array[i] != id && _layers[array[i]]) _layers[array[i]].removeFrom(map);
                    _configs[array[i]].checked = false;
                }
                if (!map.hasLayer(_layers[id])) _layers[id].addTo(map);
                _configs[id].checked = true;
                _currentMapLayerKey = id;

                if (_layers[id].options.attribution.type != "jt") {
                    map.dragging.enable();
                    map.touchZoom.enable();
                    map.doubleClickZoom.enable();
                    map.scrollWheelZoom.enable();
                } else {
                    map.dragging.disable();
                    map.touchZoom.disable();
                    map.doubleClickZoom.disable();
                    map.scrollWheelZoom.disable();
                }

            }
        };
        _self.toggleLayer = function (id, map) {
            var hasLayer;
            var layer = _layers[id];
            if (layer) {
                if (map.hasLayer(layer)) {
                    layer.removeFrom(map);
                    _configs[id].checked = false;
                    hasLayer = false;
                } else {
                    layer.addTo(map);
                    _configs[id].checked = true;
                    hasLayer = true;
                }
            }
            return hasLayer;
        };
        _self.get = function (key) {
            return _layers[key];
        };
        _self.eachMapLayer = function (handler) {
            if (handler) {
                for (var i in _plotLayerKeys) {
                    handler(_layers[_plotLayerKeys[i]]);
                }
            }
        };
        _self.eachPlotLayer = function (handler) {
            if (handler) {
                for (var i in _plotLayerKeys) {
                    handler(_layers[_plotLayerKeys[i]]);
                }
            }
        };
        _self.eachMarker = function (handler, layerId) {
            if (handler) {
                if (layerId) {
                    var layer = _layers[layerId];
                    layer && layer.eachLayer(function (marker) {
                        if (marker instanceof L.MarkerClusterGroup) {
                            marker.eachLayer(function (m) {
                                if (m.options.info) {
                                    handler(m, marker);
                                }
                            });
                        } else {
                            if (marker.options.info) {
                                handler(marker, layer);
                            }
                        }
                    });
                } else {
                    for (var i in _plotLayerKeys) {
                        var layer = _layers[_plotLayerKeys[i]];
                        layer && layer.eachLayer(function (marker) {
                            if (marker instanceof L.MarkerClusterGroup) {
                                marker.eachLayer(function (m) {
                                    if (m.options.info) {
                                        handler(m, marker);
                                    }
                                });
                            } else {
                                if (marker.options.info) {
                                    handler(marker, layer);
                                }
                            }
                        });
                    }
                }
            }
        };
        _self.addExtraLayer = function (config, map) {
            var key = config.id;
            var layer;
            if (_extraLayerKeys.indexOf(key) == -1) {
                layer = L.featureGroup();
                if (_extraLayerKeys.indexOf(key) == -1) {
                    _extraLayerKeys.push(key);
                }
                _layers[key] = layer;
                layer.addTo(map);
            } else {
                layer = _layers[key];
            }
            return layer;
        };
        _self.removeExtraLayer = function (key) {
            var index = _extraLayerKeys.indexOf(key);
            var layer = _layers[key];
            if (index != -1) {
                _extraLayerKeys.splice(index, 1);
            }
            if (layer) {
                delete _layers[key];
                layer.clearLayers();
                if (layer._map) {
                    layer.removeFrom(layer._map);
                }
            }
        };
        _self.getMapLayerKeys = function () {
            return _mapLayerKeys;
        };
        _self.getPlotLayerKeys = function () {
            return _plotLayerKeys;
        };
        _self.getMapLayers = function () {
            var result = {};
            for (var i in _mapLayerKeys) {
                var key = _mapLayerKeys[i];
                result[_configs[key].name] = _layers[key]
            }
            return result;
        };
        _self.getPlotLayers = function () {
            var result = {};
            for (var i in _plotLayerKeys) {
                var key = _plotLayerKeys[i];
                result[_configs[key].name] = _layers[key]
            }
            return result;
        };
        _self.getDefaultPlotLayer = function () {
            return _layers[_defaultPlotLayerKey];
        };
        _self.getDefaultPlotLayerKey = function () {
            return _defaultPlotLayerKey;
        };
        _self.getCurrentMapLayer = function () {
            return _layers[_currentMapLayerKey];
        };
        _self.getCurrentMapLayerKey = function () {
            return _currentMapLayerKey;
        };
        _self.getConfig = function (key) {
            return _configs[key] || {};
        };
        _self.enableDeleteTools = function (layerIds) {
            layerIds = layerIds || _plotLayerKeys;
            for (var i in layerIds) {
                var key = layerIds[i];
                if (!_deleteTools[key].enabled()) {
                    _deleteTools[key].enable();
                }
            }
        };
        _self.enableModifyTools = function (layerIds) {
            layerIds = layerIds || _plotLayerKeys;
            for (var i in layerIds) {
                var key = layerIds[i];
                if (!_modifyTools[key].enabled()) {
                    _modifyTools[key].enable();
                }
            }
        };
        _self.disableDeleteTools = function (isSubmit, layerIds) {
            var deleted = [];
            layerIds = layerIds || _plotLayerKeys;
            for (var i in layerIds) {
                var key = layerIds[i];
                if (_deleteTools[key].enabled()) {
                    if (isSubmit == true) {
                        var deletedMarkers = _deleteTools[key]._deletedLayers._layers;
                        for (var i in deletedMarkers) {
                            deleted.push(deletedMarkers[i]);
                        }
                        _deleteTools[key].save();
                    } else {
                        _deleteTools[key].revertLayers();
                    }
                    _deleteTools[key].disable();
                }
            }
        };
        _self.disableModifyTools = function (isSubmit, layerIds) {
            layerIds = layerIds || _plotLayerKeys;
            for (var i in layerIds) {
                var key = layerIds[i];
                if (_modifyTools[key].enabled()) {
                    if (isSubmit == true) {
                        _modifyTools[key].save();
                    } else {
                        _modifyTools[key].revertLayers();
                    }
                    _modifyTools[key].disable();
                }
            }
        }
        return _self;
    };

    //工具容器
    var Tools = function (options) {
        //自身引用
        var _self = this;
        //外部参数引用
        var _options = options || {};
        //私有变量
        var _drawer = {};
        var _drawTools = {};
        var _customDrawTool = {};
        //私有方法
        //公有方法
        _self.initDrawTools = function (map) {
            if (map) {
                _drawTools = {
                    semicircle: new L.Draw.Semicircle(map, {}),
                    ellipse: new L.Draw.Ellipse(map, {}),
                    polyline: new L.Draw.Polyline(map, {}),
                    polyarrow: new L.Draw.Polyarrow(map, {}),
                    curveline: new L.Draw.Curveline(map, {}),
                    polygon: new L.Draw.Polygon(map, {}),
                    rectangle: new L.Draw.Rectangle(map, {}),
                    circle: new L.Draw.Circle(map, {})
                }
            }
        };
        _self.stopDrawTools = function () {
            for (var key in _drawTools) {
                if (_drawTools[key].enabled()) {
                    _drawTools[key].disable();
                }
            }
            for (var key in _customDrawTool) {
                if (_customDrawTool[key].enabled()) {
                    _customDrawTool[key].disable();
                }
            }
        };
        _self.startDrawTool = function (key) {
            _self.stopDrawTools();
            if (_customDrawTool[key]) {
                _customDrawTool[key].enable();
            } else if (_drawTools[key]) {
                _drawTools[key].enable();
            }
        };
        _self.setDrawTool = function (type, tool) {
            _customDrawTool[type] = tool;
        }
        _self.setDrawer = function (type, handler) {
            _drawer[type] = handler;
        }
        _self.getDrawer = function (type) {
            return _drawer[type];
        }
        return _self;
    };

    leaflet.Map = function (options) {
        //自身引用
        var _self = this;
        //外部参数引用
        var _options = options || {};
        //私有变量
        var _map;//leaflet原生map对象
        var _svg = L.svg();//画形状的容器
        var _readUrl = _options.readUrl;
        var _readMapUrl = _options.readMapUrl;
        var _readParams = _options.readParams || {};
        var _saveUrl = _options.saveUrl;
        var _menuConfig = _options.menuConfig;
        var _paletteConfig = _options.paletteConfig;

        var _deletedObjs = [];
        var _currentObj = null;
        var _palettePath = "";
        var _paletteObj = {};
        //地图图层控制
        var layerControl;
        //所有markers;
        var _markers = [];
        var _webSocket = {};

        //私有函数
        var _reset = function (params) {
            params = params || {};
            _self.LAYERS.reset();
            _self.TOOLS.stopDrawTools();
            _deletedObjs = [];
            _currentObj = null;
            if (params.resetPalette != false) {
                _palettePath = "";
                _paletteObj = {};
            }
            if (layerControl) {
                layerControl.remove();
                layerControl = {};
            }


        };

        var _bindShapeEvents = function (shape, config) {
            var events = config.events || {};
            //点击事件
            shape.on("click", function (e) {
                _currentObj = e.target;
                if (events["click"]) {
                    for (var i in events["click"]) {
                        _self.EVENTS.fire(events["click"][i], _currentObj, e);
                    }
                }
            });
        };

        var _drawShape = function (obj) {
            var result = {};
            var shape = obj.getShape();
            var type = obj.getType();
            var styles = obj.getStyles() || {};
            var config = _self.CONFIGS.merge(["shape", shape, type]);
            var opts = {
                stroke:(styles.stroke == null ? config.stroke : styles.stroke),
                color:(styles.color == null ? config.color : styles.color),
                opacity:(styles.opacity == null ? config.opacity : styles.opacity),
                weight: (styles.weight == null ? config.weight : styles.weight),
                dashArray: (styles.dashArray == null ? config.dashArray : styles.dashArray),

                fillColor: (styles.fillColor == null ? config.fillColor : styles.fillColor),
                fill: (styles.fill == null ? config.fill : styles.fill),
                fillOpacity: (styles.fillOpacity == null ? config.fillOpacity : styles.fillOpacity),

                deletable: (styles.deletable == null ? config.deletable : styles.deletable),
                renderer: _svg,
                info: obj
            };
            if (styles.editable == false || config.editable == false) {
                opts.editable = false;
            }

            if (obj.getParentId()) {
                opts.interactive = false;
            }

            switch (shape) {
                case "semicircle":
                case "circle": {
                    opts.radius = obj.getRadius();
                    var direction = obj.getDirection();
                    var angle = obj.getAngle();
                    var center = (obj.getCenter() || "0 0").split(" ");
                    opts.startAngle = direction;
                    opts.stopAngle = direction + angle;
                    result = L.semiCircle(center, opts);
                    break;
                }
                case "rectangle": {
                    var latlngs = [];
                    var points = obj.getPoints();
                    for (var i in points) {
                        latlngs.push(points[i].split(" "));
                    }
                    result = L.rectangle(latlngs, opts);
                    break;
                }
                case "polygon": {
                    var latlngs = [];
                    var points = obj.getPoints();
                    for (var i in points) {
                        latlngs.push(points[i].split(" "));
                    }
                    result = L.polygon(latlngs, opts);
                    break;
                }
                case "polyarrow": {
                    var latlngs = [];
                    var points = obj.getPoints();
                    for (var i in points) {
                        latlngs.push(points[i].split(" "));
                    }
                    opts.subType = "arrow";
                    opts.fill = false;
                    opts.weight = opts.weight * 6;
                    result = L.polyline(latlngs, opts);
                    var leftPolyline = L.polyline(latlngs, {
                        color: (styles.color == null ? config.color : styles.color),
                        weight: (styles.weight == null ? config.weight : styles.weight),
                        dashArray: (styles.dashArray == null ? config.dashArray : styles.dashArray),
                        opacity: 1,
                        offset: -10,
                        renderer: _svg,
                    });
                    var rightPolyline = L.polyline(latlngs, {
                        color: (styles.color == null ? config.color : styles.color),
                        weight: (styles.weight == null ? config.weight : styles.weight),
                        dashArray: (styles.dashArray == null ? config.dashArray : styles.dashArray),
                        opacity: 1,
                        offset: 10,
                        renderer: _svg,
                    });
                    var arrowOpts = {
                        color: (styles.color == null ? config.color : styles.color),
                        weight: (styles.weight == null ? config.weight : styles.weight) * 2,
                        opacity: 1,
                        fill: false,
                        fillOpacity: (styles.fillOpacity == null ? config.fillOpacity : styles.fillOpacity),
                        renderer: _svg,
                    };
                    result.options.partObjs = [leftPolyline, rightPolyline, L.polylineDecorator(result, {
                        patterns: [{
                            offset: '100%',
                            repeat: 0,
                            symbol: L.Symbol.arrowHead({
                                pixelSize: 30,
                                polygon: false,
                                pathOptions: arrowOpts
                            })
                        }]
                    })];
                    break;
                }
                case "polyline": {
                    var latlngs = [];
                    var points = obj.getPoints();
                    for (var i in points) {
                        latlngs.push(points[i].split(" "));
                    }
                    result = L.polyline(latlngs, opts);
                    break;
                }
                case "curveline": {
                    var paths = [];
                    var points = obj.getPoints();
                    for (var i in points) {
                        if (points[i].split(" ").length == 2) {
                            paths.push(points[i].split(" "));
                        } else {
                            paths.push(points[i]);
                        }
                    }
                    opts.fill = false;
                    result = L.curve(paths, opts);
                    break;
                }
                case "ellipse": {
                    var center = (obj.getCenter() || "0 0").split(" ");
                    var direction = obj.getDirection();
                    var width = obj.getWidth();
                    var length = obj.getLength();
                    result = L.ellipse(center, [length, width], direction, opts);
                    break;
                }
                default:
                    var drawer = _self.TOOLS.getDrawer(shape);
                    drawer && (result = drawer(obj, opts));
            }
            if (result && obj.isVirtual() != true) {
                _bindShapeEvents(result, config);
            }
            return result;
        };

        var _drawMarker = function (obj) {
            var result;
            var template = obj.getTemplate();
            var styles = obj.getStyles() || {};
            var type = obj.getType();
            var data = obj.getData();
            var config = _self.CONFIGS.merge(["marker", type, template]);
            var bindingData = JSON.parse(JSON.stringify(data || {}));
            if (config.dataBinding) {
                bindingData = config.dataBinding(bindingData);
            }
            var divIcon = _self.ICONS.make(template, bindingData);
            //画标绘
            var location = (obj.getLocation() || "0 0").split(" ");
            var options = {
                className: 'non-outline',
                deletable: (styles.deletable == null ? config.deletable : styles.deletable),
                draggable: (styles.draggable == null ? config.draggable : styles.draggable),
                editable: (styles.editable == null ? config.editable : styles.editable),
                info: obj
            }
            divIcon && (options.icon = divIcon)
            result = L.marker(location, options);
            if (obj.isVirtual() != true) {
                var events = config.events || {};
                //点击事件
                result.on("click", function (e) {
                    _currentObj = e.target;
                    if (events["click"]) {
                        for (var i in events["click"]) {
                            _self.EVENTS.fire(events["click"][i], _currentObj, e);
                        }
                    }
                });
            }
            return result;
        };

        var _draw = function (objs) {
            objs = objs || [];
            for (var i in objs) {
                var obj = objs[i];
                var marker = null;
                if (obj instanceof leaflet.Shape) {
                    marker = _drawShape(obj);//画形状
                } else {
                    marker = _drawMarker(obj);//画标绘
                }
                if (!marker) continue;
                var layerKey = obj.getLayer() || _self.LAYERS.getDefaultPlotLayerKey();
                var layer = _self.LAYERS.get(layerKey);
                var cluster = _self.CLUSTERS.get(layerKey);
                if (obj instanceof leaflet.Shape) {
                    layer && layer.addLayer(marker);
                } else {
                    if (cluster) {
                        cluster.addLayer(marker);
                    } else {
                        layer && layer.addLayer(marker);
                    }
                }
                _self.addMarker(marker);

                //报警显示
                if (obj.getData().type && obj.getData().type == "circle" && obj.getData().autoShow) {
                    $("#" + obj.getData().divId).circle({
                        fillColor: obj.getData().fillColor,
                        lineColor: obj.getData().lineColor
                    });
                }
            }
        };

        var _createLayers = function (layers) {
            _self.CLUSTERS.reset();
            for (var i in layers) {
                var layer = layers[i];
                _self.LAYERS.create(layer, _map);
                if (layer.category != "base") {
                    if (layer.canCluster != false) {
                        var iconCreater = _self.CLUSTERS.getIconCreater(layer.id);
                        var cluster;
                        if (iconCreater) {
                            cluster = L.markerClusterGroup({iconCreateFunction: iconCreater});
                        } else {
                            cluster = L.markerClusterGroup();
                        }
                        cluster._featureGroup.on("layeradd", function (e) {
                            if (e.layer.options.info) {
                                var layerKey = e.layer.options.info.getLayer();
                                if (e.target._map) {
                                    var layer = e.target._map.mapFactory.LAYERS.get(layerKey);
                                    var subs = e.layer.options.info.subObjs || [];
                                    for (var i in subs) {
                                        subs[i].addTo(layer)
                                    }
                                }
                            }
                        });
                        cluster._featureGroup.on("layerremove ", function (e) {
                            if (e.layer.options.info) {
                                var layerKey = e.layer.options.info.getLayer();
                                if (e.target._map) {
                                    var layer = e.target._map.mapFactory.LAYERS.get(layerKey);
                                    var subs = e.layer.options.info.subObjs || [];
                                    for (var i in subs) {
                                        subs[i].removeFrom(layer)
                                    }
                                }
                            }
                        });
                        // _self.CLUSTERS.set(layer.id, cluster);
                        _self.LAYERS.get(layer.id).addLayer(cluster);
                    } else {
                    }
                }
            }
        };

        var _bindEvents = function () {
            //监听标绘绘制事件
            _map.on(L.Draw.Event.CREATED, function (event) {
                var shape = event.layer;
                shape.options.info = new leaflet.Shape();
                shape.options.info.setType("area");
                if (shape instanceof L.Rectangle) {
                    shape.options.info.setShape("rectangle");
                } else if (shape instanceof L.Polygon) {
                    var selectObj = _self.getCurrentObj();
                    shape.options.info.setShape("polygon");
                    shape.options.info.setParentId(selectObj.options.info.getKey());
                    shape.options.info.setTempId(Math.uuid());
                    shape.options.interactive = false;//不允许子级选中
                } else if (shape instanceof L.Polyline) {
                    if (shape.options.subType) {
                        if (shape.options.subType == "arrow") {
                            shape.options.info.setShape("polyarrow");
                        } else {
                            shape.options.info.setShape(shape.options.subType);
                        }
                    } else {
                        shape.options.info.setShape("polyline");
                    }
                } else if (shape instanceof L.Curve) {
                    shape.options.info.setShape("curveline");
                } else if ((shape instanceof L.Circle) || (shape instanceof L.semiCircle)) {
                    shape.options.info.setShape("circle");
                } else if (shape instanceof L.Ellipse) {
                    shape.options.info.setShape("ellipse");
                } else {
                    ;
                }

                var layerKey = shape.options.info.getLayer() || _self.LAYERS.getDefaultPlotLayerKey()
                var layer = _self.LAYERS.get(layerKey);
                layer && layer.addLayer(shape);
                shape.options.info.setLayer(layerKey);

                _self.doAfterDraw(shape);

                var shapeType = shape.options.info.getShape();
                var type = shape.options.info.getType();
                var config = _self.CONFIGS.merge(["shape", shapeType, type]);
                _bindShapeEvents(shape, config)

                var mapping = _self.EVENTS.getMapping("map", "created") || [];
                for (var i in mapping) {
                    _self.EVENTS.fire(mapping[i], _map, event);
                }
                for (var i in shape.options.partObjs) {
                    layer && layer.addLayer(shape.options.partObjs[i]);
                }
            });


            _map.on("move", function (event) {
                var mapping = _self.EVENTS.getMapping("map", "move") || [];
                for (var i in mapping) {
                    _self.EVENTS.fire(mapping[i], _map, event);
                }
            });

            _map.on("layeradd", function (event) {
                var mapping = _self.EVENTS.getMapping("map", "layeradd") || [];
                for (var i in mapping) {
                    _self.EVENTS.fire(mapping[i], _map, event);
                }
            });

            _map.on("keypress", function (event) {
                var mapping = _self.EVENTS.getMapping("map", "keypress") || [];
                for (var i in mapping) {
                    _self.EVENTS.fire(mapping[i], _map, event);
                }
            });

            _map.on("zoomend", function (event) {
                var zoomLevel = event.target.getZoom();
                console.info(zoomLevel);
            })
        };
        //公有变量
        _self.TEMPS = {};//临时变量
        _self.ICONS = new Icons();//标绘图标
        _self.EVENTS = new Events();//事件或消息处理函数的容器
        _self.CONFIGS = new Configs();//标绘配置
        _self.LAYERS = new Layers();//图层容器
        _self.CLUSTERS = new Clusters();//聚类容器
        _self.TOOLS = new Tools();//工具容器，目前仅有画形状的工具
        //公有函数
        //get set函数
        _self.setReadUrl = function (readUrl) {
            _readUrl = readUrl;
        };
        _self.setReadMapUrl = function (readMapUrl) {
            _readMapUrl = readMapUrl;
        };
        _self.setReadParams = function (readParams) {
            _readParams = readParams
        };
        _self.setSaveUrl = function (saveUrl) {
            _saveUrl = saveUrl;
        };
        _self.setMenuConfig = function (menuConfig) {
            _menuConfig = menuConfig;
        };
        _self.setPaletteConfig = function (paletteConfig) {
            _paletteConfig = paletteConfig;
        };
        _self.setDeletedObjs = function (objs) {
            _deletedObjs = objs;
        };
        _self.getMap = function () {
            return _map;
        };
        _self.getOptions = function () {
            return _options;
        };
        _self.getReadParams = function () {
            return _readParams;
        };
        _self.getReadUrl = function () {
            return _readUrl;
        };
        _self.getReadMapUrl = function () {
            return _readMapUrl;
        };
        _self.getSaveUrl = function () {
            return _saveUrl;
        };
        _self.getCurrentObj = function () {
            return _currentObj;
        };
        _self.getDeletedObjs = function () {
            return _deletedObjs;
        };
        _self.getMarkers = function () {
            return _markers;
        };
        _self.setMarkers = function (markers) {
            _markers = markers;
        };
        _self.addMarker = function (marker) {
            _markers.push(marker);
        };
        _self.getMarkerById = function (markerId) {
            for(var m in _markers){
                if(_markers[m].options.info.getKey()==markerId){
                    return _markers[m];
                }
            }
        };
        _self.setWebSocket = function (websocket) {
            _webSocket = websocket;
        };
        _self.getWebSocket = function () {
            return _webSocket;
        };
        //地图初始化
        _self.init = function () {
            //参数初始化
            _options.id = _options.id || "map";
            _options.center = _options.center || {x: 28.20337, y: 112.92726};
            _options.zoomLevel = _options.zoomLevel || 15;
            _map = new L.Map(_options.id, {
                //地图中心位置
                center: new L.LatLng(_options.center.x, _options.center.y),
                //默认缩放等级
                zoom: _options.zoomLevel,
                minZoom: 3,
                maxZoom: 22,
                contextmenu: true,
                zoomControl: false,
                zoomSnap: 0.5
            });
            _map.mapFactory = _self;
            if (_options.hasMousePosition != false) {
                //右下角鼠标位置信息
                L.control.mousePosition({}).addTo(_map);
            }
            if (_options.hasScaleInfo != false) {
                //缩放时左下角显示比例
                L.control.scale().addTo(_map);
            }
            _bindEvents();
        };

        _self.buildMap = function () {
            _reset();

            for (var i in _map._layers) {
                _map.removeLayer(_map._layers[i])
            }

            //构建图层并加入地图
            _createLayers(_options.layers);

        };

        _self.removeAllMarkers=function(){
            _self.LAYERS.eachMarker(function(marker,layer){
                marker.removeFrom(layer);
            });
        };

        _self.build = function(){
            _self.removeAllMarkers();
            //读取数据：标绘，形状
            _self.loadData(_options.markers);

        }

        _self.save = function () {
            var saveParams = {};
            for (var i in _readParams) {
                saveParams[i] = _readParams[i];
            }
            saveParams.data = _self.getData();
            var ajaxParams = {
                type: "POST",
                url: _saveUrl,
                data: {}
            };
            _self.doBeforeSave(saveParams, ajaxParams);
            $.ajax({
                type: ajaxParams.type,
                url: ajaxParams.url,
                contentType: ajaxParams.contentType,
                dataType: ajaxParams.dataType,
                data: ajaxParams.data,
                success: function (response) {
                    _self.read(_readParams, {isDataOnly: true});
                    _reset({resetPalette: false});
                    _self.doAfterSave(response, ajaxParams.data);
                }
            });
        };
        _self.savePartData = function (parentShape) {//保存部分数据
            var saveParams = {};
            for (var i in _readParams) {
                saveParams[i] = _readParams[i];
            }
            saveParams.data = _self.getDataByParentShape(parentShape);
            var ajaxParams = {
                type: "POST",
                url: _saveUrl,
                data: {}
            };
            _self.doBeforeSave(saveParams, ajaxParams);
            $.ajax({
                type: ajaxParams.type,
                url: ajaxParams.url,
                contentType: ajaxParams.contentType,
                dataType: ajaxParams.dataType,
                data: ajaxParams.data,
                success: function (response) {
                    $.modal.msgSuccess(response.msg);
                    if (response.data && response.data.markers) {
                        for (var m in response.data.markers) {
                            var dId = response.data.markers[m].tempId;
                            var id = response.data.markers[m].id;
                            if (dId) {
                                var destObj = _self.getObjByTempId(dId);
                                if (destObj) {
                                    destObj.options.info.setKey(id);
                                }
                            }
                        }
                    }
                }
            });
        };
        _self.saveCurrentData = function (currentObj) {
            var saveParams = {};
            for (var i in _readParams) {
                saveParams[i] = _readParams[i];
            }
            saveParams.data = [_self.assembleData(currentObj)];
            var ajaxParams = {
                type: "POST",
                url: _saveUrl,
                data: {}
            };
            _self.doBeforeSave(saveParams, ajaxParams);
            $.ajax({
                type: ajaxParams.type,
                url: ajaxParams.url,
                contentType: ajaxParams.contentType,
                dataType: ajaxParams.dataType,
                data: ajaxParams.data,
                success: function (response) {
                    $.modal.msgSuccess(response.msg);
                }
            });
        };

        _self.read = function(configs){
            $.ajax({
                type:"POST",
                url:_readUrl,
                data:_readParams,
                success: function (response) {
                    var mapData = {
                        readDataOnly:true,
                        markers: [],
                        contextMenus: [],
                    };
                    _self.doDuringRead(response, mapData);
                    for (var key in mapData) {
                        _options[key] = mapData[key];
                    }
                    configs = configs || {};
                    _self.build();
                    _self.doAfterRead();
                }
            });
        }

        _self.readMap = function (params) {
            _readParams = params || _readParams;
            _self.doBeforeRead(_readParams);
            $.ajax({
                type: "POST",
                url: _readMapUrl,
                data: _readParams,
                success: function (response) {
                    var mapData = {
                        palettes: {},
                        layers: [],
                        markers: [],
                        contextMenus: []
                    };
                    _self.doDuringRead(response, mapData);
                    for (var key in mapData) {
                        _options[key] = mapData[key];
                    }
                    //加载地图
                    _self.buildMap();
                    _self.doAfterRead();
                }
            });
        };

        _self.removeData = function () {
            _self.LAYERS.eachPlotLayer(function (layer) {
                layer.eachLayer(function (l) {
                    if (l instanceof L.MarkerClusterGroup) {
                        l.clearLayers();
                    } else {
                        l.removeFrom(layer);
                    }
                });
            })
        };

        _self.loadData = function (markers) {
            var data = _self.buildData(markers);
            _draw(data);
        };
        _self.loadObjs = function (objs) {
            _draw(objs);
        };
        _self.buildData = function (markers) {
            var markerObjs = [];
            var helper = function (obj) {
                var markerObj;
                var subs = [];
                if (obj.isShape == true) {
                    markerObj = new leaflet.Shape(obj);
                } else {
                    markerObj = new leaflet.Marker(obj);
                }
                for (var i in markerObj.getSubs()) {
                    subs.push(helper(markerObj.getSubs()[i]));
                }
                markerObj.setSubs(subs);
                return markerObj;
            }
            for (var i in markers) {
                var markerObj = helper(markers[i]);
                markerObjs.push(markerObj);
            }
            return markerObjs;
        };
        _self.assembleData = function (leafObj, isDeleted) {
            var markerObj = leafObj.options.info;
            if (markerObj && markerObj.isVirtual() != true) {
                //取数据前先要根据当前标绘的属性，更新一下对象经纬度，中心点，半径，长，宽，角度等属性
                if (markerObj instanceof leaflet.Shape) {
                    if (leafObj instanceof L.Rectangle) {
                        //矩形也属于多边形所以要放在多边形上面优先判断
                        var locations = leafObj._latlngs[0];
                        var points = [];
                        for (var k in locations) {
                            points.push(locations[k].lat + " " + locations[k].lng)
                        }
                        markerObj.setShape("rectangle");
                        markerObj.setPoints(points);
                    } else if (leafObj instanceof L.Polygon) {
                        var locations = leafObj._latlngs[0];
                        var points = [];
                        for (var k in locations) {
                            points.push(locations[k].lat + " " + locations[k].lng)
                        }
                        markerObj.setShape("polygon");
                        markerObj.setPoints(points);
                    } else if (leafObj instanceof L.Polyline) {
                        var locations = leafObj._latlngs;
                        var points = [];
                        for (var k in locations) {
                            points.push(locations[k].lat + " " + locations[k].lng)
                        }
                        if (leafObj.options.subType) {
                            if (leafObj.options.subType == "arrow") {
                                markerObj.setShape("polyarrow");
                            } else {
                                markerObj.setShape(leafObj.options.subType);
                            }
                        } else {
                            markerObj.setShape("polyline");
                        }
                        markerObj.setPoints(points);
                    } else if (leafObj instanceof L.Curve) {
                        var paths = leafObj.getPath();
                        var points = [];
                        for (var k in paths) {
                            if (paths[k] instanceof Array) {
                                points.push(paths[k][0] + " " + paths[k][1]);
                            } else {
                                points.push(paths[k]);
                            }
                        }
                        markerObj.setShape("curveline");
                        markerObj.setPoints(points);
                    } else if ((leafObj instanceof L.Circle) || (leafObj instanceof L.semiCircle)) {
                        markerObj.setShape("circle");
                        markerObj.setCenter(leafObj._latlng.lat + " " + leafObj._latlng.lng);
                        markerObj.setLocation(leafObj._latlng.lat + " " + leafObj._latlng.lng);
                        markerObj.setAngle((leafObj.options.stopAngle || 360) - (leafObj.options.startAngle || 0));
                        markerObj.setRadius(leafObj.getRadius());
                        markerObj.setDirection(leafObj.options.startAngle || 0);
                    } else if (leafObj instanceof L.Ellipse) {
                        markerObj.setShape("ellipse");
                        markerObj.setCenter(leafObj._latlng.lat + " " + leafObj._latlng.lng);
                        markerObj.setLocation(leafObj._latlng.lat + " " + leafObj._latlng.lng);
                        markerObj.setLength(leafObj._mRadiusX);
                        markerObj.setWidth(leafObj._mRadiusY);
                        markerObj.setDirection(leafObj._tiltDeg);
                    } else {
                        ;
                    }
                } else {
                    markerObj.setLocation(leafObj._latlng.lat + " " + leafObj._latlng.lng);
                }
                if (isDeleted == true) {
                    markerObj.setDeleted(true);
                }
                //更新完毕
                return markerObj.toJson();
            }
        };
        _self.getData = function () {
            var data = [];
            var keys = _self.LAYERS.getPlotLayerKeys();
            for (var i in keys) {
                var layer = _self.LAYERS.get(keys[i]);
                var markers = layer.getLayers();
                for (var j in markers) {
                    var leafObj = markers[j];
                    if (leafObj instanceof L.MarkerClusterGroup) {
                        var clusterLayers = leafObj.getLayers();
                        for (var k in clusterLayers) {
                            var jsonObj = _self.assembleData(clusterLayers[k]);
                            jsonObj && data.push(jsonObj)
                        }
                    } else {
                        var jsonObj = _self.assembleData(leafObj);
                        jsonObj && data.push(jsonObj)
                    }
                }
            }
            return data;
        };
        _self.getDataByParentShape = function (deteciontShape) {
            var data = [];
            var subAreas = deteciontShape.options.info.getContainAreas(_self);
            var slibings = deteciontShape.options.info.getSlibingMarkers(_self);

            var parentObj = _self.assembleData(deteciontShape);
            parentObj && data.push(parentObj)

            var areas = subAreas.concat(slibings);
            for (var m in areas) {
                var leafObj = areas[m];
                var jsonObj = _self.assembleData(leafObj);
                jsonObj && data.push(jsonObj)
            }
            return data;
        };
        _self.getObjByTempId = function (tempId) {
            var keys = _self.LAYERS.getPlotLayerKeys();
            for (var i in keys) {
                var layer = _self.LAYERS.get(keys[i]);
                var markers = layer.getLayers();
                for (var j in markers) {
                    var leafObj = markers[j];
                    if (leafObj.options.info && leafObj.options.info instanceof leaflet.Shape) {
                        var tId = leafObj.options.info.getTempId();
                        if (tId = tempId) {
                            return leafObj;
                        }
                    }
                }
            }
        };
        _self.removeMap = function () {
            _map.remove();
        }
        _self.getDeletedData = function () {
            var data = [];
            for (var i in _deletedObjs) {
                var leafObj = _deletedObjs[i];
                var jsonObj = _self.assembleData(leafObj, true);
                jsonObj && data.push(jsonObj)
            }
            return data;
        };
        _self.doBeforeSave = function (params) {
        };
        _self.doAfterSave = function (response) {
        };
        _self.doBeforeRead = function (params) {
        };
        _self.doDuringRead = function (response, data) {

        };
        _self.doAfterRead = function () {

        };
        _self.doAfterDraw = function (shape) {
        };
        _self.doAfterDrag = function (e, data) {
        };
    };
    //静态方法
    leaflet.Factory = {};
    leaflet.Factory.init = function (options) {
        var map = new leaflet.Map(options);
        map.init();
        return map;
    };
    leaflet.Extra = {};
    leaflet.Extra.UUID = function () {
        function S4() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    };
    leaflet.Extra.infoBox = function (divId) {
        var obj = $("#" + divId);
        var html = ''
            + '<div class="infoBox">'
            + '<div class="infoBox-title">'
            + '<span></span>'
            + '<i class="infoBox-close fa fa-times"></i>'
            + '</div>'
            + '<div class="infoBox-body">'
            + '</div>'
            + '</div>';
        obj.html(html);
        obj.find(".infoBox-close").on({
            click: function (e) {
                var p = $(e.target).parent().parent();
                p.addClass("infoBox-hide");
            }
        });
        obj.on({
            mouseenter: function (e) {
                var p = $(this).find(".infoBox");
                if (p.hasClass("infoBox-hide")) {
                    p.removeClass("infoBox-hide");
                }
            }
        });
        return {
            obj: obj,
            set: function (html) {
                obj.find(".infoBox-body").html(html);
            },
            setTitle: function (title) {
                obj.find(".infoBox-title").find("span").html(title);
            },
            show: function () {
                obj.find(".infoBox").removeClass("infoBox-hide");
            },
            hide: function () {
                obj.find(".infoBox").addClass("infoBox-hide");
            },
        }
    };
})()

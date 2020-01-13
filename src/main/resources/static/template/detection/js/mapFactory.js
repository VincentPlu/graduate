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
        var _deviceType="";
        var _deviceCode="";

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
            _deviceCode = _options.deviceCode || _deviceCode;
            _deviceType = _options.deviceType || _deviceType;
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
        _self.getDeviceType = function(){
            return _deviceType;
        };
        _self.setDeviceType = function(deviceType){
            _deviceType=deviceType;
        };
        _self.getDeviceCode = function(){
            return _deviceCode;
        }
        _self.setDeviceCode = function(deviceCode){
            _deviceCode = deviceCode;
        }

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
                detectionType: obj.getDetectionType(),
                zoneId: obj.getZoneId(),
                deviceCode:obj.getDeviceCode(),
                deviceType:obj.getDeviceType(),
                status: obj.getStatus()
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
                width: obj.getWidth(),
                zoneId:obj.getZoneId(),
                deviceCode:obj.getDeviceCode(),
                deviceType:obj.getDeviceType(),
                status: obj.getStatus()
            }
            json.isShape = true;
            obj.makeSubJsonObjs(json, obj.getSubs())
            return json;
        };
        return _init();
    };

    //右键菜单
    var ContextMenus = function (options) {
        var _self = this;
        var _options = options || {};
        var menus = {};
        _self.init = function (options) {
            var _options = options || {};
            for (var index in _options) {
                var type = _options[index].detectionType;
                var name = _options[index].eventName;
                var parentId = _options[index].parentId;
                var menuName = _options[index].menuName;
                var id = _options[index].id;

                var sub = {
                    parentId: parentId,
                    id: id,
                    eventName: name,
                    type: "item",
                    menuName: menuName
                }

                if (parentId == "0") {
                    if (menus.hasOwnProperty(type)) {
                        menus[type][name] = sub;
                    } else {
                        menus[type] = {};
                        menus[type][name] = sub;
                    }
                }
                _self.assembleSubMenus(menus[type], _options);
            }
        }
        _self.assembleSubMenus = function (parentMenus, allMenus) {
            for (var m in parentMenus) {
                var parentId = parentMenus[m].id;
                if (parentId) {
                    var subMenus = [];
                    for (var n in allMenus) {
                        var pId = allMenus[n].parentId;
                        if (pId == parentId) {
                            var sub = {
                                parentId: pId,
                                id: allMenus[n].id,
                                eventName: allMenus[n].eventName,
                                menuName: allMenus[n].menuName,
                                type: "item"
                            }
                            subMenus.push(sub);
                        }
                    }
                    parentMenus[m]["items"] = subMenus;
                    _self.assembleSubMenus(subMenus, allMenus);
                }
            }
        }

        _self.getContextMenuByType = function (type) {
            if (menus.hasOwnProperty(type)) {
                return menus[type];
            }
            return null;
        }
        _self.getContextMenusByParentId = function (parentId) {
            var tt = {};
            for (var index in _options) {
                var type = _options[index].detectionType;
                var name = _options[index].eventName;
                var tempParentId = _options[index].parentId;
                var menuName = _options[index].menuName;

                var sub = {
                    parentId: tempParentId,
                    name: name,
                    menuName: menuName
                }

                if (tempParentId == parentId) {
                    tt[name] = sub;
                }
            }
            return tt;
        }
    }

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
                    + '<table style="width:100%;height:100%;">'
                    + '<tr valign=middle align=center>'
                    + '<td><img  draggable="false" src="' + params.iconUrl + '" style="width:30px;height:30px"></td>'
                    + '</tr>'
                    + '</table>'
                    + '</div>'
                    + '</div>',
                className: 'non-outline'
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
                color: '#98aa29',
                weight: 4,
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
                    "modify": {
                        text: "编辑",
                        callback: function (e) {
                            var mf = this.mapFactory;
                            var obj = mf.getCurrentObj()
                            if (obj) {
                                if (!obj.editing.enabled()) {
                                    obj.editing.enable();
                                } else {
                                    obj.editing.disable();
                                }
                            }
                        }
                    },
                    "delete": {
                        text: "删除",
                        callback: function (e) {
                            var mf = this.mapFactory;
                            var obj = mf.getCurrentObj()
                            if (obj) {
                                mf.getDeletedObjs().push(obj);
                                obj.removeFrom(mf.LAYERS.get(obj.options.info.getLayer()));
                                var subObjs = obj.options.info.subObjs;
                                for (var i in subObjs) {
                                    var layer = subObjs[i].options.info.getLayer();
                                    mf.getDeletedObjs().push(subObjs[i]);
                                    subObjs[i].removeFrom(mf.LAYERS.get(layer));
                                }
                                var partObjs = obj.options.partObjs;
                                for (var i in partObjs) {
                                    partObjs[i].remove();
                                }
                                var mapping = mf.EVENTS.getMapping("shape", "deleted") || [];
                                for (var i in mapping) {
                                    mf.EVENTS.fire(mapping[i], obj, e);
                                }
                            }
                        }
                    },
                    "draw_zone": {
                        text: "绘制告警区",
                        callback: function (e) {

                        }
                    },
                    "move_zone": {
                        text: "移动探测区域",
                        callback: function (e) {
                            var mf = this.mapFactory;
                            var obj = mf.getCurrentObj();
                            if (obj) {
                                obj.editing.enable();
                            }
                        }
                    },
                    "calibration_zone": {
                        text: "校准探测区",
                        callback: function (e) {
                            $("#rightPanel").css('display', 'block');
                        }
                    },
                    "finish_move_zone": {
                        text: "结束移动探测区",
                        callback: function (e) {
                            var mf = this.mapFactory;
                            var obj = mf.getCurrentObj();
                            if (obj) {
                                obj.editing.disable();
                            }
                            mf.savePartData(obj);
                        }
                    },
                    "defence_zone": {
                        text: "布防/撤防",
                        callback: function (e) {
                            var mf = this.mapFactory;
                            var obj = mf.getCurrentObj();
                            $.ajax({
                                url: ctx + "gis/detectionZone/changeStatus",
                                type: "post",
                                data: {
                                    id: obj.options.info.getZoneId(),
                                    deviceId:obj.options.info.getKey(),
                                    productId:obj.options.info.getProductId()
                                },
                                success: function (response) {
                                    $.modal.msgSuccess(response.msg);
                                    obj.setStyle({
                                        fillColor: response.data.status == "1" ? "#98aa29" : "#aaaaaa"
                                    });

                                    var areas = obj.options.info.getContainAreas(mf);
                                    for (var m in areas) {
                                        var color = "";
                                        if (response.data.status == "1") {
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
                            });
                        }
                    },
                    "start_draw": {
                        callback: function (e) {
                            var map = this.mapFactory.getMap();
                            this.mapFactory.TOOLS.startDrawTool("polygon");
                        }
                    },
                    "end_draw": {
                        callback: function (e) {
                            var mf = this.mapFactory;
                            var obj = mf.getCurrentObj();
                            if (obj) {
                                obj.editing.disable();
                            }

                            //弹框选择告警区还是过滤区
                            var index = layer.open({
                                type: 1,
                                title: '请选择绘制区域属性',
                                shadeClose: true,
                                shade: 0.3,
                                anim: 5,
                                rixed: false,
                                area: ['300px', '200px'],
                                content: '<center><br><br><input type="radio" id="police" name="tao" checked style="font-size:100px;"/>告警区域&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<input type="radio" id="filtration" name="tao" />过滤区域</center>',
                                btn: ['确定', '取消'],
                                yes: function () {
                                    var type = "";
                                    if ($("input[name='tao']:eq(0)").prop("checked") == true) {
                                        type = "alert";
                                    } else {
                                        type = "filter";
                                    }

                                    //设置子区域的detectionType
                                    var areas = obj.options.info.getContainAreas(mf);
                                    for (var m in areas) {
                                        if (!areas[m].options.info.getKey()) {//新增区域
                                            areas[m].options.info.setDetectionType(type);

                                            //设置颜色
                                            var color = "";
                                            if (areas[m].options.info.getDetectionType() == "filter") {
                                                color = "#0000ff";
                                            } else {
                                                color = "#ff0000";
                                            }
                                            areas[m].setStyle({
                                                color: color,
                                                fill: false
                                            });
                                        }
                                    }
                                    mf.savePartData(obj);
                                    /*关闭窗口*/
                                    layer.close(index);
                                },
                                cancel: function (index) {
                                    return true;
                                }
                            });
                        }
                    },

                    "clear_draw": {//清除所有保存的
                        callback: function (e) {
                            var mf = this.mapFactory;
                            var obj = mf.getCurrentObj()
                            if (obj) {
                                var areas = obj.options.info.getContainAreas(mf);
                                for (var m in areas) {
                                    if (areas[m].options.info.getKey()) {
                                        areas[m].removeFrom(mf.LAYERS.get(obj.options.info.getLayer()));
                                        mf.getDeletedObjs().push(areas[m]);
                                        /*mf.getDeletedObjs().reload();*/
                                        /*window.location.reload();*/
                                        /*location.reload();*/
                                    }
                                }
                                mf.savePartData(obj);
                            }
                        }
                    },

                    "delete_draw": {//删除未保存的
                        callback: function (e) {
                            var mf = this.mapFactory;
                            var obj = mf.getCurrentObj();
                            if (obj && obj.options.info instanceof leaflet.Shape) {
                                //找到所有的下级移动
                                var areas = obj.options.info.getContainAreas(mf);
                                for (var m in areas) {
                                    if (!areas[m].options.info.getKey()) {
                                        areas[m].removeFrom(mf.LAYERS.get(obj.options.info.getLayer()));
                                    }
                                }
                            }
                        }
                    }
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
                    "delete": {
                        text: "删除",
                        callback: function (e) {
                            var obj = e.relatedTarget;
                            var mf = obj._map.mapFactory;
                            if (obj) {
                                mf.getDeletedObjs().push(obj);
                                var cluster = mf.CLUSTERS.get(obj.options.info.getLayer());
                                if (cluster) {
                                    obj.removeFrom(cluster);
                                } else {
                                    var layer = mf.LAYERS.get(obj.options.info.getLayer()) || mf.LAYERS.getDefaultPlotLayer();
                                    layer && obj.removeFrom(layer);
                                }
                                var subObjs = obj.options.info.subObjs;
                                for (var i in subObjs) {
                                    var layer = subObjs[i].options.info.getLayer();
                                    mf.getDeletedObjs().push(subObjs[i]);
                                    subObjs[i].removeFrom(mf.LAYERS.get(layer));
                                }
                                var mapping = mf.EVENTS.getMapping("marker", "deleted") || [];
                                for (var i in mapping) {
                                    mf.EVENTS.fire(mapping[i], obj, e);
                                }
                            }
                        }
                    }
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
            delete (_configs[key]);
        }
        _self.confings = function (key, value) {
            return _configs;
        };
        return _self;
    };

    //菜单栏配置
    var Menus = function (options) {
        //自身引用
        var _self = this;
        //外部参数引用
        var _options = options || {};
        //私有变量
        var _preset = {
            "save": {"id": "save", "text": "保存", "icon": "fa fa-save"},
            "refresh": {"id": "refresh", "text": "刷新", "icon": "fa fa-refresh"},
            "edit": {
                "id": "edit", "text": "编辑", "icon": "fa fa-edit",
                "subs": {
                    "modify": {"id": "modify", "text": "修改模式", "icon": "fa fa-wrench"},
                    "delete": {"id": "delete", "text": "删除模式", "icon": "fa fa-trash"},
                    "close": {"id": "close", "text": "关闭编辑", "icon": "fa fa-power-off"}
                }
            },
            "zoomIn": {"id": "zoomIn", "text": "放大", "icon": "fa fa-search-plus"},
            "zoomOut": {"id": "zoomOut", "text": "缩小", "icon": "fa fa-search-minus"},
            "resetView": {"id": "resetView", "text": "复位", "icon": "fa fa-send"},
            "draw": {
                "id": "draw", "text": "标绘", "icon": "fa fa-pencil",
                "subs": {
                    "polyarrow": {"id": "polyarrow", "text": "箭头", "icon": "fa fa-long-arrow-right"},
                    "curveline": {"id": "curveline", "text": "曲线", "icon": "fa fa-vine"},
                    "polyline": {"id": "polyline", "text": "折线", "icon": "fa fa-chevron-left"},
                    "polygon": {"id": "polygon", "text": "多边形", "icon": "fa fa-star-o"},
                    "rectangle": {"id": "rectangle", "text": "矩形", "icon": "fa fa-square-o"},
                    "circle": {"id": "circle", "text": "圆形", "icon": "fa fa-circle-thin"},
                    "semicircle": {"id": "semicircle", "text": "扇形", "icon": "fa fa-pie-chart"},
                    "ellipse": {"id": "ellipse", "text": "椭圆形", "icon": "fa fa-lemon-o"}
                }
            },
            "data": {
                "id": "data", "text": "数据", "icon": "fa fa-folder-o",
                "subs": {
                    "import": {"id": "import", "text": "导入", "icon": "fa fa-sign-out"},
                    "export": {"id": "export", "text": "导出", "icon": "fa fa-sign-in"}
                }
            },
            "mapLayers": {
                "id": "mapLayers", "text": "地图切换", "icon": "fa fa-globe",
                "subs": {}
            },
            "plotLayers": {
                "id": "plotLayers", "text": "图层显示", "icon": "fa fa-map-o",
                "subs": {}
            }
        };
        var _handlers = {};
        var _menus = [];
        var _menuBar;
        //私有方法
        var _addMenuHelper = function (target, config) {
            var current = {
                id: config.id,
                text: config.text,
                icon: config.icon,
                checked: config.checked,
                click: function () {
                    var id = this.id;
                    if (_handlers[id]) _handlers[id](this);
                }
            }
            target.push(current);
            if (config.handler) {
                _handlers[config.id] = config.handler;
            }
            if (config.subs) {
                current.subs = [];
                for (var i in config.subs) {
                    _addMenuHelper(current.subs, config.subs[i]);
                }
            }
        };
        //公有方法
        _self.addHandler = function (key, handler, isOverWrite) {
            if (isOverWrite == true || _handlers[key] == null) {
                _handlers[key] = handler;
            }
        };
        _self.addMenus = function (configs) {
            for (var i in configs) {
                _addMenuHelper(_menus, configs[i]);
            }
        };
        _self.setMenus = function (configs) {
            _menus = [];
            _self.addMenus(configs);
        };
        _self.create = function (id) {
            _menuBar = leaflet.Extra.menuBar(id, _menus);
        };
        _self.getMenus = function () {
            return _menus;
        };
        _self.getPreset = function () {
            return _preset;
        };
        _self.getPresetKeys = function () {
            var keys = [];
            for (var key in _preset) {
                keys.push(key);
            }
            return keys;
        };
        _self.switchSelection = function (obj) {
            _menuBar.change(obj);
        };
        _self.toggleSelection = function (obj, checked) {
            _menuBar.toggle(obj, checked);
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
                console.info("测试标绘点击事件");
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
                if (_mappings[type]) delete (_mappings[type][originEventName]);
            } else {
                delete (_mappings[type]);
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
            delete (_clusters[key])
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
                //通过给定一个基本的WMS服务的URL和WMS参数或选项对象来实例化一个WMS切片图层对象
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
                layer.addTo(map);
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
            _plotLayerKeys = [];//标绘图层kefy
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
                //leaflet加载geoserver的缓存
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
                    polygon: new L.Draw.Polygon(map, {
                        shapeOptions: {
                            stroke: true,
                            color: '#ff0000',
                            weight: 4,
                            fill: false
                        }
                    }),
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
        var _saveUrl = _options.saveUrl;
        var _readParams = _options.readParams || {};
        var _menuConfig = _options.menuConfig;
        var _paletteConfig = _options.paletteConfig;

        var _deletedObjs = [];
        var _currentObj = null;
        var _palettePath = "";
        var _paletteObj = {};
        //地图图层控制
        var layerControl

        //私有函数
        var _reset = function (params) {
            params = params || {};
            _self.LAYERS.disableModifyTools(true);
            _self.LAYERS.disableDeleteTools(true);
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
            if (config.hasPopup == true) {
                shape.bindPopup(function (marker) {
                    return " " + marker.options.info.getText();
                }, {closeButton: false});
            }
            _map.on({
                "unselect": function () {
                    _setSelected(this, !true);
                }
            }, shape);
            var events = config.events || {};
            //点击事件
            shape.on("click", function (e) {
                _currentObj = e.target;
                e.originalEvent.ctrlKey;
                if (e.originalEvent.ctrlKey) {
                    _currentObj && _setSelected(_currentObj, !_isSelected(_currentObj));
                } else {
                    _map.fire("unselect");
                    _currentObj && _setSelected(_currentObj, true);
                }
                if (events["click"]) {
                    for (var i in events["click"]) {
                        _self.EVENTS.fire(events["click"][i], _currentObj, e);
                    }
                }
            });
            //右击事件
            shape.on("contextmenu", function (e) {
                _currentObj = e.target;
                _map.fire("unselect");
                _currentObj && _setSelected(_currentObj, true);
                if (events["contextmenu"]) {
                    for (var i in events["contextmenu"]) {
                        _self.EVENTS.fire(events["contextmenu"][i], _currentObj, e);
                    }
                }
            });

            var type = shape.options.info.getDetectionType();
            var tempContext = _self.CONTEXT_MENUS.getContextMenuByType(type);

            var contextItems = [];
            if (config.context && tempContext) {
                for (var m in tempContext) {
                    tempContext[m].text = tempContext[m].menuName;
                    if (config.context.hasOwnProperty(m)) {
                        tempContext[m].callback = config.context[m].callback;
                        if (tempContext[m].items && tempContext[m].items.length > 0) {
                            _setContextMenu(config, tempContext[m].items);
                        }
                    }
                    contextItems.push(tempContext[m]);
                }

                shape.bindContextMenu({
                    contextmenu: true,
                    contextmenuItems: contextItems
                });
            }
        };
        var _setContextMenu = function (config, tempContext) {
            for (var m in tempContext) {
                tempContext[m].text = tempContext[m].menuName;
                var type = tempContext[m].eventName;
                if (config.context.hasOwnProperty(type)) {
                    tempContext[m].callback = config.context[type].callback;
                    if (tempContext[m].items && tempContext[m].items.length > 0) {
                        _setContextMenu(tempContext[m].items);
                    }
                }
            }
        };
        var _drawShape = function (obj) {
            var result = {};
            var shape = obj.getShape();
            var type = obj.getType();
            var styles = obj.getStyles() || {};
            var config = _self.CONFIGS.merge(["shape", shape, type]);
            var opts = {
                color: (styles.color == null ? config.color : styles.color),
                weight: (styles.weight == null ? config.weight : styles.weight),
                opacity: (styles.opacity == null ? config.opacity : styles.opacity),
                fill: (styles.fill == null ? config.fill : styles.fill),
                dashArray: (styles.dashArray == null ? config.dashArray : styles.dashArray),
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
                    opts.fill = false;
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
                if (config.hasPopup == true) {
                    result.bindPopup(function (marker) {
                        return " " + marker.options.info.getText();
                    }, {closeButton: false});
                }
                _map.on({
                    "unselect": function () {
                        _setSelected(this, !true, "children");
                    }
                }, result);
                var events = config.events || {};
                //点击事件
                result.on("click", function (e) {
                    _currentObj = e.target;
                    e.originalEvent.ctrlKey;
                    if (e.originalEvent.ctrlKey) {
                        _currentObj && _setSelected(_currentObj, !_isSelected(_currentObj), "children");
                    } else {
                        _map.fire("unselect");
                        _currentObj && _setSelected(_currentObj, true, "children");
                    }
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
            var result = [];
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
                var layerKey = obj.getLayer() || _self.LAYERS.getDefaultPlotLayerKey()
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

                //画子标绘，子标绘不可选中 编辑 删除 移动，一切操作都跟随主标绘
                if (marker) {
                    var subs = obj.getSubs() || [];
                    var subMarkers = [];
                    for (var j in subs) {
                        var sub = subs[j];
                        var subMarker = null;
                        var styles = sub.getStyles();
                        styles = styles || {};
                        styles.deletable = false;
                        styles.draggable = false;
                        styles.editable = false;
                        sub.setVirtual(true);//设置为虚拟，保存时被过滤掉不被处理
                        if (sub instanceof leaflet.Shape) {
                            subMarker = _drawShape(sub);//画形状
                        } else {
                            subMarker = _drawMarker(sub);//画标绘
                        }
                        if (cluster) {
                            if (cluster._featureGroup.hasLayer(marker)) {
                                layer && layer.addLayer(subMarker);
                            }
                        } else {
                            layer && layer.addLayer(subMarker);
                        }
                        subMarkers.push(subMarker);
                    }
                    marker.options.info.subObjs = subMarkers;
                    if (marker.options.partObjs) {
                        for (var j in marker.options.partObjs) {
                            layer && layer.addLayer(marker.options.partObjs[j]);
                        }
                    }

                    if (marker.options.info instanceof leaflet.Shape) {
                        marker.on("move", function (e) {
                            var subObjs = e.target.options.info.subObjs;
                            for (var i in subObjs) {
                                subObjs[i].setLatLng(e.target._latlng);
                            }

                            var shape = e.target;
                            if (shape.options.info) {
                                var sourceLocation = shape.options.info.getLocation();
                                var latGap = parseFloat(sourceLocation.split(" ")[0]) - e.target._latlng.lat;
                                var lngGap = parseFloat(sourceLocation.split(" ")[1]) - e.target._latlng.lng;

                                var keys = _self.LAYERS.getPlotLayerKeys();
                                for (var i in keys) {
                                    var layer = _self.LAYERS.get(keys[i]);
                                    var markers = layer.getLayers();
                                    for (var j in markers) {
                                        var leafObj = markers[j];
                                        if (leafObj instanceof L.MarkerClusterGroup) {
                                            var clusterLayers = leafObj.getLayers();
                                            for (var k in clusterLayers) {
                                                var tempObj = clusterLayers[k];
                                                if (tempObj.options.info && tempObj.options.info.getProductId() == shape.options.info.getProductId() &&
                                                    tempObj.options.info.getKey() != shape.options.info.getKey()) {
                                                    var sourcePoint = tempObj.options.info.getLocation();
                                                    var lat = sourcePoint.split(" ")[0];
                                                    var lng = sourcePoint.split(" ")[1];
                                                    tempObj.setLatLng(L.latLng(lat - latGap, lng - lngGap));
                                                }
                                            }
                                        } else {
                                            //子集
                                            if (leafObj.options.info) {
                                                if (leafObj.options.info instanceof leaflet.Shape && leafObj.options.info.getParentId() == shape.options.info.getKey()
                                                    && leafObj.options.info.getShape() == "polygon") {
                                                    var points = leafObj.getLatLngs()[0];
                                                    var newPoints = [];
                                                    for (var n in points) {
                                                        var newLatlng = L.latLng(points[n].lat - latGap, points[n].lng - lngGap);
                                                        newPoints.push(newLatlng);
                                                    }
                                                    leafObj.setLatLngs(newPoints);
                                                }

                                                if (leafObj.options.info.getProductId() == shape.options.info.getProductId() &&
                                                    leafObj.options.info.getKey() != shape.options.info.getKey()) {
                                                    var sourcePoint = leafObj.getLatLng();
                                                    leafObj.options.info.setLocation(sourcePoint.lat - latGap + " " + sourcePoint.lng - lngGap);
                                                    leafObj.setLatLng(L.latLng(sourcePoint.lat - latGap, sourcePoint.lng - lngGap));
                                                }
                                            }
                                        }
                                    }
                                }
                            }

                            e.target.options.info.setLocation(e.target._latlng.lat + " " + e.target._latlng.lng);
                        });
                    }

                    marker.on("deleted", function (e) {
                        _deletedObjs.push(e.target);
                        var mainLayer = e.target.options.info.getLayer();
                        var cluster = _self.CLUSTERS.get(mainLayer);
                        cluster && e.target.removeFrom(cluster);
                        var subObjs = e.target.options.info.subObjs;
                        for (var i in subObjs) {
                            var layer = subObjs[i].options.info.getLayer();
                            _deletedObjs.push(subObjs[i]);
                            subObjs[i].removeFrom(_self.LAYERS.get(layer));
                        }
                        var partObjs = e.target.options.partObjs;
                        for (var i in partObjs) {
                            partObjs[i].remove();
                        }
                        if (obj instanceof leaflet.Shape) {
                            var mapping = _self.EVENTS.getMapping("shape", "deleted") || [];
                            for (var i in mapping) {
                                _self.EVENTS.fire(mapping[i], e.target, e);
                            }
                        } else {
                            var mapping = _self.EVENTS.getMapping("marker", "deleted") || [];
                            for (var i in mapping) {
                                _self.EVENTS.fire(mapping[i], e.target, e);
                            }
                        }
                    });
                }
            }
        };
        var _setSelected = function (leafObj, isSelected, mainElement) {
            if (!leafObj.options.info) return;
            leafObj.options.info.setSelected(isSelected);
            var el = leafObj.getElement();
            if (isSelected == true) {
                if (mainElement == "children") {
                    $(el).children().css("outline", "#FF0000 solid 1px");
                    $(el).children().css("outline-offset", "1px");
                } else {
                    $(el).css("outline", "#FF0000 solid 1px");
                    $(el).css("outline-offset", "1px");
                }
            } else {
                if (mainElement == "children") {
                    $(el).children().css("outline", "none");
                    $(el).children().css("outline-offset", "0px");
                } else {
                    $(el).css("outline", "none");
                    $(el).css("outline-offset", "0px");
                }
            }
        };
        var _isSelected = function (leafObj, mainElement) {
            return leafObj.options.info.isSelected();
        };
        var _createPalette = function (config, palettes) {
            var dataHelper = function (obj, list) {
                for (var i in list) {
                    var rKey = leaflet.Extra.UUID();
                    obj[rKey] = list[i];
                    obj[rKey].key = rKey;
                    obj[rKey].subObjs = null;
                    if (obj[rKey].subs) {
                        obj[rKey].subObjs = {};
                        dataHelper(obj[rKey].subObjs, obj[rKey].subs);
                    }
                }
            };
            var styleHelper = function (obj) {
                var html = '';
                for (var k in obj) {
                    var o = obj[k];
                    var draggable = false;
                    var cursor = "default";
                    if (o.subObjs == null) {
                        draggable = true;
                        cursor = "pointer";
                    }
                    html += ('<div class="palette-cell"><img style="cursor:' + cursor + '" draggable="' + draggable + '" id="' + (o.id || "") + '" key="' + o.key + '" src="' + o.iconUrl + '"><span>' + o.name + '</span></div>');
                }
                return html;
            };
            var backHandler = function (e) {
                var pathArray = _palettePath.split("/");
                if (pathArray.length > 1) {
                    var mapping = map.EVENTS.getMapping("palette", "backClick") || [];
                    for (var i in mapping) {
                        map.EVENTS.fire(mapping[i], map, e);
                    }
                    pathArray.pop();
                    _palettePath = pathArray.join("/");
                    var data = _paletteObj;
                    for (var i in pathArray) {
                        if (i > 0) {
                            data = data[pathArray[i]].subObjs
                        }
                    }
                    var nextHtml = styleHelper(data);
                    var pb = $(e.target).parent().parent().find(".palette-body");
                    pb.html(nextHtml);
                    pb.find(".palette-cell img").on({
                        dragend: dragHandler,
                        click: clickHandler
                    });
                } else {
                    //已经是根目录，不能返回
                }
            };
            var dragHandler = function (e) {
                var key = $(e.target).attr("key");
                var data = _paletteObj;
                var pathArray = _palettePath.split("/");
                for (var i in pathArray) {
                    if (i > 0) {
                        data = data[pathArray[i]].subObjs
                    }
                }
                data = data[key];
                _self.doAfterDrag(e, data);
            };
            var clickHandler = function (e) {
                var key = $(e.target).attr("key");
                var data = _paletteObj;
                var pathArray = _palettePath.split("/");
                for (var i in pathArray) {
                    if (i > 0) {
                        data = data[pathArray[i]].subObjs
                    }
                }
                data = data[key];
                var mapping = map.EVENTS.getMapping("palette", "click") || [];
                for (var i in mapping) {
                    e.paletteData = data;
                    map.EVENTS.fire(mapping[i], map, e);
                }
                if (data.subObjs == null) {

                } else {
                    _palettePath += ("/" + key);
                    var pb = $(e.target).parent().parent();
                    var subs = data.subObjs || [];
                    var nextHtml = styleHelper(subs);
                    pb.html(nextHtml);
                    pb.find(".palette-cell img").on({
                        dragend: dragHandler,
                        click: clickHandler
                    });
                }
            };
            config = config || {};
            config.palettePanelId = config.palettePanelId || "map-palette-panel";
            dataHelper(_paletteObj, palettes);
            var html = '<div class="palette"><div class="palette-title"><i class="palette-back fa fa-reply"></i><i class="palette-close fa fa-times"></i></div><div class="palette-body">';
            html += (styleHelper(_paletteObj));
            html += '</div><div class="palette-tail"></div><div class="palette-cover"></div></div>';
            var divObj = $("#" + config.palettePanelId);
            divObj.html(html);
            divObj.find(".palette-cell img").on({
                dragend: dragHandler,
                click: clickHandler
            });
            divObj.find(".palette-back").on({
                click: backHandler
            });
            divObj.find(".palette-close").on({
                click: function (e) {
                    var p = $(e.target).parent().parent();
                    p.addClass("palette-hide");

                }
            });
            divObj.on({
                mouseenter: function (e) {
                    var p = $(this).find(".palette");
                    if (p.hasClass("palette-hide")) {
                        p.removeClass("palette-hide");
                    }
                }
            });
        };
        var _createMenu = function (config) {
            config = config || {};
            config.menuPanelId = config.menuPanelId || "map-menu-panel";
            var presetMenus = _self.MENUS.getPreset();
            var preset = config.preset || _self.MENUS.getPresetKeys();
            var configs = [];
            for (var key in presetMenus) {
                if (preset.indexOf(key) != -1) {
                    configs.push(presetMenus[key]);
                    //对于地图图层和标绘图层时根据当前地图加载的图层动态配置按钮的
                    //对于其他操作，则根据需要加入处理函数
                    if (key == "mapLayers") {
                        presetMenus[key].subs = [];
                        var layerKeys = _self.LAYERS.getMapLayerKeys();
                        for (var i in layerKeys) {
                            var layerKey = layerKeys[i];
                            var layerConfig = _self.LAYERS.getConfig(layerKey);
                            presetMenus[key].subs[layerConfig.id] = {
                                id: layerConfig.id,
                                text: layerConfig.name,
                                icon: layerConfig.iconCls,
                                checked: layerConfig.checked,
                                handler: function (obj, e) {
                                    _self.LAYERS.switchLayer(obj.id, _map);
                                    _self.MENUS.switchSelection($(obj));
                                }
                            };
                        }
                    } else if (key == "plotLayers") {
                        presetMenus[key].subs = [];
                        var layerKeys = _self.LAYERS.getPlotLayerKeys();
                        for (var i in layerKeys) {
                            var layerKey = layerKeys[i];
                            var layerConfig = _self.LAYERS.getConfig(layerKey);
                            presetMenus[key].subs[layerConfig.id] = {
                                id: layerConfig.id,
                                text: layerConfig.name,
                                icon: layerConfig.iconCls,
                                checked: layerConfig.checked,
                                handler: function (obj, e) {
                                    var hasLayer = _self.LAYERS.toggleLayer(obj.id, _map);
                                    _self.MENUS.toggleSelection($(obj), hasLayer);
                                }
                            };
                        }
                    } else if (key == "save") {
                        _self.MENUS.addHandler(key, function () {
                            _self.LAYERS.disableModifyTools(true);
                            _self.LAYERS.disableDeleteTools(true);
                            _self.save();
                        });
                    } else if (key == "refresh") {
                        _self.MENUS.addHandler(key, function () {
                            _self.read();
                        });
                    } else if (key == "edit") {
                        _self.MENUS.addHandler("modify", function () {
                            _self.LAYERS.disableDeleteTools(true);
                            _self.LAYERS.enableModifyTools();
                        });
                        _self.MENUS.addHandler("delete", function () {
                            _self.LAYERS.disableModifyTools(true);
                            _self.LAYERS.enableDeleteTools();
                        });
                        _self.MENUS.addHandler("close", function () {
                            _self.LAYERS.disableModifyTools(true);
                            _self.LAYERS.disableDeleteTools(true);
                        });
                    } else if (key == "zoomIn") {
                        _self.MENUS.addHandler(key, function () {
                            _map.zoomIn();
                        });
                    } else if (key == "zoomOut") {
                        _self.MENUS.addHandler(key, function () {
                            _map.zoomOut();
                        });
                    } else if (key == "resetView") {
                        _self.MENUS.addHandler(key, function () {
                            var config = _self.LAYERS.getConfig(_self.LAYERS.getCurrentMapLayerKey());
                            var zoomLevel = config.zoomLevel || _map.getZoom();
                            var centerLL = _map.getCenter();
                            try {
                                var centerLocation = config.centerLocation.split(" ");
                                centerLL = new L.LatLng(centerLocation[0], centerLocation[1]);
                            } catch (error) {
                                centerLL = _map.getCenter();
                            } finally {
                                _map.setView(centerLL, zoomLevel);
                            }
                        });
                    } else if (key == "draw") {
                        _self.TOOLS.initDrawTools(_map);
                        _self.MENUS.addHandler("polyarrow", function () {
                            _self.TOOLS.startDrawTool("polyarrow");
                        });
                        _self.MENUS.addHandler("curveline", function () {
                            _self.TOOLS.startDrawTool("curveline");
                        });
                        _self.MENUS.addHandler("polyline", function () {
                            _self.TOOLS.startDrawTool("polyline");
                        });
                        _self.MENUS.addHandler("polygon", function () {
                            _self.TOOLS.startDrawTool("polygon");
                        });
                        _self.MENUS.addHandler("rectangle", function () {
                            _self.TOOLS.startDrawTool("rectangle");
                        });
                        _self.MENUS.addHandler("circle", function () {
                            _self.TOOLS.startDrawTool("circle");
                        });
                        _self.MENUS.addHandler("semicircle", function () {
                            _self.TOOLS.startDrawTool("semicircle");
                        });
                        _self.MENUS.addHandler("ellipse", function () {
                            _self.TOOLS.startDrawTool("ellipse");
                        });
                    } else if (key == "data") {
                        _self.MENUS.addHandler("export", function () {
                            _self.exportData();
                        });
                        _self.MENUS.addHandler("import", function () {
                            _self.importData();
                        });
                    } else {
                    }
                }
            }
            var custom = config.custom;
            for (var key in custom) {
                configs.push(custom[key]);
            }
            _self.MENUS.setMenus(configs);
            _self.MENUS.create(config.menuPanelId);
        };
        var _createContextMenu = function (config) {
            _self.CONTEXT_MENUS.init(config);
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

                //判断点是否在selectObj区域内
                var points = shape.getLatLngs()[0];
                var isOutOfBounds = false;
                for (var m in points) {
                    var distance = selectObj.getLatLng().distanceTo(points[m]);

                    if (distance > selectObj.getRadius()) {
                        isOutOfBounds = true;
                        break;
                    }

                    var angle = MapUtils.computeAzimuth(points[m].lng, points[m].lat, selectObj.getLatLng().lng, selectObj.getLatLng().lat) - 90;

                    //卷积
                    var begin = MapUtils.areClockWise({
                            x: Math.cos(selectObj.startAngle()),
                            y: Math.sin(selectObj.startAngle())
                        },
                        {x: Math.cos(angle * Math.PI / 180), y: Math.sin(angle * Math.PI / 180)});
                    var end = MapUtils.areClockWise({
                            x: Math.cos(selectObj.stopAngle()),
                            y: Math.sin(selectObj.stopAngle())
                        },
                        {x: Math.cos(angle * Math.PI / 180), y: Math.sin(angle * Math.PI / 180)});

                    if (!((!begin && end) || (begin && !end))) {
                        isOutOfBounds = true;
                        break;
                    }
                }

                if (isOutOfBounds) {
                    shape.removeFrom(_self.LAYERS.get(shape.options.info.getLayer()));
                    $.modal.msgSuccess("点不能在探测区域范围外~");
                    return;
                }

                shape.options.info.setShape("polygon");
                shape.options.info.setParentId(selectObj.options.info.getKey());
                shape.options.info.setTempId(Math.uuid());
                shape.options.info.setDetectionType("alert");//默认告警区
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
            }

            var layerKey = shape.options.info.getLayer() || _self.LAYERS.getDefaultPlotLayerKey();
            var layer = _self.LAYERS.get(layerKey);
            layer && layer.addLayer(shape);
            shape.options.info.setLayer(layerKey);

            _self.doAfterDraw(shape);

            var shapeType = shape.options.info.getShape();
            var type = shape.options.info.getType();
            var config = _self.CONFIGS.merge(["shape", shapeType, type]);
            _bindShapeEvents(shape, config);

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
    _self.MENUS = new Menus();//按钮栏
    _self.ICONS = new Icons();//标绘图标
    _self.EVENTS = new Events();//事件或消息处理函数的容器
    _self.CONFIGS = new Configs();//标绘配置
    _self.CONTEXT_MENUS = new ContextMenus();//右键菜单事件；
    _self.LAYERS = new Layers();//图层容器
    _self.CLUSTERS = new Clusters();//聚类容器
    _self.TOOLS = new Tools();//工具容器，目前仅有画形状的工具
    //公有函数
    //get set函数
    _self.setReadUrl = function (readUrl) {
        _readUrl = readUrl
    };
    _self.setReadMapUrl = function (readMapUrl) {
        _readMapUrl = readMapUrl
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
            _map.removeLayer(_map._layers[i]);
        }
        //构建图层并加入地图
        _createLayers(_options.layers);

        //右下角菜单
        layerControl = L.control.layers(_self.LAYERS.getMapLayers(), {}, {
            position: 'bottomright', //图层显示位置topright
            collapsed: false, //多个图层展开显示，默认收缩显示
            hideSingleBase: true
        }).addTo(_map);

        if (_options.hasLayerControl != true) {
            //设置图层控制面板隐藏
            $(layerControl.getContainer()).css("display", "none");
        }
    }

    _self.build = function () {

        _self.removeAllMarkers();

        _createMenu(_options.menuConfig || _menuConfig);

        //初始化右键菜单数据
        _createContextMenu(_options.contextMenus);

        //读取数据：标绘，形状
        _self.loadData(_options.markers);

    };
    _self.removeAllMarkers=function(){
        _self.LAYERS.eachMarker(function(marker,layer){
            marker.removeFrom(layer);
        });
    };
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
        saveParams.deviceId = parentShape.options.info.getKey();
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
            adtaType: ajaxParams.dataType,
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

        saveParams.deviceId = currentObj.options.info.getKey();
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
                    contextMenus: []
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

        _self.loadWFS = function(layerName, epsg) {
            var urlString = "http://geoserver.test.novasky.cn/geoserver/osm/wms";
            var param = {
                service: 'WFS',
                version: '1.1.0',
                request: 'GetFeature',
                typeName: layerName,
                outputFormat: 'application/json',
                maxFeatures:3200,
                srsName: epsg
            };
            var u = urlString + L.Util.getParamString(param, urlString);

            console.log(u);
            $.ajax({
                url:u,
                dataType: 'json',
                success: loadWfsHandler,
            });
            function loadWfsHandler(data) {
                console.log(data);
                layer = L.geoJson(data, {
                    pointToLayer: function (feature, latlng) {
                        var title = feature.properties.name;
                        var marker = L.marker(L.latLng(feature.properties.lat, feature.properties.lon));
                        marker.bindPopup(title);
                        markers.addLayer(marker);
                    }
                })
                map.addLayer(markers);
            }
        };

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
    //标绘数据的导入导出读取
    _self.importData = function () {
        var options = {
            hasTitle: false,
            hasOk: false,
            hasCancel: false,
            hasValidateInfo: false,
            type: "light",
            fields: [
                {id: 'id', label: 'id', type: 'hidden'},
                {id: 'file', label: '', type: 'file', col: 12}
            ]
        };
        var formObj = frame.Form.init(options);
        frame.Modal.init({
            title: "选择导入",
            html: formObj.getHtml(),
            onOpen: function (e) {
            },
            onOk: function (e) {
                var files = formObj.getForm().find("input[name=file]")[0].files;
                if (files.length) {
                    var file = files[0];
                    var reader = new FileReader();
                    if (/text+/.test(file.type)) {
                        reader.onload = function () {
                            var data = JSON.parse(this.result);
                            _self.loadData(data);
                        };
                        reader.readAsText(file);
                    }
                }
            }
        }).show();
    };
    _self.exportData = function () {
        var data = _self.getData();
        var blob = new Blob([JSON.stringify(data)], {type: "text/plain;charset=utf-8"});
        saveAs(blob, "导出标绘数据" + (new Date().getTime()) + ".txt");
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
        };
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
        parentObj && data.push(parentObj);

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
                    if (tId == tempId) {
                        return leafObj;
                    }
                }
            }
        }
    };
    _self.removeMap = function () {
        _map.remove();
    };
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
}
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
    }
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
};
leaflet.Extra.menuBar = function (divId, actions) {
    var obj = $("#" + divId);
    var checkedStyle = '<i class="fa fa-check"></i>';
    var menu = '';
    for (var i in actions) {
        var ckd = '';
        if (actions[i].checked == true) {
            ckd = checkedStyle;
        }
        if (actions[i].subs) {
            var subs = '';
            for (var j in actions[i].subs) {
                var sckd = '';
                if (actions[i].subs[j].checked == true) {
                    sckd = checkedStyle;
                }
                subs += '<li role="menuitem"><a id="' + actions[i].subs[j].id + '"><i class="' + actions[i].subs[j].icon + '"></i> ' + actions[i].subs[j].text + ' <span>' + sckd + '</span></a></li>';
            }
            menu += (''
                + '<div class="btn-group">'
                + '<a id="' + actions[i].id + '" class="btn btn-xs grey-cararra dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i class="' + actions[i].icon + '"></i> ' + actions[i].text + '<span class="caret"></span><span> ' + ckd + '</span></a>'
                + '<ul class="dropdown-menu columns" role="menu">'
                + subs
                + '</ul>'
                + '</div>');

        } else {
            menu += ('<a id="' + actions[i].id + '" class="btn btn-xs grey-cararra"><i class="' + actions[i].icon + '"></i> ' + actions[i].text + ' <span>' + ckd + '</span></a>');
        }
    }
    var html = ''
        + '<div id="middle" style="position: absolute;left:15px;user-select:none;white-space: nowrap;width:calc(100% - 30px);">'
        + menu
        + '</div>'
        + '<div style="background:inherit;position:absolute;left:0px;cursor:pointer;margin-top:2px;width:15px;text-align: center;"><i id="left" class="fa fa-caret-left"></i></div>'
        + '<div style="background:inherit;position:absolute;right:0px;cursor:pointer;margin-top:2px;width:15px;text-align: center;"><i id="right" class="fa fa-caret-right"></i></div>'
        + '';
    obj.html(html);

    for (var i in actions) {
        if (actions[i].click) {
            obj.find("#" + actions[i].id).on("click", actions[i].click);
        }
        for (var j in actions[i].subs || []) {
            if (actions[i].subs[j].click) {
                obj.find("#" + actions[i].subs[j].id).on("click", actions[i].subs[j].click);
            }
        }
    }

    var midObj = obj.find("#middle");
    var midObj = document.getElementById('middle');
    obj.find("#left").on("mousedown", function () {
        var min = midObj.offsetWidth - midObj.scrollWidth + this.parentElement.offsetWidth;
        var curLeft = parseInt(midObj.style.getPropertyValue("left"));
        if (curLeft > min) {
            midObj.style.setProperty("left", (curLeft - 20) + "px");
        }
    });
    obj.find("#right").on("mousedown", function () {
        var max = this.parentElement.offsetWidth;
        var curLeft = parseInt(midObj.style.getPropertyValue("left"));
        if (curLeft < max) {
            midObj.style.setProperty("left", (curLeft + 20) + "px");
        }
    });
    return {
        obj: obj,
        change: function (menuObj) {
            menuObj.parents("ul:first").find("li").each(function (index, object) {
                $(object).find("span:last").html("");
            });
            menuObj.find("span:last").html(checkedStyle);
        },
        toggle: function (menuObj, checked) {
            var spanObj = menuObj.find("span:last");
            if (checked == true) {
                spanObj.html(checkedStyle);
            } else if (checked == false) {
                spanObj.html("");
            } else {
                if (spanObj.html() == "") {
                    spanObj.html(checkedStyle);
                } else {
                    spanObj.html("");
                }
            }
        }
    }
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

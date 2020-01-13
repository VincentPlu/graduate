/**
 * Created by Charle on 2019-09-22.
 */
var leaflet=leaflet||{};
(function () {
    leaflet.mainTree = function () {
        var _self=this;
        var _map;
        var _nodes = [];
        var _parentId;
        var _treeViewId;
        var _inputId;
        var _isInit = false;

        _self.getNodes = function () {
            return _nodes;
        };
        _self.setNodes = function (nodes) {
            _nodes = nodes;
        };

        this.init = function (options) {
            _self._nodes = options.nodes;
            _self._map = options.map;
            _self._parentId = options.parentId||"device_tree_div";
            _self._treeViewId = options.treeNodeId||"treeview";
            _self._inputId = options.inputId||"device_input";

            _self.setNodesText(_self._nodes);
            _self.initEvent();
        };

        this.initEvent = function () {
            //树型结构
            $("#"+_self._inputId).click(function() {
                if (document.getElementById(_self._treeViewId).style.display == "none") {
                    _self.showDeviceTreeView();
                } else {
                    $("#"+_self._treeViewId).hide();
                }
            });
            $("#"+_self._parentId).hover(function() {
                _self.showDeviceTreeView();
            }, function() {
                $("#"+_self._treeViewId).hide();
            });
        };

        this.setNodesText = function (nodes) {
            for(var m in nodes){
                nodes[m].text = nodes[m].name;
                if(nodes[m].deviceType=="product"){
                    nodes[m].state={
                        checked:true
                    }
                }else{
                    nodes[m].state={
                        checked:false
                    }
                }
                if(nodes[m].nodes){
                    _self.setNodesText(nodes[m].nodes);
                }
            }
        };

        this.showDeviceTreeView = function () {
            $("#"+_self._treeViewId).show();
            if(_isInit){
                return;
            }

            var options = {
                showTags: false,
                showCheckbox: true,
                data: _self._nodes,
                onNodeSelected: function(event, data) {
                    $("#"+_self._inputId).val(data.text);
                    $("#"+_self._treeViewId).hide();
                },
                onNodeChecked: function(event, node) { //选中节点
                    // var selectNodes = _self.getChildNodeIdArr(node); //获取所有子节点
                    // if (selectNodes) { //子节点不为空，则选中所有子节点
                    //     $('#treeview').treeview('checkNode', [selectNodes, { silent: true }]);
                    // }
                    // var parentNode = $("#treeview").treeview("getNode", node.parentId);
                    // _self.setParentNodeCheck(node);
                    var existObj;
                    _self._map.LAYERS.eachMarker(function (marker,layer) {
                        var obj = marker.options.info;
                        if(obj && node.id == obj.getKey()){
                            existObj = marker;
                        }
                    });

                    if(!existObj){
                        var marker = _self._map.getMarkerById(node.id);
                        var layerKey = marker.options.info.getLayer() || _self._map.LAYERS.getDefaultPlotLayerKey();
                        var layer = _self._map.LAYERS.get(layerKey);
                        layer && layer.addLayer(marker);
                    }
                },
                onNodeUnchecked: function(event, node) { //取消选中节点
                    // var selectNodes = _self.getChildNodeIdArr(node); //获取所有子节点
                    // if (selectNodes) { //子节点不为空，则取消选中所有子节点
                    //     $("#"+_self._treeViewId).treeview('uncheckNode', [selectNodes, { silent: true }]);
                    // }
                    var existObj;
                    _self._map.LAYERS.eachMarker(function (marker,layer) {
                        var obj = marker.options.info;
                        if(obj && node.id == obj.getKey()){
                            existObj = marker;
                        }
                    });
                    if(existObj){
                        var layerKey = existObj.options.info.getLayer() || _self._map.LAYERS.getDefaultPlotLayerKey();
                        var layer = _self._map.LAYERS.get(layerKey);
                        existObj.removeFrom(layer);
                    }
                }
            };
            $("#"+_self._treeViewId).treeview(options);
            _isInit = true;
        };

        this.setParentNodeCheck = function (node) {
            var parentNode = $("#"+_self._treeViewId).treeview("getNode", node.parentId);
            if (parentNode.nodes) {
                var checkedCount = 0;
                for (x in parentNode.nodes) {
                    if (parentNode.nodes[x].state.checked) {
                        checkedCount ++;
                    } else {
                        break;
                    }
                }
                if (checkedCount === parentNode.nodes.length) {
                    $("#"+_self._treeViewId).treeview("checkNode", parentNode.nodeId);
                    _self.setParentNodeCheck(parentNode);
                }
            }
        };

        this.getChildNodeIdArr = function (node) {
            var ts = [];
            if (node.nodes) {
                for (x in node.nodes) {
                    ts.push(node.nodes[x].nodeId);
                    if (node.nodes[x].nodes) {
                        var getNodeDieDai = _self.getChildNodeIdArr(node.nodes[x]);
                        for (j in getNodeDieDai) {
                            ts.push(getNodeDieDai[j]);
                        }
                    }
                }
            } else {
                ts.push(node.nodeId);
            }
            return ts;
        };
        this.getVisibleNodeIdArrByNode = function (allVisibleId,allVisibleTreeNodeId,node) {
            if (node.nodes) {
                for(x in node.nodes){
                    if(allVisibleId.indexOf(node.nodes[x].nodeId)!=-1){
                        allVisibleTreeNodeId.push(node.nodes[x].nodeId);
                    }
                }
            }
        }
        this.getVisibleNodeIdArr = function () {
            var allVisibleId = [];
            var allVisibleTreeNodeId = [];
            _self._map.LAYERS.eachMarker(function (marker,layer) {
                var obj = marker.options.info;
                allVisibleId.push(obj.getKey());
            });

            for(var m in _self._nodes){
                if (allVisibleId.indexOf(_self._nodes[m].id)!=-1){
                    allVisibleTreeNodeId.push(_self._nodes[m].nodeId);
                    _self.getVisibleNodeIdArrByNode(allVisibleId,allVisibleTreeNodeId,_self._nodes[m]);
                }
            }

            return allVisibleTreeNodeId;
        }
    }
})()

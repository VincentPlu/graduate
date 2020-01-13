/**
 * Created by Charle on 2019-09-02.
 */
(function ($) {
    $.extend({
        detectionOpt:{
            importMap:function(importUrl){
                $.modal.open("导入" + $.table._option.modalName,ctx+importUrl);
            },
            deleteMap:function () {
                var rows = $.common.isEmpty($.table._option.uniqueId) ? $.table.selectFirstColumns() : $.table.selectColumns($.table._option.uniqueId);
                if (rows.length == 0) {
                    $.modal.alertWarning("请至少选择一条记录");
                    return;
                }

                //判断是否有删除默认的地图操作
                var datas = $.btTable.bootstrapTable('getSelections');
                for(var index in datas){
                    if(datas[index].isDefault=="1"){
                        $.modal.alertWarning("不能删除默认地图");
                        return;
                    }
                }

                $.modal.confirm("确认要删除选中的" + rows.length + "条数据吗?", function() {
                    var url = $.table._option.removeUrl;
                    var data = { "ids": rows.join() };
                    $.operate.submit(url, "post", "json", data);
                });
            },

            //编辑detectionZone
            editZone: function(id,productId) {
                if ($.common.isEmpty(id) && $.common.isEmpty(mapId)){
                    var id = $.map($.btTable.bootstrapTable('getSelections'), function (row) {return row[$.table._option.columns[1].field];});
                    var mapId = $.map($.btTable.bootstrapTable('getSelections'), function (row) {return row[$.table._option.columns[2].field];});
                    var productId = $.map($.btTable.bootstrapTable('getSelections'), function (row) {return row[$.table._option.columns[3].field];});
                    var url = $.table._option.updateUrl.replace("{id}", id).replace("{mapId}",mapId).replace("{productId}",productId);
                    $.modal.open("修改" + $.table._option.modalName, url);
                } else {
                    var url = $.table._option.updateUrl.replace("{id}", id).replace("{productId}",productId);
                    $.modal.open("修改" + $.table._option.modalName, url);
                }
            },
            
            //跳转到geoserver
            gotoGeoserver : function (url) {
                window.location.href= url;
            }
        }
    });
})(jQuery);
/**
 * Created by Charle on 2019-09-28.
 */
var leaflet = leaflet || {};
(function () {
    leaflet.mqtt = function () {
        var _map;
        /*mqtt*/
        var _self = this;
        var client={};
        var _options = {
            hostname:$("#websocketURL").attr("value")?$("#websocketURL").attr("value"):"emqx.test.novasky.cn",
            port:$("#websocketPort").attr("value")?eval($("#websocketPort").attr("value")):20007,
            clientId:'client-mao-'+Math.uuid(),
            timeout:5,
            keepAlive:100,
            userName:'iRVMS-WEB',
            password:'novasky888',
            cleanSession:false,
            alertTopic:'/rule/photoelectric_equipment',
            notifyTopic:'/command/notify',
            ssl:false,
            mqttVersion:4
        }

        this.init = function (options) {
            $.extend(_options,options);
            try{
                client = new Paho.MQTT.Client(_options.hostname, _options.port, _options.clientId);
            }catch(e){

            }
            //建立客户端实例
            var options = {
                invocationContext: {
                    host: _options.hostname,
                    port: _options.port,
                    path: client.path,
                    clientId: _options.clientId
                },
                timeout: _options.timeout,
                keepAliveInterval: _options.keepAlive,
                userName: _options.userName,
                password: _options.password,
                reconnect : true,
                cleanSession: _options.cleanSession,
                useSSL : _options.ssl,
                mqttVersion:_options.mqttVersion,
                onSuccess: _self.onConnect,
                onFailure: function (e) {
                    console.log(e);
                    s = "{time:" + new Date().Format("yyyy-mm-dd hh:mm:ss") + ", onFailure()}";
                    s = "{time:" + new Date().Format("yyyy-mm-dd hh:mm:ss") + ", onFailure()}";
                    console.log(s);
                }
            };
            client.connect(options);
            client.onConnectionLost = _self.onConnectionLost;
            //注册连接断开处理事件
            client.onMessageArrived = _self.onMessageArrived;
        };

        this.onConnect = function () {
            console.log("onConnected");
            s = "{time:" + new Date().Format("yyyy-mm-dd hh:mm:ss") + ", onConnected()}";
            console.log(s);
            client.subscribe(_options.alertTopic);
            client.subscribe(_options.notifyTopic);
            if(_options.onConnect){
                _options.onConnect();
            }
        }

        this.onConnectionLost = function (responseObject) {
            console.log(responseObject);
            s = "{time:" + new Date().Format("yyyy-mm-dd hh:mm:ss") + ", onConnectionLost()}";
            console.log(s);
            if (responseObject.errorCode !== 0) {
                console.log("onConnectionLost:" + responseObject.errorMessage);
                console.log("连接已断开");
        }
            if(_options.onConnectionLost){
                _options.onConnectionLost(responseObject);
            }
        }

        this.onMessageArrived = function (message) {
            console.info(message.payloadString)
            if(_options.onMessageArrived){
                _options.onMessageArrived(message);
            }
        }

        Date.prototype.Format = function (fmt) { //author: meizz
            var o = {
                "M+": this.getMonth() + 1, //月份
                "d+": this.getDate(), //日
                "h+": this.getHours(), //小时
                "m+": this.getMinutes(), //分
                "s+": this.getSeconds(), //秒
                "q+": Math.floor((this.getMonth() + 3) / 3), //季度
                "S": this.getMilliseconds() //毫秒
            };
            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[
                    k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        }
    }
})();

/**
 * Created by Charle on 2019-09-24.
 */

var wsHelper = wsHelper||{};
(function () {
    wsHelper.ws = function () {
        var ws;//websocket实例
        var lockReconnect = false;//避免重复连接
        var _wsUrl = 'ws://127.0.0.1';
        _self = this;
        _options={};

        this.init = function (options) {
            _wsUrl = options.url;
            _options = options;
            if(_wsUrl) {
                _self.createWebSocket(_wsUrl);
                _self.initEventHandle(options);
            }
        };

        this.getWsObj = function () {
            return ws;
        };

        this.createWebSocket = function (url) {
            try {
                ws = new WebSocket(url);
            } catch (e) {
                _self.reconnect(url);
            }
        };

        this.initEventHandle = function (options) {
            if(ws){
                ws.onclose = function () {
                    _self.reconnect(_wsUrl);
                    options.onclose;
                };
                ws.onerror = function () {
                    _self.reconnect(_wsUrl);
                    options.onerror;
                };
                ws.onopen = function () {
                    //心跳检测重置
                    _heartCheck.reset().start();
                };
                ws.onmessage = function (event) {
                    options.onmessage(event);
                }
            }
        };

        this.reconnect = function (url) {
            if(lockReconnect) return;
            lockReconnect = true;
            //没连接上会一直重连，设置延迟避免请求过多
            setTimeout(function () {
                _self.createWebSocket(url);
                _self.initEventHandle(_options);
                lockReconnect = false;
            }, 2000);
        };

        _heartCheck = {
            timeout: 60000,//60秒
            timeoutObj: null,
            reset: function(){
                clearTimeout(this.timeoutObj);
                return this;
            },
            start: function(){
                this.timeoutObj = setTimeout(function(){
                    ws.send("HeartBeat");
                }, this.timeout)
            }
        }
    }

})();
(function ($) {

    var Circle = function (element, options) {
        this.$element = $(element);
        this.options = $.extend({}, $.fn.circle.defaults, options);
        this.init();
    };

    Circle.prototype = {
        constructor: Circle,
        render: function (circle) {
            circle.context.clearRect(0, 0, circle._width, circle._height);
            circle.paint();
            circle._radius += 0.5; //每一帧半径增加0.5
            if (circle._radius >= circle._waveMaxRadius) {
                circle._radius = circle.options.radius;
            };
        },
        init: function () {
            this.canvas = this.$element[0];
            this.context = this.canvas.getContext("2d");
            //设置主canvas的绘制透明度
            this.context.globalAlpha = this.options.alpha;

            this._radius = this.options.radius;
            this._width = this.options.width;
            this._height = this.options.height;
            this._fillColor = this.options.fillColor;
            this._lineColor = this.options.lineColor;

            this._waveMaxRadius = this.options.waveMaxRadius;
            this._waveMinRadius = this.options.waveMinRadius;
            this._waveInterval = this.options.waveInterval;
            this._timeInterval = this.options.timeInterval;

            this.autoDraw();
        },
        paint: function () {
            // this.context.lineWidth = 2; //线条宽度
            // this.context.strokeStyle = this._lineColor; //颜色
            // this.context.beginPath();
            // this.context.arc(this._width / 2, this._height / 2,this._waveMinRadius, 0, Math.PI * 2);
            // this.context.fillStyle = this._fillColor;//填充颜色,默认是黑色
            // this.context.closePath();
            // this.context.fill();//画实心圆

            this.context.lineWidth = 1; //线条宽度
            this.context.strokeStyle = this._lineColor; //颜色
            var temp = this._radius;
            while(temp<this._waveMaxRadius){
                this.context.beginPath();
                this.context.arc(this._width / 2, this._height / 2,temp, 0, Math.PI * 2);
                this.context.closePath();
                this.context.stroke();
                temp+=this._waveInterval;
            }

            var temp1 = this._radius;
            while(temp1>this._waveMinRadius){
                this.context.beginPath();
                this.context.arc(this._width / 2, this._height / 2,temp1, 0, Math.PI * 2);
                this.context.closePath();
                this.context.stroke();
                temp1-=this._waveInterval;
            }

        },
        autoDraw: function () {
            if (this.options.aniSwitch == true) {
                this.timeId = setInterval(this.render, this._timeInterval, this);
            }
        },
        setAlpha: function (alpha) {
            this.options.alpha = alpha;
        },
        stopAni: function () {
            window.clearInterval(this.timeId);
        },
        setRadius: function (radius) {
            this._radius = radius;
        },
        setWidth: function (width) {
            this._width = width;
        },
        setHeight: function (height) {
            this._height = height;
        },
        setFillColor: function (color) {
            this._fillColor = color;
        },
        setLineColor: function (color) {
            this._lineColor = color;
        }
    };

    $.fn.circle = function (options) {
        var $this = $(this);
        var data = $this.data('circle');
        var options = typeof options === 'object' && options;
        if (!data) $this.data('circle', (data = new Circle(this, options)));
    };


    $.fn.circle.defaults = {
        container: 'box',
        height: 100,
        width: 100,
        alpha: 1,
        radius: 10,
        aniSwitch: true,
        waveNum: 4,
        waveMaxRadius:50,
        waveMinRadius:10,
        waveInterval:10,
        timeInterval:100,
        fillColor: "rgba(250,250,50)",
        lineColor: 'rgba(250,250,50)'
    };

    $.fn.circle.Constructor = Circle;

})(jQuery)
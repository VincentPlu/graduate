/**
 * Created by Charle on 2019-09-26.
 */
var MapUtils = MapUtils ||{};
(function () {

    MapUtils.areClockWise =  function(Varm, Vop) {
        return -Varm.y * Vop.x + Varm.x * Vop.y > 0;
    }

    function isWithinRadius(v, radiusSquared)
    {
        return v.x*v.x + v.y*v.y <= radiusSquared;
    }

    MapUtils.isInsideSector = function (point, center, sectorStart, sectorEnd, radiusSquared) {
        var relPoint = {
            x: point.x - center.x,
            y: point.y - center.y
        };

        return !areClockWise({x:Math.cos(sectorStart),y:Math.sin(sectorStart)}, relPoint) &&
            areClockWise({x:Math.cos(sectorEnd),y:Math.sin(sectorEnd)}, relPoint) &&
            isWithinRadius(relPoint, radiusSquared);
    }

    MapUtils.computeAzimuth = function(lng01, lat01,lng02,lat02) {
        var lat1 = lat01, lon1 = lng01, lat2 = lat02,
            lon2 = lng02;
        var result = 0.0;

        var ilat1 = eval(0.50 + lat1 * 360000.0);
        var ilat2 = eval(0.50 + lat2 * 360000.0);
        var ilon1 = eval(0.50 + lon1 * 360000.0);
        var ilon2 = eval(0.50 + lon2 * 360000.0);

        lat1 = lat1*Math.PI / 180;
        lon1 = lon1*Math.PI / 180;
        lat2 = lat2*Math.PI / 180;
        lon2 = lon2*Math.PI / 180;

        if ((ilat1 == ilat2) && (ilon1 == ilon2)) {
            return result;
        } else if (ilon1 == ilon2) {
            if (ilat1 > ilat2)
                result = 180.0;
        } else {
            var c = Math
                .acos(Math.sin(lat2) * Math.sin(lat1) + Math.cos(lat2)
                    * Math.cos(lat1) * Math.cos((lon2 - lon1)));

            var  A = Math.asin(Math.cos(lat2) * Math.sin((lon2 - lon1)) / Math.sin(c));

            result = A*180 / Math.PI;
            if ((ilat2 > ilat1) && (ilon2 > ilon1)) {
            } else if ((ilat2 < ilat1) && (ilon2 < ilon1)) {
                result = 180.0 - result;
            } else if ((ilat2 < ilat1) && (ilon2 > ilon1)) {
                result = 180.0 - result;
            } else if ((ilat2 > ilat1) && (ilon2 < ilon1)) {
                result += 360.0;
            }
        }

        if(result<0){
            result +=360.0;
        }
        if(result>360){
            result -=360.0;
        }

        return result;
    };

    MapUtils.getAngle = function (lng_a, lat_a, lng_b, lat_b) {
            var y = Math.sin(lng_b - lng_a) * Math.cos(lat_b);
            var x =
                Math.cos(lat_a) * Math.sin(lat_b) -
                Math.sin(lat_a) * Math.cos(lat_b) * Math.cos(lng_b - lng_a);
            var angle = Math.atan2(y, x);
            angle = (180 * angle) / Math.PI;
            return angle;
    }

    MapUtils.getDistance = function (lng_a, lat_a, lng_b, lat_b) {
        var radLat1 = lat_a*Math.PI / 180.0;
        var radLat2 = lat_b*Math.PI / 180.0;
        var a = radLat1 - radLat2;
        var  b = lng_a*Math.PI / 180.0 - lng_b*Math.PI / 180.0;
        var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) +
            Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)));
        s = s *6378.137 ;// EARTH_RADIUS;
        s = Math.round(s * 10000) / 10000;
        return s;
    }
})()
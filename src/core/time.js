/**
 * Created by way on 15/4/13.
 *
 * 时间库
 *
 */


define(function(require, exports, module){
    var time={};
    time.diff = function (hisTime,nowTime){
        var now =nowTime?nowTime:new Date().getTime(),
            diffValue = now - hisTime,
            result='',
            minute = 1000 * 60,
            hour = minute * 60,
            day = hour * 24,
            month = day * 30,
            year = month * 12,

            _year = diffValue/year,
            _month =diffValue/month,
            _week =diffValue/(7*day),
            _day =diffValue/day,
            _hour =diffValue/hour,
            _min =diffValue/minute;

        if(_year>=1) result=parseInt(_year) + "年前";
        else if(_month>=1) result=parseInt(_month) + "个月前";
        else if(_week>=1) result=parseInt(_week) + "周前";
        else if(_day>=1) result=parseInt(_day) +"天前";
        else if(_hour>=1) result=parseInt(_hour) +"小时前";
        else if(_min>=1) result=parseInt(_min) +"分钟前";
        else result="刚刚";
        return result;
    }
    module.exports=time.diff;

    time.format = function (now,type){
        var now = now + '';
        now = now.replace(/000$/,'')*1;
        now *= 1000;
        var _now = new Date(now);
        var rst='';
        if (type){
            if (type == 'date'){
                rst = year+"-"+month+"-"+date;
            }
            if (type == 'time'){
                rst = hour+':'+minute+':'+second;
            }
        }else{
            rst = _date() + ' ' + _time();
        }

        function _date(){
            var year=_now.getFullYear();
            var month=_now.getMonth()+1;
            var date=_now.getDate();
            if ((month+'').length <= 1){
                month = '0'+month;
            }
            if ((date+'').length <= 1){
                date = '0'+date;
            }
            return year+"-"+month+"-"+date;
        }

        function _time(){
            var hour=_now.getHours();
            var minute=_now.getMinutes();
            var second=_now.getSeconds();
            return hour+':'+minute+':'+second;
        }

        return  rst
    }

})

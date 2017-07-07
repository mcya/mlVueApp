
   import  wx from './jweixin-1.0.0.js';
   import  Zepto from '../../core/Zepto';
    //todo 这里是默认值，可以在这里设置默认值 一般在这里设置就可以了，如果不用每一页分享不同内容
    var def_share =  {
            title : '',
            desc : "",
            link: '',
            imgUrl: '',
            type: ''
        }
    Zepto();
    var share;
    (function (){
   		
        var params={
            url:encodeURIComponent(location.href),
            debug:"0"
        }
   
        $.ajax({
                url:'http://weixin.mlxing.com/shareapi/get_code',
                data:params,
                dataType:'jsonp',
                success:function(data){
                    _success(data);
                }
            })
        function _success(data){
            
            var _data = data;
            var cf = {
                // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                debug: false,
                // 必填，公众号的唯一标识
                appId: _data.appid,
                // 必填，生成签名的时间戳
                timestamp: _data.timestamp,
                // 必填，生成签名的随机串
                nonceStr: _data.noncestr,
                // 必填，签名，见附录1
                signature: _data.signature,
                // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                jsApiList: [
                    'checkJsApi',
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage',
                    'onMenuShareQQ',
                    'onMenuShareWeibo',
                    'onMenuShareQZone',
                    'hideMenuItems',
                    'showMenuItems',
                    'hideAllNonBaseMenuItem',
                    'showAllNonBaseMenuItem',
                    'translateVoice',
                    'startRecord',
                    'stopRecord',
                    'onVoiceRecordEnd',
                    'playVoice',
                    'onVoicePlayEnd',
                    'pauseVoice',
                    'stopVoice',
                    'uploadVoice',
                    'downloadVoice',
                    'chooseImage',
                    'previewImage',
                    'uploadImage',
                    'downloadImage',
                    'getNetworkType',
                    'openLocation',
                    'getLocation',
                    'hideOptionMenu',
                    'showOptionMenu',
                    'closeWindow',
                    'scanQRCode',
                    'chooseWXPay',
                    'openProductSpecificView',
                    'addCard',
                    'chooseCard',
                    'openCard'
                ]
            }
            wx.config(cf);
        }
    }())


    wx.error(function(res){
        console.log(res);
        //console.log('配置失败')
    });
    // wx.setShare = function(opt){
    //      share = $.extend({}, def_share, {
    //          link : location.href
    //      }, opt);
    //      setMenu(share);
    //  };

    wx.ready(function (api){
        //console.log('微信配置成功');
       // setShare({});
    })

   

    function setMenu(share){
        //分享朋友事件
        wx.onMenuShareAppMessage(share);
        //分享朋友圈事件 -> title 等于 描述
        wx.onMenuShareTimeline($.extend({},share,{
            title : share.desc
        }));
        //分享扣扣事件
        wx.onMenuShareQQ(share);
    }
	export default function (opt){
        console.log('config')
          //console.log(opt);
        share = $.extend({}, def_share, {
            link : location.href
        }, opt);
        setMenu(share);
    }





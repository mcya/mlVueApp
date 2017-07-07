/* 日期:2016/11/16
功能名称：支付模块
作者：peterYu
调用示例：
 	new wxPay({
	    fn:"mlxapp.chargeMoney",//安卓提供的方法
	    url:"//weixin.mlxing.com/wechat/indent?trade_type=JSAPI",
	    params:{
	        total_fee:$val,//金额
	        handle:"success"//苹果需要的回调
	    },
	    callback:success
	  });
参数说明：
    url	微信浏览器支付接口 
	function success(res){
		res是苹果那边提供的返回值，用于唤起原生的微信支付
		if(res){
		  window.location.href='http://static.mlxing.com/index.html#/player_user';
		}else{
		  alert('取消支付');
		}
	}
	success两个方法需要写在调用的页面
*/
// vi 2016/11/22 1、扩展了debug,可以在本地浏览器上测试。
// 2、增加了system，属性值为系统名
// 3、在wx系统上会判断是否有url，然后判断是否支付 
define(function(require,exports,module){
	var WxCash = function(o){
		this.debug=o.debug||false;
		this.init(o);
		
	}
	WxCash.prototype = {
		prop:['MicroMessenger','iPhone','Android'],
		ua:navigator.userAgent,
		system:'',
		android :function (arg){//我是安卓
			console.log('我是安卓我是安卓我是安卓我是安卓')
//			if(window.mlxapp==undefined){//本地测试
//				return
//			}
			console.log(arg.fn+'(\''+JSON.stringify(arg.params)+'\')');
			eval(arg.fn+'(\''+JSON.stringify(arg.params)+'\')');
			
		},
		iphone:function(arg){//我是苹果
			
			if(arg.http==undefined){
				var str = 'mlx://sendMessage_?'+JSON.stringify(arg.params);
				console.log(str);
				window.location.href=str;
			}else{
				var str = arg.http+'?' ;
				for(var i in arg.params){
					str = str+i+'='+arg.params[i]+'&';
				}
				//console.log(str.substring(0,str.length-1));
				window.location.href=str;
			}
			
		},
		micromessenger:function(arg){//微信
			console.log('inIp');
			net(arg.url,arg.params,function(res){
				WeixinJSBridge.invoke(
			       'getBrandWCPayRequest', {
			           "appId":res.appId,//公众号名称，由商户传入     
			           "timeStamp":String(res.timeStamp),//时间戳，自1970年以来的秒数     
			           "nonceStr":res.nonceStr, //随机串     
			           "package":res.package,//订单号   
			           "signType":res.signType,//微信签名方式：     
			           "paySign":res.paySign//微信签名 
			       },function(res){     
			           	arg.callback(res);
			       }); 
			})
		},
		init:function(arg){
			if(this.ua.match(/MicroMessenger/i) == this.prop[0]){
				this.system='wx'
				if(arg.url!=undefined){
					this.micromessenger(arg);
				}
			}else if(this.ua.match(/iPhone/i) == this.prop[1] &&( (this.ua.indexOf('mlxapp') > -1  ||this.debug==true))){
				console.log('iPhone')
				this.system='iPhone'
				this.iphone(arg);
			}else if(this.ua.match(/Android/i) == this.prop[2] &&( (this.ua.indexOf('mlxapp') > -1 ||  this.debug==true))){
				console.log('我是安卓')
				this.system='Android'
				this.android(arg);
			}
			
		}
	}
	module.exports=WxCash;
})

	




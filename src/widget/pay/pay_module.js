
export default function(arg){
	var prop = ['MicroMessenger','iPhone','Android'],
		ua = navigator.userAgent

	if(ua.match(/MicroMessenger/i) == prop[0]){
		micromessenger(arg);
	}else if(ua.match(/iPhone/i) == prop[1]){
		iphone(arg);
	}else if(ua.match(/Android/i) == prop[2]){
		android(arg);
	}

}
function android(arg){
	var json = JSON.stringify(arg.params);
		/*if(fn == '') return;
		alert(JSON.stringify(arg.params));
		if(mlxapp.chargeMoney){
			alert(mlxapp.chargeMoney+'原生支付方法');
		}
		eval(arg.fn+'('+json+')');
		
		eval(mlxapp.chargeMoney(json));
		if(window.mlxapp.chargeMoney){
			alert(window.mlxapp.chargeMoney);
		}
		mlxapp.chargeMoney('json');*/
		//alert(json)
	eval(arg.fn+'(\''+JSON.stringify(arg.params)+'\')');
}
function iphone(arg){
	var str = 'mlx://sendMessage_?'+JSON.stringify(arg.params);
	//alert(str);
	window.location.href=str;
}
function micromessenger(arg){
	$.post(arg.url,arg.params,function(res){
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
	       	}
	    ); 
	},'jsonp')
}



export default function(img_url ){
	//console.log(el)
	var img = new Image();
	img.src = img_url;
 
	// 判断是否有缓存
	if(img.complete){
	    // 打印
	    console.log('from:complete : width:'+img.width+',height:'+img.height);
	}else{
	    // 加载完成执行
	    img.onload = function(){
	        // 打印
	         console.log('from:onload : width:'+img.width+',height:'+img.height);
	    };
	}
}

//import $defaultImg from '../icon/find_team.png'

//1.因为之前没有判断原图尺寸，按照传参数去裁剪，这个太麻烦了。
//2.只有两种，需要裁剪跟不需要裁剪
//3.不再自定义尺寸，统一规格，大图跟小图。

//接受参数(img_url:str,bg:bool,{cute:布尔,defaultImg:str})

import $hotTag from '../icon/hottag_default.png'
import $defaultImg from '../icon/default_photo.png'
export default function(res,option,defaultImg){//图标添加前缀
	var str;
	if(res=='' || res==null){
		if(defaultImg=='tag'){
			str=$hotTag;
		}else{
			str=$defaultImg;
		}
	}else{
		str = res;
		if( str.indexOf('http')>-1&&(str.indexOf('oss')>-1) ||str.indexOf('http')==-1){//有具体链接,并且不是oss图片
			if(str.indexOf('oss')==(-1) && str.indexOf('http')==-1){//已经添加了oss前缀
				str='http://mlx.oss.mlxing.com/'+str;
			}else if(str.indexOf('hangzhou')>-1){
				str = str.replace(/http:\/\/[^\/]+/g,'http://mlx.oss.mlxing.com');
			}
			
			if(str.indexOf('?')==(-1) && str.indexOf('oss')>-1){//没有处理
				var ops='';
				if(option.width){
				
					ops=ops+'?x-oss-process=image/resize,m_mfit';
						ops=ops+',w_'+parseInt(option.width);
				}
				if(option.height){
					
					if(!(ops.indexOf('resize')>-1)){
						ops=ops+'?x-oss-process=image/resize';
					}
					ops=ops+',h_'+parseInt(option.height);
				}
				if(option.center){
					
					//ops=ops+'/crop,g_center,w_'+parseInt(option.width)+',h_'+parseInt(option.height);
					ops=ops+'/crop,g_center,h_200,w_200';
				}
				str=str+ops;
			}
			
			
		}
	}

	if(option.bg){
		return isBG(str);
	}else{
		return str;
	}
}


function isBG(res){//是背景图
	return "url("+res+')';
}


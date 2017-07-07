//import $defaultImg from '../icon/find_team.png'
//1.因为之前没有判断原图尺寸，按照传参数去裁剪，这个太麻烦了。
//2.只有两种，需要裁剪跟不需要裁剪
//3.不再自定义尺寸，统一规格，大图跟小图。
//4.返回值告诉他宽大还是高大（三种情况，宽，高，相等）

//接受参数(this.src:str,bg:bool,{cute:布尔,defaultImg:str})
import $hotTag from '../icon/hottag_default.png'
import $defaultImg from '../icon/default_photo.png'
export default function(option){//图标添加前缀
	
	function demo(){

		this.default={
			bg:false,
			cute:true,
			src:'',
			heightClass:'',
			widthClass:'',
			class:'',
			dom:'',
			big:'width',
		};
		this.option='';
		this.init();
	}
	demo.prototype={
		init:function(){
			this.option = $.extend({},this,option);

			this.pro();
		},
		setDom:function(){
			
			if(this.option.bg){
				// $(this.option.dom).css('backgroundImage',this.option.src).addClass(this.option.class);

				$(this.option.dom).css('background-image','url('+this.option.src+')').addClass(this.option.class); 
			}else{
				$(this.option.dom).attr('src',this.option.src).addClass(this.option.class);
			}
		},
		pro:function(){
			
			if(this.option.src=='' || this.option.src==null){//默认图片的，暂时没想好怎么搞
				if(option.defaultImg=='tag'){
					this.option.src=$hotTag;
				}else{
					this.option.src=$defaultImg;
				}
			}else {
				
				var self = this;
				if( this.option.src.indexOf('http')>-1&&(this.option.src.indexOf('oss')>-1) ||this.option.src.indexOf('http')==-1){//有具体链接,并且不是oss图片

					// if(this.option.src.match('.jpg').length>1){
						
					// 	var index = this.option.src.indexOf('.jpg');
					// 	this.option.src=this.option.src.substr(0,index);
						
					// }
					if(this.option.src.indexOf('oss')==(-1) && this.option.src.indexOf('http')==-1){//已经添加了oss前缀
						this.option.src='http://mlx.oss.mlxing.com/'+this.option.src;
					
					}else if(this.option.src.indexOf('hangzhou')>-1){
						this.option.src = this.option.src.replace(/http:\/\/[^\/]+/g,'http://mlx.oss.mlxing.com');
						
					}
					var width,height;//宽高
					var img = new Image();
					img.src=this.option.src+'?x-oss-process=image/resize,m_mfit,w_10';
					
					if(img.complete){
					    //console.log('from:complete : width:'+img.width+',height:'+img.height);
					    width = img.width;
					    height = img.height;
					    setOption()
					    self.setDom();
					}else{
					    img.onload = function(){
					        //console.log('from:onload : width:'+img.width+',height:'+img.height);
					        width = img.width;
					    	height = img.height;
					    	setOption();
					    	
					    	self.setDom();
					    	
					    };
					}
					//处理
					function setOption(){
						if(self.option.cute){

						}
						if(width>height){
							//默认宽度250,随便设的
							self.option.src=self.option.src+'?x-oss-process=image/resize,m_mfit,w_250,h_'+parseInt(250*height/width);
							self.option.big='width'
							self.option.class=self.option.widthClass;
						}else{
							self.option.src=self.option.src+'?x-oss-process=image/resize,m_mfit,w_'+parseInt(280*width/height)+',h_280';
							self.option.big='height'
							self.option.class=self.option.heightClass;
						}
				
						
					}

				}
			}
		}
	}
	new demo();
}
//建议配套使用
// <img v-for='(item,index) in images' :data='init(item,index)' ref='imgs' >
// init:function(item,index){
// 			var self = this;
// 			setTimeout(function(){
// 				$handleImg({src:item,dom:self.$refs.imgs[index]})
// 			},0)
			
// 		}
// 	    .widthImg{
	// 	width: 200px;height: 150px;
	// }
	//  .heightImg{
	// 	width: 150px;height: 200px;
	// }
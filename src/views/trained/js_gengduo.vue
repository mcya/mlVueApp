<template>
	<div class="js_gengduo">
		<div class="seek">
			<input type="text" v-model='teacher_name' name="" id="input" value="" v-on:keyup.enter='seek' v-on:focus='changeInputSty'/>
			<img src="../../data/seek.png" class="seek_click">
			<span v-if="ft" class="cancel" v-on:click="cancel">取消</span>
		</div>
		<div class="lists">
			<div class="list" v-for="recommend_teacher in recommend_teachers" v-on:click="go_intro(recommend_teacher,recommend_teachers)">
				<div class="head">
					<img :src="imgHead(recommend_teacher.headimgurl)">
				</div>
				<p>{{recommend_teacher.truename}}</p>
				<div class="jiang">
					<img src="../../data/Group 2.png">
				</div>
			</div>
		</div>
		<c-alert :show='danmu_true' :text='danmu_tishi'></c-alert>
	</div>
</template>
<script>
import $headerimg from '../../icon/find_team.png';
import c_alert from '../../components/alert';
export default{
	components:{
			'c-alert':c_alert,
		},
	data:function(){
		return {
			ft:false,
			recommend_teachers:[],
			page:1,
			danmu_true:false,//弹幕提示
			danmu_tishi:'已经加载完了',//弹幕内容
//			$headerimg:'../../icon/find_team.png',
			f:1,//用于处理弹窗
			teacher_name:'',
		}
	},
	props:['show','text'],
	mounted:function(){//挂载时候执行的函数
		var title=document.getElementsByTagName('title')[0];
			title.innerHTML = '热门讲师';
		var self=this;
		this.teacher_lists();
		window.onscroll=function(){
				var t =document.documentElement.scrollTop||document.body.scrollTop;
				//获取整张页面高度
				var height=$(document).height();
				//console.log(height);
				t=height-t;
				if(t<=850){
					//self.page=self.page+1;
					//console.log(self.page);
					//self.recommend_teachers=[];
					//self.teacher_lists();
				}
				var scrollTop = $(this).scrollTop();
			　　var scrollHeight = $(document).height();
			　　var windowHeight = $(this).height();
			　　if(scrollTop + windowHeight == scrollHeight){
			　　　　//alert("已经到最底部了！");
					if(self.f=1){
						if(t<=668){
						//console.log('小于');
						self.danmu_true=true;
						self.danmu_tishi='已经加载完了';
						//height=10000;
							var f=setInterval(function(){
								self.danmu_true=false;
								//window.clearInterval(f);
								//self.f=2;
							},2000);
						}
					}
			　　}
//				if(self.f=1){
//						if(t<=668){
//						console.log('小于');
//						self.danmu_true=true;
//						self.danmu_tishi='已经加载完了';
//						//height=10000;
//						var f=setInterval(function(){
//							self.danmu_true=false;
//							window.clearInterval(f);
//							self.f=2;
//						},3000);
//					}
//				}
				
				//varf =  setInterval();
				//window.clearInterval(f);
			}

		 
	},
	methods:{
		imgHead:function(res){
				var oss='?x-oss-process=image/resize,w_'+$(window).width();
				//console.log(res,'photo' )
				if(res=="" || res== null){ 
					return $headerimg
				}else{
					if(res.indexOf('http')>-1){
						return res+oss
					}else{
						return 'http://mlx.oss.mlxing.com/'+res+oss;
					}
				}
			},
		changeInputSty:function(){
			var self=this;
			var $seek=$('.seek_click');
			var $input=$('#input');
			$seek.css('left','7.25%');
			$input.css('padding-left','10.41%');
			$input.css('width','75.73%');
			this.ft=true;
			//$input[0].value='搜索';
			//self.teacher_name=$input[0].value;
		},
		seek:function(){
			console.log('todo');
			var self=this;
			
//			$("input").keydown(function(event){
//			  //$("input").css("background-color","#FFFFCC");
//			  //$input[0].value='';
//			  if(event.keyCode==13){
//			  	//获取当前input里的值
//			  	
//			  	
//			  	console.log(self.teacher_name);
//			  }
			  
			//});
			
		  	self.recommend_teachers=[];
		  	self.page=1;
			self.teacher_lists();
		},
		cancel:function(){
			var $cancel=$('.cancel');
			var $seek=$('.seek_click');
			var $input=$('#input');
			$input.css('width','93.86%');
			$seek.css('left','49%');
			$input.css('padding-left',0);
			this.ft=false;
			$input[0].value='';
			this.teacher_name='';
			this.recommend_teachers=[];
			this.teacher_lists();
		},
		teacher_lists:function(){
			var self=this;
			//self.page=2;
			$.ajax({
					url:baseUrl+'/course_info/hot_teacher_lists',
					data:{
						page:self.page,
						name:self.teacher_name
					},
					dataType:'jsonp',
					success:function(data){
						//console.log(data);
						//self.recommend_teachers=data.result;
						if(self.recommend_teachers != []){
							self.recommend_teachers=[];
							console.log(self.recommend_teachers);
						}
						for(var j=0;j<data.result.length;j++){
							self.recommend_teachers.push(data.result[j]);
						}
						$.each(self.recommend_teachers,function(index,item){
							if(item.headimgurl == null || item.headimgurl == "")
							{
								item.headimgurl=$headerimg;
							}
						});
						//console.log(self.recommend_teachers)
					}	
			});
		},
		go_intro:function(recommend_teacher){
			console.log(recommend_teacher.mid);
			localStorage.setItem("trained_teacher_id",recommend_teacher.mid);
			location.hash='#/intro';
		}
	},
}
</script>
<style lang='scss'>
	.js_gengduo{
		/*height: 750px;*/
		.seek{
			width: 100%;
			height: 52px;
			background: #d9d9d9;
			position: relative;
			input{
				padding-left: 0;
				display: inline-block;
				width: 93.86%;
				height: 30px;
				background: #fafafa;
				border-radius: 3px;
				margin-top: 10px;
				/*margin: 0 auto;*/
				margin-left: 3.4%;
				font-size: 12px;
				color: #b2b2b2;
				/*text-align: center;*/
			}
			img{
				width: 13px;
				height: 13px;
				position: absolute;
				top: 20px;
				left: 49%;
			}
			.cancel{
				color: #f94231;
				font-size: 14px;
			}
		}
		.lists{
			.list{
				width: 100%;
				height: 49px;
				position: relative;
				.head{
					width: 39px;
					height: 39px;
					/*background-color: #004BD2;*/
					margin-left: 3.46%;
					margin-top: 3px;
					border-radius: 50%;
					float: left;
					/*margin-right: 15px;*/
					img{
						width: 39px;
						height: 39px;
						border-radius:50%;
					}
				}
				p{
					
					float: left;
					padding-left: 4%;
					margin-top: 15px;
					font-size: 14px;
					border-bottom: 1px solid #bbbbbb;
					width: 80%;
					height: 34px;
				}
				.jiang{
					img{
						widows: 17px;
						height: 17px;
						position: absolute;
						top: 30px;
						left: 10.93%;
					}
				}
			}
		}
	}
</style>
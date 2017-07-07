<template>
	<div class="kc_gengduo">
		<div class="xian"></div>
		<div class="main" id="main1" v-show="pan">
			<div class="m" v-for="result in results" v-on:click="click1(result,results)">
				<a  style="font-size:0px;">
					<div class="m1"><img :src="imgHead(img_url+result.covers_url) "></div>
					<!--<div class="play_tubiao"><img src="../data/Group Copy 14.png"></div>-->
					<div class="m2">
						
						<dl>
							<dt>
								<p class="teacher_p huise"><span class="m2_img tu_shipin" v-if='result.media_type==1'><img src="../../data/Shape.png"></span>
									<span class="m2_img" v-if='result.media_type==2'><img src="../../data/Combined_Shape.png"></span>讲师：{{result.teacher}} {{result.title}}</p>
								<p>{{result.browse_num}}人学过</p>
							</dt>
							<dd class="dd"><span v-text="result.price"></span></dd>
						</dl>
					</div>
				</a>
			</div>	
		</div>
		<c-alert :show='danmu_true' :text='danmu_tishi'></c-alert>
	</div>
</template>
<script>
import c_alert from '../../components/alert';
import $headerimg from '../../icon/find_team.png';
export default{
	components:{
			'c-alert':c_alert,
		},
	data:function(){
		return {
			pan:true,
			results:[],
			page:1,
			img_url:'',
			danmu_true:false,//弹幕提示
			danmu_tishi:'已经加载完了',//弹幕内容
		}
	},
	mounted:function(){//挂载时候执行的函数
		var self=this;
		this.ajax();
		//判断滚动条到底部
		$(window).scroll(function(){
			var t =document.documentElement.scrollTop||document.body.scrollTop;
				//获取整张页面高度
				var height=$(document).height();
				console.log(height);
				t=height-t;
				if(t<=850){
					self.page=self.page+1;
					//console.log(self.page);
					//self.recommend_teachers=[];
					self.ajax();
				}
			
		　　var scrollTop = $(this).scrollTop();
		　　var scrollHeight = $(document).height();
		　　var windowHeight = $(this).height();
		　　if(scrollTop + windowHeight == scrollHeight){
		　　　　//alert("已经到最底部了！");
				self.danmu_true=true;
				self.danmu_tishi='已经加载完了';
				//height=10000;
				setInterval(function(){
					self.danmu_true=false;
					//window.clearInterval(f);
					//self.f=2;
					},3000);
		　　}
		});
	},
	methods:{
		ajax:function(){
			var ft=this.pan;
			var self=this;
				$.ajax({
				url:baseUrl+'/course_info/course_lists',
				data:{is_recommend:true,page:self.page},
				dataType:'jsonp',
				async:true,
				success:function(data){
					console.log(data);
//						self.results=data.result;
					//console.log(data.result);
					
					for(var j=0;j<data.result.length;j++){
						self.results.push(data.result[j]);
					}
					
					//处理price价格为0.00时
					for(var i=0;i<self.results.length;i++){
							if(self.results[i].price=="0.00"){
							self.results[i].price='免费';
						}
					}
					
				}	
			})
		},
		imgHead:function(res){
			console.log(res);
				var oss='?x-oss-process=image/resize,w_'+$(window).width();
				
				if(res.indexOf('http')>-1){
					return res+oss
				}else{
					return 'http://mlx.oss.mlxing.com/'+res+oss;
				}
			},
		click1:function(result_obj){
				console.log(result_obj);
				console.log("click1");
				//localStorage 存储id
				 localStorage.setItem("trained_course_id",result_obj.id);
				 console.log(localStorage.getItem('trained_course_id'));
				 this.play_id=result_obj.id;
				 var self=this;
				this.$router.push({name:'play',params:{id:self.play_id}});
			},	
	},
}
</script>
<style lang='scss'>
.kc_gengduo .xian{
	width: 100%;
	height: 13px;
	background: #EAEAEA;
}
.kc_gengduo .main{
	width: 96%;
	height: 100%;
	padding: 7px;
}
.kc_gengduo .m{
	width: 100%;
	min-height: (150/20)+rem;
	margin-bottom: 0.437rem;
	position: relative;
}
.kc_gengduo .m1{
	width: 100%;
	min-height: 100%;
	font-size: 0px;
}
.kc_gengduo .m1 img{
	width: 100%;
	/*max-height: (250/20)+rem;*/
	height: 103px;
	border-radius:4px 4px 0 0;
}
.kc_gengduo .m2{ 
	width: 99%;
	height: 40px;
	background: #e5e5e5;
	border:2px solid #e5e5e5;
	border-bottom-right-radius:5px;
	border-bottom-left-radius:5px;
	padding-bottom: 5px;
	}
.kc_gengduo .m2 dd,dt{
	float: left;
	font-size: 13px;
		
}
.kc_gengduo .m2 dd{float: right;margin-right: 10px;
		height: 23px;
		width: 89px;
		text-align: center;
		line-height: 23px;
		margin-top: 10px;
		font-size: 13px;
		color: white;
		background: #FF4E4E;
		border: 1px solid #FF4E4E;
		border-radius: 5px;
}
.dd span{color: white;}
.kc_gengduo .m2 p{
	color: #727272;
	line-height: 21px;
	text-indent:10px;
}
.kc_gengduo .m2_img img{
	height: 20px;
	width: 20px;
    position: absolute;
    top: 7px;
    left: 7px;
}
.kc_gengduo .play_tubiao{
	position: absolute;
	top: 32px;
	left: 42.4%;
}
.kc_gengduo .play_tubiao img{
	width: 42px;
	height: 43px;
	
}
.kc_gengduo .tu_shipin img{
	width: 20px;
	height: 15px;
}
.kc_gengduo .teacher_p{
	width: 10rem;
	text-overflow:ellipsis;overflow:hidden;white-space:nowrap;
}
</style>
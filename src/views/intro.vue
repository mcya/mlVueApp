<template>
	<div class="intro">
		<div class="max-box">
			
			<header>
			<div class="bj">
				<img src="../data/guangz.jpg"/>
			</div>
			<div class="shade-box"></div>
			<div class="shade-font">
				<h2 id="truename">{{data.truename}}</h2>
				<p v-on:click="pinjia">
					<span class="iconfont font-red" v-for="a in arr">&#xe65c;</span>
					<span>{{avg}}分 </span>   <span>{{rows}}人评价</span><!--<span>已播放00万次</span>-->
				</p>
			</div>
			</header>
			<div class="zo">
				<div class="jian">
					<h3>个人简介</h3>
					<div>
						<p class="p1"></p><span></span>
					</div>
					<div class="clearfloat"></div> 
					<p class="jianjie" v-text="intro"></p>
				</div>
				<div class="xiang">
					<div class="x1">
						<h3>相关课程</h3>
						<div>
							<p class="p1"></p><span></span>
						</div>
						<div class="clearfloat"></div>
					</div>
					<div class="x1" v-for="recommend in recommends" >
						<dl>
							<dt>
								<div class="teacher_img" v-on:click="click(recommend,recommends)"><img :src="img_url+recommend.icon_url"/></div>
								<div class="mf">
									<p v-on:click="go_zhifu(recommend,recommends)">{{recommend.price}}</p>
								</div>
							</dt>
							<dd v-on:click="click(recommend,recommends)">
								<h3>讲师：{{recommend.teacher}}</h3>
								<h3>{{recommend.title}}</h3>
								<p> {{recommend.browse_num}}人学过</p>
							</dd>
						</dl>
					</div>
				</div>
			</div>
			<div v-show='t_f' class="pingjia">
				<p>请评价</p>
				<p>
					<span><img  @click='addStart(1)'  :src="startNum>=1?yellowStart:whiteStart"/></span>
					<span><img  @click='addStart(2)'  :src="startNum>=2?yellowStart:whiteStart"/></span>
					<span><img  @click='addStart(3)' :src="startNum>=3?yellowStart:whiteStart"/></span>
					<span><img  @click='addStart(4)'  :src="startNum>=4?yellowStart:whiteStart"/></span>
					<span><img  @click='addStart(5)' :src="startNum>=5?yellowStart:whiteStart"/></span>
				</p>
				<p id="backg" v-on:click="guanbi">完成</p>
			</div>
		</div>
		<div class="zhezhaocheng" v-show='zhezhao'></div>
		<c-alert :show='danmu_true' :text='danmu_tishi'></c-alert>
	</div>
</template>
<style>
@font-face {font-family: "iconfont";
      src: url('../font/iconfont.eot'); /* IE9*/
      src: url('../font/iconfont.eot#iefix') format('embedded-opentype'), /* IE6-IE8 */
      url('../font/iconfont.woff') format('woff'), /* chrome, firefox */
      url('../font/iconfont.ttf') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
      url('../font/iconfont.svg#iconfont') format('svg'); /* iOS 4.1- */
    }

.iconfont {
  font-family:"iconfont" !important;
  font-size:16px;
  font-style:normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}

/*.intro{
	width: 100%;
	height: 100%;
	position: relative;
}*/
.intro .teacher_img img{
	width: 72px;
	height: 93px;
}
.max-box{
	width: 100%;
	height: 100%;
	overflow: hidden;
}
.intro .bj{
	width: 100%;
	height: 189px;
}
.intro .bj img{
	width: 100%;
	height: 189px;
}
.intro .shade-box{
	width: 100%;
	height: 189px;
	background: #000000;
	position: absolute;
	top: 0px;
	opacity: 0.5;
	
}
.intro .shade-font{
	position: absolute;
	top: 0px;
	z-index: 1;
	height: 204px;
	width: 100%;
}
.intro .shade-font .font-red{
	color: #ff4c4e;
}
.intro .shade-font h2{
	font-size: 17px;
	color: #fefffb;
	margin-top: 106px;
	margin-left: 15px;
	
}

.intro .shade-font span{
	font-size: 12px;
	color: #fefffb;
	margin-top: 30px;
	display: inline-block;
}
.intro .shade-font span:nth-of-type(1){
	margin-left: 15px;
}
.intro .shade-font span:nth-of-type(8){
	margin-left:20%;
}
.intro .zo{
	width: 95%;
	height: 100%;
	padding-left: 15px;
	
}
.intro .jian h3{ font-size: 15px;margin-top: 16px;}
.intro .jian .p1{
	height: 3px;width: 37px;background: orangered;margin-top: 10px;
}
.intro .jian .jianjie{
	/*height: 10px;*/
	margin-top: 10px;
	font-size: 10px;
	margin-left: 20px;
	width: 83%;
}
.intro .jian span{ width: 90%;height: 1px;background:#d8d8d8;float: left;}
.intro .clearfloat{clear:both}

.intro .xiang{width: 100%; height: 100%; margin-top: 16px;}
.intro .zo .xiang h3{
	font-size: 15px;margin-bottom: 14px;width: 162px;
	text-overflow:ellipsis;overflow:hidden;white-space:nowrap;
}
.intro .xiang .p1{
	height: 3px;width: 67px;background: orangered;margin-top: 10px;
}
.intro .x1{border-bottom: 1px solid #D8D8D8;height: 100%;display: inline-block;width: 100%;}
.intro .xiang span{ width: 100%;height: 1px;background:#d8d8d8;float: left;}
.intro .xiang dl{margin-top: 14px;width: 100%;height: 100%;display: inline-block;position: relative;}
.intro .xiang dt{
	width: 70px;
	height: 91px;
	background: #D8D8D8;
	border: 1px solid #D8D8D8;
	border-radius:5px;
	float: left;
	margin-left: 10px;
}
.intro .xiang dd{
	float: left;
	margin-left: 14px;
	margin-bottom: 23px;
}
.intro .xiang dd p{
	font-size: 10px;
	color: #707070;
}
.intro .xiang .mf{
	width: 89px;
	height: 23px;
	background:#ff4e4e;
	position: absolute;
	top: 70px;
	left: 70%;
	border: 1 solid #FF4E4E;
	border-radius:3px;
}
.intro .mf p{ font-size: 13px;line-height: 25px;height: 26px;color: white;width: 100%;text-align: center;}
.intro .pingjia{
	width: 60%; 
	height: 106px;
	/*background:rgba(0, 0, 0, 0.6);*/
	position: fixed;
    top: 200px;
    left: 20%;
    box-shadow:4px 2px 4px rgba(78, 78, 78, 0.23);
    background: #FFFFFF;
    z-index: 2;
    border-radius: 4px;
    opacity: 1;
}
.intro .pingjia p{
	color: #636161;
	width: 100%;
	text-align: center;
	margin-bottom: 15px;
	margin-top: 5px;
}
.intro .pingjia img{
	width: 25px;
}
.intro .pingjia #backg{
	
	width: 40px;
	height: 23px;
	background: white;
	/*display: inline-block;*/
	margin: 0 auto;
	color: #636161;
}
.intro .zhezhaocheng{
	width: 100%;
	background:rgba(0, 0, 0, 0.58);
	height: 1000px;
	position: fixed;
	top: 0;
	z-index: 1;
}
</style>
<script>
import whiteStart from '../icon/star_w.png';
import yellowStart from '../icon/star_y.png';
import c_alert from '../components/alert';
export default{
	components:{
			'c-alert':c_alert,
		},
	data:function(){
		return {
			whiteStart:whiteStart,
			yellowStart:yellowStart,
			results:[],
			pan:false,
			play:'&#xe706;',
			pause:'&#xe669;',
			teacher:'',
			title:'',
			intro:'',
			data:{},
			recommends:[],
			img_url:'http://mlx.oss-cn-hangzhou.aliyuncs.com/',
			num:1,
			individual_resume:"暂无简介，敬请期待",
			t_f:false,//用于判断显示隐藏
			arr:[1,2,3,4,5],
			startNum:0,
			id:0,
			avg:5,//老师评价平均分
			danmu_true:false,
			danmu_tishi:'',
			rows:'',
			zhezhao:false,//用于控制遮罩显示
			
		}
	},
	mounted:function(){//挂载时候执行的函数
		self=this;
		//获取用户id
		this.id=this.$store.state.mid;
		this.num=localStorage.getItem('trained_teacher_id');
		console.log(localStorage.getItem('trained_teacher_id'));
		$.ajax({
			url:baseUrl+'/course_info/teacher_details',
			data:{mid:self.num},
			dataType:'jsonp',
			async:true,
			success:function(data){
				console.log(data);
				self.data=data;
				self.recommends=data.recommend;
				self.intro=data.bz;
				console.log(self.recommends.bz);
				//处理价格为0.00时
				for(var z=0;z<self.recommends.length;z++){
						if(self.recommends[z].price=='0.00'){
							self.recommends[z].price='免费';
						}
					}
			}	
		});
		//获取评价信息
		 
		$.ajax({
				url:baseUrl+'/course_info/evaluate_list',
				data:{
					data:'{ "biz_id":'+self.num+',"biz_type":"t_course_info"}'
				},
				dataType:'jsonp',
				success:function(data){
					console.log(data.avg);
					self.rows=data.rows;
					if(data.avg==null){
						self.avg=5;
					}else{
						self.avg=parseInt(data.avg);
						//处理显示的星星数
						self.arr=[];
						for(var i=0;i<self.avg;i++){
							self.arr.push(i);
						}
						console.log(self.arr);
					}
				}	
			});
		//当个人简介为空时处理
		if(self.recommends.bz==null){
			$('.jianjie').html(this.individual_resume);
		}
		//当名字为空时
//		if(self.recommends.truename==null){
//			$('#truename').html('大咖讲师');
//		}
		
	},
	methods:{
		addStart:function(num){
			this.startNum = num;
		},
		click:function(course){
			//存储对应的id
			console.log(course);
			localStorage.setItem("trained_course_id",course.id);
			console.log(localStorage.getItem('trained_course_id'));
			//页面跳转
			location.hash="#/play/"+course.id;
		},
		pinjia:function(){
//			console.log(123);
			this.t_f=true;
			this.zhezhao=true;
			var a=0;
			var c=0;
			var d=90;
			var b=setInterval(function(){
				c=(c+0.1)*2;
				a=a+7;
				d=d-10;
//				$('.pingjia').css('top',a+'px');
				$('.pingjia').css('opacity',c);
//				$('.pingjia').css('width',d+'%');
//				$('.pingjia').css('left',a+'%');
				console.log(a);
				if(c>=1){
					clearInterval(b);
//					$('.pingjia').css('top','220px');
					$('.pingjia').css('opacity',1);
				}
				if(d<=50){
//					$('.pingjia').css('width','50%');
				}
				if(a>=25){
//					$('.pingjia').css('left','25%');
				}
			},200);
			
		},
		guanbi:function(){
			this.t_f=false;
			this.zhezhao=false;
			var self=this;
			$.ajax({
				url:baseUrl+'/course_info/evaluate_insert',
				data:{
					data:'{ "biz_id":'+self.num+',"biz_type":"t_course_info","biz_level":'+self.startNum+',"biz_user":'+self.id+'}'
				},
				dataType:'jsonp',
				success:function(data){
					//alert(data.msg);
					//处理提示内容
					//console.log(data.return);
//					alert(typeof data.return);
					if(data.return == 'true'){
//						alert('进来if了 ');
						self.huoqu_pingjiaxinxi();
					}
					if(data.msg.indexOf('biz_user')>-1){
						self.danmu_true=true;
						self.danmu_tishi='您已经评价过了';
					}else{
						self.danmu_tishi=data.msg;
						self.danmu_true=true;
					}
					setTimeout(function(){
						self.danmu_true=false;
					},2000);
					
				}	
			});
		},
		huoqu_pingjiaxinxi:function(){
//			alert(123);
			var self=this;
			$.ajax({
				url:baseUrl+'/course_info/evaluate_list',
				data:{
					data:'{ "biz_id":'+self.num+',"biz_type":"t_course_info"}'
				},
				dataType:'jsonp',
				success:function(data){
					console.log(data.avg);
					self.rows=data.rows;
//					alert(self.rows);
					if(data.avg==null){
						self.avg=5;
					}else{
						self.avg=parseInt(data.avg);
						//处理显示的星星数
						self.arr=[];
						for(var i=0;i<self.avg;i++){
							self.arr.push(i);
						}
						console.log(self.arr);
					}
				}	
			});
		},
		go_zhifu:function(recommend){
			if(recommend.price != '免费'){
					this.$router.push({name:'zhifu',params:{teacher:recommend.teacher,title:recommend.title,price:recommend.price,biz_id:recommend.id}});	
				}
			if(recommend.price == '免费'){
				this.$router.push({name:'play',params:{id:recommend.id}});
			}
		}
	},
}
</script>
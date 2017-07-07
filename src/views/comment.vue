<template>
	<div class="comment_c">
		<transition name='view'>
		<c-send-msg v-if='sendpl' fn='xxx'  v-on:xxx='pinglunCallback'  :isReply='isReply'   biz_type='t_course_info' :id='id'>
		</c-send-msg>
		</transition>
		<div class="com">
			<div class="xian"></div>
			<div class="content" v-for="pin in pinlun" v-on:click="fs_huifu(pin,pinlun)">
				<div class="left"><img :src="img_url+pin.headimgurl"></div>
				<div class="right">
					<ul>
						<li>{{pin.comment_user}}<span class="shijian">{{pin.comment_time}}</span><span class="iconfont span_font">&#xe603;  {{praise_num}}</span></li>
						<li></li>
						<li>{{pin.comment_content}}</li>
						
						<li class="huifuclass">
							<p v-on:click="fs_huifu(pin,pinlun)"><span id="huifu_ba">回复</span><div v-for='inf in pin.reply' class="huifu_font">{{nickname}}:{{inf.comment_content}}</div></p>
							<!--<ol >
								<li v-for='inf in pin.reply'>{{inf.comment_content}}</li>
							</ol>-->
						</li>
					</ul>
					<div id="leibiao">
						<ul>
							<li class="iconfont span_font">&#xe603;赞</li>
							<li>评论</li>
							<li>分享</li>
						</ul>
					</div>
					<div class="xixian"></div>
				</div>
			</div>
		</div>
		<div class="fashong">
			<!--<input type="text" name="" id="inp" value="评论" />-->
			<span v-on:click='fs_pinlun' class="pinglun" >发布评论</span>
		</div>
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

.comment_c .xixian{
	/*width: 100%;
	height: 3px;
	background: #F1F1F1;
	margin-top: 20px;*/
}
.comment_c .fashong{
	width: 100%;
	height: 45px;
	background: #F4F4F4;
	position: fixed;
	bottom: 0;
}
.comment_c .fashong input{
	width: 300px;
	height: 29px;
	background: white;
	margin-top: 9px;
	margin-left: 15px;
	color: #AFAFAF;
	font-size: 16px;
}
.conment_c .content .right{
	position: relative;
}
.huifu_font {
	font-size: 12px;
	height: 20px;
	line-height: 10px;
}
.comment_c #leibiao{
	/*position: absolute;
	top: 0px;*/
	margin-left: 70px;
	display: none;
}
.comment_c #leibiao li{
	margin-left: 0px;
	color: white;
	width: 60px;
	height: 25px;
	float: left;
	text-align: center;
	background: #b6b6b6;
	margin-left: 5px;
	line-height: 25px;
	border-radius: 5px;
}
#huifu_ba{
	display: block;
	width: 97%;
	height: 20px;
	color: white;
	background: #b2cded;
	line-height: 20px;
	margin-bottom: 5px;
	padding-left: 5px;
}
.comment_c .pinglun{
	height: 45px;
    line-height: 45px;
    text-align: center;
    margin-left: 44%;
}

.comment_c .xian{
		width: 100%;
		height: 10px;
		background: #EAEEF1;
	}
	.comment_c .content{
		width: 100%;
		height: 75px;
		margin-top: 15px;
	}
	.comment_c .content img{
		width: 38px;
		height: 38px;
		border-radius: 50%;
	}
	.comment_c .content .left{
		float: left;
		width: 38px;
		height: 38px;
		background: #D8D8D8;
		border-radius: 50%;
		margin-left: 15px;
	}
	.comment_c .content .right{
		float: left;
		margin-left: 15px;
		width: 77%;
		margin-bottom:10px;
	}
	.comment_c .content .span_font{
		font-size: 13px;
		margin-left: 5.33%;
		color: #D8D8D8;
	}
	.comment_c .content .right .shijian{
		font-size: 12px;
		color: #ABABAB;
		margin-left:12%;
	}
	.comment_c .content .right li:nth-of-type(1){
		color: #F74D3F;
		font-size: 14px;
	}
	.comment_c .content .right li:nth-of-type(2){
		color: #ABABAB;
		font-size: 12px;
		
	}
	.comment_c .content .right li:nth-of-type(3){
		color: #2A2A2A;
		font-size: 15px;
		margin-top: 10px;
	}
	.comment_c .content .right li:nth-of-type(4){
		width: 97%;
		/*height: 32px;*/
		background: #F7F7F7;
		line-height: 32px;
		padding-left: 10px;
		margin-top: 15px;
		margin-bottom: 12px;
		font-size: 14px;
		color: #F74D3F;
	}
	.comment_c .to_comment{
		width: 100%;
		height: 46px;
		background: #F4F4F4;
		position: fixed;
		bottom: 0;
	}
	.comment_c .to_comment input{
		width: 300px;
		height: 27px;
		background: white;
		font-size: 16px;
		color: #AFAFAF;
		margin-top: 10px;
		margin-left: 15px;
	}
	.comment_c .genduo{
		width: 100%;
		height: 45px;
		border: 1px solid #E0E0E0;
	}
	.comment_c .genduo p{
		font-size: 15px;
		color: #D8D8D8;
		height: 45px;
		line-height: 45px;
		width: 143px;
		margin: 0 auto;
		text-align: center;
	}
	.comment_c .btm{
		width: 100%;
		height: 45px;
	}
	.comment_c .btm .left{
		float: left;
		width: 60%;
		height: 45px;
		background: #E3E3E3;
	}
	.comment_c .btm .right{
		float: left;
		width: 40%;
		height: 100%;
		background: #FF4E4E;
	}
	.comment_c .btm li{
		float: left;
		height: 45px;
		line-height: 45px;
	}
	.comment_c .btm .left li:nth-of-type(2){
		font-size: 16px;
		color: #2C2C2C;
		margin-left: 30px;
	}
	.comment_c .btm .left li:nth-of-type(3){
		font-size: 12px;
		color: #575757;
		margin-left: 10px;
	}
	.comment_c .btm .right li{
		font-size: 16px;
		color: white;
		height: 45px;
		line-height: 45px;
	}
	.comment_c .btm .right li:nth-of-type(1){
		margin-left: 35px;
	}
</style>
<script>
	import c_send_msg from '../components/send_msg/send_pinglun.vue';
	import c_alert from '../components/alert';
export default{
	components:{
			'c-send-msg':c_send_msg,
			'c-alert':c_alert,
		},
	data:function(){
		return {
			sendpl:false,
			//comment_user:'用户名',
			comment_time:'2016.12.15',
			comment_content:'发布评论',
			biz_id:'',//课程id
			biz_type:'t_comment',
			comment_user:'',//用户id
			pinlun:[],
			img_url:'http://mlx.oss-cn-hangzhou.aliyuncs.com/',
			com_id:3,//当前评论的id
			//huifu_comment_content:'',
			id:'',
			isReply:0,
			nickname:'',//用户名
			danmu_true:false,
			danmu_tishi:'没有更多了',
			
		}
	},
	mounted:function(){//挂载时候执行的函数
		//首先默认为发送评论
		//this.biz_type=
		//获取用户id
		
		self=this;
		//获取用户名
		this.nickname=this.$store.state.nickname;
		//alert(this.nickname);
		this.comment_user = this.$store.state.mid;
		//alert(this.comment_user);
		//获取课程id
		this.biz_id = localStorage.getItem('trained_course_id');
		console.log(this.biz_id);
		
		//分页
		window.onscroll=function(){
				var t =document.documentElement.scrollTop||document.body.scrollTop;
				//获取整张页面高度
				var height=$(document).height();
				t=height-t;
				if(t<=1200){
					self.pinlun_page=self.pinlun_page+1;
					console.log(self.pinlun_page);
				    self.huoqu_pinlunlist();
				    //当pinlun_page等于20的时候已经加载完数据
				    if(self.pinlun_page==20){
//				    	alert('没有更多了');
						self.danmu_true=true;
				    	setTimeout(function(){
				    		self.danmu_true=false;
				    	},2000);
				    }
				}
				
		}
		//页面一开始加载第一页数据
		self.pinlun_page=1;
		$.ajax({
					url:baseUrl+"/course_info/comment_list",
					data:{
						page:self.pinlun_page,
						data:'{"biz_id":' +self.biz_id+', "biz_type": "t_course_info"}'
					},
					dataType:'jsonp',
					success:function(data){
						//alert(123); 
						console.log(data);
						for(var i=0;i<data.length;i++){
							
							self.pinlun.push(data[i]);
							//console.log(self.pinlun.reply);
							for(var j=0;j<self.pinlun.length;j++){
								if(self.pinlun[j].headimgurl==null){
									self.pinlun[j].headimgurl='mlx/Fr3SQF35D3.jpg';
								}
								if(self.pinlun[j].headimgurl.indexOf('http:')>-1){
									self.pinlun[j].headimgurl='mlx/Fr3SQF35D3.jpg';
//									return self.img_url='';
								}
							}
						}
						//self.huifu_comment_content=self.pinlun.reply.comment_content;
						//console.log(self.huifu_comment_content);
					}	
			});
	},
	methods:{
		//获取输入框内容
//		fashong:function(){
//			self=this;
//			console.log(this.comment_content);
//			//alert(self.com_id+self.biz_id+self.biz_type+self.comment_user+self.comment_content)
//			$.ajax({
//				url:'http://weixin.mlxing.com/sys_biz_set/comment_insert',
//				data:{
//						data:'{'
//							+'"com_id":"'+self.com_id+'",'
//						    +'"biz_id":"'+self.biz_id+'",'
//						    +'"biz_type":"'+self.biz_type+'",'
//						    +'"comment_user":"'+self.comment_user+'",'
//						    +'"comment_content":"'+self.comment_content+'"'
//						+'}'
//				},
//				dataType:'jsonp',
//				success:function(data){
//					//console.log(data);
//					//alert(data.msg);
//					console.log(data.msg);
//					//如果发送成功就在页面上显示
//					if(data.return=='true'){
//						self.comment_content=$input[0].value;
//						
//					}
//				}	
//			});
//			var huifuclass=$('.huifuclass');
//			
//			//获取评论后的内容
//			//this.huifu();
//			$.ajax({
//					url:"http://weixin.mlxing.com/course_info/comment_list",
//					data:{
//						page:1,
//						data:'{"biz_id":' +self.id +', "biz_type": "t_course_info"}'
//					},
//					dataType:'jsonp',
//					success:function(data){
//						//alert(123); 
//						console.log(data);
//					}	
//			});
//			
//		},
//		ajax:function(){
//			self=this;
//			$.ajax({
//				url:'http://weixin.mlxing.com/sys_biz_set/comment_insert',
//				data:{
//					
//				},
//				dataType:'jsonp',
//				success:function(data){
//					console.log(data);
//				}	
//			});
//		},
//		huifu:function(com_id){
//			self=this;
//			console.log(com_id.id);
//			this.com_id=com_id.id;
//			//把输入框文字设为@name
//			var $input2=$('#inp');
//			$input2[0].value='@'+com_id.comment_user;
//			$input2.focus();
//			self.biz_type='t_comment';
//			self.comment_user=com_id.comment_user;
			
			//this.fashong();
			//self.comment_content=$input[0].value;
			//发送回复
//			$.ajax({
//				url:'http://weixin.mlxing.com/sys_biz_set/comment_insert',
//				data:{
//						data:'{'
//							+'"com_id":"'+self.com_id+'",'
//						    +'"biz_id":"'+self.biz_id+'",'
//						    +'"biz_type":"'+'t_comment'+'",'
//						    +'"comment_user":"'+self.comment_user+'",'
//						    +'"comment_content":"'+self.comment_content+'"'
//						+'}'
//				},
//				dataType:'jsonp',
//				success:function(data){
////					console.log(data);
//					alert(data.msg);
//					//如果发送成功就在页面上显示
//					if(data.return=='true'){
//						//self.comment_content=$input[0].value;
//		
//					}
//				}	
//			});
//	   },
	    fs_pinlun:function(){
//	    	this.id=self.
			var self=this;
			//alert(self.biz_id);
			this.id=self.biz_id;
	   		this.sendpl = true;	
	   		//console.log('id'+self.biz_id+'biz_type'+this.biz_type+'comment_user'+this.comment_user);
	    },
	   pinglunCallback:function(res){
			this.sendpl = false;
			var self = this;
			setTimeout(function(){
				self.ajax_data();
			},100);
		},
		fs_huifu:function(com_id){
			console.log(com_id.id);
			this.isReply=com_id.id;
			//this.isReply=this.com_id;
			this.sendpl = true;	
			this.url = baseUrl+'/sys_biz_set/comment_insert';
		},
		ajax_data:function(){
			var self=this;
			self.pinlun_page=1;
			$.ajax({
					url:baseUrl+"/course_info/comment_list",
					data:{
						page:self.pinlun_page,
						data:'{"biz_id":' +self.biz_id+', "biz_type": "t_course_info"}'
					},
					dataType:'jsonp',
					success:function(data){
						//alert(123); 
						//alert(data);
						self.pinlun=[];
						setTimeout(function(){
							for(var i=0;i<data.length;i++){
							self.pinlun.push(data[i]);
							//console.log(self.pinlun.reply);
							for(var j=0;j<self.pinlun.length;j++){
								if(self.pinlun[j].headimgurl==null){
									self.pinlun[j].headimgurl='mlx/Fr3SQF35D3.jpg';
								}
								if(self.pinlun[j].headimgurl.indexOf('http:')>-1){
									self.pinlun[j].headimgurl='mlx/Fr3SQF35D3.jpg';
								}
							}
						}
							//alert(self.pinlun[0].comment_content);
						},100);
					}	
			});
		},
		huoqu_pinlunlist:function(){
			$.ajax({
					url:baseUrl+"/course_info/comment_list",
					data:{
						page:self.pinlun_page,
						data:'{"biz_id":' +self.biz_id+', "biz_type": "t_course_info"}'
					},
					dataType:'jsonp',
					success:function(data){
						//alert(123); 
						console.log(data);
						for(var i=0;i<data.length;i++){
							
							self.pinlun.push(data[i]);
							//console.log(self.pinlun.reply);
							for(var j=0;j<self.pinlun.length;j++){
								if(self.pinlun[j].headimgurl==null){
									self.pinlun[j].headimgurl='mlx/Fr3SQF35D3.jpg';
								}
								if(self.pinlun[j].headimgurl.indexOf('http:')>-1){
									self.pinlun[j].headimgurl='mlx/Fr3SQF35D3.jpg';
//									return self.img_url='';
								}
							}
						}
						//self.huifu_comment_content=self.pinlun.reply.comment_content;
						//console.log(self.huifu_comment_content);
					}	
			});
		}
	},	
}
</script>
<template>
	<transition name='fade'>
	<section class='moments_card' :data-id='newInf.id'>
		<!-- <img :src="begin?handleImg(headerImg,{width:92,height:92,center:'true'}):''" v-on:click='returnImg([headerImg],0)'> -->
		<i   v-on:click='returnImg([headerImg],0)'>
			<i :style="{'background-image':begin?handleImg(headerImg,{width:92,height:92,center:'true',bg:true}):''}"></i>
		</i>
		<main>
			<header><span :style='{color:newInf.use_reward!=1&&newInf.use_reward!=undefined?"#ff9212":""}'>{{newInf.guideBaseInfo.nickname||newInf.mid}}</span>
			<c-complain style='float:right;margin-top:2px;margin-left:10px;' biz_type='pan_dynamic' :biz_id='newInf.id' :url='baseUrl' v-on:jubao='fktransform' jubao='jubao'></c-complain><span style='float:right;color:#aaa' >举报</span></header>

			<div class="sentTime">{{newInf.format_time}}</div>
			<p :class='{moments_card_content:contentLimit()}'  v-html='findContentTag(newInf.content)' v-on:click='toTagPage($event)'></p>
			<!-- 图片 -->
			<ul v-if='newInf.trans.data.length==0'>
				<li  v-for='(img,index) in newInf.images' :class='{many_image:newInf.images.length>1?true:false,one_image:newInf.images.length==1?true:false}' >
					<b v-if='img!=""'    v-on:click='returnImg(newInf.images,index)' ref='imgs' :data='initImg(img,index,newInf.images)' ></b>
					<!-- newInf.images.length==1? -->
				</li>
			</ul>
			<!-- 转发 -->
			<article v-if='newInf.trans.data.id' :class='{hasImg:zhuanPics?false:true}' :style="{height:zhuanPics==''}">
				<header>
					<b>@{{newInf.trans.guideBaseInfo?newInf.trans.guideBaseInfo.nickname:'用户名'}}:</b>
					<i v-html='findContentTag(newInf.trans.data.content)' :class='{moments_card_content:contentLimit()}' v-on:click='toTagPage($event)'></i>
				</header>
				<ol>
					<li v-for='(item,index) in zhuanPics' :style="{'background-image':handleImg(item,{width:92,height:92,center:true,bg:true})}" v-on:click='returnImg(zhuanPics,index)'>
						<!-- <img :src="handleImg(item,{width:92,height:92,center:'true'})" v-on:click='returnImg(zhuanPics,index)'> -->
					</li>
				</ol>
			</article>
			<article v-if='!newInf.trans.data.id && newInf.trans_id!="0"' :style="{height:zhuanPics==''?'28px':'','line-height':'34px','font-size':'16px'}">
				此信息已被删除
			</article>
			<footer v-if='!pl'>
				<ol>

					<li @click='share_dongtai()'><b class='share'></b><span>{{newInf.trans.trans_sum||"转发"}}</span></li>
					<li v-on:click='toPlList'><b class='plbtn'></b><span>{{pinglun||'评论'}}</span></li>
					<li @click='addZan()' :class='{zaned:isZan}'><b class='zan' v-if='!isZan'></b><span v-if='!isZan'>{{zanNum||'点赞'}}</span></li>
					<li class='dashang' @click='toReward()' v-if='newInf.use_reward!=1&&newInf.use_reward!=undefined'  >
						<b></b>
					</li>
				</ol>
			</footer>
			<!-- 打赏功能 -->
			<transition name='fade'>
			<div class='money-card' v-if='(newInf.use_reward!=1&&newInf.use_reward!=undefined) && rewardList.length>0' >
				<section :style='{"top":"-9px"}'>
					<span>赏</span>
				</section>
				<div class='money-list'>
					<div class='item'>
						<dl v-for='item in rewardList'>
							<dt :style='{"background-image":handleImg(item.headimgurl,{bg:"true",width:"30",height:"30"}),"background-size":"100% 100%"}'>

							</dt>
							<dd>¥{{item.reward_num}}</dd>
						</dl>
					</div>

				
				</div>

				<c-bubble sty='{"top":"-9px"}' v-if='true'></c-bubble>
			</div>
			</transition>
			<!-- 打赏功能 -->
		</main>
	</section>
	</transition>
</template>
<script>
import $headerimg from '../../icon/find_team.png';
import $handleImg from '../../widget/handleImg.js'
import $changeSize from '../../widget/imgSize.js'
import c_complain from '../complain.vue';
import c_bubble from '../../components/chat_bubble/moment_bubble.vue'
import $handleImg2 from '../../widget/handleImg-2.0.js'
export default{
	data:function(){
		return {
			zaned:false,
			zhuanPics:'',
			isZan:false,
			isLoading:false,
			isMoney:false,
			rewardList:[],
			baseUrl:baseUrl+'/dynamic/report_insert',

		}
	},
	components:{
		'c-complain':c_complain,
		'c-bubble':c_bubble
	},
	watch:{
		dataChange(value){
			console.log(value);
			if(value){
				this.dateUpdate();
			}
			
		}
	},
	props:['inf','fn','begin','getPlace','alertfn','pl','jubao','giveMoney','dataChange'],
	//jubao适用于添加了transform的路由
	//giveMoney:打赏列表
	//pl:评论列表显示，不显示转发，点赞框
	//inf:数据
	//begin:如果是false就不显示图片
	//getPlace 获取地址的回调
	created:function(){
		this.dianzan();
		if(this.inf.use_reward==2){
			this.getRewardList();
		};
		if(!this.newInf.rewardList){
			this.newInf.rewardList=[];
			this.rewardList=this.inf.rewardList;
		}
		if(this.newInf.trans.data.id){
			this.splitImg(this.newInf.trans.data.images)
		}
	},
	computed:{
		headerImg:function(){
			return this.inf.guideBaseInfo.headimgurl
		},
		zanNum:function(){

			return this.inf.commend_user_list.data.length;
		},
		pinglun:function(){
			return this.inf.comment_num=='0'?'':this.inf.comment_num;
		},
		newInf:function(){
			return this.inf
		},
		tag:function(){
			var arr=[];
			for(var i=0;i<this.$store.state.hotTag.length;i++){
				arr.push(this.$store.state.hotTag[i]);
			}
			return arr;
		}
	},
	methods:{
		dateUpdate(){
			if(this.inf.use_reward==2){
				this.getRewardList();
			};
			if(!this.newInf.rewardList){
				this.newInf.rewardList=[];
				this.rewardList=this.inf.rewardList;
			}
		},
		contentLimit(){
			if(location.hash =='#/my_moment'){
				return true
			}else{
				return false
			}
		},
		initImg:function(item,index,images){
			var self = this;
			if(!item){
				return
			}
			setTimeout(function(){

				if(images.length>1){
					$handleImg2({
						src:item,
						dom:self.$refs.imgs[index],
						bg:true,
						heightClass:'',
						widthClass:''
					});
				}else{
					$handleImg2({
						src:item,
						dom:self.$refs.imgs[index],
						bg:true,
						heightClass:'heightImg',
						widthClass:'widthImg'
					});
				}

			},100)
		},
		getRewardList:function(){
			var self = this;
			var url=baseUrl+'/dynamic/reward_list';
			var page = 1;
			var data = {
				biz_id:self.inf.id,
				biz_type:'pan_dynamic'
			};
			$.ajax({
				url:url,
				dataType:'jsonp',
				data:{
					data:JSON.stringify(data)
				},
				success:function(res){
					self.rewardList=[];
					for(var i=0;i<res.list.length;i++){
						self.rewardList.push(res.list[i])
					}

				},
				error:function(){
					//console.log('获取打赏列表失败');
				}
			})
		},
		toReward:function(){
			var self = this;
			if(self.$store.state.mid==-1 || self.isLoading){
				return
			}

			var obj={
				biz_id:self.newInf.id,
				biz_type:'pan_dynamic',
				reward_user:self.$store.state.mid,
				be_reward_user:self.newInf.guideBaseInfo.mid,
				url:baseUrl+'/dynamic/reward_insert'
			}
			this.$emit(this.giveMoney,obj);
		},
		fktransform:function(){
			this.$emit(this.jubao,this.newInf.id);
		},
		handleMyImg:function(begin,images,img){//判断是多张还是一张，然后根据这个判断图片尺寸

			if(begin){
				if(images.length>1){
					$changeSize(img);
					var str = this.handleImg(img,{width:200,height:200,center:true});

					return str;
				}else{
					//$changeSize(img);
					var str =  this.handleImg(img,{width:200,height:333,center:true});

					return str;
				}
			}

		},
		toTagPage:function(e){//标签跳转
			var self = this;
			if(e.srcElement.localName=='span'){
				var str = (e.srcElement.innerHTML).replace(/\#/g,'');
				this.$router.push({name:'tag_list',
									params:{
										msg:str,
										// tags:JSON.stringify(self.tag)
									}
								});

			}
		},
		findContentTag:function(res){//过滤标签
			var str = res;
			var reg = /\#[^\#]+\#/g;
			if(str){
				var arr=str.match(reg)||[];

				for(var i=0;i<arr.length;i++){
					var reg = new RegExp(arr[i],'g');
					str=str.replace(reg,'<span>'+arr[i]+'</span>');

				}
				return str;
			}else{
				return str;
			}

		},
		splitImg:function(res){//处理图片的数据
			var str = res;
			str=str.replace(/\"/g,'');
			str=str.replace(/\[/g,'');
			str=str.replace(/\]/g,'');
			str=str.replace(/\\/g,'');
			//console.log(str);
			if(str==''){
				this.zhuanPics=''
			}else{
				this.zhuanPics = str.split(',');
			}

		},
		handleImgMsg:function(res){
			var str = res;
			str=str.replace(/\"/g,'');
			str=str.replace(/\[/g,'');
			str=str.replace(/\]/g,'');
			str=str.replace(/\\/g,'');
			return str;
		},
		handleImg:$handleImg,
		share_dongtai:function(){//分享动态，跳转分享路由，参数，msg,pics
			var self = this;
			this.$emit(this.getPlace,$(window).scrollTop());
			
			this.$router.push({name:'share_dongtai',
				params:{
					'id':self.newInf.id,
				}
			});
			
		},
		dianzan:function(){//判断点赞
			var obj = this.newInf.commend_user_list.data;
			for(var i=0;i<obj.length;i++){
				if(obj[i].mid ==this.$store.state.mid){//判断是否是自己点赞
					this.isZan = true;
				}
			}
		},
		addZan:function(){//点赞
			var self = this;

			if(self.$store.state.mid==-1 || self.isLoading){
				return
			}else {
				// self.$emit(this.alertfn,'正在发送数据',true);
				self.isLoading =  true;
				$.ajax({
					url:baseUrl+'/ugc/doCommend/0/'+self.newInf.id,
					dataType:'jsonp',
					success:function(res){

						setTimeout(function(){//一秒之后才能再点赞
							self.isLoading = false;
						},1000)
							if(res.action=='cancel'){
								self.isZan=false;
								//self.$emit(self.alertfn,'取消点赞');
							}else if(res.action=='commend'){
								self.isZan=true;
								self.$emit(self.alertfn,'赞');
							}

							self.newInf.commend_user_list.data.length = res.commend_user_list.data.length;

							for(var i=0;i<res.commend_user_list.data.length;i++){
								self.newInf.commend_user_list.data[i] = res.commend_user_list.data[i];
							}
					},
					error:function(){
						self.isLoading = false;
						self.$emit(self.alertfn,'点赞失败');
					}
				})
			}
		},
		toPlList:function(){
			var str=this.zaned?1:0;
			var self = this;
			this.$emit(this.getPlace,$(window).scrollTop());
			this.$store.state.moments.pinglun_card = this.inf;
			this.$router.push({'name':'pinglun_list',params:{id:self.newInf.id}})

		},
		changeImg:function(img){
			if(img==null){
				return $headerimg
			}
			if(img.indexOf('oss')>-1){
				return img+'?x-oss-process=image/resize,w_'+parseInt(window.rem*4.6);
			}else if(img.indexOf('http')>-1){//这个是
				return img;
			}
		},
		returnImg:function(images,idx){//返回图片的信息,用于放大镜
			var arr =[];
			var count = $(window).width();
			for(var i=0;i<images.length;i++){

				arr.push(this.handleImg(images[i],{width:parseInt(350)}));
			}
			images=arr;
			this.$emit(this.fn,{images,idx});
		}
	}
}
</script>
<style lang='scss'>
.moments_card{
	width: 100%;
	.heightImg{
		-webkit-background-size: 100% 100%;
		background-size: 100% 100%;
		width: 8.6rem;
		/*width: 8.6rem;*/
		height: 11.55rem;
	}
	.widthImg{
		-webkit-background-size: 100% 100%;
		background-size: 100% 100%;
		width: 11.55rem;
		height: 8.6rem;
	}
	.money-card{
		position: relative;
		.money-list{
			position: absolute;z-index: 10;left: 72px;margin-top: 12px;top:-9px;font-size: 0;

			.item{
				display: inline-block;height: 49px;overflow: hidden;width: 90%;
			}

			@media screen and (max-width: 376px) {
				.item{width:205px;}
			}
			@media screen and (max-width: 324px) {
				.item{width:165px;}
			}
			dl{/*,.toleft*/
				display: inline-block;margin-right: (3/20)+rem;
				dt{
					content:'a';margin-bottom: 6px;
					height: 30px;width: 30px;
					background-color: #d8d8d8;
				}
				dd{
					color: #ff9212;font-size: 12px;text-align: center;
				}
			}
			.toleft{
			background-image: url(../../icon/toright.png);-webkit-background-size: 100%;
			background-size: 100%;
			height: 14px;width: 8px;margin-top: -15px;
			position: absolute;right: 5px;top:50%;
			}
		}
		section{
			position: absolute;
			height:35px;width: 35px;
			left: 21px;margin-top: 12px;
			background-color:#ff9212;
			z-index: 10;
			border-radius: 50%;
			font-size: 0;text-align: center;
			span{
				display: inline-block;color: #fff;font-size: 14px;vertical-align: middle;
			}
		}
		section:before{
			display: inline-block;
			content: '';width: 0px;height: 100%;opacity: 0;vertical-align: middle;
		}
	}
	margin-bottom: 10px;background-color:#fff;font-size: 0;
	>i{
		display: inline-block;
		width: (42/375)*100%;
		border-radius: 3px;
		margin:10px (10/375)*100%;
		

	}
	>i i{
		display: block;
		content:'';
		padding-bottom: 100%;
		background-image: url(../../img/default_bg.jpg);
		-webkit-background-size: 100% 100%;
		background-size: 100% 100%;
	}
	>main{
		.hasImg{
			>header{
				padding-bottom: 0;
			}
		}
		.moments_card_content{
			
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
			word-break:break-all;
			overflow: hidden;
		}
		article{
			clear:both; font-size:0;
			background-color: #e7e7e7;
			display: inline-block;
			width: (290/305)*100%;
			padding-left: (6/305)*100%;
			margin-bottom: 16px;padding-bottom: 4px;
			>header{
				font-size: 15px;line-height: 20px;font-size: 16px;
				padding: 3px 7px 8px 6px;
				i{font-style: normal;color: #666;}
				span{color:#0059bb;margin:0;}
				b{color:#0059bb;font-weight: 200;}
			}

			ol{
				font-size: 0;display: inline-block;width: 100%;
				li{
				text-align: center;display: inline-block;
				margin-right: (4/290)*100%;
				width: (92/290)*100%;
				-webkit-background-size: 100% 100%;
				background-size: 100% 100%;
					/*img{
						display: none;
						width:100%;
						height: (92/20)+rem;
					}*/
					
				}
				li:after{
					content: '';
					display: block;
					width: 100%;
					height: 0;
					padding-top: 100%;
				}
			}

		}
		display: inline-block;vertical-align: top;
		padding-top: 10px;
		width: (305/375)*100%;
		/*min-height: (150/20)+rem;*/
		>footer{
			min-height: (34/20)+rem;
			width: 100%;
			ol{width: 100%}
			li{float: right;height: 24px;
				width: (63/305)*100%;min-width: 60px;background-color: #b6b6b6;
				margin-left: (5/305)*100%;
				text-align: center;border-radius: 4px;color: #fff;font-size: 0px;
				b{-webkit-background-size: 100% 100%;color: #fff;
					background-size: 100% 100%;font-weight: 200;
					height: 12px;width: 12px;display: inline-block;vertical-align: middle;margin-right:4px;

				}
				span{color: #fff;display: inline-block;vertical-align: middle;font-size: 12px;}
			}
			@media screen and (max-width: 320px) {
				li{
					position: relative;z-index: 2;
					width: 3.3rem;min-width: 0;
				}
			}
			li:before{
				height: 0;content: '';width: 0;display: inline-block;vertical-align: middle;
				padding-top: (23/63)*100%;
			}
			li:active{
				background-color:#888;
			}

			.zan{background-image: url(../../icon/dianzan.png);}

			.zaned{background-image: url(../../icon/my_zan.png);-webkit-background-size: 100% 100%;
				background-size: 100% 100%;}

			.plbtn{background-image: url(../../icon/pinglun.png);}


			.share{background-image: url(../../icon/share.png);}
			.dashang{background-image: url(../../icon/dashang.png);-webkit-background-size: 100% 100%;
			background-size: 100% 100%;}
			.dashang b{
				display: block;height: 100%;content: '';width: 100%;border-radius: 4px;
			}
			.dashang b:active{
				background-color: orange;opacity: 0.5;
			}
			.dashang:before{
				display: none;
			}
		}
		>p{
			/*width: (281/20)+rem;*/
			width: (287/305)*100%;
			line-height: 17px;
			font-size: 15px;color: #3b3b3b;
			margin-bottom: (13/20)+rem;
			word-break:break-all;
			span{
				color:#0059bb;
			}
		}
		>ul{font-size: 0px;margin:0.5rem 0;margin-bottom: (16/20)+rem;}
		.one_image{display: inline-block;
			b{
				background-position: center center;
				/*-webkit-background-size: 120% 120%;
				background-size: 120% 120%;*/
				display: inline-block;
			/*	height: (231/20)+rem;width: (172/20)+rem;*/
				background-color: #888;}
		}
		.many_image{
			display: inline-block;margin-right:(3/20)+rem;
			b{
				-webkit-background-size: 120% 120%;
				background-size: 120% 120%;
				display: inline-block;background-position: center center;
				height: (92/20)+rem;width: (92/20)+rem;background-color: #aaa;
			}
		}
		.sentTime{
			font-size:11px;margin-bottom: (8/20)+rem;
			color:#ababab;
			letter-spacing:0;
			text-align:left;
		}
		>header{
			height: (25/20)+rem;/*margin-bottom: (11/20)+rem;*/
			span{line-height:(25/20)+rem;color:#f5594d; font-size: 14px;
			font-size:14px;color:#f74d3f;}

			b{background-color: #f5594d;height: (25/20)+rem;width: (64/20)+rem;border-radius: 4px;line-height:(25/20)+rem;text-align: center;color: #fff;float: right;margin-right:0.5rem;font-weight: 200;}
		}

	}
}

</style>

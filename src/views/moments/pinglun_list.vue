<template>
	<div class="pinglun_list">
		<c-card :inf='cardInf'  fn='returnImg'  v-on:returnImg='toBigImg' begin='true' pl='true'
			></c-card>
		<!-- <c-alert :show='alertShow' :text='alertText'></c-alert> -->
		<c-to-top v-show='topTopShow'></c-to-top>
		<c-big-img v-if='c_img.show' :images='c_img.images' closefn='imgdasd' v-on:imgdasd='closeBigImg' :index='c_img.index'></c-big-img>
		<transition name='view'>
			<c-send-pinglun :id='id' fn='xxx' v-on:xxx='plWinfn' :isReply='replyId'  v-if='pl_show' ></c-send-pinglun>
		</transition>
		
		<header>
			<div :class='{active:listType==1}' class='list_zf'  @click='changelist(1)'>转发 <span>{{inf.trans.trans_sum}}</span></div>
			<div :class='{active:listType==2}' class='list_pl' @click='changelist(2)'>评论 <span>{{pl_number||0}}</span></div>
			<div :class='{active:listType==3}' class='list_zan' @click='changelist(3)'>赞 <span>{{zan()||0}}</span></div>
		</header>
		<c-pl-card v-show='listType==2' v-for='item in result' :inf='item' fn='eqweqrepl' v-on:eqweqrepl='reply'></c-pl-card>
		<c-sharezan-card v-if='listType==1'  :inf='inf.trans.trans_user' fn='returnImg'  v-on:returnImg='toBigImg' ></c-sharezan-card>

		<c-sharezan-card v-show='listType==1&&shareResult.length!=0?shareResult:listType==3&&zanResult.length!=0?zanResult:""' :inf='listType==1?shareResult:listType==3?zanResult:""' fn='returnImg'  v-on:returnImg='toBigImg' ></c-sharezan-card>
		<footer>
			<ul>
				<li v-on:click='shareDT()'><i></i><span>转发</span></li>
				<li v-on:click='inputPL()' ><i></i><span>评论</span></li>
				<li><i></i><span @click='addZan()'>{{canZan?"已赞":"赞"}}</span></li>
			</ul>
		</footer>
		<toast v-model="alertShow" :text='alertText' :type='alertType' v-bind:time='1500'></toast>
	</div>
</template>
<!-- 动态正文 -->
<script>
	import c_pl_card from '../../components/card/moment_pinglun_card.vue'
	import c_sharezan_card from '../../components/card/moment_zanshare_card.vue'
	import c_send_pinglun from '../../components/send_msg/send_pinglun.vue'; 
	import c_big_img from '../../components/toBigImg.vue'
	import c_to_top from '../../components/to_top.vue'
	// import c_alert from '../../components/alert.vue'
	import c_card from '../../components/card/moments_card.vue'
	import { Toast} from 'vux'
	export default{
		name:'pinglun_list',
		data(){
			return{
				c_img:{//放大图片吧
					show:false,
					images:'',
					index:null,
				},
				listType:2,
				zanResult:'',//点赞列表
				zanpage:1,//点赞页数
				shareResult:[],//分享列表
				sharePage:1,//分享页数
				replyId:'',
				pl_show:false,
				page:1,
				result:[],
				noMoreMsg:false,
				pl_txt:'',
				pl_number:'',
				canZan:false,
				topTopShow:false,//去最顶端
				alertShow:false,
				alertText:'',
				alertType:'success',
				theInf:'',
				inf:'',
			}
		},
		components:{
			'c-pl-card':c_pl_card,
			'c-send-pinglun':c_send_pinglun,
			'c-sharezan-card':c_sharezan_card,
			"c-big-img":c_big_img,
			'c-to-top':c_to_top,
			//'c-alert':c_alert,
			'c-card':c_card,
			Toast
		},
		watch:{
			$route(to,from){
				if(to.name == 'pinglun_list'){
					$(window).scrollTop(0);
				}
			}
		},
		computed:{
			cardInf:function(){
				return this.$store.state.moments.pinglun_card;
			},
			id:function(){//圈子id
				var str = this.$route.params.id;
				return str;
			},
		},
		created:function(){
			var title=document.getElementsByTagName('title')[0];
			title.innerHTML = '评论';
			var $window = $(window);
			var height = $window.height();
			var self = this;
			$window.scroll(function(){
				var top = $window.scrollTop();
				if(top>height){
					self.topTopShow=true;
				}else{
					self.topTopShow=false;
				}
			})
			this.getPL();
			this.getPLnumber();
			this.getList();
			this.initZan();
		},
		mounted:function(){
			$(window).scrollTop(0);
		},
		methods:{
			initZan:function(){//判断是否点赞

				for(var i=0;i<this.zanResult.length;i++){
					if(this.zanResult[i].mid==this.$store.state.mid){
						this.canZan = true;
						break;
					}
				}
			},
			zan:function(){
				// console.log(this.zanResult);
				// console.log(this.zanResult.length);
				return this.zanResult.length;
			},
			shareDT:function(){//分享动态
				var self = this;
				// console.log(self.inf.trans.guideBaseInfo.name)
				var params={
						'msg':self.inf.trans.data.id==undefined?self.inf.content:self.inf.trans.data.content,
						'pics':self.inf.trans.data.id==undefined?self.inf.images.length!="0"?self.inf.images.join():'0':self.inf.trans.data.images||'0',
						'nickname':self.inf.trans.data.id==undefined?self.inf.guideBaseInfo.name||'美丽行用户':self.inf.trans.guideBaseInfo.name,
						'id':self.inf.trans.data.id==undefined?self.inf.id:self.inf.trans.data.id,
						'trans_msg':self.inf.trans.data.id==undefined?"0":'//@'+self.inf.guideBaseInfo.nickname+':'+self.inf.content
					};
					//console.log(params);
				this.$router.push({'name':'share_dongtai',
				params:params})
			},
			toBigImg:function(){//放大图片
				var inf = arguments[0];
				this.c_img.images = inf.images;
				this.c_img.index = inf.idx;
				this.c_img.show = true;

			},
			getList:function(){//让zanResult跟全局绑定
				if(this.$store.state.moments.dynamic_nav_type==3){//遍历我的发布
					for(var i in this.$store.state.moments.my_dongtai_arr){
						if(this.id ==this.$store.state.moments.my_dongtai_arr[i].id){
							this.inf = this.$store.state.moments.my_dongtai_arr[i];
							this.zanResult = this.$store.state.moments.all_dongtai[i].commend_user_list.data;
							this.theInf = i;
							break;
						};
						
					}
				}else if(this.$store.state.moments.dynamic_nav_type==1){//遍历所有人
					for(var i in this.$store.state.moments.all_dongtai){
						if(this.id ==this.$store.state.moments.all_dongtai[i].id){
							this.inf = this.$store.state.moments.all_dongtai[i];
							this.zanResult = this.$store.state.moments.all_dongtai[i].commend_user_list.data;
							this.theInf = i;
							break;
						};
						
					}
				}
			},
			changelist:function(index){
				switch(index){
					case 1:this.listType=1;break;
					case 2:this.listType=2;break;
					case 3:this.listType=3;break;
				}
			},
			addZan:function(){//点赞
				var self = this;

				if(self.$store.state.mid==-1){
					this.alertShow =true;
					this.alertText = '请登录';
					this.alertType = 'warn';
					setTimeout(function(){
						self.alertShow=false;
					},1500)
					return
				}else if(self.alertShow==true){
					return
				}else {
					//this.alertShow =true;
					//this.alertText = '正在发送数据';
					$.ajax({
						url:baseUrl+'/ugc/doCommend/0/'+self.id,
						dataType:'jsonp',
						success:function(res){
							//self.alertShow =true;
							console.log(res);
								if(res.action=='cancel'){
									self.canZan=false;
									//self.alertText='取消点赞'
									self.alertType='cancel';
								}else if(res.action=='commend'){
									self.alertShow =true;
									self.alertType='success';
									self.canZan=true;
									self.alertText='点赞';
									
								}
								setTimeout(function(){
									var page = self.listType;
									self.zanResult.length = res.commend_user_list.data.length;
									for(var i=0;i<res.commend_user_list.data.length;i++){
										self.zanResult[i]=res.commend_user_list.data[i];
									}
									self.alertShow = false;
									self.changelist(1);
									setTimeout(function(){
										self.changelist(page);
									},0)
								},800)
						},
						error:function(){
							self.alertShow =true;
							self.alertType='warn';
							self.alertText='该点赞请求有误';
							setTimeout(function(){
								self.alertShow = false;

							},1500)
						}
					})
				}
			},
			reply:function(){//评论中的回复
				this.replyId = arguments[0];
				this.inputPL();
			},
			getPLnumber:function(){
				var params = {
						 "biz_type":"pan_dynamic",
   						 "biz_id":this.id
					}
					var self = this;
				
				$.ajax({
					url:baseUrl+'/dynamic/comment_row',
					data:{
						data:JSON.stringify(params)
					},
					dataType:'jsonp',
					success:function(res){
						self.pl_number = res.row;
						self.cardInf.comment_num = self.pl_number;
					},
					error:function(){
						self.alertShow=true;
						self.alertText='获取评论数量失败';
						if(self.myTime!=""){
							clearTimeout(self.myTime);
						}
						self.myTime = setTimeout(function(){
							self.alertShow = false;
						},1500);
					}
				})
			},
			plWinfn:function(){//评论结束
				
				var self = this;
				var result = arguments[0];//成功与否
				this.replyId = '';
				this.pl_show=false;
				if(result=='true'){
					var msg = arguments[1];//字符内容
					var msgId = arguments[2].returnId;
					var myTime = new Date();
					if(arguments[2].usserId!=''){//是回复
						//获取当前用户名字

						var inf = {
							comment_user:self.$store.state.nickname,
							id:msgId,
							comment_content:msg,
						}
						for(var i in this.result){
							if(this.result[i].id ==arguments[2].usserId){
								if(this.result[i].reply){
									this.result[i].reply.push(inf);
								}else{
									
									this.result[i].reply=[];
									this.result[i].reply.push(inf);
									
								}
								break;
							}
						}
					}else{//是评论
						//要获取当前用户的信息 头像、名字、时间、id
						var inf={
							headimgurl:self.$store.state.headimgurl,
							comment_user:self.$store.state.nickname,
							id:msgId,
							comment_time:myTime.getFullYear()+'-'+(parseInt(myTime.getMonth())+1)+'-'+myTime.getDate()+' '+myTime.getHours()+':'+(myTime.getMinutes()>9?myTime.getMinutes():"0"+myTime.getMinutes()),
							comment_content:msg,
						}
						self.result.splice(0,0,inf);
						self.pl_number = parseInt(self.pl_number)+1;
						self.cardInf.comment_num = self.pl_number;

					}
					

				}else{

				}
			},
			inputPL:function(res){//输入评论,进入输入框
				this.pl_show=true;
			},
			closeBigImg:function(){//关闭放大图片
				this.c_img.show = false;
			},
			getPL:function(){//获取评论列表失败
				var self = this;
				if(self.noMoreMsg){
					return
				}
				var obj = {
					biz_id:self.id,
					"biz_type":"pan_dynamic"
				};
				var params={
					data:JSON.stringify(obj),
					page:this.page
				}
				$.ajax({
					url:baseUrl+'/dynamic/comment_list',
					data:params,
					dataType:'jsonp',
					success:function(res){
						if(res.length!=0){
							for(var i=0;i<res.length;i++){
								if(!res[i].reply){
									res[i].reply=[];
								}
								self.result.push(res[i] );  
							} 
							
						}else{
							self.noMoreMsg = true;//没有再多数据
						}
						
					},
					error:function(){
						self.alertShow=true;
						self.alertText='获取评论列表失败';
						if(self.myTime!=""){
							clearTimeout(self.myTime);
						}
						self.myTime = setTimeout(function(){
							self.alertShow = false;
						},1500);
					}
				})
			}
		}
	}
</script> 
<style lang='scss'>
.pinglun_list{
	.sendpl{
		-webkit-transition: all 0.2s;transition: all 0.2s;
		position:fixed; top:0;left: 0;background-color: #fff;z-index: 20;
	}
	.hideSendWin{
		-webkit-transition: all 0.2s;transition: all 0.2s;
		top:0;left: 100%;
	}
	position: relative;
	>footer{
		position: fixed;z-index: 10;left: 0;bottom: 0;width: 100%;line-height: 44px;height: 44px;
		ul{
			height: 100%;background-color: #f5f5f5;font-size: 0;
			width: 100%;

			li{display: inline-block;width: 33%;text-align: center;height: 20px;border-right: 1px solid #979797;font-size: 12px;line-height: 20px;vertical-align: middle;
				span{color: #000;font-size: (12/20)+rem;}
				i{width:(15/20)+rem;height: (15/20)+rem;display: inline-block;background-image: url(../../icon/pl_list_share.png);margin-right: 3px;position: relative;top:2px;}
			}
			li:nth-of-type(1) i{background-image: url(../../icon/pl_list_share.png);-webkit-background-size: 100% 100%;
				background-size: 100% 100%;}
				li:nth-of-type(2) i{background-image: url(../../icon/pl_list_pl.png);-webkit-background-size: 100% 100%;
				background-size: 100% 100%;}
				li:nth-of-type(3) i{background-image: url(../../icon/pl_list_zan.png);-webkit-background-size: 100% 100%;
				background-size: 100% 100%;}
			li:last-child{border:0;}
		}
		ul:before{
			display: inline-block;width: 0;height: 100%;vertical-align: middle;content:'';
		}
	}
	padding-bottom:44px;
	>header{
		.active{color:#000!important;}
		background-color: #fff;
		height: 45px;line-height: 45px;
		div{display: inline-block;font-size: 14px;color:#8f8f8f;
			span{font-size: inherit;color:inherit;}
		}
		.list_zf{margin-left: (13/20)+rem;margin-right: (36/20)+rem;}
		.list_zan{float: right;margin-right: 1rem;}
	}
	min-height: 100%;width: 100%;position: relative;background-color: #eaeef1;
}
</style>
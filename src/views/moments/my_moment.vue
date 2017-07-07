<template>
		<div  class="my_monent" >
		<c-reward v-if='rewardShow'   fn='xxfk' v-on:xxfk='rewardOver' :inf='rewardInf'
		></c-reward>
		<c-big-img v-if='c_img.show' :images='c_img.images' closefn='imgdasd' v-on:imgdasd='closeBigImg' :index='c_img.index'></c-big-img><!-- 放大镜组件 -->
		<c-nav active='2' v-show='$store.state.moments.navType==1'></c-nav>
		<c-new-tousu  biz_type='pan_dynamic' :biz_id='tousu_id' :url='baseUrl' :order='order' fn='xxx' @xxx='jubao'></c-new-tousu>
		<div class="content">
			<!-- <tab :lineWidth='2' activeColor='rgb(255, 78, 78)' defaultColor='#fff' disabledColor='rgba(211, 213, 215,0.7)' v-model='navType'>
			    <tab-item  selected v-on:on-item-click='changeNavType(1)'  >
					<b :class='{f_my_dongtai:$store.state.moments.navType!=1,t_my_dongtai:$store.state.moments.navType==1}' ></b>
			    	最新动态
			      </tab-item>

			      <tab-item v-on:on-item-click='changeNavType(2)' >
					<b :class='{f_join_group:$store.state.moments.navType!=2,t_join_group:$store.state.moments.navType==2,}' ></b>
			      兴趣
			      </tab-item>
			      <tab-item :disabled='$store.state.mid<=0' v-on:on-item-click='changeNavType(3)'>
			      	<b :class='{f_send_message:$store.state.moments.navType!=3,t_send_message:$store.state.moments.navType==3}'
			      	:style='{opacity:$store.state.mid<=0?0.5:1}'
			      	></b>
			      发布动态
			      </tab-item>
		    </tab> -->
		    <nav>
		    	<ul class='nav_logo'>
		    		<li v-on:click='changeNavType(1)'>
		    			<b :class='{f_my_dongtai:$store.state.moments.navType!=1,t_my_dongtai:$store.state.moments.navType==1}' ></b>
		    		</li>
		    		<li v-on:click='changeNavType(2)'><b :class='{f_join_group:$store.state.moments.navType!=2,t_join_group:$store.state.moments.navType==2,}' ></b></li>
		    		<li v-on:click='$store.state.mid<=0?"":changeNavType(3)'><b :class='{f_send_message:$store.state.moments.navType!=3,t_send_message:$store.state.moments.navType==3}'
			      	:style='{opacity:$store.state.mid<=0?0.5:1}'
			      	></b></li>
		    	</ul>
		    	<tab :lineWidth='2' activeColor='rgb(255, 78, 78)' defaultColor='#fff' disabledColor='rgba(211, 213, 215,0.7)' v-model='navType'>
			    <tab-item  selected v-on:on-item-click='changeNavType(1)'  >
			    	最新动态
			      </tab-item>

			      <tab-item v-on:on-item-click='changeNavType(2)' >
			      兴趣
			      </tab-item>
			      <tab-item :disabled='$store.state.mid<=0' v-on:on-item-click='changeNavType(3)'>
			      发布动态
			      </tab-item>
		    </tab>
		    </nav>
		    
		<div class='introduce_group' v-if='$store.state.moments.navType==2?true:false'><!-- 兴趣 -->
			<c-tag-card  v-for='item in $store.state.hotTag' :inf='item' v-on:getPlace='saveLeavePlace' getPlace='getPlace' ></c-tag-card>
			<div class='loadMore' v-show='isLoadMore'>

			</div>
		</div>
		<!--******************************************************-->
		<div class="my_dongtai" v-show='$store.state.moments.navType==1?true:false'>
				<!--***********所有人动态*************-->
			<c-card v-for='(person,index) in result' :inf='person' fn='returnImg'  v-on:returnImg='toBigImg' begin='tr'  ref='all_dongtai'   alertfn='alerbc' v-on:alerbc='cCardAlert' v-on:getPlace='saveLeavePlace'
			 getPlace='getPlace' v-on:jubao='jubao' jubao='jubao'
			giveMoney='giveMoney'  v-on:giveMoney='openReward'    :dataChange='card_dataChange'
			></c-card>
			<div class='loadMore' v-show='isLoadMore'>

			</div>
		</div>
		
		</div>
		<!--*********************发布动态*********************************-->
		<div style='transform: translate3d(0px, -85px, 0px)'>
			<c-send-momeny v-if='$store.state.moments.navType==3' fn='sendOK' v-on:sendOK='sendMoment_callback' :alertShow='alertShow' :topic='topic'></c-send-momeny >
		</div>
		<!--*********************弹窗*********************************-->
		<toast v-model="toastShow" :text='alertText' :type='alertType' v-bind:time='1500'></toast>
		<Loading v-model="loadingShow" :text='alertText' ></Loading>
		<!--******************************************************-->
	</div>

</template>
<script>
	import c_reward from '../../components/reward/reward.vue'
	import c_new_tousu from '../../components/new_tousu.vue'
	import c_nav from '../../components/nav/bottomNav.vue'
	import created_group from './create_quanzi.vue'
	import c_card from '../../components/card/moments_card.vue'
	import c_big_img from '../../components/toBigImg.vue'
	import c_send_momeny from '../../components/card/send_moment_card.vue'
	import $handleImg from '../../widget/handleImg.js'
	import c_tag_card from '../../components/card/moment_tag_card.vue'
	import {$init,$back} from '../../widget/pullRefresh.js'
	import { Tab, TabItem ,Toast ,Loading} from 'vux'
	export default{
		name:'my_moment',
		data(){
			return{
				card_dataChange:false,
				hotTagLoadOver:false,
				isLoadMore:false,
				rewardInf:{},
				rewardShow:false,
				order:false,//举报的
				tousu_id:'',//投诉id
				topic:'',
				topTopShow:false,
				noneInf:false,
				my_dongtai_arr:'',//个人动态数据
				tag_dongtai_arr:'',//标签数据
				alertShow:false,
				alertText:'加载中',
				alertType:'success',
				alertTime:2000,
				c_img:{
					show:false,
					images:'',
					index:null,
				},
				joinGroup:{
					offic:[],
					joined:[],
					page:1,
				},
				createGroupShow:false,
				havGroup:false,
				isShowGG:true,
				beforeInit:true,
				result:'',
				windowTop:0,
				winHeight:'',
				loadOver:true,
				docHeight:'',
				myTime:'',
			}
		},
		computed:{
			toastShow(){
				if(this.alertType!='loading' && this.alertShow==true){
					return true
				}else{
					return false
				}
			},
			loadingShow(){
				if(this.alertType=='loading' && this.alertShow==true){
					return true
				}else{
					return false
				}
			},
			baseUrl:function(){
				return baseUrl+'/dynamic/report_insert';
			},
			nav_dec_left:function(){
				return ($(window).width()/3);
			},
			nav_dec_position:function(){
				return ($(window).width()*0.333)*(this.$store.state.moments.navType-1)+$(window).width()*.333*0.5-3.5*window.rem/2 +2+'px';
			},
			navType:function(){
				return this.$store.state.moments.navType-1;
			},
		},
		components:{
			
			'c-for-group':created_group,
			'c-card':c_card,
			'c-big-img':c_big_img,
			"c-send-momeny":c_send_momeny,
			"c-tag-card":c_tag_card,
			'c-nav':c_nav,
			'c-new-tousu':c_new_tousu,
			'c-reward':c_reward,
			Tab,TabItem,Toast,Loading
		},
		created:function(){
			this.init();
			var title=document.getElementsByTagName('title')[0];
			title.innerHTML = '圈子';
			var self = this;
			var $window = $(window);
			this.winHeight = $(window).height();
			window.onhashchange=function(){
				window.onscroll=null;
				window.onhashchange=null;
				window.onresize = null;
			}
		},
		mounted:function(){
			var self = this;
			this.initSize();
			$init('.my_monent .content',self.successPull,self);
			setTimeout(function(){
				self.initScroll();
				if(self.$store.state.moments.joinTop!=''){//参与话题的跳转
					self.changeNavType(1);
					setTimeout(function(){
						
						self.changeNavType(3,self.$store.state.moments.joinTop);
					},0)
					
					return
				}
				if(self.$store.state.moments.sendMsg){
					self.getDynamicList(1,1);
				}else if(self.$store.state.moments.all_dongtai.length>0){
					var idx = self.$store.state.moments.navType;
					self.changeNavType(1);
					setTimeout(function(){
						
						self.changeNavType(idx,true);
						$(window).scrollTop(self.$store.state.moments.leavePlace);
					},0)
				
				}else{
					var idx = self.$store.state.moments.navType;
					self.changeNavType(1);

					setTimeout(function(){
						
						self.changeNavType(idx,true);
						$(window).scrollTop(self.$store.state.moments.leavePlace);
					},0)
				}

			},0);
		},
		methods:{
			rewardOver(money){
				this.rewardShow=!this.rewardShow;
				this.card_dataChange = true;
				var self = this;
				setTimeout(function(){
					self.card_dataChange = false;
				},100)
			},
			openReward:function(){//打开打赏组件
				this.rewardInf = arguments[0];
				this.rewardShow=true;
			},
			initSize:function(){
				var domHeight = $('.pull-refresh').height();
				var $content= $('.content')
				var $root = $(this.$el);
				var h = $('.content').height();
				$root.css('height',h-domHeight);
			},
			initScroll:function(){//懒加载滚动
				var $window = $(window);
				var self = this;
				window.onscroll=function(){//加载更多
					var height = $window.height();
					var top = $window.scrollTop();
					if(top>height){
						self.topTopShow=true;
					}else{
						self.topTopShow=false;
					}
					if(self.$store.state.moments.navType==1){//所有人
						self.windowTop = $(window).scrollTop();
						self.docHeight = $(document).height();
						if(self.docHeight-self.windowTop<(self.winHeight+200) && self.loadOver&&self.alertShow==false){
							self.getDynamicList();
							self.isLoadMore=true;
						}
						return
					}

					if(self.$store.state.moments.navType=="2" && self.hotTagLoadOver!=true && self.isLoadMore==false 
						
					){//热门标签
						self.docHeight = $(document).height();
						self.windowTop = $(window).scrollTop();
						if(self.$store.state.hotTag.length<20 ||self.docHeight-self.windowTop<(self.winHeight+200)){
							self.getHotTag();
						}	
					}
				}
			},
			jubao:function(){//因为定位出现问题，需要重新做举报
				if(typeof (arguments[0]-0) == 'number' && arguments[0]!=false){
					this.tousu_id=arguments[0];
					this.order='true';
				}else{
					this.order=false;
					this.initScroll();
				}
			},
			successPull:function(){//完成下拉刷新
				if(this.$store.state.moments.navType==1){//全部
					this.$store.state.moments.dynamicListPage=0;
					this.getDynamicList(1,1);
				 }
				 else if(this.$store.state.moments.navType==2){//兴趣
				 	this.$store.commit('resetHotTag');
				 	this.hotTagLoadOver = false;
				 	this.getHotTag()

				}else{
					$back();
				}
			},
			saveLeavePlace:function(){//记录离开的位置
				this.$store.state.moments.leavePlace = arguments[0];
			},
			init:function(){//绑定全局数据，做一个响应式处理
				this.initMy_dongtai_arr();
				this.initResult();
				this.initJoinedTopic();
				if(this.$store.state.hotTag.length==0){
					this.getHotTag();
				}
			},
			initJoinedTopic:function(){//关注的话题页
				if(this.$store.state.moments.joinedTopics==''){
					var arr=[];
					this.$store.state.moments.joinedTopics=arr;
					this.tag_dongtai_arr = arr;
				}else{
					this.tag_dongtai_arr = this.$store.state.moments.joinedTopics;
				}
			},
			initMy_dongtai_arr:function(){//我的动态页
				if(this.$store.state.moments.my_dongtai==''){
					var arr=[];
					this.$store.state.moments.my_dongtai=arr;
					this.my_dongtai_arr = arr;
				}else{
					this.my_dongtai_arr = this.$store.state.moments.my_dongtai;
				}
			},
			initResult:function(){//所有人的动态页
				if(this.$store.state.moments.all_dongtai==''){
					var arr=[];
					this.$store.state.moments.all_dongtai=arr;
					this.result =  arr;
				}else{
					this.result = this.$store.state.moments.all_dongtai;
				}
			},
			getPlace:function(){
				this.$store.state.moments.leavePlace = $getLeavePlace();

			},
			joinToGroup:function(id){//进入环形
				location.href=baseUrl+'/wrq/joinGroup?group_id='+id;
			},
			cCardAlert:function(){//懒加载的提示

				var msg = arguments[0];
				var time = arguments[1];
				var self = this;

				if(time!=undefined && time!='success'){
					this.alertShow = true;
					this.alertText = msg;
				}else{
					this.alertShow = true;
					this.alertText = msg;
					if(this.myTime!=''){
						clearTimeout(this.myTime);
					}
					this.myTime = setTimeout(function(){
						//self.alertShow = false;
						if(time=='success'){//发布成功，再发请求
							$(window).scrollTop(0);
							self.getMyDy(1,1);
							self.$store.state.moments.sendMsg = true;
							self.getDynamicList(1,1);
						}
					},500)
					setTimeout(function(){
						self.alertShow = false;
					},1500)
				}
			},
			getTagDy:function(id,page){//获取关注话题
				var self = this;

				if(!id && this.tag_dongtai_arr!=''){
					return
				}

				if(!(this.$store.state.mid>-1)){
					$back();
					return
				}

				var params={
					biz_type:'t_tag_info',
				}

				$.ajax({
					url:baseUrl+'/attention/select_myself',
					data:{
						data:JSON.stringify(params),
						page:page||self.$store.state.moments.tag_dongtai_page
					},
					dataType:'jsonp',
					success:function(res){
						if(!page){
							setTimeout(function(){
								self.alertShow = false;
							},1000)
						}
						setTimeout(function(){
							if(res==''||res==null){
								if(page){
									$back();
								}

							}else{
								if(page){//下拉刷新

									self.$store.state.moments.tag_dongtai_page=1;
									self.tag_dongtai_arr.length = [];
								//	console.log(self.tag_dongtai_arr);
									for(var o=0;o<res.length;o++){
										self.tag_dongtai_arr.push(res[o]);
									}

								}else{
									self.$store.state.moments.tag_dongtai_page+=1;
									for(var i=0;i<res.length;i++){//加载更多

										var same = false;
										for(var j=0;j<self.tag_dongtai_arr.length;j++){
											if(self.tag_dongtai_arr[j].tag_content ==res[i].tag_content){
												self.tag_dongtai_arr[j]=res[i];
												same=true;
												break;
											}
										}
										if(!same){
											self.tag_dongtai_arr.unshift(res[i]);
										}

									}
								}

							}
							$back();
						},100)
					},
					error:function(){
						this.alertText='个人标签数据，请求失败';
						setTimeout(function(){
							self.alertShow = false;
						},2000)
						$back();
					}
				})
			},
			islogined:function(){//判断是否登录
				var self = this;
				if(this.$store.state.mid==-1){
					self.alertShow = true;
					self.alertText='请登录';
					 if(self.myTime!=''){
					 	clearTimeout(self.myTime);
					 }
					self.myTime=setTimeout(function(){
						self.alertShow = false;
						self.myTime='';
					},2000)
					return false;
				}else{
					return true;
				}

			},
			getMyDy:function(id,page){//我个人的动态

				if(id==1){//如果是1就跳转。。。。好智障
					this.$store.state.moments.dynamic_nav_type=1;
					return
				}
				if(!this.islogined()){
					return
				}
				this.$store.state.moments.dynamic_nav_type=3;
				if(this.my_dongtai_arr!=''&& !id){
					return
				}
				var self = this;
				if(!page){
					self.alertShow=true;
					self.alertText = '加载中';
				}
				var url = baseUrl+'/ugc/getUserDynamicList/' + this.$store.state.mid + '/' + 5 + '/' + (page||this.$store.state.moments.my_dongtai_page);
				$.ajax({
					url:url,
					dataType:'jsonp',
					success:function(res){
						clearTimeout(self.myTime);
						if(res.data.length==0){
							self.noneInf = true;
							self.myTime=setTimeout(function(){
								self.alertShow=false;
							},500)
							return
						}
						self.filterInf(self.my_dongtai_arr,res,page);
						self.myTime=setTimeout(function(){
							self.alertShow=false;
						},500)

					},
					error:function(){
						self.alertShow=true;
						self.alertText='个人动态数据请求失败';
						if(self.myTime!=""){
							clearTimeout(self.myTime);
						}
						self.myTime = setTimeout(function(){
							self.alertShow = false;
							$back();
						},1500);
					}
				})
			},
			getHotTag:function(){//获取热门标签
				var self = this;

				var obj = {
					biz_type:'pan_dynamic',
					new:true
				};
				self.isLoadMore = true;
				$.ajax({
					url:baseUrl+'/dynamic/category_tag_list_hot',
					data:{
						data:JSON.stringify(obj),
						page:self.$store.state.hotTagPage,
					},
					dataType:'jsonp',
					success:function(res){
						$back();
						self.isLoadMore = false;
						if(res==null||res==undefined||res.length==0){
							self.hotTagLoadOver = true;
							return
						}
						self.$store.commit('setHotTag',res);
						// for(var i=0;i<res.length;i++){
						// 	self.$store.state.hotTag.push(res[i]);

						// }
						
						//self.$store.state.hotTagPage=self.$store.state.hotTagPage+1;
					},
					error:function(){
						$back();
						self.isLoadMore = false;
						self.alertShow=true;
						self.alertText='热门标签,请求失败';
						alertType='warn';

						if(self.myTime!=""){
							clearTimeout(self.myTime);
						}
						self.myTime = setTimeout(function(){
							self.alertShow = false;
						},1500);
					}
				})
			},
			sendMoment_callback:function(option){//发送动态的回调
				this.alertShow = true;
				this.alertType = option.alertType;
				this.alertTime = option.alertTime;
				this.alertText = option.alertText;

				var self = this;
				if(this.alertTime!=0){
					setTimeout(function(){
						//console.log(self.alertTime);
						self.alertShow = false;
					},this.alertTime)
				}
				if(this.alertType=='success'){
					this.getDynamicList(1,1);
				}
				
			},
			groupImg:$handleImg,
			closeBigImg:function(){//关闭放大图片
				this.c_img.show = false;
			},
			toBigImg:function(){//放大图片
				var inf = arguments[0];
				this.c_img.images = inf.images;
				this.c_img.index = inf.idx;
				this.c_img.show = true;
			},
			changeNavType:function(idx,reload){//换页
				//this.$store.state.moments.navType = idx;
				this.$store.commit('changeNavType',idx);
			
				if(this.$store.state.moments.navType!=idx || reload!=undefined){
					var self =this;
					if(idx==1 ){
						//this.$store.state.moments.navType = idx;
						if(this.$store.state.moments.all_dongtai==''){
							self.getDynamicList();
						}
					}else if(idx==2 ){
						//this.$store.state.moments.navType = idx;
						if(this.$store.state.mid>0){
							if(this.joinGroup.offic==''){
								this.getTagDy();
							}
						}
					}else{
						self.topic='';
						if(self.$store.state.moments.joinTop!=''){
							self.topic = self.$store.state.moments.joinTop;
						}

					}
				}else{
					return
				}

			},
			filterInf:function(result,res,page){//过滤重复数据，可以自动判断，头加还是尾加
				if(result.length==0){
					for(var i=0;i<res.data.length;i++){
						result.push(res.data[i]);
					}
				}else{
					var index='';//添加，需要过滤重复的，因为有的是在头部插入
					if(page!=undefined){//重头插入
						while(result.length>0){
							result.shift();
						}
						setTimeout(function(){

							for(var i=res.data.length-1;i>=0;i--){
								result.unshift(res.data[i]);
							}
							$back();
						},0)
					}else{
						for(var i=0;i<res.data.length;i++){
							if(res.data[i].id==result[result.length-1].id){
								index = i;
								break;
							}
						}
						if(index==''){
							for(var i=0;i<res.data.length;i++){
								result.push(res.data[i]);
							}
						}else{
							for(var i=index+1;i<res.data.length;i++){
								result.push(res.data[i]);
							}
						}
					}

				}
			},
			getDynamicList:function(id,pageInf){//获取所有人动态
				this.$store.state.moments.navType = id||1;
				var page = pageInf ||this.$store.state.moments.dynamicListPage+1;
				var pageCout = 7;
				var self  =this;
				self.loadOver = false;
				$.ajax({
					url:baseUrl+'/ugc/getDynamicList/'+pageCout+'/'+page,
					dataType:'jsonp',
					data:'',
					success:function(res){
							self.isLoadMore=false;
						// if(!pageInf ||self.$store.state.moments.sendMsg ){
						// 	self.alertText = '加载完成';
						// 	self.$store.state.moments.sendMsg = false;
						// }

						if(self.myTime!=''){
							clearTimeout(self.myTime);
						}
						// self.myTime=setTimeout(function(){
						// 	self.alertShow = false;
						// 	self.myTime='';
						// },500)
						self.filterInf(self.result,res,pageInf)

						setTimeout(function(){
							if(self.$refs.all_dongtai==undefined){
								return
							}
							self.loadOver=true;
							if(pageInf==undefined){
								self.$store.state.moments.dynamicListPage+=1;
							}
						},0)


					},
					error:function(){
						self.isLoadMore=false;
						self.alertShow=true;
						self.alertText='获取会员动态数据失败';
						if(self.myTime!=""){
							clearTimeout(self.myTime);
						}
						self.myTime = setTimeout(function(){
							self.alertShow = false;
						},1500);
					}
				})
			}
		},

	}
</script>
<style lang='scss'>
.my_monent{
	.vux-tab {
		/*display: -webkit-box;
		display: -webkit-flex;
		display: flex;*/
		box-direction: row;
    box-orient: horizontal;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -webkit-flex-direction: row;
    flex-direction: row;

	}
	.loadMore{
		background-color: #fff;
		text-align: center;
		height: 1.2rem;width: 1.2rem;
		position: absolute;
		bottom: -1.5rem;
		left: 50%;
		margin-left: -0.6rem;
		animation: loading 1s linear infinite;
		background-image: url(../../icon/loadmore.png);
		-webkit-background-size: 100% 100%;
		background-size: 100% 100%;
		transform-origin: center;
	}
	@keyframes loading{
		from{
			transform:rotate(0deg);
		}
		to{
			transform:rotate(360deg);
		}
	}
	background-color: #eceef3;min-height: 100%;
	.tagTitle{

		line-height: 20px;
		margin-left: 10px;
		padding-top: 10px;
		font-size: 16px;
		background-color: #fff;
	}
	.noneInf{
		height: 60px;line-height: 60px;text-align: center;
		color: #ccc;font-size: 20px;
	}
	.content{
		background-color: inherit;
	}
	.nav{
		width: 100%;height: 42px;line-height: 42px;font-size: 0;background-color: #fff;margin-bottom: 2px;
		position: relative;
		li{
			width: 33.3%;text-align: center;font-size: 15px;color: #3b3b3b;display: inline-block;
		}
		.decorate{
			position: absolute;width: 88px;bottom: 0;left: 0;background-color: #ff4240;height: 1px;
			transition: all 0.2s linear;-webkit-transition: all 0.2s linear;

		}
	}
	.createGroup{
		position:fixed;height: 100%;width: 100%;transform: translateY(0);transition: transform 0.3s ease-out;
	}
	.groupComein{
		transform: translateY(100%);
	}

	.my_dongtai{
		margin-bottom: 50px;
		.guanggao{
			font-size: 12px;color: #ccc;border-bottom: 1px solid #ccc;background-color: #fff;
			line-height: 32px;height: 32px;
			span{float: left;margin-left: 10px;color: #bbb;}
			b{float: right;margin-right: 10px;color: #999;font-size: 12px;}
		}
	}

	.not_join_group{
		background-color: #fff;margin-bottom: 0.5rem;
		height: (67/20)+rem;min-height: 60px;height: 100%;padding: (31/20)+rem 0;
		p{text-align: center;color: #bbbbbb;font-size: 15px;margin-bottom: (15/20)+rem;}
		.create_btn{
			width: (121/20)+rem;height: (40/20)+rem;background-color: rgba(255,78,78,0.65);border-radius: 5px;color: #fff;line-height:(40/20)+rem;text-align: center;margin:0 auto;font-size: 16px;
		}
	}
	.my_groups,.introduce_group{
		margin-bottom: 0.5rem;
		h3{padding-left: 0.5rem;color: #ababab;font-weight: 200;border-bottom: 1px solid #ccc;line-height: (30/20)+rem;font-size: 12px;}
		li{
			font-size:0;border-bottom: 1px solid #ccc;

			padding: (10/20)+rem (13/20)+rem;

			b{height:44px;width: 44px;border-radius: 50%;background-image: url(../../icon/loading.png);
				background-repeat: no-repeat;
				-webkit-background-size: 100% 100%;
				background-size: 100% 100%;
				background-position: center center;
				border: none;display: inline-block;vertical-align: top;margin:0 (15/20)+rem 0 0;}
			section{
				display: inline-block;margin-left:-6px;
				max-width: 80%;
				p{font-size: 16px;line-height: 20px;color: #000;}
				span{color: #ababab;font-size: 12px;}
			}
		}
	}
	/*.vux-tab{
		height: 93px;background-color: #fff;position: relative;overflow: hidden;margin-bottom:10px;
		background-image:url(../../data/my_moment_nav_bg.jpg);-webkit-background-size: 100% 100%;
		background-size: 100% 100%;
	}*/
	/*nav{*/
	nav{
		.vux-tab{
			height: auto;
		}
		.vux-tab{background-color: transparent;}
		.vux-tab-item{
			line-height: 38px;
		}
		height: auto;
		background-color: #fff;position: relative;overflow: hidden;margin-bottom:10px;
		background-image:url(../../data/my_moment_nav_bg.jpg);-webkit-background-size: 100% 100%;
		background-size: 100% 100%;
		.nav_decorate{
			height: 2px;width: (70/20)+rem;position: absolute;bottom:0;background-color: #ff4e4e;
			-webkit-transition:all 0.25s ease-out;
			transition:all 0.25s ease-out;
		}
		b{display: inline-block;width: (32/20)+rem;height: (32/20)+rem;-webkit-background-size: 100% 100%;margin:0 auto;/*margin-bottom:(12/20)+rem;*/
		background-size: 100% 100%;}
		.f_my_dongtai{
			background-image: url(../../icon/f_my_dongtai.png);width: 31px;height: 31px;
			-webkit-background-size: 100% 100%;background-size: 100% 100%;
		}
		.t_my_dongtai{
			background-image: url(../../icon/t_my_dongtai.png);width: 31px;height: 31px;
			-webkit-background-size: 100% 100%;background-size: 100% 100%;
		}
		.f_join_group{
			background-image: url(../../icon/f_join_group.png);-webkit-background-size: 100% 100%;background-size: 100% 100%;width: 36px;height: 31px;
		}
		.t_join_group{
			background-image: url(../../icon/t_join_group.png);-webkit-background-size: 100% 100%;background-size: 100% 100%;width: 36px;height: 31px;
		}
		.f_send_message{
			background-image: url(../../icon/f_send_dongtai.png);-webkit-background-size: 100% 100%;background-size: 100% 100%;width: 36px;height: 31px;
		}
		.t_send_message{
			background-image: url(../../icon/t_send_dongtai.png);-webkit-background-size: 100% 100%;background-size: 100% 100%;width: 36px;height: 31px;
		}
		ul{font-size: 0;text-align: center;}
		li{
		/*li,.vux-tab-item{*/
			display: inline-block;
			width: 33%;
			padding-top: (18/20)+rem;
			/*padding-bottom: (9/20)+rem;*/
			line-height: 20px;
			/*div{height:(66/20)+rem;margin:0 auto;}*/
		}
		li:nth-of-type(3) div{
			position: relative;left: (2/20)+rem;
		}
		li:nth-of-type(2) div{
			position: relative;left: (3/20)+rem;
		}

	}
}

</style>

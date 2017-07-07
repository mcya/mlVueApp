<template>
	<ul class="find_team" ref='parentWin' >
		<c-alert :show='isLoad' :text='alert_text' ></c-alert>
		<c-big-img v-if='bigImages.isShow' option='default' :images='bigImages.images' :index='bigImages.index' closefn='xxx' v-on:xxx='closeImg()' ></c-big-img>
		<hot-addre   ref='hot_addr' fn='checkedAddress'   v-show='addIsShow' ></hot-addre>
		<div v-bind:class="searchClass" value='搜索'>
			<span ></span><b v-on:click.stop='searchInf()'   >{{search_txt}}</b>
		</div>
		<div class="alert" v-on:click='' v-if='alert'>
			<div class="content">
				<h3>确定删除吗？</h3>
				<div class="alertbtn">
					<span v-on:click='deleteResult(true)'>确定</span>
					<span v-on:click='deleteResult(false)'>取消</span>
				</div>
			</div>
		</div>
		<ul class='listOptin'>
			<li v-on:click='changeTime()' v-bind:class="fabuTime">发布时间<b class="icon-xiala-01 iconfont"></b></li>
			<li v-on:click='goTime()' v-bind:class="sendoutTime" >出发时间<b class="icon-xiala-01 iconfont"></b></li>
			<li v-on:click='myInf()'  >
				<i v-bind:class='mySend'></i>我发布的
			</li>
		</ul>

			<!-- ***************************************** 所有人发布的************************************************************ -->
		<li v-if='items'  v-for='(item,index) in items' ref='li'  class='content_list' >
			<div class='left_part'>
				<img v-bind:src="item.bg"  ref='img' v-on:click='toBig(item.bg,0)'>
				<div class="talkBtn" v-on:click='talkTody(index)' ref='talkBtn' v-if='item.yue' >约</div>
				<div class="talkBtn" v-on:click='cancelMine(index,"all")' style="background-color:#d8d8d8;font-size:#000" v-if='!item.yue' >取消</div>
			</div>
			
			<article v-bind:style='{width:articleSty+"px"}' >
				<!-- <div  v-on:click='openComplain(index)'>
					
				</div> -->
				
				<header class='title'><span>{{item.fabuTime}}</span> 
					<span style='color:#ccc;float:right;margin-right:35px'>举报</span>
					<c-tousu class='c_complain' style='marginTop:-20px'  :biz_id='item.id'  biz_type='t_publish' :url='baseUrl'></c-tousu>
				</header>
				<section>
					 <header><!-- <b>{{item.content.title}}</b><span>{{item.content.subTitle}}</span> --></header> 
					<div class="content">{{item.content.content}}</div>
				</section>
				<footer><span>导补</span><b>{{item.budao_money}}</b>元</footer>
				<ol class="pic">
					<li v-for='(image,x) in item.pic' v-on:click='toBig(item.pic,x)'  >
						<img :src="image.pq"  ref='content_img'>
					</li>
				</ol>
				<header class='title title_dev '><span>出发地: <i>{{item.start_city}}</i> </span><span>出发日期: <i>{{item.start_date}}</i></span></header>
				
			</article>
		</li>
		<li v-if='noneInf()' class='none_list'>暂无数据</li>
		<!-- ***************************************************************************************************** -->
	</ul>
</template>
<script>
	import c_tousu from '../components/complain.vue'
	import hot_address from '../components/hot_address';
	import toBigImg from '../components/toBigImg'
	import $headerimg from '../icon/find_team.png';
	import $time from '../core/time';
	import $cookie from '../core/cookie';
	import $communic from '../core/communic'
	import c_alert from '../components/alert';
	export default{
		data(){
			return{
				baseUrl:baseUrl+'/sys_biz_set/report_insert',
				complainIdx:null,
				loadOver:false,//没法加载更多
				alert_text:'正在加载',
				bigImages:{
					images:[],
					isShow:false
				},
				refleshOver:false,
				searchClass:'search',
				mine:[],
				addIsShow:false,
				items:[],
				articleSty:'',
				page:0,
				start_city:'',
				data:[],
				search_txt:'搜索',
				send_time:true,
				go_ime:false,
				my_list:false,
				fabuTime:'checked up',
				sendoutTime:'notCheck down',
				mySend:'',
				mid:'',
				mineDate:[],
				alert:false,
				deleteIndex:'',
				isLoad:false,
				firstLoad:true,
				params:{
					page:0,//页码
					start_city:'',//城市名
					type:'pub_time',//排序类型，传参介绍（pub_time/发布时间 start_date/出发时间）
					by:'DESC',//排序方式，传参介绍（DESC/反序 ASC/正序）
					myself:'',//传当前用户的mid（当传mid是不用传start_city，type，by）
				},
			}
		},
		created:function(){
			this.mid = this.$store.state.mid;
			var self = this;
			var winHeight = document.body.clientHeight;
			window.onscroll=function(){//下拉加载更多 1、滚动到离页面还有一屏幕多200就触发  2、加载的是下一页  3、如果没下一页就
				var top = document.body.scrollTop||document.documentElement.scrollTop ;
				var docHeight = document.body.scrollHeight||document.documentElement.scrollHeight ;
				if(docHeight-top<(winHeight+200) && !self.loadOver){
					self.getMessage();
				}
			}
		
		},
		computed:{
			winWidth:function(){
				return $(window).width();
			}
		},
		mounted:function(){
			//计算宽度
			this.getMessage();
			var title=document.getElementsByTagName('title')[0];
			title.innerHTML = '找团';
		},
		components:{
			'hot-addre':hot_address,
			'c-big-img':toBigImg,
			'c-alert':c_alert,
			'c-tousu':c_tousu,
		},
		methods:{
			callbackComplain:function(){
				var res = arguments[0];
				if(arguments[0]==''){
					this.alert_text='正在提交投诉。';
						this.isLoad=false;
					setTimeout(function(){
						this.isLoad=false;
					},1500);
					return
				}
				this.complainIdx=null;
				if(res.return=='true'){
					this.alert_text='您的举报信息已经提交成功！我们会尽快审核查实。';
				}else{
					this.alert_text='举报失败，原因：'+res.msg;
				}
				this.isLoad=true;
				var self = this;
				setTimeout(function(){
					self.isLoad=false;
				},2500)
			},
			openComplain:function(idx){//举报投诉框
				if(idx==this.complainIdx){
					this.complainIdx = null;
				}else{
					this.complainIdx = idx;
				}
				
			},
			colorTouch:function(){

			},
			noneInf:function(){
				if(this.items.length==0){
					return true
				}else{
					return false
				}
			},
			closeImg:function(){//关闭图片放大
				this.bigImages.isShow = false;
				this.bigImages.index = '';
				this.bigImages.images.length=0;
			},
			toBig:function(images,index){//点击图片放大

				this.bigImages.isShow = true;
				this.bigImages.index = index;
				console.log(this.bigImages.index);
				if(typeof images =='object'){
					var img = [];
					for(var i in images){
						this.bigImages.images.push(images[i].hd);
					}
				}else{
					if(images.indexOf('x-oss-process=image')>-1){
						images = images.slice(0,images.indexOf('?'))+'?x-oss-process=image/resize,w_'+300;
					}
					this.bigImages.images.push(images);
				}
			},
			goTime:function(){
				var self=this;
				if(this.isLoad==false){
						this.search_txt='搜索';
						this.mySend='';
						this.sendoutTime=this.sendoutTime.replace('notCheck','checked');
						this.fabuTime = this.fabuTime.replace('checked','notCheck');
					if(this.sendoutTime.indexOf('up')>-1){//从远到近
						//发布时间需要变灰，我也要变灰,checked up 变成反向
						this.sendoutTime = 'checked down';
						this.getMessage('startTime down');
					}else{
						this.sendoutTime = 'checked up';
						this.getMessage('startTime up');
					}
				}
			},
			changeTime:function(){//变色加请求
				var self=this;
				if(this.isLoad==false){
						this.mySend='';
						this.search_txt='搜索';
						this.fabuTime=this.fabuTime.replace('notCheck','checked');
						this.sendoutTime = this.sendoutTime.replace('checked','notCheck');
					if(this.fabuTime.indexOf('up')>-1){//从远到近
						//发布时间需要变灰，我也要变灰,checked up 变成反向
						this.fabuTime = 'checked down';
						this.getMessage('fabu down');
					}else{
						this.fabuTime = 'checked up';
						this.getMessage('fabu up');
					}
				}
			},
			deleteResult:function(res){//确定是否删除
				this.alert=false;
				var self = this;
				if(res){
					var params={
							mid:this.mid,
							publish_id:this.items[this.deleteIndex].id,
							state:2
						}
					var list = self.deleteList;
					var index = self.deleteIndex;
					self.isLoad = true;
					self.alert_text ='正在删除 ';
					$.ajax({
						url:baseUrl+'/publish/set_state',
						dataType:'jsonp',
						data:params,
						success:function(result){
							if(result){
								self.items.splice(index,1);
								self.alert_text ='删除成功 ';
								setTimeout(function(){
									self.isLoad=false;
								},800)
							}else{
								self.alert_text ='删除失败';
								setTimeout(function(){
									self.isLoad=false;
								},800)
							}
							
						},
						error:function(){
							self.alert_text ='请求失败';
							setTimeout(function(){
								self.isLoad=false;
							},800)
						}
					})
				}
			},
			alertShow:function(){//弹框
					this.alert=true;
			},
			cancelMine:function(index,who){//删除 
				this.alertShow();//弹出是否取消，确定后删除
				this.deleteIndex = index;
				this.deleteList = who;
			},
			myInf:function(){
				if(this.isLoad==false){
			//显示我的发布 
					if(this.mySend ==''){//显示,请求只获得自己的数据 
						this.search_txt='搜索';
						this.mySend='icon-zhengque-01 iconfont';
						this.sendoutTime=this.sendoutTime.replace('checked','notCheck');
						this.fabuTime = this.fabuTime.replace('checked','notCheck');
						//this.mid='96';////////////设置了默认mid
						if(this.mid==null){
							alert('意外错误：无法获取用户信息');
							this.mySend ='';
							return 
						}
						this.getMessage('myself');
					}else{//隐藏 
						this.params.myself='';
						this.mySend='';
						console.log('恢复')
						this.getMessage('reset');

					}
				}
			},
			isWX:function(){
					var ua = window.navigator.userAgent.toLowerCase(); 
					if(ua.match(/MicroMessenger/i) == 'micromessenger'){ 
						return true; 
					}else{ 
						return false; 
					} 
			},
			talkTody:function(index){//约
				if(this.isWX()==false){//app
					console.log(window.system);
					if( window.system=='iPhone' ||(  window.system=='Android' && window.mlxapp!=undefined && window.mlxapp.sendChatInfo!=undefined)){//iphone或者安卓新版
						var talk = new $communic({
							fn:'mlxapp.sendChatInfo',
							http:'http://mlxing.chat/',
							debug:true,
							params:{
								username:this.items[index].huanxin_account,
								content:this.items[index].content.content
							}
						});
						talk=null;
					}else{

						window.location.href = baseUrl+'/wrq/pChat/' + this.items[index].huanxin_account;
					}  
				}else{
					alert('下载我们的APP才能使用该功能哦！')
				}
			},
			addressHide:function(res){//隐藏热门地址，并查找
				this.search_txt=res||'搜索';
				this.getMessage('address');
			},
			searchInf:function(){//打开地址
				this.addIsShow=true; 
				var self = this;
				
				this.$refs.hot_addr.$on('checkedAddress',function(res){
					self.addIsShow=false;
					self.addressHide(res);
				},true)
			},
			resetWidth:function(){
				this.articleSty=(this.$refs.li[0].scrollWidth-this.$refs.img[0].offsetLeft-this.$refs.img[0].width)-24;
				this.firstLoad=false;
			},
			fb_time:function(oldDate){
				var date = new Date();
				var old=oldDate.replace(/-/g,'/');

				var result=$time(new Date(old),date);
				return result;
			},
			getMessage:function(value){
				
				if(this.isLoad==true ){   
					return
				}
				var self = this;
				var arg = arguments;
				
				self.params.page = self.page+1;  //页数，无参数时，是加载更多。

				if(arguments[0]=='myself'){//勾选了我的发布
					self.params.myself = self.mid;
					self.params.page = 1;
				}

				if(self.search_txt=='搜索'){ //第一个改变搜索地址
					self.params.start_city = '';
					self.params.page=1;
				}else if(arguments[0]=='address'){
					self.params.page = 1;
					self.params.start_city = self.search_txt;
				}
				//城市
				if(value=='reset'){//取消我的发布 
					self.params.page=1;
					self.params.myself='';
				}
				if(arguments[0]!=undefined){//更改正反选 
					if(value.indexOf('fabu')>-1){//发布时间
						self.params.page=1;
						self.params.type='pub_time';
						if(value.indexOf('up')>-1){//正序
							self.params.by='DESC';
						}else{
							self.params.by='ASC';
						}
					}else if(value.indexOf('startTime')>-1){//出发时间
						self.params.page=1;
						self.params.type='start_date';
						if(value.indexOf('up')>-1){//正序
							self.params.by='DESC';
						}else{
							self.params.by='ASC';
						}
					}
				}
				this.isLoad = true;
				this.alert_text='正在加载';
				console.log(self.params);
				$.ajax({
					url:baseUrl+'/publish/lists',
					data:self.params,
					dataType:'jsonp',
					type:'get',
					success:function(res){
						console.log(res);
						var isClearAll=false;
						if(arg.length!=0){//清空的
							self.items=[];
							isClearAll=true;
						}
						setTimeout(function(){
						
							if(self.$refs.content_img!=undefined){
								var imgNum = self.$refs.content_img.length;
							}
							
							for(var i=0;i<res.result.length;i++){

								if(res.result.length==0){//完全没有数据了
									self.loadOver = true;
									return 
								}

								self.data.push(res.result[i]);
								var obj = {content:{}};
								obj.start_city=res.result[i].start_city;//出发城市
								//出发时间->12月1日
								var arr=res.result[i].start_date.split('-');
								obj.start_date=arr[1]+'月'+arr[2]+'日';
								if(self.mid == res.result[i].pub_user){
									obj.yue = false;
								}else{
									obj.yue = true;
								}
								obj.content.title=res.result[i].title;  //线路主题
								obj.content.content=res.result[i].content;//线路内容
								obj.isShow = true;
								obj.id = res.result[i].id;              //id
								obj.budao_money=res.result[i].price;    //费用
								obj.pub_time = res.result[i].pub_time;
								obj.fabuTime = self.fb_time(res.result[i].pub_time);
								obj.huanxin_account = res.result[i].huanxin_account;
								obj.pic= [];
								//console.log(res.result[i]);
								var winWidth = document.body.clientWidth;
								for(var m=0;m<res.result[i].image.length;m++){//压缩图
									var eachPic = {};
									eachPic.pq='http://mlx.oss.mlxing.com/'+res.result[i].image[m]+'?x-oss-process=image/resize,w_'+parseInt(window.rem*3*1.5);
									eachPic.hd='http://mlx.oss.mlxing.com/'+res.result[i].image[m]+'?x-oss-process=image/resize,w_'+winWidth;
									obj.pic.push(eachPic);
								}
								if(res.result[i].headimgurl==''){
									obj.bg=$headerimg;
								}else{
									if(res.result[i].headimgurl.indexOf('http')>-1){
										obj.bg=res.result[i].headimgurl;
									}else{
										obj.bg='http://mlx.oss.mlxing.com/'+res.result[i].headimgurl+'?x-oss-process=image/resize,w_'+54;
									}
									
								}
								self.items.push(obj);
							}
							setTimeout(function(){
								self.isLoad = false;
							},500)
							if(self.firstLoad==true){
								
								setTimeout(function(){
									isClearAll=true;
									if(self.items.length>0){
										self.resetWidth();
									}
								},0)
							}
							self.page = res.page;
							
							setTimeout(function(){//让图片居中显示
								
								if(isClearAll){
									var images=self.$refs.content_img;
									try{ 
											for(var x=0;x<images.length;x++){
											var height = parseInt($(images[x]).css('height'));
											$(images[x]).css('transform','translateX(-0.75rem) translateY('+(height/window.rem -3)/2*-1+'rem)');
										}
									}catch(err){

									}
									
								}else{//加载更多就加载的节点计算
									var images=self.$refs.content_img;
									if(images==undefined){
										return 
									}
									console.log('loadmore');
									for(var x=imgNum;x<images.length;x++){
										var height = parseInt($(images[x]).css('height'));
										$(images[x]).css('transform','translateX(-0.75rem) translateY('+(height/window.rem -3)/2*-1+'rem)');
									}

								}
								
							},0)
							if(res.result.length<20){//小于20个，等于没有数据了
								self.loadOver = true;
							}

						},100)
						
					}
				});
			}
		}
	
}
</script>
<style lang='scss'>
	.find_team{
		.tousu{
			position: absolute;right: 10px;top:-9px;height: 30px;width: 30px;line-height: 30px;
		}
		.c_complain{
			position: absolute;right: 10px;top:20px;
		}
	}
	.find_team .none_list{
		line-height: 50px;font-size: 20px;color:#b7b7b7;text-align: center;padding: 0;
	}
	.find_team .pic{
		font-size: 0px;display: block;
	}
	.find_team .pic li{
		display: inline-block;width: 3rem;height: 3rem;background-color: #b7b7b7;margin-right: 0.3rem;font-size: 0;overflow: hidden;
		border-radius: 10px;
	}
	.find_team .pic li:nth-of-type(4){
		margin-right: 0;
	}
	.find_team .pic img{
		width: 4.5rem;margin:0;height: auto;-webkit-transform: translateX(-0.75rem);
		min-height: 3rem;border-radius: 10px;
	}
	.find_team .pic li{
		margin-bottom: 10px;
	}
	.find_team .loadIcon{
			width: 50px;height: 50px;position: fixed;left: 50%;top:50%;
			transform:translate(-50%,-50%);
			-webkit-transform:translate(-50%,-50%);
			 animation:mymove 2s linear infinite;
			 -webkit-animation:mymove 2s linear infinite;
			  text-align: center;line-height: 50px;
	}
	@keyframes mymove{
		0%{transform:translate(-50%,-50%) rotate(0deg) }
		50%{transform:translate(-50%,-50%) rotate(180deg)}
		100%{transform:translate(-50%,-50%) rotate(360deg)}
	}
	@-webkit-keyframes mymove{
		0%{-webkit-transform:translate(-50%,-50%) rotate(0deg) }
		50%{-webkit-transform:translate(-50%,-50%) rotate(180deg)}
		100%{-webkit-transform:translate(-50%,-50%) rotate(360deg)}
	}
	
	.find_team .loadIcon{
		font-size: 40px;color: #888;
	}
	.icon-xiala-01.iconfont.up{
		-webkit-transform: rotate(180deg);transform: rotate(180deg);
		color: inherit;
	}
	.icon-xiala-01.iconfont.down{
		color: inherit;-webkit-transform: rotate(0deg);transform: rotate(0deg);
	}
	.listOptin b{
		display: inline-block;font-weight: 200;
	}
	.listOptin i{
		height: 12px;width: 12px;border:1px solid #656565;position: relative;border-radius: 2px;
		display: inline-block;margin-right:4px;vertical-align: middle;-webkit-transform: translateY(-1px);transform: translateY(-1px);
	}
	.listOptin i:before{
		position: absolute;top:-16px;left: -3px;font-size: 20px;height:13px;color: #000;font-weight: 200;
	}
	.find_team .title_dev{
		display: block;text-align: right;
	}
	.find_team .alert .content{
		position: absolute;background-color: #fff;width: 70%;height: 100px;margin:0;left: 50%;top:50%;-webkit-transform: translate(-50%,-50%);
	}
	.find_team .alert{
		position: block;z-index: 1000;
		width: 100%;height: 100%;position: fixed;
		background-color: rgba(0,0,0,0.8);
	}
	.find_team .alert h3{
		line-height: 40px;text-align: center;margin-bottom: 10px;
	}
	.find_team .alert span{
		display: inline-block;line-height: 30px;width: 80px;height: 30px;border:1px solid #000;text-align: center;
	}
	.find_team .alert span:nth-of-type(2){
		margin-left: 30px;
	}
	.find_team .alert .alertbtn{
		display: block;
		margin:0 auto;width: 200px;
	}
	.find_team .listOptin{
		width: 100%;border-bottom: 2px solid #f3f3f3;height: 41px;    line-height: 41px;font-size: 0px;font-weight: 100;
	}
	.find_team .listOptin .checked{
		color:#ff4f47;
	}
	.find_team .listOptin .up b{
		-webkit-transform: rotate(180deg);color: inherit;
	}
	.find_team .listOptin .down b{
		-webkit-transform: rotate(0deg);color: inherit;
	}
	.find_team .listOptin .notCheck{
		color:#636363;
	}
	.find_team .listOptin li{
		display: inline-block;font-size: 15px;height: 41px;margin-left: 1rem;
	}
	
	.find_team .search span{
		display: inline-block;font-size: 12px;
		width: 15px;height: 15px;background-image: url('../icon/fangdajing.png');background-size: cover;
		vertical-align: middle;margin:0 0.3rem ;
	}
	.find_team .search b{
		display: inline-block;height: 25px;color:#fff;font-size: 13px;vertical-align: middle;
		line-height: 25px;font-weight: 100;
	}
	.find_team .search{/*搜索框*/
		position: fixed;top:9px;font-size: 0px;right: 0px;
		height: 25px;display: inline-block;padding-right: 5px;
		background-color: #646464;border-radius: 12px 0 0 12px;
	
	}
	
	
	.find_team .content{
		margin-top:5px;font-size: 13px;color:#595959;
	}
	.find_team .title span{
		margin-right:10px;color: #707070;
	}
	.find_team .title span i{
		font-style: normal;margin-left: 3px;color: #707070;
	}
	.find_team article footer span{
		font-size: 16px;color:#000;
	}
	.find_team article footer b{
		margin:0 5px;color:#ff4e4e;font-size: 17px;font-weight: 200;
	}
	.find_team article footer{
		margin-top: 12px;margin-bottom: 15px;font-size: 15px;color:#000;
	}
	.find_team{
		background-color: #fff;min-height: 100%;
	}
	.find_team section header b{
		font-size: 15px;color: #000;font-weight: 200;
	}
	.find_team section header span{
		font-size: 12px;margin-left: 5px;color: #000;
	}
	.find_team article>header{
		margin-bottom: 10px;
	}
	.find_team section{
		padding:10px;border:1px dashed #ccc;min-height: 58px;margin-right: 20px;
	}
	.find_team article{
		margin-left: 18px;
		display: inline-block;
		max-width: 100%;
		vertical-align: top;position: relative;
	}
	.find_team li .left_part{
		display: inline-block;
		vertical-align: top;font-size: 0;
	}
	.find_team li .left_part .talkBtn{
		display: block;line-height: 23px;text-align: center;
		background-color: #ff4e4e;margin:5px 0 0 20px;font-size: 13px;
		width: 53px;height: 23px;border-radius:5px;color: #fff; 

	}
	.find_team .content_list .left_part>img{
		display: block;margin:0;
		margin-left: 20px;
		height: 54px;width: 54px;
		border: 1px #ccc solid;border-radius: 3px;
	}
	.find_team>li{
		padding-top:12px;
		font-size: 0;border-bottom: 2px solid #f3f3f3;
	}
</style>
<template>
	<transition name='view'>
		<div class='tag_list'>
			<c-alert :show='alertShow' :text='alertText' class='alert'></c-alert>
			<c-big-img v-if='c_img.show' :images='c_img.images' closefn='imgdasd' v-on:imgdasd='closeBigImg' :index='c_img.index'></c-big-img>
			<c-to-top v-show=''></c-to-top>
			<header :style='{backgroundImage:inf.big_icon?handleImg(inf.big_icon,{bg:true,width:375}):""}'>
				<div>
					<p @click='attention' :style='{backgroundColor:inf.attention?"#ffbb11":""}'>{{inf.attention==true?'已关注':'+关注'}}</p>
					<span @click='goToSend'>参与话题</span>
				</div>
				<article>{{tag}}</article>
			</header>
			<main>
				<c-card v-for='item in result' :inf='item'  fn='returnImg' 
				 v-on:returnImg='toBigImg' begin='true' ></c-card>
				<article v-if='result.length==0'>
					暂无数据
				</article>
			</main>
		</div>
	</transition>
</template>
<script>
	import c_moment_card from '../../components/card/moments_card.vue'
	import c_to_top from '../../components/to_top.vue'
	import $handleImg from '../../widget/handleImg.js'
	import c_big_img from '../../components/toBigImg.vue'
	import c_alert from '../../components/alert.vue'
	export default{
		name:'tag_list',
		data:function(){
			return{
				alertShow:false,
				alertText:'感觉萌萌哒',
				topTopShow:false,
				page:1,
				tag:'',
				result:[],
				c_img:{//放大图片吧
					show:false,
					images:'',
					index:null,
				},
				inf:{
					attention:false,
				},
				myTime:'',
				loading:false,
			}
		},
		components:{
			'c-card':c_moment_card,
			'c-to-top':c_to_top,
			'c-big-img':c_big_img,
			'c-alert':c_alert
		},
		created:function(){
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
		},
		mounted:function(){
			this.getTag();
			this.getList();
			window.onscroll=function(){

			}
		},
		watch:{
		},
		methods:{
			loadMore:function(){
				var self = this;
				var $window = $(window);
				var winHeight = $(window).height();
				var docHeight = $('body').height();
				window.onscroll=function(){
					var winTop = $window.scrollTop();
					if(docHeight - winTop -winHeight >= 50 && !self.loading && docHeight>winHeight){
						self.page+=1;
						self.getList(self.page)
					}
				}
			},
			attention:function(){//关注/取消
				var self  = this; 
				if(this.$store.state.mid==-1){
					this.alertShow=true;
					this.alertText='请登录'
					if(this.myTime!=''){
						clearTimeout(self.myTime);
					}
					this.myTime = setTimeout(function(){
						self.alertShow=false;
					},1500) 
					return 
				}else if(this.alertShow==true){
					return
				}
					this.alertShow=true;
					
					var params = {
						biz_id:self.inf.id,
						biz_type:'t_tag_info'  
					}
					if(this.inf.attention==true){
						var url = baseUrl+'/attention/uninsert';
						this.alertText='取消关注';
					}else if(this.inf.attention==false){
						var url = baseUrl+'/attention/insert';
						this.alertText='添加关注';
					}else{
						return;
					}
					$.ajax({
						url:url,
						data:{
							data:JSON.stringify(params),
						},
						dataType:'jsonp',
						success:function(res){
							
							if(url == baseUrl+'/attention/uninsert' && res.return=='true'){
								self.inf.attention =false;
							}else if(url == baseUrl+'/attention/insert' && res.return=='true'){
								self.inf.attention =true;
							}

							if(self.inf.attention==false &&  typeof self.$store.state.moments.joinedTopics =='object' ){//取消关注
								var arr = self.$store.state.moments.joinedTopics
								for(var i =0;i<arr.length;i++){
									arr[i].tag_content==self.tag;
									arr.splice(i,1);
									break;
								}
							}
							// else if(self.inf.attention==true){//提示下拉刷新
							// 	if(typeof self.$store.state.moments.joinedTopics =='object'){
							// 		self.$store.state.moments.joinedTopics.length = self.$store.state.moments.joinedTopics.length+1;
							// 	}
							// }
							if(self.myTime!=''){
								clearTimeout(self.myTime);
							}

							self.myTime = setTimeout(function(){
								self.alertShow=false;
							},200) 
							return 
						}
					})
				
			},
			goToSend:function(){//参与话题
				var self  = this;
				if(this.$store.state.mid==-1){
					this.alertShow=true;
					this.alertText='请登录'
					if(this.myTime!=''){
						clearTimeout(self.myTime);
					}
					this.myTime = setTimeout(function(){
						self.alertShow=false;
					},1200)
					return					
				}else if(self.alertShow==true){
					return
				}
				// this.$store.state.moments.joinTop = this.tag;
				this.$store.commit('setTopic',this.tag);
				this.$router.push({name:'my_moment'});

			},
			closeBigImg:function(){//关闭放大图片
				this.c_img.show = false;
			},
			toBigImg:function(){//放大图片
				var inf = arguments[0];
				this.c_img.images = inf.images;
				this.c_img.index = inf.idx;
				this.c_img.show = true;

			},
			handleImg:$handleImg,
			getTag:function(){
				var str = this.$route.params.msg;
				this.tag = str.replace(/\#/g,'');
			},
			getList:function(page){
				var self = this;
				self.loading = true;
				$.ajax({
					url:baseUrl+'/ugc/getDynamicList/10/'+(page||this.page),
					dataType:'jsonp',
					data:{
						tag:self.tag,
					},
					success:function(res){
						self.loading = false;
						if(page==1){
							self.result.length=0;
						}
						for(var i=0;i<res.data.length;i++){
							self.result.push(res.data[i]);
						}
						var arr='';
						switch(self.$store.state.moments.dynamic_nav_type){
							case 1:arr = self.$store.state.moments.all_dongtai ;break;
							case 3:arr = self.$store.state.moments.my_dongtai_arr;break;
						}
						if(res.tag==''||res.tag == null){
							self.inf.attention = false;
						}else{
							self.inf = res.tag;
						}

					}	
				})
			},
		},
		
	}
</script>
<style lang='scss'>
.tag_list{
	min-height:100%;
	.alert{
		top:20px;
	}
	>header{
		>article{
			position: absolute;left: 50%;top:50%;
			transform: translate(-50%,-50%);
			-webkit-transform: translate(-50%,-50%);
			color: #fff;
			font-size: 25px;
			text-shadow: 1px 1px 4px #000;
		}
		width: 100%;padding-top: (180/375)*100%;position: relative;

		background-color: #ccc;-webkit-background-size: 100% 100%;
		background-size: 100% 100%;background-image:url(../../data/tag_list_bg.jpg); ;
		>div{
			position: absolute;bottom:14px;width: 100%;text-align: center;
			p,span{
				display: inline-block;background-color: #f5594d;
				width: 64px;height: 25px;line-height: 25px;
				text-align: center;color: #fff;font-size: 12px;
				border-radius: 4px;
			}
			p{margin-right:1rem;}
			p:active{
				background-color: red;
			}
			span{
				background-color: #0059bb;
			}
			span:active{
				background-color: blue;
			}
		}

	}
	>main{
		>article{
			width: 100%;
			margin-top: 20px;
			font-size:20px;text-shadow: 0 1px 1px #ddd;
			height: 30px;line-height: 30px;
			text-align: center;
		}
	}
}
</style>
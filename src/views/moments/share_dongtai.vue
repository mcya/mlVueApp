<template>
	<div class="share_dongtai" >
		<main>
			<textarea placeholder="分享你的带团心得和经验吧"  v-model.trim='msg' ref='textarea'></textarea>
			<dl class='content'>
				<dt v-if='getPics' :style='{backgroundImage:getPics?handleImg(getPics,{width:52,height:52,center:true,bg:true}):"",backgroundSize:"100% 100%"}'></dt>
				<dd>
				<span>{{getNickname}}</span>
				<p>{{getMsg}}</p></dd>
			</dl>
			<hr>
			<span>选择标签</span>
			<ul>
				<li style='display:block;color:red'>热门标签</li>
				<li v-for='item in tag' @click='addTag(item)'>{{addJing(item)}}</li>
				<li style='display:block;color:red'>自定义标签</li>
				<li v-for='item in myTag'  @click='addTag(item)'>{{item}}</li>
				<br>
				<li style='color:#6b6b6b;' @click='myselfTag()' ref='addTapbtn'>添加自定义标签</li>
			</ul>
		</main>
		<!-- <ol>
			<li :class='{active:shareType==1}' class="wx_icon" @click='choose_share_type(1)'></li>
			<li :class='{active:shareType==2}' class="frend_icon" @click='choose_share_type(2)'></li>
		</ol> -->
		<!-- <c-alert show=true :text='alertText' :class='{alert:alertShow}' class='alertHide'></c-alert> -->

		<toast v-model="alertShow" :text='alertText' :type='alertType' v-bind:time='1500'></toast>

		<c-btn  text='发布' fn='aaa' v-on:aaa='send_dongtai' sty='{"backgroundColor":"#ff4e4e"}'></c-btn>
		<c-center-input v-if='c_cen_show' ref='center_input' close='closeCenInt' @closeCenInt='c_cen_show=false'  limt='10' fn='asdadasdd'  @asdadasdd='finishTag'></c-center-input>
	</div>
</template>
<script>
	import $handleImg from '../../widget/handleImg';
	import c_btn from '../../components/btn.vue';
	import c_alert from '../../components/alert.vue';
	import c_center_input from '../../components/center_input.vue';
	import { Toast} from 'vux'
	export default{
		name:'share_dongtai',
		data(){
			return{
				alertType:'',
				shareType:'',
				msg:'',
				alertShow:false,
				alertText:'',
				myTime:'',
				c_cen_show:false,
				myTag:[],
				tag:'',
				id:'',
				getMsg:'',
				getNickname:'',
				getPics:'',
				inf:{},
			}
		},
		methods:{
			send_dongtai:function(){//发送
				var self= this;

				if(this.alertShow){
					return
				}else if(self.msg==''){
					self.alertShow = true;
					self.alertText='内容不能为空';
					self.alertType='cancel';
					if(self.myTime!=""){
						clearTimeout(self.myTime);
					}
					self.myTime = setTimeout(function(){
						self.alertShow = false;
					},2000)
					return
				}else if(this.$store.state.mid==-1){
					self.alertShow = true;
					self.alertText='请登录 ';
					self.alertType='cancel';
					if(self.myTime!=""){
						clearTimeout(self.myTime);
					}
					self.myTime = setTimeout(function(){
						self.alertShow = false;
					},1500)

					return
				}

				var params = {
							"content":self.msg,//转发留言
							"trans_id":self.inf.trans_id=='0'?self.id:self.inf.trans_id//转发目标id
							};

				if(self.myTime!=""){
					clearTimeout(self.myTime);
				}
				$.ajax({
					url:baseUrl+'/dynamic/trans',
					data:{
						data:JSON.stringify(params)
					},
					dataType:'jsonp',
					success:function(result){
						self.$store.commit('resetTopic');

						if(result.return=='false'){

							self.alertShow = true;
							self.alertText='转发失败，'+result.msg;
							self.alertType='cancel';

							if(self.myTime!=""){
								clearTimeout(self.myTime);
							}
							self.myTime = setTimeout(function(){
								self.alertShow = false;
							},2200)
						}else{//再转发标签
							self.msg='';
							self.sendTag(result.last_insert_id);
							self.alertShow = true;
							self.alertText='转发成功';
							self.alertType='success';
							if(self.myTime!=""){
								clearTimeout(self.myTime);
							}
							self.myTime = setTimeout(function(){
								self.alertShow = false;
								self.$router.push({name:'my_moment',params:{}});
								self.$store.state.moments.sendMsg = true;
								self.$store.state.moments.leavePlace=0;
							},1000);
							for(var j=0;j<self.$store.state.moments.all_dongtai.length;j++){
								if(self.$store.state.moments.all_dongtai[j].id == self.id){
									self.$store.state.moments.all_dongtai[j].trans.trans_sum+=1;
								}
							}
						}
					},
					error:function(){
						self.alertShow=true;
						self.alertText='请求失败';
						if(self.myTime!=""){
							clearTimeout(self.myTime);
						}
						self.myTime = setTimeout(function(){
							self.alertShow = false;
						},1500);
					}
				})

			},
			sendTag:function(id){//发送标签
				//self.$emit(self.fn,'发布成功');

				var self = this;
				var reg = /\#[^\#]+\#/g;

				var arr = this.msg.match(reg);

				var theTag='';

				if(!arr){
					return
				}
				for(var i=0;i<arr.length;i++){
					if(arr[i].indexOf('#')>-1){
						theTag =theTag+arr[i].replace(/\#/gi,'')+',';
					}
				}
				theTag=theTag.slice(0,-1);
				var obj={
						    "biz_id":id,
						    "biz_type":"pan_dynamic",
						    "tag":theTag //多个标签以逗号隔开
						}
				$.ajax({
					url:baseUrl+'/dynamic/category_tag_insert',
					dataType:'jsonp',
					data:{
						data:JSON.stringify(obj),
					},
					success:function(res){

					}
				})
			},
			addJing:function(res){
				var str = '';
				if(res.indexOf('#')==-1){
					str = '#'+res+'#';
				}else{
					str = res;
				}
				return str;
			},
			addTag:function(res){//添加到内容区

				var str = '';
				if(res.indexOf('#')==-1){
					str = '#'+res+'#';
				}else{
					str=res;
				}
				var index = '';
				this.msg=str+this.msg;
				
			},
			finishTag:function(){
				var str = arguments[0];
				console.log(str);
				this.myTag.length=4;
				this.myTag.unshift('#'+str+'#');
				this.c_cen_show=false;
				var arr = JSON.parse(localStorage.getItem('tag'))||[];
				arr.length=4;
				arr.unshift('#'+str+'#');
				localStorage.tag = JSON.stringify(arr);
			},
			myselfTag:function(){//弹出自定义标签
				this.c_cen_show=true;
			},
			handleImg:$handleImg,
			inputMsg:function(){//输入内容

			},
			choose_share_type:function(type){//选择分享类型
				if(this.shareType==type){
					this.shareType=''
				}else{
					this.shareType=type;
				}

			},
			locacalTag:function(){//获取本地标签
				var arr =JSON.parse(localStorage.getItem('tag')) ||[];
				for(var i=0;i<arr.length;i++){
					this.myTag.push(this.addJing(arr[i]));
				}
			},
			routerTag:function(){
				var arr=[];
				for(var i=0;i<this.$store.state.hotTag.length;i++){
					arr.push(this.$store.state.hotTag[i].tag_content);
				}
				
				this.tag=arr;
			},
			routerId:function(){//获取id后获取信息
				var str = this.$route.params.id;
				this.id = str;
				for(var j=0;j<this.$store.state.moments.all_dongtai.length;j++){
					if(this.$store.state.moments.all_dongtai[j].id == this.id){
						this.inf = this.$store.state.moments.all_dongtai[j];
						
						break;
					}
				}
			},
			
			routerNickname:function(){
				if(this.inf.trans_id=='0'){
					var str = this.inf.guideBaseInfo.nickname||'美丽行用户';
					this.getNickname =  '@'+str+':';
				}else{
					var str = this.inf.trans.guideBaseInfo.nickname||'美丽行用户';
					this.getNickname =  '@'+str+':';
				}
				
			},
			routerPics:function(){
				var arr;
				if( this.inf.images==null){
					arr= this.inf.trans.data.images;
					arr=arr.replace(/[\[\]\"\\]/g,'');
					arr=arr.split(','); 
					this.getPics=arr[0];
				}else{
					arr= this.inf.images;
					console.log(arr);
					if(arr[0]==''){
						return ''
					}else{
						this.getPics = arr[0];
					}
				}
				
				
			},
			routerMsg:function(){//首先确认是否是转发
				console.log(this.inf.trans_id);
				if(this.inf.trans_id=='0'){//是首发
					this.getMsg = this.inf.content;

				}else{

					this.getMsg = this.inf.trans.data.content;
					this.msg = '//@'+this.inf.guideBaseInfo.nickname+':'+this.inf.content;
				}
			},

		},
		watch:{
			msg:function(newVal,oldVal){
				var self = this;
				if(newVal.length>100){
					if(this.myTime!=''){
						clearTimeout(self.myTime);
					}	
					this.alertShow=true;
					this.alertText ='超过100字符';
					this.myTime = setTimeout(function(){
						console.log('结束')
						self.alertShow=false;
						self.myTime='';
					},1500);
					this.msg = this.msg.slice(0,100);
				}
				
				
			}
		},
		mounted:function(){
		
			this.locacalTag();
			this.routerTag();
			this.routerId();
			this.routerMsg();
			this.routerNickname();
			this.routerPics();
		},
		components:{
			'c-btn':c_btn,
			// 'c-alert':c_alert,
			Toast,
			'c-center-input':c_center_input,
		},
		created:function(){
			var title=document.getElementsByTagName('title')[0];
			title.innerHTML = '转发';
		}
	}
</script>
<style lang='scss'>
.share_dongtai{
	width: 100%;min-height: 100%;background:#eaeef1;
	.alertHide{
		top:-5%;display: block;
		-webkit-transition:all 0.3s ease-in;
		transition:all 0.3s ease-in;
	}
	.alert{
		top:2.5%;
	}
	ol{margin-left: 1rem;font-size: 0;
		li{display: inline-block;margin-right:29px;}
		.icon-weixin:after{display: none;}
		.wx_icon{
			background-image: url(../../icon/f_weixin.png);-webkit-background-size: 100% 100%;
			background-size: 100% 100%;width: (22/20)+rem;height: (18/20)+rem;min-height: 18px;min-width: 22px;
		}
		.frend_icon{
			background-image: url(../../icon/f_friends.png);-webkit-background-size: 100% 100%;
			background-size: 100% 100%;width: 1rem;height:1rem;min-height: 20px;min-width: 20px;
		}
		.wx_icon.active{
			background-image: url(../../icon/t_weixin.png);
		}
		.frend_icon.active{
			background-image: url(../../icon/t_friends.png);
		}
	}
	main{

		background-color: #fff;margin-bottom: 17px;
		padding-top: (13/20)+rem;padding-left: (16/20)+rem;padding-right: (16/20)+rem;
		padding-bottom: (5/20)+rem;
		>textarea{
			font-size: 16px;color: #000;line-height: 18px;
			width: 100%;min-height:80px;overflow-y:visible 
		}
		.content{
			height: 52px;padding:6px;background:#d8d8d8;font-size: 0;
			

			dd{font-size: 16px;width: 77%;height: 52px;overflow: hidden;display: inline-block;
				p{line-height: 30px;font-size: 14px;width: 80%;text-overflow:ellipsis;overflow: hidden;
					height: 30px;white-space:nowrap; }
				span{line-height: 13px;font-size: 13px;color: #6a6a6a;}
			}

		}
		hr{background-color:#e8e8e8;margin-top: 12px;margin-bottom: 6px;
			height:2px;border:0;
		}
		span{
			font-size:14px;
			color:#b6b6b6;
			letter-spacing:0;
		}
		ul{
			font-size: 0px;margin-top: 11px;
			li{
				font-size:12px;line-height: 20px;
				color:#0059bb;
				display: inline-block;margin-right: 17px;
			}
		}
	}
	
}

@media screen and( min-width: 320px) {
   .share_dongtai  dt{width: 52px;height:52px;background-color: #fff;display: inline-block;margin-right: 6px;}
}
@media screen and (max-width: 319px)  {
   .share_dongtai dt{width: 20%;background-color: #fff;display: inline-block;margin-right: 3%;padding-top: 19%;}
}
</style>
<template>
	<div class='send_pinglun'>
		<header></header>
		<textarea placeholder="写评论..." v-model='msg'></textarea>
		<c-btn text='发送'fn='xxx' v-on:xxx='sendpl'></c-btn>
		<c-btn class='send_pinglun_cancelpl' text='取消'fn='aaa' v-on:aaa='cancelpl'></c-btn>
		<c-alert class='alertPos' :text='alertText' :show='alertShow' ></c-alert>
	</div>
</template>
<script>
	import btn from '../../components/btn'
	import c_alert from '../../components/alert'
	export default{
		data(){
			return{
				alertShow:false,
				alertText:'发布中',
				msg:'',
			}
		},
		props:['fn','id','isReply'],
		components:{
			'c-btn':btn,
			'c-alert':c_alert
		},
		created:function(){
			var title=document.getElementsByTagName('title')[0];
			title.innerHTML = '发布评论';
		},
		methods:{
			cancelpl:function(){
				this.msg = '';
				this.$emit(this.fn,false);

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
			sendpl:function(){
				if(!this.islogined()){
					return
				}
				console.log('pass')
				if(this.alertShow==true){
					return
				}

				var params= {
				    "biz_id":this.id,
				    "biz_type":"pan_dynamic",
				    "comment_user":this.$store.state.mid,
				    "comment_content":this.msg
				};
					if(this.isReply){
						params.com_id = this.isReply;//回复人的id
						params.biz_id = this.isReply;//回复人的id
						params.biz_type = 't_comment';
					}else{
						//params.com_id = ''
					}
				
				
				this.alertShow = true;
				this.alertText = '发布中'
				

				var self = this;
			
				$.ajax({
					url:baseUrl+'/dynamic/comment_insert',
					data:{
						data:JSON.stringify(params),
					},
					dataType:'jsonp',
					success:function(res){
						if(res.return =='true'){
							self.alertText = '发布成功..';
							
						}else{
							self.alertText = '发布失败,原因：'+res.msg;
						}
						setTimeout(function(){
							self.alertShow=false;
							if(res.return =='true'){
								self.$emit(self.fn,"true",self.msg,{returnId:res.id,usserId:self.isReply});//是否发送成功  评论内容  评论id   
								self.msg='';
							}
						},1800);
					}

				})
			}
		}
	}
</script>
<style lang='scss'>
	$big:16px;
	.send_pinglun{
		.alertPos{
			top:35%;
		}
		.send_pinglun_cancelpl{
			background-color: #ccc;
		}
		.send_pinglun_cancelpl:active{
			background-color: #888;
		}
		min-height: 100%;
		textarea{
			margin:(8/20)+rem (9/20)+rem;
			width: (343/20)+rem;height: (209/20)+rem;min-height: 200px;border:1px dotted red;
			padding: (14/20)+rem (7/20)+rem;font-size: $big;margin-bottom: (29/20)+rem;
		}
	}
</style>
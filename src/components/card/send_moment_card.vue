<template>
	<div class="send_moment_card">

		<main>
			<textarea  placeholder='分享你的带团心得和经验吧' v-model.trim='msg'>

			</textarea>
			<ol>
				<li  v-show='pic.length<9' id='moment_fk_add'><c-add-file ></c-add-file></li>
				<li v-for='(item,index) in pic'>
					<div class="box">
						<img :src="item" alt="">
						<p class="close" v-on:click='deleteImg(index)'></p>
					</div>
				</li>
			</ol>
			<hr>
			<span>选择标签</span>
			<ul>
				<li style='display:block;color:red'>热门标签</li>
				<li v-for='item in hotTag' @click='addTag(item)'>{{addJing(item)}}</li>
				<li style='display:block;color:red'>自定义标签</li>
				<li v-for='item in myTag' @click='addTag(item)'>{{item}}</li>
				<br>
				<li style='color:#6b6b6b;' @click='myselfTag()' ref='addTapbtn'>添加自定义标签</li>
			</ul>
		</main>
		<c-center-input v-if='c_cen_show' ref='center_input' close='closeCenInt' @closeCenInt='c_cen_show=false'  limt='10' fn='asdadasdd'  @asdadasdd='finishTag'></c-center-input>
		<!-- <div class="sendBtns" >
			<c-btn sty='{"background-color":"#ff4e4e","width":"45%","display":"inline-block","margin-right":"11px"}' text='发布' fn='sdasddd'  v-on:sdasddd='sendMsg'></c-btn>
			<c-btn sty='{"background-color":"#ff9212","width":"45%","display":"inline-block"}' text='发布打赏' fn='mjs'  v-on:mjs='sendMsg(1)'></c-btn>
		</div> -->
		<c-btn sty='{"background-color":"#ff4e4e"}' text='发布' fn='mjs'  v-on:mjs='sendMsg(1)'></c-btn>
	</div>
</template>
<script>
	import c_btn from '../btn.vue';
	import c_add_file from '../add_file_btn.vue';
	import c_center_input from '../../components/center_input.vue';
	import $upload from '../../widget/uploadoss/uploadImg.js'
	export default{
		name:'send_moment_card',
		data:function(){
			return {
				myTag:[],
				pic:[],
				pic_isfull:false,
				inputFile:[],
				msg:'',
				notInput:true,
				c_cen_show:false,
				uploadBtn:'',
				params:{msg:'',pics:'',use_reward:''},
				isUpdating:false,
				uploadObject:'',
			}
		},
		mounted:function(){
			this.locacalTag();
			window.my_moment = this;
			if(this.topic!=undefined &&this.topic!=''){
				this.msg = '#'+this.topic+'#'+this.msg;
			}
			this.initHeight();
			var self = this;
			setTimeout(function(){

				self.uploadObject =$upload({
					browse_button:$('#moment_fk_add')[0],
				},self,self.callback);

			},0)
		},
		destroyed:function(){
			this.uploadObject=null;
		},
		methods:{
			initHeight:function(){
				var dom = $('.send_moment_card');
				$('.my_monent')	.height(dom.height());
			},
			callback:function(filename){
				var maxNum = 9;

				if(typeof filename == 'object'){

					if(this.uploadObject.files.length>maxNum){

						//this.$emit(self.fn,'图片数量最多为'+maxNum+',请重新上传')
						this.$emit(this.fn,{
							alertText:'图片数量最多为'+maxNum+',请重新上传',
							alertType:'warn',
							alertTime:'2000'
						});
						var fknum=0;
						for(var mm=this.uploadObject.files.length;mm>maxNum;mm--){
							this.uploadObject.files.pop();
							filename.pop();
							fknum++;
						}
					}

					this.addImging(filename);

					this.inputFile = filename;
				}else{

					this.imgUploadsuccess(filename);
				}
			},
			addImging:function(files){//显示图片
		 		//获取input输入的图片
		 		var self = this;
		 		var moxie = window.moxie;

				for(var i=0;i<files.length;i++){
					;(function(file){

						var preloader = new moxie.image.Image();
						preloader.onload = function () {
			                preloader.downsize(100, 100);//先压缩一下要预览的图片,宽300，高300
			                var imgsrc = preloader.type == 'image/jpeg' ? preloader.getAsDataURL('image/jpeg', 80):preloader.getAsDataURL(); //得到图片src,实质为一个base64编码的数据
			                self.pic.push(imgsrc);//显示的图片
			                preloader.destroy();
			                preloader = null;

			            };
			    		preloader.load(file.getSource());
					}(files[i]));
				}
		 	},
			sendMsg:function(isReward){//发布
				//1.先上传图片，再发内容（需要筛选出标签），最后发标签
				var self =this;
				console.log('发布',self.isUpdating);
				if(self.isUpdating){
						return
				}
				if(self.$store.state.mid==-1){
					self.$emit(this.fn,{
						alertText:'请登录',
						alertType:'warn',
						alertTime:'2000'
					});
					return
				}

				self.params.msg=self.msg;
				if(isReward){
					self.params.use_reward=2;
				}else{
					self.params.use_reward=1;
				}
				if(self.msg==''){
					// self.$emit(this.fn,'内容不能为空');
					self.$emit(this.fn,{
						alertText:'内容不能为空',
						alertType:'warn',
						alertTime:'2000'
					});
					return
				}
				//上传图片按钮
				self.isUpdating=true;
				if(this.pic.length>0){
					this.uploadObject.start();//开始上传
					// self.$emit(self.fn,'图片正在上传','false');
					self.$emit(this.fn,{
						alertText:'图片正在上传',
						alertType:'loading',
						alertTime:'0'
					});
				}else{
					//self.$emit(self.fn,'正在发布','false');
					self.$emit(this.fn,{
						alertText:'正在发布',
						alertType:'loading',
						alertTime:'0'
					});
					this.imgUploadsuccess();
				}
			},
			imgUploadsuccess:function(res){
				var self =this;//上传完图片在执行此步
				if(self.pic.length>0){
					if(self.params.pics==''|| self.params.pics.match(/\|\|acol\|\|/g).length<self.pic.length){
							var num;
							if(self.params.pics==''){
								num=1;
							}else{
								num = self.params.pics.match(/\|\|acol\|\|/g).length;
							}
							

							self.$emit(this.fn,{
								alertText:'图片('+num+'/'+self.pic.length+')',
								alertType:'loading',
								alertTime:'0'
							});
							self.params.pics+=(res+'||acol||');
					}
					if(self.params.pics.match(/\|\|acol\|\|/g).length==self.pic.length){

							
							self.$emit(this.fn,{
								alertText:'图片('+self.pic.length+'/'+self.pic.length+')',
								alertType:'loading',
								alertTime:'0'
							});
							self.params.pics=self.params.pics.slice(0,-8);

					}
				}
				if(self.params.pics.lastIndexOf('\|')==-1 || self.params.pics.lastIndexOf('\|')!=(self.params.pics.length-1)){//只有所有图片上传成功才能

					// self.$emit(self.fn,'正在发布信息','false');
					self.$emit(self.fn,{
						alertText:'正在发布',
						alertType:'loading',
						alertTime:'0'
					});
					$.ajax({
						url:baseUrl+'/ugc/doDynamic',
						data:self.params,
						dataType:'jsonp',
						success:function(res){//先上传图片，再提交
							self.isUpdating=false;
							if(res.code=='200'){
								var reg = /(\#[^\#]+\#)/g;

								var arr = self.msg.match(reg);

								if(arr==null){
									//self.$emit(self.fn,'发布成功','success');
									self.$emit(self.fn,{
										alertText:'发布成功',
										alertType:'success',
										alertTime:'2000'
									});
									return
								}
								var newArr =[];
								for(var i=0;i<arr.length;i++){
									var same=false;
									arr[i]=arr[i].replace(/\#/g,'');

									for(var j=0;j<newArr.length;j++){
										if(arr[i]==newArr[j]){
											same=true;
											break;
										}
									}
									if(newArr.length==0 ||same ==false){
										newArr.push(arr[i]);
									}
								}

								var obj={
										    "biz_id":res.id,
										    "biz_type":"pan_dynamic",
										    "tag":newArr.join() //多个标签以逗号隔开
										}
								$.ajax({
									url:baseUrl+'/dynamic/category_tag_insert',
									dataType:'jsonp',
									data:{
										data:JSON.stringify(obj),
									},
									success:function(res){
										//self.$emit(self.fn,'发布成功');
									}
								})
								//清除数据，回到圈子，然后发请求，更新圈子与我的数据。

								self.$emit(self.fn,{
									alertText:'发布成功',
									alertType:'success',
									alertTime:'2000'
								});
								

							}else{
								self.$emit(self.fn,{
									alertText:'发布失败',
									alertType:'cancel',
									alertTime:'2000'
								});
							}
						},
						error:function(){
							
							self.isUpdating=false;
							self.$emit(self.fn,{
								alertText:'请求失败',
								alertType:'cancel',
								alertTime:'2000'
							});
						}
					})
				}

			},
			reset:function(){//初始化
				this.myTag=[];
				this.pic=[];
				this.pic_isfull=false;
				this.inputFile=[];
				this.msg='';
				this.notInput=true;
				this.c_cen_show=false;
				this.uploadBtn='';
				this.params={msg:'',pics:''};
				this.isUpdating=false;
			},
			locacalTag:function(){//获取本地标签
				var arr =JSON.parse(localStorage.getItem('tag')) ||[];

				for(var i=0;i<arr.length;i++){

					this.myTag.push(this.addJing(arr[i]));
				}


			},
			myselfTag:function(){//弹出输入框
				this.c_cen_show=true;
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
				this.msg=str+this.msg;
			},
			finishTag:function(){//添加完毕自定义标签
				var str = arguments[0];
				console.log(str);
				this.myTag.push('#'+str+'#');
				this.c_cen_show=false;
				var arr = JSON.parse(localStorage.getItem('tag'))||[];
				arr.push('#'+str+'#');
				localStorage.tag = JSON.stringify(arr);
			},
			deleteImg:function(index){

				this.pic.splice(index,1);
				console.log(this.uploadObject.files.length);
				for(var i=0;i<this.uploadObject.files.length;i++){

					if(this.uploadObject.files[i].id == this.inputFile[index].id){
						this.inputFile.splice(index,1);
						this.uploadObject.files.splice(i,1);

					break;
					}
				}
				if(this.pic.length<9){
					this.pic_isfull=false;
				}
			},

		},
		props:['fn','alertShow','topic'],//第三个参数为参与话题

		computed:{
			hotTag:function(){
				var arr=[];
				for(var i=0;i<this.$store.state.hotTag.length;i++){
					arr.push(this.$store.state.hotTag[i].tag_content);
				}
				return arr;
			},
		},
		watch:{
			myTag:function(newVal){

			},
			msg:function(newVal,oldVal){
				var self = this;
				var length = 1000;
				if(newVal.length>length){
					// this.$emit(this.fn,'超过100字符')
					self.$emit(self.fn,{
						alertText:'超过'+length+'字符',
						alertType:'warn',
						alertTime:'2000'
					});
					this.msg = this.msg.slice(0,length);
				}
				if(newVal==''){
					this.notInput=true;
				}
			}
		},
		components:{
			'c-btn':c_btn,
			'c-add-file':c_add_file,
			'c-center-input':c_center_input,
		}
	}
</script>
<style lang='scss'>
.send_moment_card{
	background:#ffffff;
	/*min-height:440px;*/padding-bottom: 100px;
	.sendBtns{
		font-size: 0;text-align: center;
	}
	main{
		padding:11px 14px 5px;
		textarea{
			min-height: 82px;margin-bottom: 5px;width: 100%;text-align: left;
		}
		ol{
			font-size: 0;width: 100%;
			li{
				width: 25%;margin-bottom: (8/20)+rem;display: inline-block;font-size: 0;text-align: center;vertical-align: middle;
				.box{
					max-width: 80px;max-height: 80px;background-color: #ccc;border:0;
					height: 4rem;width: 4rem;position: relative;
				}
				img{
					max-width: 80px;max-height: 80px;background-color: #ccc;border:0;
					height: 4rem;width: 4rem;
				}
				.close{
					display: block;
					position: absolute;
				/*	max-height: 20px;max-width: 20px;*/
					width: 1rem;height:1rem;
					background-image: url(../../icon/close.png);
					background-size: cover;
					right: -0.5rem;top:-0.5rem;
					z-index: 200;
				}
			}
		}
		hr{background-color:#e8e8e8;margin-top: 12px;margin-bottom: 6px;
			height:2px;border:0;
		}
		span{
			font-size:(14/20)+rem;
			color:#b6b6b6;
			letter-spacing:0;
		}
		ul{
			font-size: 0px;margin-top: 11px;
			li{
				font-size:(12/20)+rem;line-height: 1rem;
				color:#0059bb;
				display: inline-block;margin-right: 17px;
			}
		}
	}
}
</style>

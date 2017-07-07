<template>
	<section class="p-profile">
		<c-alert :text='alert_text' :show='alertShow'></c-alert>
		 <form id="sendProfile" name="sendProfile" onsubmit="return false">
		 	<div class='bg'></div>
			<header class="p-img tc" :style="{backgroundImage:tempFace?'url('+tempFace+')':imgPic}">
				
				<p :style="{backgroundImage:tempPic?'url('+tempPic+')':imgFace}"></p>
			</header>
			<p class="p-edit vertical-align verticle" id="editFace"><i class="iconfont  icon-fabu1 "></i><span>编辑封面</span></p>
			<p class="p-edit verticle" id="editPic" ><i class="iconfont icon-daohanglan-05"></i><span>编辑头像</span></p>
			 <ul class="mui-table-view p-list">
			    <li class="mui-table-view-cell">
					<label class="mui-col-sm-2 mui-col-xs-2">昵称</label>
					<input name="nickname" type="text" id="nickname" v-model="nickname" class="mui-col-sm-8 mui-col-xs-8" placeholder="必填">
			    </li>
			    <li class="mui-table-view-cell">
					<label class="mui-col-sm-2 mui-col-xs-2">姓名</label>
					<input name="username" type="text" id="username" v-model="name" class="mui-col-sm-8 mui-col-xs-8" placeholder="必填">
			    </li>
			    <li class="mui-table-view-cell p-radio">
					<label class="mui-col-sm-2 mui-col-xs-2">性别</label>
					<span class="p-radio-sex"><input type="radio" value="0" title="未知" v-model="sex"><i class="iconfont icon-zhengque-01"></i>未知</span>
					<span class="p-radio-sex"><input type="radio" value="1" title="男" v-model="sex"><i class="iconfont icon-zhengque-01"></i>男
					</span>
					<span class="p-radio-sex"><input type="radio" value="2" title="女" v-model="sex"><i class="iconfont icon-zhengque-01"></i>女</span>
			    </li>
			    <li class="mui-table-view-cell">
					<label class="mui-col-sm-2 mui-col-xs-2">手机</label>
					<input name="phone" type="text" id="phone" v-model="phone" class="mui-col-sm-8 mui-col-xs-8" placeholder="必填" maxlength="11">
			    </li>
			    <li class="mui-table-view-cell">
			    	<textarea id="autograph" v-model="autograph" placeholder="个性签名"></textarea>
			    </li>
			</ul>
			    <button class="mui-btn mui-btn-red" id="p-submit" :disabled='enabled' v-on:click="beginUploadImg">提交</button>
		</form> 
	</section>
</template>
<script>
import c_alert from '../components/alert';
import $cookie from '../core/cookie';
import $upload from '../widget/uploadoss/uploadImg.js'
import $handleImg from '../widget/handleImg.js'
	export default{
		name:'profile',
		data(){
			return{
				alert_text:'加载中',
				alertShow:false,
				imgFace : '',
				imgPic:'',
				tempFace:'',//添加的头像
				tempPic:'',//添加的图片
				params:{
					face:'',
					bg:'',
				},
				headimgurl:'',
				bgimgurl:'',
				nickname:'',
				name:'',
				sex:'1',
				phone:'',
				autograph:'',
				msg:'',
				errCls:'',
				enabled:false,
				uploadFace:'',
				uploadPic:'',
			}
		},
		components:{
			'c-alert':c_alert,
		},
		created:function(){
			//this.getName();
			var self = this;
			console.log('todo');
			$.ajax({
				type:"GET",
				url:'http://weixin.mlxing.com/ashop/Profile',
				dataType:'jsonp',
				success:function(res){
					console.log(res);
					self.headimgurl = res.headimgurl;
					self.bgimgurl = res.bg_img_url;
					self.imgFace = $handleImg(res.headimgurl,{bg:'true',width:'70',height:'70'});

					self.imgPic =$handleImg(res.bg_img_url,{bg:'true',width:'400',height:'190',center:'true'})
					self.nickname = res.nickname ;
					self.name = res.name;
					self.sex = res.sex;
					self.phone = res.phone;
					self.autograph = res.qm;
				}
			})
			setTimeout(function(){//头像实例
				var width=300;
				var height =width;
				self.uploadFace =$upload({
					browse_button:$('#editFace')[0],
					resize:{
						width:width,
						height:height
					}
				},self,self.callback);
			},0)
			setTimeout(function(){//背景实例
				var width=375;
				var height =parseInt(width*(190/300));
				self.uploadPic =$upload({
					browse_button:$('#editPic')[0],
					resize:{
						width:'200',
						height:'100'
					}
				},self,self.callback);
			},0)
		},
		mounted:function(){
			
		},
		methods:{
			callback:function(filename){
				var maxNum = 1;
				var uploadObject;
				if(arguments[1]==this.uploadFace){
					//头像
					uploadObject = this.uploadFace;
					if(this.tempFace){
						uploadObject.files.shift();
					}

				}else if(arguments[1]==this.uploadPic){
					//背景
					uploadObject = this.uploadPic;
					if(this.tempPic){
						uploadObject.files.shift();
					}
				}

				if(typeof filename == 'object'){
					if(uploadObject.files.length>maxNum){
						for(var mm=filename.length;mm>maxNum;mm--){
							uploadObject.files.pop();
							filename.pop();
						}
					}
					this.addImging(filename,uploadObject);
				
					this.inputFile = filename;
				}else{
					
					this.getPic(filename,arguments[1]);
				}
			},
			addImging:function(files){//显示图片
		 		//获取input输入的图片
		 		var self = this;
		 		var moxie = window.moxie;
		 		var object=arguments[1];
				for(var i=0;i<files.length;i++){
					;(function(file){
						var pic;
						var uploadObject;
						var x,y;
						var isBg;

						if(object==self.uploadFace){
							//头像
						
							uploadObject = self.uploadFace;
							pic = self.tempFace;
							x = 74;
							y=74;
							isBg=false;
						}else if(object==self.uploadPic){
							
							//背景
							uploadObject = self.uploadPic;
							pic = self.uploadPic;
							x = $(window).width();
							y=190;
							isBg=true;
						}
						var preloader = new moxie.image.Image();
						preloader.onload = function () {
			                //preloader.downsize(x, y);//先压缩一下要预览的图片,宽300，高300
			                var imgsrc = preloader.type == 'image/jpeg' ? preloader.getAsDataURL('image/jpeg', 80):preloader.getAsDataURL(); //得到图片src,实质为一个base64编码的数据
			               
			                if(isBg){
			                	self.tempPic=imgsrc
			                }else{
			                	self.tempFace=imgsrc
			                }
			                preloader.destroy();
			                preloader = null;
			            };
			    		preloader.load(file.getSource());
					}(files[i]));
				}
		 	},
		 	beginUploadImg:function(){
		 		if(this.isEmpty(this.nickname)){
					this.echoErr('#nickname','昵称不得为空！');
					return false;
				}else if(this.isEmpty(this.name)){
					this.echoErr('#username','姓名不得为空！');
					return false;
				}else if(this.isEmpty(this.phone)){
					this.echoErr('#phone','手机号码不得为空！');
					return false;
				}else if(this.isTel(this.phone)){
					this.echoErr('#phone','手机号码有误！');
					return false;
				}

		 		if(this.tempPic){
		 			
		 			this.uploadPic.start();
		 		}
		 		if(this.tempFace){
		 			this.uploadFace.start();

		 		}
		 		if(!this.tempPic && !this.tempFace){
		 			this.beforeSend();
		 		}
		 	},
			getPic:function(filename,uploadObject){
				
				if(arguments[1]==this.uploadFace){
					//头像
				
					this.params.face = filename;
				}else if(arguments[1]==this.uploadPic){
					//背景
				
					this.params.bg = filename;
				}
				if(this.tempPic){
					
		 			if(!this.params.bg){
		 				return;
		 			}
		 			
		 		}
		 		if(this.tempFace){
		 			
		 			if(!this.params.face){
		 				return;
		 			}
		 			
		 		}

		 		this.beforeSend();
			},
			beforeSend:function(){
					var self = this;
						//console.log('头像：'+self.headimgurl+'背景'+self.bgimgurl);
						this.enabled = true;
						this.alertShow=true;
						$.ajax({
							type:"GET",
							url:'http://weixin.mlxing.com/ashop/editProfile?callback=?',

							data:{//备注：headFileName，bgFileName可能是空值所以传到后端会把之前图片数据清除
								"headimgurl":self.params.bg?self.params.bg: self.headimgurl,
								"bg_img_url":self.params.face ? self.params.face : self.bgimgurl,
								"nickname":self.nickname,
								"name":self.name,
								"sex":self.sex,
								"phone":self.phone,
								"qm":self.autograph
							},
							dataType:'jsonp',
							success:function(res){
								self.enabled = false;
								self.alert_text='资料修改成功';
								setTimeout(function(){
									self.alertShow = false;
									self.$router.push({name:'guider_me'});
									self.$store.state.nickname = self.nickname;
									self.$store.state.headimgurl = self.params.bg||self.headimgurl;
									console.log(self.headimgurl);
								},1000)
							}
						})
				
			},
			isTel:function(tel){
				var regExp = /^1\d{10}$/;
				return !regExp.test(tel);
			},
			echoErr:function(o,msg){
				$(o).addClass('p-error').val('').attr('placeholder',msg).focus(function(){
					$(this).removeClass('p-error')
				})
			},
			isEmpty:function(value){
				if(value === null) return true;
				if(value === 0) return true;
				if ($.trim(value) === '') return true;
				var regExp = /^[ ]+$/;
				return regExp.test(value);
			}
		}
	}
</script>
<style lang='scss'>
.p-profile{
	position: relative;
	.bg{
		position: absolute;
		top:0;left: 0;
		width: 100%;
		height: (194/20)+rem;
		z-index: 1;
		-webkit-background-size: auto 80%;
		background-size: auto 80%;
		background-color: #ddd;
	}
}
	.p-img{
		padding:4rem 3rem 2rem;
		/*background:url(/zhaotuan/static/img/pro-bg.6f75da6.jpg) no-repeat;*/
		background-position:center;
		-webkit-background-size: 100% 100%;
		background-size: 100% 100%;
		position: relative;
		z-index: 2;
	}
	.p-img p{
		background:url(../icon/face.png) no-repeat;
		width:3.5rem;
		height:3.5rem;
		border-radius:50%;
		background-size:100% 100%;
		margin:auto;
		border:2px solid #fff;
		/*box-shadow:0 3px 5px #ccc;*/
	}
	.p-edit{
		position: absolute;
		right:.5rem;
		background-color:#9ca4ad;
		padding:.2rem .5rem;
		border-radius:1rem;
		font-size:.75rem;
		z-index: 5;
		font-size: 0;
	}
	.p-edit i{
		margin-right:2px;display: inline-block;vertical-align: middle;
		margin-top: 2px;
	}
	.p-edit i,.p-edit span{color: #fff;display: inline-block;vertical-align: middle;}
	#editFace{
		top: .4rem;
	}
	#editPic{
		top: 2.2rem;
	}
	.p-list label{
		display:inline-block;
	}
	.p-radio span{
		vertical-align:middle;
	}
	.p-radio input[type='radio']{
		width:15px;
		height: 15px;
		border: 1px solid #ccc;
		margin-right:5px;
	}
	.p-radio-sex{
		position: relative;
		margin-right:.5rem;
	}
	.p-radio-sex i{
		position: absolute;
		left: 1px;
		top: 0;
		font-size:.5rem;
		visibility:hidden
	}
	.p-error::-webkit-input-placeholder{
		color: #dd524d;
	}
	.p-radio input[type=radio]:checked + i{
		visibility:visible;
	}
	#p-submit{font-size:1rem;letter-spacing:3px;width:90%;margin:2rem auto;display:block;}
	.p-profile textarea{
		width: 95%;
		display: inline-block;
		line-height: 20px;
		padding:.5rem .5rem 1rem;
		text-indent: 6px;
		border:1px dashed #666;
	}
</style>
<template>
	<transition name='view'>
	<div class='find_guide' ref='root'>
		<!-- <div class="bg" v-show='datebg' v-on:click='closeDatelist()'></div> -->
		<c-alert :text='alertText' :show='alertShow'></c-alert>
		<c-hot-city v-show='chooseCity' fn='chooseOver' ref='hot_addr'></c-hot-city>
		<!-- <h2>
			<span>线路主题</span><input type="text" v-model='title' v-bind:placeholder='placehoder_title'>
		</h2> -->
		<div class="find_guide_content" ref='textareaFarther'>
			<textarea v-model='content' ref='textarea'  v-bind:placeholder='placehoder_content'></textarea>
		</div>
		<div class="add_pic" > 
			<div class="addBtn"  v-if='pic.length<4'>
				<span></span><span></span>
			</div>
			<div v-for="(item,key) in pic"  >
				<img v-bind:src='item' >
				<p class="close" v-on:click='deleteImg(key)'></p>
			</div>
		</div>
		<!-- 日历 -->
		<!-- <c-datelist fn='sadasdasd' v-on:sadasdasd='getDatelist' v-model='datelistShow' ></c-datelist> -->
		<c-datelist v-model='datelistShow'  @on-date-hide='datelistShow=false' @on-check-date='getDatelist'></c-datelist>
		<ul>
			<li  class="list_option" ref='inputDate'>
				<span>{{date.title}}</span>
				<div  v-bind:value="date.value" id="date" v-on:click='timeShow()' v-bind:class='{didit:date.value}'>{{date.text}}</div>
			</li>
			<li  class="list_option" ref='inputAdd' >
				<span>{{address.title}}</span>
				<div  v-bind:value="address.value"  v-on:click='start_city()' v-bind:class='{didit:address.value}'>{{address.text}}</div>
			</li>
			<li  class="list_option" ref='inputPrice' >
				<span>{{price.title}}</span>
				<div>
				<input type="text" v-bind:placeholder="price.text" v-model='price.value' v-bind:class='{didit:price.value}' v-on:click='scrollToInput($event)'>
				</div>
				
			</li>
			<li >
				<div v-for='item in radio' class="list_radio" v-on:click='changeType(item.index)' ref='radio'>
					<span>{{item.title}}</span>
					<b v-bind:class='item.isClick'></b>
				</div>
				
			</li>
			
		</ul>
		<div class="find_guide_btn" v-on:click='handleInf()'>发布</div>
	</div>
	</transition>
</template>
<script>
	import $citys from '../data/city_data.json';
	import c_alert from '../components/alert';
	import c_hot_city from '../components/hot_address';
	import c_datelist from '../components/datelist';
	import $upload from '../widget/uploadoss/uploadImg.js'
	export default{
		data(){//点击内容区就进入文本框 2、要换行
			return {
				alertText:'加载中',
				alertShow:false,
				datebg:false,
				pic_isfull:false,
				chooseCity:false,
				title:'',
				placehoder_title:' 这里填写主题',
				content:'',
				placehoder_content:'请填写找导游详情',
				date:{title:'出发时间',text:'请选择开始时间',value:''},
				address:{title:'出发城市',text:'请选择出发城市',value:''},
				price:{title:'导补',text:'请输入导补费用',value:''},
				radio:[{title:'导游',isClick:'isCheck',index:'0',value:'1'},{title:'领队',isClick:'notCheck',index:'1',value:'2'}],
				pic:[],
				localtion:{},
				city:'未知',
				hotCitys:'',
				chineseCity:'',
				inputFile:[],
				params:'',
				datelistShow:false,
				uploadObject:'',
			}
		},
		components:{
			'c-alert':c_alert,
			'c-hot-city':c_hot_city,
			'c-datelist':c_datelist,
		},
		computed:{
			hotCitys:function(){
				var arr=[];
				for(var i =0;i<15;i++){
					arr.push($citys[i]);
				}
				return arr;
			},
			chineseCity:function(){
				var arr=[];
				for(var i =0;i<$citys.length;i++){
					arr.push($citys[i]);
				}
				return arr;
			}
		},
		mounted:function(){

			var self = this;
		
			//js去设定横线******************************* //
			this.$refs.inputDate.children[1].style.width = '66%';
			this.$refs.inputDate.children[0].style.width = '27%';
			this.$refs.inputAdd.children[1].style.width = '66%';
			this.$refs.inputAdd.children[0].style.width = '27%';
			this.$refs.inputPrice.children[1].style.width = '66%';
			this.$refs.inputPrice.children[0].style.width = '27%';


			var title=document.getElementsByTagName('title')[0];
			title.innerHTML = '找导游';

			setTimeout(function(){
				self.uploadObject =$upload({
					browse_button:$('.addBtn')[0],
				},self,self.callback);
				
			},0)
		},
		destroyed:function(){
			console.log('fk');
			this.uploadObject=null;
		},
		methods:{
			callback:function(filename){
				var maxNum = 4;
				
				if(typeof filename == 'object'){
					
					if(this.uploadObject.files.length>maxNum){
						
						this.$emit(self.fn,'图片数量最多为4,请重新上传')
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
		 	deleteImg:function(index){
				
				this.pic.splice(index,1);
				
				for(var i=0;i<this.uploadObject.files.length;i++){
					console.log(this.uploadObject.files,i);
					if(this.uploadObject.files[i].id == this.inputFile[index].id){
						this.inputFile.splice(index,1);
						console.log('删除第'+i);
						this.uploadObject.files.splice(i,1);
					
					break;
					}
				}
				
			},
			getDatelist:function(){//获取日历信息
				
				this.date.value = arguments[0];
				this.date.text =arguments[0];
				this.datelistShow=false;
				
			},
			scrollToInput:function(e){
				document.body.scrollTop = document.body.scrollHeight;
			},
			closeDatelist:function(){
				this.datelistShow = false;
				this.datebg = false;
			},
			css:function(ele,css){
				     var style = null;
				    if(window.getComputedStyle) {
				         style = window.getComputedStyle(ele, null);
				     }else{
				         style = ele.currentStyle;
				     }
				    return parseInt(style[css]);
			},
			timeShow:function(){
				this.datelistShow=true;
				this.datebg =true;
			},
			
			isClick:function(res){//显示地址
				this.chooseCity=false;
				if(res!=''){
					this.address.value=res;
					this.address.text=this.address.value;
				}else{
					this.address.value='';
					this.address.text='请选择出发城市';
				}
				
			},
			start_city:function(){
				var self = this;
				self.chooseCity=true;
				this.$refs.hot_addr.$on('chooseOver',function(res){
					// self.chooseCity=false;
					self.isClick(res);
				})
				

			},
			getAddress:function(res){//获得地址
				var obj = JSON.parse(res);
				this.localtion.city=obj.city;
				this.localtion.latitude=obj.latitude;
				this.localtion.lontitude=obj.lontitude;
				this.city = this.localtion.city;
				alert(obj);
			},
			dy_type:function(){//选择是导游还是领队
				for(var i in this.radio){
					if(this.radio[i].isClick=='isCheck'){
						return this.radio[i].value;
					}
				}
			},
			handleInf:function(){//发布信息
				var self =this;
				if(self.alertShow){
						return
				}
				var params={
					title:self.title || self.content.substr(0,15),
					content:self.content,
					start_city:self.address.value,
					start_date:self.date.value,
					price:self.price.value,
					job_type:self.dy_type(),
					localtion:(self.$store.state.address.latitude+','+self.$store.state.address.longitude),
					image:'',
				}
				var str='';
				for(var i in params){
					if(params[i]==''){
						switch(i){
							//case 'title':str=str+'主题、';break;
							case 'content':str=str+'找导游详情、';break;
							case 'start_city':str=str+'出发城市、';break;
							case 'start_date':str=str+'初始时间、';break;
							case 'price':str=str+'导补';break;
						}
					}
				}
				//价钱必须是数字
				
				var reg = /^[1-9][0-9]*\.?[0-9]*$/gi;
				if(reg.test(params.price)){
					console.log('合理价格 ');
					var arr = params.price.split('.');
					if(arr.length>1){
						params.price = arr[0]+'.'+arr[1].substr(0,2);
					}
				}else{
					self.alertText=str+'导补只能是合法的数字哦';
					setTimeout(function(){
						self.alertShow=false;
					},1000)
					return
				}
				if(str!=''){
					self.alertText=str+'不能为空！';
					setTimeout(function(){
						self.alertShow=false;
					},1000)
					return
				}
				this.params = params;
				//上传图片按钮
				if(this.pic.length>0){
					this.uploadBtn.click();
					this.alertText='图片正在上传';
					this.alertShow=true;
				}else{
					this.alertText='正在发布';
					this.alertShow=true;
					this.imgUploadsuccess();
				}
			},
			imgUploadsuccess:function(res){
				var self =this;//上传完图片在执行此步
				if(this.pic.length>0){
					if(self.params.image==''|| self.params.image.match(/,/g).length<this.pic.length){
							
							self.params.image+=(res+',');
					}
					if(self.params.image.match(/,/g).length==this.pic.length){
							this.alertText='正在发布信息';
							this.alertShow=true;
							self.params.image=self.params.image.slice(0,-1);
					}
				}
				if(self.params.image.lastIndexOf(',')!=(self.params.image.length-1) || self.params.image.length==0){//只有所有图片上传成功才能
					$.ajax({
						url:baseUrl+'/publish/set_publish',
						data:self.params,
						dataType:'jsonp',
						type:'get',
						success:function(res){//先上传图片，再提交
							if(res==undefined){
								self.alertText='请登录后再发布'
								setTimeout(function(){
									self.alertShow=false;
								},1000)
								return
							}
							if(res.status){
								self.alertText='发布成功';
								setTimeout(function(){
									self.alertShow = false;
									window.history.go(-1)
								},500)
							}else if(res.status==false){
								self.alertText='发布失败';
								setTimeout(function(){
									self.alertShow=false;
								},500)
							}
						},
						error:function(){
							self.alertText='请求出错';
							setTimeout(function(){
								self.alertShow=false;
							},1500)
						}
					})
				}
			},
			changeType:function(index){
				//获取点击的按钮，其他按钮变灰 
				for(var i in this.radio){
					this.radio[i].isClick='notCheck';
				}
				this.radio[index].isClick='isCheck';
			}
		}
	}
</script>
<style  lang='scss'>
	.find_guide .forDatelist{
			width: 100%;position: fixed;z-index: 999;
			top:50%;left: 0;
			transform: translateY(-50%);
		-webkit-transform: translateY(-50%);
		}
	
	.didit{
		color: #000!important;
	}
	.find_guide .addBtn span{
		display: inline-block;width: 6px;height: 36px;background-color: #fff;
		position: absolute;left: 50%;top:50%;margin-left: -3px;margin-top: -18px;
	}
	.find_guide .addBtn span:nth-of-type(2){
		transform: rotate(90deg);
		-webkit-transform: rotate(90deg);
	}
	

	.find_guide .add_pic .close{
		display: block;
		position: absolute;
		width: 20px;height: 20px;
		background-image: url(../icon/close.png);
		background-size: cover;
		right: -9px;
		top:-9px;
	}
	.find_guide .add_pic{
		width: 100%;
		height: 98px;
		line-height: 98px;
		font-size: 0px;
	}
	.find_guide .add_pic:before{
		display: inline-block;
		vertical-align: middle;
		height: 100%;
		width: 0;
		content: '';
	}
	.find_guide .add_pic >div{
		position: relative;
		display: inline-block;
		height: 60px;width: 60px;
		vertical-align: middle;
		border-radius: 3px;
		margin-left: 19px;
	}
	.find_guide .add_pic img{
		width: 100%;
		height: 100%; border-radius: 10px;
	}
	.find_guide .add_pic .addBtn{
		border:2px solid #fff;
		border-radius: 8px;
		background-color: inherit;
		position: relative;
	}
	.find_guide .isCheck{
		border:1px solid #f5594d;
	}
	.find_guide .isCheck:before{
		background-color: #f5594d;
	}
	.find_guide .notCheck{
		
		border:1px solid #333;
	}

	.find_guide .list_radio{
		display: inline-block;
		font-size: 0;
		height: 45px;
		font-weight: 200;
	}
	.find_guide .list_radio:first-child{
		margin-left: 17px;
	}
	.find_guide .list_radio:last-child{
		margin-left: 32px;
	}
	.find_guide .list_radio span{
		display: inline-block;
		vertical-align: middle;
		font-size: 15px;
	}
	.find_guide .list_radio b{
		display: inline-block;
		vertical-align: middle;
		height: 20px;
		width: 20px;
		margin-left: 10px;
		border-radius: 50%;

	}
	.find_guide .list_radio b:before{
		display: block;
		content: '';
		width: 16px;height: 16px;
		border-radius: 50%;
		margin:2px;

	}
	.find_guide .list_radio:before{
		display: inline-block;
		vertical-align: middle;
		height: 100%;
		width: 0;
		content: '';
	}

	.find_guide{
		width: 100%;height: 100%;padding-bottom: 100px;
		background-color: #eaeef1;
	}
	.find_guide h2{
		height: 45px;width:100%;
		background-color: #fff;
		font-size: 0px;
		margin-bottom: 9px;color:#000;font-weight: 100;
	}
	.find_guide h2:before{
		display: inline-block;
		vertical-align: middle;
		height: 100%;
		width: 0;
		content: '';
	}
	.find_guide h2 span{
		display: inline-block;
		vertical-align: middle;
		font-size: 15px;color:#000;
		margin-left: 18px;
		margin-right: 5px;
	}
	.find_guide h2 input{
		display: inline-block;
		vertical-align: middle;
		font-size: 15px;text-indent: 15px;
	}
	.find_guide_btn{
		background-color:#f18980; 
		height: 2.3rem;width: 17rem;
		line-height: 2.3rem;text-align: center;
		color: #fff;
		border-radius: 3px;
		margin:0 auto;
		margin-top: 25.3px;
		font-size: 18px;
		font-weight: 500;
		
	}
	.find_guide_content {
		background-color: #fff;
		height: 4.75rem;width: 17.85rem;
		display: inline-block;
		padding: 0.425rem 0.45rem;
	}
	.find_guide_content textarea{
		height: 3.9rem;
		width: 17.15rem;
		display: inline-block;
		line-height: 20px;
		padding:6px;
		text-indent: 6px;
		font-size: 15px;
		border:1px dashed #666;
		
	}
	.find_guide ul{
		background-color: #fff;
	}
	.find_guide .list_option{
		display: block;
		font-size: 0px;
		height: 45px;
		border-bottom:1px solid #f1f1f1;
	}
	.find_guide .list_option:before{
		display: inline-block;
		vertical-align: middle;
		height: 100%;
		width: 0;
		content: '';
	}
	.find_guide .list_option:after{
		display: inline-block;
		vertical-align: middle;
		height: 100%;
		content: '';
	}
	.find_guide .list_option span{
		display: inline-block;
		vertical-align: middle;line-height: 45px;text-align: center;
		font-size: 15px;
		font-weight: 200;
	}
	.find_guide .list_option div{
		line-height: 37px;height: 33px;position: relative;
		border:1px solid #979797;
		display: inline-block;
		vertical-align: middle;text-indent: 3px;
		font-size: 15px;
		color:#999;border-top:transparent;border-left:transparent;border-right:transparent;
	}
	.find_guide .list_option div:before{
		position: absolute;display: block;width: 1px;height: 7px;
		content: '';background-color: #979797;bottom: 0;left: 0;
	}
	.find_guide .list_option div:after{
		position: absolute;display: block;width: 1px;height: 7px;
		content: '';background-color: #979797;bottom: 0;right: 0; 
	}
	.find_guide .list_option input{
		color: #999;font-size: 15px;
	}
	

	.clearfix:after{ content:"."; display:block; height:0; clear:both; overflow:hidden;}
     .clearfix{ zoom:1;}
     
     
    #datePickerBox:after,#datePickerCon{
        position:fixed;
    }
    #datePickerCon{
        width:95%;
        top:25%;
        left:2.5%;
        z-index:101;
        background-color:#fff;
        text-align:center;
    }

    .find_guide .bg{
        width: 100%;
        height:100%;
        position: fixed;
        display:block;
        left: 0;
        top: 0;
        background-color:rgba(0,0,0,.8);
        z-index:100;
    }
    #year,#week div,#con div,#prevmonth{float:left;}
    #week,#title,#prevmonth,#nextmonth,#year{height:48px;}
    #year{width:70%;}
    #prevmonth,#nextmonth,#year,#week div,#con div{line-height:50px;}
    #week div,#con div{width:13.9%;height:48px;border: solid #ccc;border-width:0 1px 1px 0;color:#333;}
    #week div{ background:#888; color:#ccc; }
    #con div.now{background:#09F;color:#fff;}
    #con div.histroy{color:#aaa;background-color: #ddd;}

    #nextmonth{float: right;}
    #prevmonth,#nextmonth{width:14%;}
	
</style>
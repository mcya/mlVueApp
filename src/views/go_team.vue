<template>
	<section class="mui-row g-wrap">
	 <form onsubmit="return false" id="g-form">
		<ul class="mui-table-view">
		    <li class="mui-table-view-cell">
				<label class="mui-col-sm-4 mui-col-xs-3">手机号码</label>
				<input type="text" v-model="phone" id="g-phone" class="mui-col-sm-7 mui-col-xs-8" placeholder="手机号码将做为登录账号">
		    </li> 
		    <li class="mui-table-view-cell">
				<label class="mui-col-sm-4 mui-col-xs-3">旅行社全称</label>
				<input type="text" v-model="tourName" id="g-tourName"class="mui-col-sm-7 mui-col-xs-8" placeholder="所属旅行社全称">
		    </li>
		    <li class="mui-table-view-cell">
				<label class="mui-col-sm-4 mui-col-xs-3">真实姓名</label>
				<input type="text" v-model="name" id="g-name"class="mui-col-sm-7 mui-col-xs-8" placeholder="您的真实姓名">
		    </li>
		    <li class="mui-table-view-cell g-address-wrap">
				<label class="mui-col-sm-4 mui-col-xs-3">所在地</label>
				<select class="mui-col-sm-2 mui-col-xs-3 g-stages fr" id="area"></select>
				<select class="mui-col-sm-2 mui-col-xs-2 g-stages fr" id="city"></select>
				<select class="mui-col-sm-2 mui-col-xs-2 g-stages fr" id="province"></select>
				<!--<i class="iconfont icon-font1 icon-more icon-g fr"></i> <input type="text" v-model="province" id="g-address"class="mui-col-sm-7 mui-col-xs-8" placeholder="请选择所在地" readonly> -->
		    </li>
			<li class="mui-table-view-cell">
				<label class="mui-col-sm-4 mui-col-xs-3">导游证</label>
				<input type="text" v-model="tourCert" id="g-cert" class="mui-col-sm-7 mui-col-xs-8" placeholder="格式为：D-0000-0000">
		    </li>
		    <li class="mui-table-view-cell">
				<label class="mui-col-sm-4 mui-col-xs-3">验证码</label>
				<input type="text" id="g-verify" v-model="captch" class="mui-col-sm-5 mui-col-xs-5" maxlength="6" placeholder="短信验证码">
				<button class="mui-btn mui-btn-danger mui-btn-outlined sendVerify" v-on:click="verify(this,60)">发送验证码</button>
		    </li>
		    <li class="mui-table-view-cell">
				<label class="mui-col-sm-4 mui-col-xs-3">密码</label>
				<input type="password" v-model="pass" id="g-pass" minlength="6" maxlength="12" class="mui-col-sm-7 mui-col-xs-8" placeholder="请输入6-12位密码">
		    </li>
		    <li class="mui-table-view-cell">
				<label class="mui-col-sm-4 mui-col-xs-3">确认密码</label>
				<input type="password" v-model="notepass" id="g-notepass" minlength="6" maxlength="12" class="mui-col-sm-7 mui-col-xs-8" placeholder="再次输入登录密码">
		    </li>
		</ul>
		<button class="mui-btn mui-btn-red" id="g-send" :disabled="enabled" v-on:click="sendDate">登录</button>
	</form>
	</section>
</template>
<script>
import Address from '../core/Address';
	export default{
		data(){
			return{
				//msg:'出团',
				areaUrl:'/static/area.json',
				province:'广东',
				city:'广州',
				area:'天河区',
				tourName:'',
				name:'',
				phone:'',
				tourCert:'',
				captch:'',
				pass:'',
				notepass:'',
				enabled:false
			}
		},
		created:function(){
			//this.getName('aaa');
			this.getAddress();
		},
		methods:{
			sendDate:function(){
				if(this.isEmpty(this.phone)){
	                this.errMsg('#g-phone','手机号不得为空');
	                return false;
	            }else if(this.isEmpty(this.tourName)){
	                this.errMsg('#g-tourName','旅行社名称不得为空');
	                return false;
	            }else if(this.isEmpty(this.name)){
	            	this.errMsg('#g-name','姓名不得为空');
	                return false;
	            }else if(this.isEmpty(this.tourCert)){
	            	this.errMsg('#g-cert','导游证不得为空');
	                return false;
	            }else if(this.isEmpty(this.captch)){
	            	this.errMsg('#g-verify','验证码不得为空');
	                return false;
	            }else if(this.isEmpty(this.pass)){
	            	this.errMsg('#g-pass','密码不得为空');
	                return false;
	            }else if(this.isEmpty(this.notepass)){
	            	this.errMsg('#g-notepass','确认密码不得为空');
	                return false;
	            }else{
	            	//this.enabled = true
	            	console.log('验证成功')
	            	/*$.post("",{},function(){

	            	})*/
	            }
				//console.log(this.tourName);
			},
			getAddress:function(){
				var self = this;
				$.getJSON(this.areaUrl,function(provinceList){
					new Address({
						"cmbProvince":'province',
						"cmbCity":'city',
						"cmbArea":'area',
						"defaultProvince":self.province,
						"defaultCity":self.city,
						"defaultArea":self.area,
						"dataArr":provinceList
					});
				})
			},
			verify:function(obj,time){
	            if(this.isEmpty(this.phone)){
	                this.errMsg('#g-phone','手机号不得为空');
	                return false;
	            }else if(this.isTel(this.phone)){
	            	this.errMsg('#g-phone','手机格式错误');
	            	return false;
	            }else{
	            	var curtime=time,
		            	$obj=$(obj),
		            	timer = setInterval(countDown,1000);
				    function countDown(){
				        var inittime=0,ctime;
				        if(inittime < curtime){
				            curtime--;
				            ctime=curtime<10?'0'+curtime:curtime;
				            $obj.text(ctime+'S');
				            $obj.attr('disabled',true);
				            //console.log('start');
				        }else{
				            $obj.text('重新发送'); 
				            $obj.removeAttr('disabled');
				           //console.log('reset');
				           clearInterval(timer);
				        }
				    }
				    $.post(baseUrl+"/login/mmsverify", {
				    		mobile:val
				    	},function(data) {
							if (data.code==1) {
								console.log("已发送");
							}else{
								console.log("验证码不正确！");
							}
					})
		        }
		    },
		    isTel:function(tel){
				var regExp = /^1\d{10}$/;
				return !regExp.test(tel);
			},
			isEmpty:function(value){
				if(value === null) return true;
				if(value === 0) return true;
				if ($.trim(value) === '') return true;
				var regExp = /^[ ]+$/;
				return regExp.test(value);
			},
		    errMsg:function(o,text){
				$(o).addClass('p-error').val('').attr('placeholder',text).focus(function(){
					$(this).removeClass('p-error')
				})
			}
		}
	}
</script>
<style>
	.g-wrap{margin-top:.5rem}
	.g-wrap input,.g-wrap label
	{
		display:inline-block;
	}
	.g-wrap input,.g-stages,.g-stages option{
		text-align:right;
	}
	.g-address-wrap select:last-child{
		padding-left:5%;
	}
	.p-error::-webkit-input-placeholder{
		color: #dd524d;
	}
	#g-send{font-size:1rem;letter-spacing:3px;width:90%;margin:2rem auto;display:block;}
	.sendVerify{padding:2px 10px;font-size:.55rem;}
	.g-stages{padding-left:3%;border-width:0 0 0 0;}
</style>

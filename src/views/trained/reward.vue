<template>
	<div class="reward">
		<div class="img_d">
			<img src="../../icon/dashang.gif">
		</div>
		<div class="xie">
			<p>谢谢支持!</p>
		</div>
		<div class="money">
			<ul>
				<li @click='click(1)' :class="{btn_checked:checkNum==1}" class="li1">￥1</li>
				<li @click='click(2)' :class="{btn_checked:checkNum==2}" class="li2">￥2</li>
				<li @click='click(5)' :class="{btn_checked:checkNum==5}" class="li3">￥5</li>
				<li @click='click(10)' :class="{btn_checked:checkNum==10}" class="li4">￥10</li>
				<li @click='click(50)' :class="{btn_checked:checkNum==50}" class="li5">￥50</li>
				<li @click='click(100)' :class="{btn_checked:checkNum==100}" class="li6">￥100</li>
				<!--<li @click='click(123456)' :class="{btn_checked:checkNum==123456}" class="li6"><input type="text" name="" id="" value="自定义" /></li>-->
			</ul>
		</div>
		<div class="xianshi">
			<p class="xs_p1">我的余额</p>
			<p class="xs_p2">￥{{amount}}</p>
			<p class="xs_p3" v-on:click="chongzhi"><span>充值</span></p>
		</div>
		<c-alert :show='danmu_true' :text='danmu_tishi'></c-alert>
		<div class="zhifu" v-show='zhifu_show'>
			<ul>
				<li v-on:click="yuezhifu">余额支付</li>
				<li v-on:click="wxzhifu">微信支付</li>
				<li class="zhifu_li3" @click='click2'>取消</li>
			</ul>
		</div>
		<c-t-recharge v-if='chongzhi_yc' :amount='amount' :reward_num='reward_num' ></c-t-recharge>
	</div>
</template>
<script>
import c_alert from '../../components/alert';
import $communic from '../../core/communic';
import c_t_recharge from '../../components/recharge/t_recharge.vue';
	export default{
		components:{
			'c-alert':c_alert,
			'c-t-recharge':c_t_recharge,
		},
		data:function(){
			return{
				biz_id:1,//课程id
				reward_user:53012,//用户mid
				be_reward_user:97,//老师id
				reward_num:0,//打赏的金额
				asset_type:1,//支付类型,
				checkNum:'',//用户点击的金额
				danmu_true:false,//控制提示框显示隐藏
				danmu_tishi:'',//提示框的内容
				amount:'',//账户余额
				zhifu_show:false,
				teacher:'',//本门课程老师
				title:'',//课程标题
				chongzhi_yc:false,//用于控制充值页面显示隐藏
			}
		},
		mounted:function(){//挂载时执行
			var self=this;
			$.ajax({
						url:baseUrl+'/shop/get_acc_amount',
//						data:{},
						//type:'POST',
						dataType:'jsonp',
						success:function(datas){
							//alert(datas.data.acc_amount);
							self.amount=datas.data.acc_amount;
						}
					});
			//从路由中取数据
			this.teacher = this.$route.params.teacher;
			this.title = this.$route.params.title;		
		},
		methods:{
			click:function(jiage){
				this.checkNum=jiage;
				console.log(jiage)
				
				if(jiage==1000){
					
				}else{
					this.reward_num=jiage;
					console.log(jiage);
					$('.zhifu').css('bottom',0);
					this.zhifu_show=true;
				}
				if(jiage==123456){
					//$('.li6').text('');
					//$('.li6').append('<input type="text" name="" id="" value="请输入数字" />');
				}
			},
			click2:function(){
				$('.zhifu').css('bottom',-160);
				this.checkNum=0;
				this.zhifu_show=false;
			},
			yuezhifu:function(){
				console.log(252);
				var self=this;
				//从cookie中获取用户id
				this.reward_user = this.$store.state.mid;
				//alert('用户id'+this.reward_user)
				//路由获取课程id
				this.biz_id = this.$route.params.biz_id;
				//alert('课程id'+this.biz_id);
				//获取老师id
				this.be_reward_user = this.$route.params.be_reward_user;
				//alert('老师id'+this.be_reward_user);
				//alert('打赏金额'+this.reward_num);
				$.ajax({
						url:baseUrl+'/course_info/reward_insert',
						data:{
							data: '{"biz_id":'+self.biz_id+',"biz_type":"t_course_info", "reward_user":'+self.reward_user+',"be_reward_user":'+this.be_reward_user+', "reward_num":'+self.checkNum+', "asset_type":'+self.reward_num+',"location":"123.213213,123.213213"}'
						},
						dataType:'jsonp',
						success:function(data){
							//alert(data.msg);
							if(data.return=='true'){
								$.ajax({
								url:baseUrl+'/shop/get_acc_amount',
								//data:{},
								//type:'POST',
								dataType:'jsonp',
								success:function(datas){
									//alert(datas.data.acc_amount);
									self.amount=datas.data.acc_amount;
								}
							});
							}
							if(data.msg.indexOf('reward_num')>-1){
								self.danmu_tishi="您的余额不足";	
							}else{
								self.danmu_tishi=data.msg;
							}
							self.danmu_true=true;
							setInterval(function(){
								self.danmu_true=false;								
							},2000);
							//console.log(data.msg)
							//alert(data.msg);
						}
					});
			},
			chongzhi:function(){
//				console.log(123)
//				location.hash='#/chongzhi';
				var self = this;
				this.$router.push({name:'chongzhi',params:{reward_num:self.reward_num}});
//				this.chongzhi_yc=true;
			},
			wxzhifusuccess:function(res){
				//alert(res);
				if(res==true){
					window.location.href=location.href;
					var self=this;
					//从cookie中获取用户id
					this.reward_user = this.$store.state.mid;
					//alert('用户id'+this.reward_user)
					//路由获取课程id
					this.biz_id = this.$route.params.biz_id;
					//alert('课程id'+this.biz_id);
					//获取老师id
					this.be_reward_user = this.$route.params.be_reward_user;
					//alert('老师id'+this.be_reward_user);
					//alert('打赏金额'+this.reward_num);
					$.ajax({
							url:baseUrl+'/course_info/reward_insert',
							data:{
								data: '{"biz_id":'+self.biz_id+',"biz_type":"t_course_info", "reward_user":'+self.reward_user+',"be_reward_user":'+this.be_reward_user+', "reward_num":'+self.reward_num+', "asset_type":'+1+',"location":"123.213213,123.213213"}'
							},
							dataType:'jsonp',
							success:function(data){
								
								if(data.msg.indexOf('reward_num')>-1){
									self.danmu_tishi="您的余额不足";	
								}else{
									self.danmu_tishi=data.msg;
								}
								self.danmu_true=true;
								setInterval(function(){
									self.danmu_true=false;								
								},2000);
								//console.log(data.msg)
								//alert(data.msg);
							}
						});
					
				}
//				if(res==false){
//					alert(res);
//				}
			},
			wxzhifu:function(){
				window.wxsuccess=this.wxzhifusuccess;
				var win = window;
				var self=this;
				//调用微信支付方法
				new $communic({
		        fn:'mlxapp.chargeMoney',
		        url:"//weixin.mlxing.com/wechat/indent?trade_type=JSAPI",
		        params:{
		            total_fee:self.reward_num,
		            handle:"wxsuccess"
		        },
		        callback:win.wxsuccess
		      });

			},
			order:function(){
				this.$emit(this.fn,true);
			}
			
		},
	}
</script>
<style lang='scss'>
	.reward{
		
		.img_d{
			width: 100%;
			img{
				width: 100%;
			}	
		}
		.xie{
				width: 100%;
				height: 100%;
				margin-top: 24px;
				margin-bottom: 36px;
				p{
					font-size: 17px;
					width: 100%;
					text-align: center;
					color: #6F6F6F;
				}
			}
		.money{
			width: 100%;
			/*border:1px solid #C7C7CC;*/
			height: 105px;
			ul{
				.btn_checked{
					background-color: #F86442;
					color: #FFFFFF;
				}
				margin:0 auto;
				width: 83%;
				li{
					background-color:#ffffff;
					width: 29.58%;
					height: 39px;
					border:1px solid #F86442;
					float: left;
					/*margin-left: 3.46%;*/
					border-radius: 90px;
					margin-bottom: 8px;
					text-align: center;
					color:#F86442;
					font-size: 17px;
					line-height: 39px;
					span{
						color: #F86442;
						font-size: 17px;
						margin-right: 5px;
					}
				}
				.li2,.li5{
					margin: 0 4.18%;
				}
				/*.li6{
					background-color: #F86442;
					color: white;
					input{
						width: 79%;
						color: white;
						text-align: center;
					}
				}*/
			}
		}
		.xianshi{
			width: 100%;
			.xs_p1{
				width: 100%;
				font-size: 18px;
				text-align: center;
				color: #000000;
				margin-top: 20px;
				margin-bottom: 6px;
			}
			.xs_p2{
				width: 100%;
				font-size: 35px;
				text-align: center;
				color: #000000;
				margin-bottom: 15px;
			}
			.xs_p3{
				background:#ff4e4e;
				border-radius:4px;
				width:348/375*100%;
				height:47px;
				margin-left: 14/375*100%;
				span{
					width: 128px;
					/*margin-left:110/375*100%;*/
					margin: 0 auto;
					font-size: 16px;
					color: white;
					line-height: 47px;
					text-align: center;
					display: block;
				}
			}
		}
		.zhifu{
			width: 100%;
			height: 109px;
			/*position: fixed;*/
			/*bottom: -110px;*/
			margin-top: 10px;
			li{
				width: 100%;
				height: 49px;
				border-top: 2px solid #f8f8f8;
				color: #222222;
				line-height: 49px;
				text-align: center;
			}
			.zhifu_li3{
				border-top: 8px solid #F8F8F8;
			}
		}
		
	}
</style>
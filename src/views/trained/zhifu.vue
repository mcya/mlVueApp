<template>
	<div class="zhifu">
		<div class="top">
			<div class="top_lei">
				<h3>讲师</h3>
				<p class="p_width">{{teacher}}  {{title}}</p>
			</div>
			<div class="xixian"></div>
			<div class="top_lei">
				<h3>类型</h3>
				<p>大咖导游课程</p>
			</div>
			<div class="xixian"></div>
			<div class="top_lei">
				<h3>价格</h3>
				<p class="p_red">￥{{price}}</p>
			</div>
			<div class="xixian"></div>
			<div class="top_tu top_lei">
				<img src="../../data/zhifu_tub.png"/>
				<span>每周一、三、五更新。</span>
			</div>
			<div class="cuxian"></div>
			<div class="top_lei">
				<h3>优惠券</h3>
				<p>没有可抵用的优惠券</p>
			</div>
			<div class="xixian"></div>
			<div class="top_lei">
				<h3>总价</h3>
				<p class="p_red">￥{{price}}</p>
			</div>
			<div class="xixian"></div>
		</div>
		<div class="bottom">
			<div class="shuoming">
				<h4>说明</h4>
				<p>1.节目购买完成后不可退回</p>
				<p>2.如果主播中途停止更新内容将退还金额</p>
			</div>
			<div class="cz_btn">
				<p v-on:click="wx_zhifu">{{yu_e}}</p>
				<p v-on:click="ye_zhifu">余额支付</p>
			</div>
		</div>
		<c-alert :show='danmu_true' :text='danmu_tishi'></c-alert>
	</div>
</template>
<script>
import $communic from '../../core/communic';
import c_alert from '../../components/alert';
	export default{
		components:{
			'c-alert':c_alert,
		},
		data:function(){
			return{
				yu_e:'微信支付',
				teacher:'',
				title:'',
				price:0,
				mid:52840,
				biz_id:0,
				danmu_true:false,
				danmu_tishi:'',
			}
		},
		mounted:function(){//挂载时执行
			this.teacher = this.$route.params.teacher;
			//alert(this.teacher);
			this.title = this.$route.params.title;
			//alert(this.title);
			this.price= this.$route.params.price;
			//alert(this.price);
			this.biz_id=this.$route.params.biz_id;
			//alert(this.biz_id);
			if(this.price<1){
				this.price=1; 
			}
			//获取mid
			this.mid = this.$store.state.mid;
			//alert(this.mid);
			//测试
//			var self=this;
//			$.ajax({
//					url: 'http://weixin.mlxing.com/course_info/join_insert',
//					data: {
//  					data: '{ "biz_id":' +self.biz_id+', "biz_type": "t_course_info", "join_user":'+ self.mid+',"pay_type":'+1+',"pay_price":'+self.price+',"price_type":'+2+'}'
//					},
//					dataType: 'jsonp',
//					success: function(data) {
//						alert(data.msg);
//					}
//				});
		},
		methods:{
			wx_zhifu:function(){
				console.log('点击了');
				window.wxsuccess=this.wxzhifusuccess;
				var win = window;
				var self=this;
				//调用微信支付方法
				new $communic({
		        fn:'mlxapp.chargeMoney',
		        url:"//weixin.mlxing.com/wechat/indent?trade_type=JSAPI",
		        params:{
		            total_fee:self.price,
		            handle:"wxsuccess"
		        },
		        callback:win.wxsuccess
		     });
			},
			wxzhifusuccess:function(res){
				if(res==true){
					var self=this;
					setTimeout(function(){
						//alert('购买成功');
						//购买成功，提交用户购买信息
					$.ajax({
						url: baseUrl+'/course_info/join_insert',
						data: {
	    					data: '{ "biz_id":' +self.biz_id+', "biz_type": "t_course_info", "join_user":'+ self.mid+',"pay_type":'+1+',"pay_price":'+self.price+',"price_type":'+2+'}'
						},
						dataType: 'jsonp',
						success: function(data) {
							console.log(data.msg);
							if(data.return == 'true'){
								self.danmu_true=true;
								self.danmu_tishi=data.msg;
							}
							if(data.return == 'false'){
								self.danmu_true=true;
								if(data.msg.indexOf('join_user')>-1){
									self.danmu_tishi='您已经提交过该课程订单';
								}else{
									self.danmu_tishi=data.msg;
								}
							}
							setTimeout(function(){
								self.danmu_true=false;
							},1000)
						}
					});
					},1000);
				}
				if(res==false){
					setTimeout(function(){
//						alert('购买失败');
					},1000)
				}
			},
			ye_zhifu:function(){
				var self=this;
				$.ajax({
					url: baseUrl+'/course_info/join_insert',
					data: {
    					data: '{ "biz_id":' +self.biz_id+', "biz_type": "t_course_info", "join_user":'+ self.mid+',"pay_type":'+1+',"pay_price":'+self.price+',"price_type":'+2+'}'
					},
					dataType: 'jsonp',
					success: function(data) {
						console.log(data.msg);
							if(data.return == 'true'){
								self.danmu_true=true;
								self.danmu_tishi=data.msg;
							}
							if(data.return == 'false'){
								self.danmu_true=true;
								if(data.msg.indexOf('join_user')>-1){
									self.danmu_tishi='您已经提交过该课程订单';
								}else{
									self.danmu_tishi=data.msg;
								}
							}
							setTimeout(function(){
								self.danmu_true=false;
							},2000);
					}
				});
			}
		},
	}
</script>
<style lang='scss'>
	.zhifu{
		
		.top{
			width:100%;
			height:299px;
			background: #FFFFFF;
			.top_lei{
				width: 100%;
				height: 46px;
				/*border: 1px solid red;*/
				h3{
					color: #979797;
					font-size: 18px;
					margin-left: 16/375*100%;
					margin-top: 14px;
					display: inline-block;
					float: left;
				}
				.p_red{color: #F5594D;}
				.p_width{width:228/375*100%;}
				p{
					/*width:228/375*100%;*/
					float: right;
					font-size: 18px;
					margin-top: 14px;
					margin-right: 16px;
					text-overflow: ellipsis;
    				overflow: hidden;
    				white-space: nowrap;
				}
				
			}
			.top_tu{
				img{
					margin-left: 16/375*100%;
					margin-top: 14px;
				}
				span{
					color: #979797;
					font-size: 13px;
					margin-top: 14px;
				}
			}
			.xixian{
				width: 359/375*100%;
				height: 2px;
				background: #F1F1F1;
				margin-left: 16/375*100%;
			}
			.cuxian{
				width: 100%;
				height: 13px;
				background: #EAEAEA;
			}
		}
		.bottom{
			width: 100%;
			height: 318px;
			background: #EAEAEA;
			.shuoming{
				width: 240/375*100%;
				height: 63px;
				margin-top:9px;
				margin-left:17/375*100%;
				display: inline-block;
				h4{
					font-size: 13px;
					color: #000000;
				}
				p{
					font-size: 13px;
					color: #979797;
				}
			}
			.cz_btn{
				
				
				width:348/375*100%;
				/*height:47px;*/
				margin-left: 17/375*100%;
				margin-top:123px;
				p{
					background:#ff4e4e;
					font-size: 16px;
					color: white;
					width: 100%;
					height: 47px;
					line-height: 47px;
					/*align-content: center;*/
					text-align: center;
					margin-bottom: 8px;
					border-radius:4px;
				}
			}
		}
	}
	
</style>

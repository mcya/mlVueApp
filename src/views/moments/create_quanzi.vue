<template>
	<div class="create_quanzi">
		<header>
			<div class="touxiang"></div>
			<div class="chose_btn">选择小组封面</div>
		</header>

		<section class="group_name" >
		<span >小组名称</span>
		<input type="text" placeholder="1-30个中英文和数字，空格、横线、下划线" v-mode='groupName'>
		</section>


		<section class="grounp_dec">
		<p>小组描述</p>
		<textarea placeholder="10-100个字，中英文均可" v-model='grounpInf'>
			
		</textarea>
		</section>

		<section class="group_address">
		<span >小组位置</span>
		<input type="text" placeholder="非必填" v-model='groundAdr'>
		</section>


		<c-btn text='创建' fn='xxx' v-on:xxx='sendMsg'></c-btn>

		<footer>每人最多只能创建一个小组，限2000人</footer>
		<c-alert text='发布中' :show='alertShow'></c-alert>
	</div>
</template>
<script>
	import btn from '../../components/btn'
	import c_alert from '../../components/alert'
	export default{
		data(){
			return{
				alertShow:false,
			}
		},
		methods:{
			sendMsg:function(){

			}
		},
		components:{
			'c-btn':btn,
			'c-alert':c_alert
		},
		created:function(){
			var title=document.getElementsByTagName('title')[0];
			title.innerHTML = '创建小组';
		},

	}
</script>
<style lang='scss'>
	$fc:#8e8787;
	.create_quanzi{
		.grounp_dec{
			padding: (16/20)+rem (15/20)+rem;background-color: #5a5a5a;width: (317/20)+rem;border-radius:4px;margin:0 auto;border:1px solid #858585;margin-bottom: (13/20)+rem;
			p{color:#fff;margin-bottom: 1rem}
			textarea{
				height: (82/20)+rem;min-height: 82px;color: #fff;
			}
		}
		.group_name,.group_address{
			span{color:#fff;margin-right: 5px;}
			input{color:#fff;}
			margin:0 auto;width: (317/20)+rem;background-color: #5a5a5a;
			padding: (19/20)+rem (15/20)+rem;border:1px solid #858585;border-radius:4px;
			margin-bottom:13px;
		}
		background-color: #636363;min-height: 100%;
		div{color:#fff;}
		header{
			padding:(33/20)+rem 0 0;
			.touxiang{
				margin:0 auto;height: 73px;width: 73px;border-radius: 50%;background-color: pink;
			}
			.chose_btn{
				line-height: (55/20)+rem;color:#fff;text-align: center;
			}
		}
		footer{
			color: $fc;margin-left: (15/20)+rem;margin-top: (13/20)+rem;
		}
	}
</style>
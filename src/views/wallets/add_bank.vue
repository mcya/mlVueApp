<template>
	<div class="add_bank">
		<p class="disc">请绑定持卡人本人的银行卡</p>
		<ul>
			<li>
				<label>持卡人</label>
				<input type="text" name="name" :value="name">
			</li>
			<li>
				<label>卡号</label>
				<input type="number" name="number" :value="cardNum">
			</li>
		</ul>
		<c-btn text="下一步" fn="clickFuc" v-on:clickFuc="nextStep()"></c-btn :alertShow='alertShow'>
		<c-alert show=true :text='alertText' :style='{top:alertShow?"0%":"-15%",transform:"translate(-50%,0)",transition:"all 0.5s ease-in"}'></c-alert>
	</div>
</template>
<script>
	import c_btn from '../../components/btn.vue'
	import c_alert from '../../components/alert.vue'
	export default{
		name:"add_bank",
		data(){
			return{
				title:"添加银行卡",
				alertShow:false,
				alertText:'',
				name:'',
				cardNum:'',
				leavePlace:0,//记录离开的位置
			}
		},
		mounted:function(){
			var name = this.$route.params.name;
			var number = this.$route.params.number;
			if(number==0&&name==0){
				this.name = '';
				this.cardNum = '';
			}else{
				this.name = name;
				this.cardNum = number; 
			}
		},
		created:function(){
			var title = document.getElementsByTagName('title')[0];
			title.innerHTML = this.title;
		},
		components:{
			"c-btn":c_btn,
			'c-alert':c_alert,
		},
		methods:{
			goto:function(url){
				window.location.href = url;
			},
			showAlert:function(str){
				var self = this;
				this.alertShow = true;
				this.alertText = str;
				setTimeout(function(){
					self.alertShow = false;
					self.alertText = "";
				},1500)
			},
			nextStep:function(){
				var name = $('input[name="name"]').val();
				var number = $('input[name="number"]').val();
				var namereg = /^[\u4e00-\u9fa5]{2,4}$/;
				var numreg = /^\d{16,19}$/g;
				if(!namereg.test(name)){
					this.showAlert("请输入有效的中文名字");
					return false;
				}else if(!numreg.test(number)){
					this.showAlert("请输入16~19位数字卡号");
					return false;
				}else{
					this.goto('#/card_info/'+name+'/'+number);															
				}
			},
		}
	}
</script>
<style lang="scss">
	html{background-color: #ececec;}
	.add_bank{
		min-height:100%;
		background-color: #ececec;
		.disc{
			padding:(10/20)+rem (15/20)+rem;
			font-size: 12px;
			color: #909090;
		}
		ul{
			background-color:#fff;
			li{
				padding:(16/20)+rem 0;
				margin: 0 (16/20)+rem;
				&:first-child{
					border-bottom:1px solid #ececec;
				}
				label{
					display: inline-block;
					width: 52px;
					font-size:17px;
					color:#4f4f4f;
					margin-right:(15/20)+rem;
				}
				input{
					width: 70%;
					font-size: 17px;
					color:#7b7b7b;
				}
			}

		}
	}
</style>
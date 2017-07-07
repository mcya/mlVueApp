/**
 * money_card
 * @authors kwun (liangyk@mlxing.com)
 * @date    2017-02-09 17:23:17
 * @version $Id$
 */

<template>
	<div class='money-card'>
		<section>
			<span>赏</span>
		</section>
		<div class='money-list'>
			<div class='item'>
				<div v-if="data.length > maxItem">
					<dl v-for='(item,index) in data' v-if="index < 4">
						<dt :style=''>
						</dt>
						<dd>¥{{item}}</dd>
					</dl>
					<dl class="total" v-if="data.length > maxItem">
						<dt :style=''>··· 共{{data.length}}人打赏<b></b></dt>
						<dd>¥{{totalMoney}}</dd>
					</dl>
				</div>
				<div v-else>			
					<dl v-for='(item,index) in data'>
						<dt :style=''>
						</dt>
						<dd>¥{{item}}</dd>
					</dl>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	
	export default{
		name:'money_card',
		data(){
			return {
			}
		},
		props:['data','maxItem'],
		mounted:function(){
		},
		computed:{
			totalMoney:function(){
				var total = 0;
				for(var i=0;i<this.data.length;i++){
					total += parseInt(this.data[i]);
				}
				return total.toFixed(2);
			}
		},
		components:{
			//'c-bubble':c_bubble
		},
		methods:{
		}
	}
</script>
<style lang="scss">
.money-card{
	$bgc:#f4f4f4;
	position: relative;
	padding: (10/20)+rem (20/20)+rem;
	height: (75/20)+rem;
	min-width: (270/20)+rem;
	z-index: 1;
	border-radius: 4px;
	background-color: $bgc;
	&:before{
		content:'';
		position: absolute;
		height: 0;width: 0;
		top:-(16/20)+rem;left:1.1rem;
		border-width: (9/20)+rem;
		border-style: solid;
		border-color: transparent  transparent $bgc transparent;
	}
	.money-list{
		float:left;
		padding-left: (45/20)+rem;
		width: 1000%;
		.item{
			display: inline-block;overflow: hidden;
		}
		dl{
			float:left;display: inline-block;margin-right: (10/20)+rem;
			dt{
				content:'';margin-bottom: (6/20)+rem;
				height: (35/20)+rem;width: (35/20)+rem;
				border-radius:2px;
				background-color: #d8d8d8;
			}
			dd{
				color: #ff9212;text-align: center;font-size:(12/20)+rem;
			}
			&.total{
				margin-right:0;
				dt{
					position:relative;
					width: 100%;
					padding-right: 1rem;
					line-height: (35/20)+rem;
					font-size: (14/20)+rem;
					background-color: transparent;
					b{
						position: absolute;
						top:50%;
						right: 0.3rem;
						transform: translateY(-50%);
						-webkit-transform: translateY(-50%);
						height: (14/20)+rem;width: (8/20)+rem;
						background-image: url(../../icon/toright.png);
						background-size: 100%;
						-webkit-background-size: 100%;
					}
				}
			}
		}
	}
	section{
		position:absolute;
		float: left;
		height:(35/20)+rem;width: (35/20)+rem;
		margin-right: (10/20)+rem;
		line-height:(35/20)+rem;
		border-radius: 50%;
		font-size: 0;
		text-align: center;
		background-color:#ff9212;
		vertical-align:top;
		span{
			display: inline-block;color: #fff;font-size: (14/20)+rem;vertical-align: middle;
		}
	}
}
</style>
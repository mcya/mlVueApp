<template>
	<div class="comfirm" v-show='show'>
		<div class="comfirm-mask" @click="close"></div>
		<div class="comfirm-wrap">
			<div class="comfirm-bd">
				<h3>提示</h3>
				<p>{{msg||'请选择要进行的操作'}}</p>
			</div>
			<div class="comfirm-ft">
				<span class="btn" @click="close">取消</span>
				<span v-if="cmfn" class="btn" @click="commit">确定</span>
				<span v-if="dfn" class="btn" @click="del">删除</span>
			</div>			
		</div>		
	</div>
</template>
<script>
	export default{
		name:"comfirm",
		data(){
			return{

			}
		},
		props:['show','dfn','cmfn','cfn','msg'],
		methods:{
			del:function(){
				this.$emit(this.dfn);
			},
			commit:function(){
				this.$emit(this.cmfn);
			},
			close:function(){
				this.$emit(this.cfn);
			}
		},
	}
</script>
<style lang="scss">
	.comfirm{
		.comfirm-mask{
			position: fixed;
			top:0;
			left:0;
			right:0;
			bottom:0;
			background: rgba(0,0,0,0.68);
			z-index: 9999;
		}
		.comfirm-wrap{
			position:fixed;
			left:50%;
			top:50%;
			color: #333;
			border-radius: 5px;
			text-align: center;
			transform: translate(-50%, -50%);
			-webkit-transform: translate(-50%, -50%);
			background-color: #fff;
			z-index:10000;
			.comfirm-bd{
				width: 150px;
				padding: 1rem 2rem;
				border-bottom: 1px solid #ececec;
				h3{
					margin-bottom: 10px;
				}
			}
			.comfirm-ft{
				overflow: hidden;
				span{
					float: left;
					width: 50%;
					padding:10px;
					box-sizing: border-box;
					&:first-child{
						border-right:1px solid #ececec;
					}
				}
			}
		}
	}


</style>
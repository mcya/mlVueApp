<template>
	<div class="add_file_btn">
		<div class='row'></div>
		<div class='low'></div>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				
			}
		},
		mounted: function() {

		}
	}
</script>

<style lang='scss'>
.add_file_btn{
	border:1px solid #d8d8d8;background-color: #fff;position: relative;
	z-index: 1;
	max-width:78px;width: 4rem;
	max-height:78px;height: 4rem;
	display: inline-block;
	.row{
		position: absolute;background-color: #bcbcbc;width: (6/78)*100%;height: (46/78)*100%;
		top:50%;left: 50%;
		transform: translate(-50%,-50%);
		-webkit-transform: translate(-50%,-50%);
	}
	.low{
		position: absolute;background-color: #bcbcbc;width: (6/78)*100%;height: (46/78)*100%;
		top:50%;left: 50%;
		transform: translate(-50%,-50%) rotate(90deg);
		-webkit-transform: translate(-50%,-50%) rotate(90deg);
	}
}
</style>
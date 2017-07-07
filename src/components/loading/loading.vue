<template>
  	<div class="loading">
    	<img src="../../data/mlxing_loading.png" class="double-flash" alt="">
    	<p class="h6">正在加载...</p>
  	</div>
</template>
<script>
	export default {
	    name: 'loading',
    	components: {

	    }
  	}
</script>
<style lang="scss" scoped>
.loading{
 	position: fixed;
  	width: 100%;
  	height: 100vh;
  	background-color: white;
  	padding-top: 25%;
  	.double-flash {
	  	width: (50/20)+rem;
	  	margin: 10px 0;
	  	margin-left: 50%;
	  	transform: translateX(-50%);
	  	animation: double-flash_5308 3s ease infinite;
	}
  	p{
  		font-size: (14/20)+rem;
  		text-align: center;
  	}
}
@keyframes double-flash_5308 {
  	0% { opacity:1 }
  	12.5% { opacity:0 }
  	25% { opacity:1 }
  	37.5% { opacity:0 }
  	50% { opacity:1 }
  	100% { opacity:1 }
}
</style>
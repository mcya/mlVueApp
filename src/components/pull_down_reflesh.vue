<template>
	<div ref='father' :class='{leave:leave}' class="c_pull_reflesh" :style='{transform:"translate3d(0,"+down+"px,0)"}'>
		<canvas :class='{leave:leave,active:loading}' class="canvas" :width='width' :height='height' ref='root'
			:style='{transform:"scale(0.65) rotate("+rotate+"deg)",opacity:opacity}'
		 >
			
		</canvas>
	</div>
</template>
<script>
export default{
	data:function(){
		return{
			width:'52',
			height:'52',
			pen:'',
			xuan:'0.9',
			down:-60,
			startPlace:'',
			rotate:-180,
			opacity:0.2,
			startHandle:false,
			leave:false,
			reBack:true,
		}
	},
	props:['fn','maxDown','loading'],
	mounted:function(){
		var self = this;
		setTimeout(function(){
			self.pen = self.$refs.root.getContext('2d');
			self.drawBackground();
			self.drawHead();
		},0)
	
		var endSide = parseInt($(window).height()/5);
		var roteSide = parseInt($(window).height()/3);
		var body = document.body;
		window.addEventListener('touchmove',function(e){//下来三分之一就全部下来,下来的值，可以自己传
			var top = $(window).scrollTop();
			if(top==0 && self.startHandle==false ||self.reBack==true){
				if(e.touches[0].clientY-self.startPlace<0){
					body.style.overflow='visible'
					return 
				}
				if((e.touches[0].clientY-self.startPlace)<=roteSide ){//下拉
					document.body.style.overflow='hidden';
					self.down =((parseInt(e.touches[0].clientY-self.startPlace))>endSide)?(endSide-100 ):(parseInt((e.touches[0].clientY-self.startPlace)))-100;
					self.opacity = parseInt((e.touches[0].clientY-self.startPlace)*100/roteSide)/100;
					self.rotate = parseInt((e.touches[0].clientY-self.startPlace)*100/roteSide)*640/100 - 180;


					if((e.touches[0].clientY-self.startPlace)+15>=roteSide){
						self.startHandle=true;
						self.reBack=false;
					}
				}
			}
		},false);
		window.addEventListener('touchstart',function(e){//初始位置
			self.startPlace = e.touches[0].clientY;
			self.leave = false;
		},false);
		window.addEventListener('touchend',function(e){//初始位置
			if(self.startHandle==true){
				self.isloading();
				return
			}
			body.style.overflow='visible';
			self.leave = true;
			self.down=-60;
			self.rotate=-180;
			self.opacity=0.3;
			self.startHandle=false;
			self.reBack==true;
		},false);

	},
	methods:{
		isloading:function(){//这个负责调用函数
			this.$emit(this.fn);
			
		},
		infinite:function(){//这个负责旋转
			var self=this;
			if(self.loading==false){
				return
			}
			setTimeout(function(){
				self.rotate =(self.rotate+20)%360;
				console.log(self.rotate);
				self.infinite();
			},15)
		},
		drawBackground:function(){
			var ctx = this.pen;
			ctx.save();
			ctx.translate(this.r,this.r);
			ctx.strokeStyle ='#ff4e4e';
			ctx.lineWidth='4';
			ctx.lineCap = 'round';
			ctx.arc(0,0,14,-0.5*Math.PI,Math.PI*this.xuan);
			ctx.stroke();
		},
		drawHead:function(){
			var ctx = this.pen;
			ctx.rotate(Math.PI*(this.xuan-0.32));
			ctx.beginPath();
			ctx.lineWidth=8;
			ctx.fillStyle='#ff4e4e';
			ctx.moveTo(6,5);
			ctx.lineTo(8,18);
			ctx.lineTo(1,14);
			ctx.lineTo(5,5);
			ctx.fill();
		}
	},
	computed:{
		r:function(){
			return this.width/2;
		},
	},
	watch:{
		loading:function(newValue,oldValue){
			console.log('change',newValue,oldValue)

			if(newValue==true){
				this.rotate = this.rotate%360;
				this.infinite();
			}else{
				var self = this;
				this.leave=true;
				document.body.style.overflow='visible';
				self.leave = true;
				self.down=-60;
				self.rotate=-180;
				self.opacity=0.3;
				self.startHandle=false;
				self.reBack==true;
			}
		}
	}
}
</script>
<style lang='scss'>
.c_pull_reflesh{
	position: absolute;left: 50%;margin-left: -25px;transform:translate3d(0,0,0);-webkit-transform:translate3d(0,0,0);
	.canvas{
	border:1px solid #ccc;box-shadow: 0px 0px 3px 1px #ccc;
	border-radius: 50%;
	background-color: #fff;


	}
	.canvas.leave{
		transition: all 0.5s linear;
		-webkit-transition: all 0.5s linear;

	}
	.canvas.active{
		/*transition: all 0.1s linear;
		-webkit-transition: all 0.1s linear;*/
	}
}
.c_pull_reflesh.leave{
	transition: all 0.4s linear;
	-webkit-transition: all 0.4s linear;

}

</style>

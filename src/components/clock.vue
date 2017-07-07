<template>
	<canvas class="c_clock" :width='width' :height="height" ref='dom'>
		
	</canvas>
</template>
<script>
	export default{
		data:function(){
			return{
				width:'500',
				height:'500',
				dom:'',
				pen:'',
			}
		},
		
		methods:{
			drawsec:function(i){//画秒针
				
				var ctx = this.pen;
				ctx.beginPath();
				ctx.fillStyle = 'red';
				var rad = 2*Math.PI/60 *i;
				ctx.rotate(rad);
				ctx.moveTo(this.r/100,this.r/5);
				ctx.lineTo(-this.r/100,this.r/5);
				ctx.lineTo(0,-(this.r/2+this.r/4));
				ctx.lineTo(this.r/100,this.r/5);
				ctx.fill();
				ctx.rotate(-rad);
			},
			drawHour:function(i,min){//画时针

				var ctx = this.pen;
				ctx.beginPath();
				ctx.strokeStyle = '#000';
				var rad = 2*Math.PI/60 *(i%12 *5 +parseInt(min/12)%5);
				ctx.rotate(rad);
				ctx.moveTo(0,this.r/10);
				ctx.lineWidth = this.r/25;
				ctx.lineCap='round';
				ctx.lineTo(0,-this.r/2);
				ctx.stroke();
				ctx.rotate(-rad);
			},
			drawmin:function(i){//画分针
			
				var ctx = this.pen;
				ctx.beginPath();
				var rad = 2*Math.PI/60 *i;
				ctx.rotate(rad);
				ctx.moveTo(0,this.r/10);
				ctx.strokeStyle = '#000';
				ctx.lineCap='round';
				ctx.lineWidth = parseInt(this.r/33);
				ctx.lineTo(0,-this.r+this.r/4);
				ctx.stroke();
				ctx.rotate(-rad);
			},
			drawBackground:function(){//画背景
				this.pen.save();
				var ctx = this.pen;
				var PI = Math.PI;
				ctx.translate(this.r,this.r);
				ctx.beginPath();
				ctx.lineWidth=this.r/10;
				ctx.arc(0,0,(this.r-ctx.lineWidth/2),-0.5*PI,1.5*PI,false);
				ctx.stroke();
				this.drawNumber();
				this.drawDot();
				
			},
			drawCenterPoint:function(){
				var ctx = this.pen;
				ctx.beginPath();
				ctx.fillStyle='#fff';
				ctx.arc(0,0,parseInt(this.r/33),0,2*Math.PI);
				ctx.fill();
			},
			changeTime:function(){//动态改变
				var self = this;
				setTimeout(function(){
					self.pen.clearRect(0,0,self.width,self.width);
					var date = new Date();
					self.drawBackground();
					self.drawsec(date.getSeconds());
					self.drawmin(date.getMinutes());
					self.drawHour(date.getHours(),date.getMinutes());
					self.drawCenterPoint();
					self.changeTime();
					self.pen.restore();
				},1000)
			},
			drawNumber:function(){//画数字
				var self = this;
				var numberArr = [3,4,5,6,7,8,9,10,11,12,1,2];
				numberArr.forEach(function(number,index){
					self.pen.beginPath();

					var rad = 2*Math.PI / 12 *index;
					var x = Math.cos(rad) *(self.r-parseInt(self.r/3-3));//x坐标
					var y = Math.sin(rad)*(self.r-parseInt(self.r/3-3));//y坐标
					self.pen.font = parseInt(self.r/5-2)+'px Arial';
					self.pen.textAlign = 'center';
					self.pen.textBaseline = 'middle';
					self.pen.fillText(number,x,y);
				})
			},
			drawDot:function(){//画点
				var self = this;
				var ctx = this.pen;
				for(var i=0;i<60;i++){
					ctx.beginPath();
					var rad = 2*Math.PI / 60 *i;
					var x = Math.cos(rad) * (self.r-parseInt(self.r/6.25));
					var y = Math.sin(rad) * (self.r-parseInt(self.r/6.25));
					if(i%5===0){
						ctx.fillStyle = '#000';
					}else{
						ctx.fillStyle = '#ccc';
					}

					ctx.arc(x,y,this.r/50,0,Math.PI*2);
					ctx.fill();
				}
			}
		},
		mounted:function(){
			var self = this;
			setTimeout(function(){
				self.dom = self.$refs.dom;
				self.pen = self.dom.getContext('2d');
				
				self.changeTime();
			},0)
		},
		computed:{
			r:function(){
				return this.width / 2;
			},
		},
	}
</script>
<style lang='scss'>
.c_clock{
border: 1px solid #ccc;
}
</style>
<template>
  <div class="orderlist">
    <div class="timeCon">
        <span class="time">2016年12月30日</span>
    </div>
    <div class="all">
<!-- header -->
      <div class="header">
        <div class="logo">
          <img  width=29 height=27 src="../../icon/find_team@2x.png">
          <span class="name">中国旅社</span>
        </div> 
          <span class="more"> 查看 </span>
      </div>

<!-- con -->
      <div class="con">
          <p class="destination" v-html="data.orderGoods[0].goodsName"></p>
          <p class="setOutTime" v-text="tripDate"></p>
      </div>

<!-- footer -->
      <div class="footer">
          <div class="price">
              <p class="daopu">导补</p>
              <p class="priceDetail" v-text="data.totalSellPrice"></p>
          </div>
          <div class="rightIcon" :class="bgfn(data.orderStatus)" v-text="status" @click="detailTo()" >
            
          </div>  
      </div>
    </div>
    <detail ref="detail" :detailData="data" ></detail>
  </div>
</template>

<script>
import Zepto from '../../core/Zepto'
import {mapGetters, mapActions} from 'vuex'
import detail from './detail'
export default {
  name: 'orderlist',
  props: {
    data: {
        type: Object
      }
    },
  data () {
    return {
      status: ""
    }
  },
  created () {
      // alert(this.data.orderStatus);

  },
  computed: {
    tripDate: function() { 
      let year =  this.data.orderGoods[0].tripDate.substring(0,4);
      let mounth = this.data.orderGoods[0].tripDate.substring(4,6);
      let day = this.data.orderGoods[0].tripDate.substring(6,8);
      return "出团时间:"+year+"."+mounth+"."+day;
    }
  },
  methods: {
      bgfn: function(type) { 
      switch (type) { 
        case "C2" || "W":
        this.status = "待确认"
        return "daiqueren";
        case "S":
        this.status = "未出团"
        return "weichutuan";
        case "SF":
        this.status = "已出团"
        return "yichutuan";                        
      }
    },
    detailTo: function() {
          // this.$refs.detail.show();
          // 调用detail组件中的show方法
          this.$store.dispatch('detailTo')
          document.body.style.overflow='hidden';
           // 禁止滚动

    }
  },
  components: { 
    detail
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.orderlist { 
  padding: 0 0.6rem;
}

/*时间部分--------------------------------------*/
.orderlist .timeCon { 
  line-height: 2.75rem; 
  text-align: center;


}
.orderlist .timeCon .time { 
  font-size: 0.6rem;
  background: #d8d8d8;
  color: #ffffff;
  letter-spacing: 0;
  line-height: 0.65rem;
  text-align: right;
  border-radius: 0.15rem;
  width: 6.85rem;
  height: 1.0rem; 
  padding: 0 0.3rem;
  margin: auto;

}



/*介绍内容部分-------------------------------*/
.all { 
  background: #fff;
  height: 11.1rem;
}

/*内容头部*/
.orderlist .header { 
  height: 2.15rem;
  border-bottom:0.05rem dashed #c5c4c4;
  padding: 0 0.5rem;
}
.orderlist .header .logo { 
  float: left;
  line-height: 2.15rem;
  vertical-align: middle;
  display: table-cell;
  vertical-align:middle;
  text-align:center;
}

.orderlist .header .logo img { 
  vertical-align: middle;
}

.orderlist .header .name { 
  font-size: 0.75rem;
  color: #000000;
  letter-spacing: 0;
  text-align: left;
  vertical-align: middle;
  
}

.orderlist .header .more { 
  line-height: 2.15rem;
  float: right;
  background: url("../../icon/right_arrow@2x.png") right center no-repeat;
  background-size: 0.35rem 0.7rem;
  padding-right: 0.5rem;
  font-size: 0.75rem;
  color: #b2b2b2;
  letter-spacing: 0;
}

/*内容中部*/

.orderlist .con { 
  height: 5.5rem;
  box-sizing:border-box;
  padding-top: 1.5rem;
  border-bottom: 0.05rem dashed #c5c4c4; 
  text-align: center;
  position: relative;
}

/*伪元素做半圆环*/
.orderlist .con:before { 
  content:"";
  position: absolute;
  width: 1.0rem;
  height: 1.0rem;
  border-radius: 50%;
  background: #e9e9e9;
  bottom: 0;
  left: 0;
  margin-bottom: -0.5rem;
  margin-left: -0.5rem;
}

.orderlist .con:after { 
  content:"";
  position: absolute;
  width: 1.0rem;
  height: 1.0rem;
  border-radius: 50%;
  background: #e9e9e9;
  bottom: 0;
  right: 0;
  margin-bottom: -0.5rem;
  margin-right: -0.5rem;
}


.orderlist .con .destination { 

  font-size: 0.9rem;
  color: #4f4f4f;
  letter-spacing: 0;
  line-height: 1.2rem;
  text-align: center;
}

.orderlist .con .setOutTime { 
  font-size: 0.7rem;
  color: #4f4f4f;
  letter-spacing: 0;
  line-height: 1.2rem;
  text-align: center;
}


/*内容底部*/
.footer { 
  box-sizing:border-box;
  padding: 1.0rem 0px 1.0rem 0.5rem;
}
.footer .price { 
  float: left;
}
.footer .daopu { 
  font-size: 0.75rem;
  color: #9c9da0;
  letter-spacing: 0;
  line-height: 1.0rem;
  text-align:left;
  margin-bottom: 0.4rem;
}
.footer .priceDetail { 
  font-size: 0.9rem;
  color:#fc4c23;
  letter-spacing:0;
  line-height: 0.65rem;
  text-align: left;

}

.footer .rightIcon { 
  line-height: 1.8rem;
  text-align: center;
  float: right;
  width: 5.0rem;
  height: 1.8rem;
  color: #fff;
  font-size: 0.8rem;
  color: #ffffff;
  letter-spacing: 0;
  text-align:right;
  padding-right: 0.7rem;
  box-sizing: border-box;
}

.footer .yichutuan { 
   background: url("../../icon/yichutuan@2x.png") 0 0 no-repeat;
   background-size:5.0rem 1.8rem;
 }
.footer .weichutuan { 
  background: url("../../icon/weichutuan@2x.png") 0 0 no-repeat;
  background-size:5.0rem 1.8rem;
 }
 .footer .daiqueren { 
  background: url("../../icon/daiqueren@2x.png") 0 0 no-repeat;
  background-size:5.0rem 1.8rem;
 }


</style>

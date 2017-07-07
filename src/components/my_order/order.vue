<template>
  <div class="order">
    <div class="nav">
      <div class="header">
          <div class="back" @click="back">返回</div>
          <h1 class="headerCon" v-text="headerCon"></h1>
      </div>
      <div class="tab">
        <span class="select" :class="{'active':defaultSelect===0}" @click="selectFn(0)">全部</span>
        <span class="select" :class="{'active':defaultSelect===1}" @click="selectFn(1)">待确认</span>
        <span class="select" :class="{'active':defaultSelect===2}" @click="selectFn(2)">未出团</span>
        <span class="select" :class="{'active':defaultSelect===3}" @click="selectFn(3)">已出团</span>
        <span class="select" :class="{'active':defaultSelect===4}" @click="selectFn(4)">不合适</span>
      </div> 
      <ul class="box">
        <li v-for="item in selectShow(userData,defaultSelect)">
          <orderlist :data="item"></orderlist>
        </li>
      </ul> 
    </div>
  </div>
</template>

<script>

import orderlist from './orderlist'
import base64encode from  '../../widget/base64.js'
import md5 from  '../../widget/md5.js'
// import trade from './trade.php'
let timer = null; 
export default {
  name: 'order',
  data () {
    return {
      userData: [],
      // 通过改变defaultSelect数值实现tab栏效果
      defaultSelect: 0,
      // detail: false,
      select: 0,
      pageNum: 1,
      $url: 'http://weixin.mlxing.com/trades/orderList',
      pageCount: 0
    }
  },
  created() { 
  var self = this;
  /**
  *簽名
  */
  function _sign($data) {
    var $_mKey = 'HsB1ZqZUr6UDG553e37e8S06JN3vj1ng';
    //生成sign
    var $str = '';
    for(var $vv in $data) {
      $str += $data[$vv];
      console.log($vv);
    }
    $str += $_mKey;
    var $sign = md5($str);
    $sign = base64encode($sign);
    return $sign;
  }
  // var $data = {"userId": 1,"methodType": "orderList","page": 1,"pageSize": 10};
  //pageNo ==>page
  var $url = 'http://weixin.mlxing.com/trades/orderList';
  // http://weixin.mlxing.com/trades/orderList
  // 'http://order.mlxing.com/order/order/list' 

  // $data['sign'] = _sign($data);
   $.ajax({
      url: $url,
      type: "GET",
      data: {page: self.pageNum},
      dataType: 'jsonp',
      success: function(data){
        // if (data.code!='0000') { 
        //   // alert('数据获取失败');
        // } else { 
          self.userData = data.result; 
          self.pageCount = data.pageCount;

        // }
      }
  });
  },
  computed: {
    
    headerCon: function() { 
      if(!this.$store.state.detailShow) { 
        return "我的订单";
      } else { 
        return "订单详情";
      }
    }
  },
  methods: {
    // 实现过滤效果
    selectShow:function(userData,defaultSelect) {
      switch(defaultSelect) { 
        case 0:
        return userData;
        case 1:
          return this.userData.filter((data) => {
          return data.orderStatus === "C2" || data.orderStatus === "W";
        });
        case 2:
          return this.userData.filter((data) => {
          return data.orderStatus === "S"
        });
      case 3:        
        return this.userData.filter((data) => {
          return data.orderStatus === "SF"
        });
      }
    },
    // tab栏选择效果
    selectFn: function(index) { 
      this.defaultSelect = index;


    },
    // 实现返回两种效果
    back: function() { 
        if(this.$store.state.detailShow == true) {
            document.body.style.overflow='visible'; 
            this.$store.dispatch('detailTo');
        }
    },
    ajax: function() { 
        var self = this;
        this.pageNum = this.pageNum+1;
        console.log(this.pageCount);
        if(this.pageNum > this.pageCount) { 
            alert("亲,资源加载完毕了");
        }
           $.ajax({
              url: 'http://weixin.mlxing.com/trades/orderList',
              type: "GET",
              data: {page: this.pageNum},
              dataType: 'jsonp',
              success: function(data){
                  self.userData = self.userData.concat(data.result); 
                  // console.log(self.userData.length);
            }
        });
    }
  },
  mounted() { 
      var self = this;
      window.onscroll = function() { 
       timer = setTimeout(function(){ 
            var H = document.body.scrollTop + document.body.offsetHeight;
            var allHeight = document.body.scrollHeight;
            if(H == allHeight) {
             self.ajax();
            }
        },300);

      }
  },
  components: {
    orderlist
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.order { 
  width: 100%;
  height: 100%;
  background: #e9e9e9;
 }

.nav { 
  width: 100%;
  color:#fff;

}
.nav .header { 
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  height: 3.2rem;
  font-size: 0.9rem;
  color: #fff;
  background: #636363;
  padding-top: 1.5rem;
  box-sizing: border-box;
  text-align: center;
  letter-spacing: 0;
  text-align: center;
  z-index: 5;
  // position: relative;
}

.nav .header .back { 
  color: #fff;
  position: absolute;
  left: 0.7rem;
  top:50%;
  height: 0.85rem;
  line-height: 0.85rem;
  padding-left: 0.8rem;
  font-size: 0.8rem;
  background: url("../../icon/left_arrow@2x.png") left center no-repeat;
  background-size: 0.5rem 0.8rem;
 }

 .nav .header .headerCon { 
    color: #fff;
    font-size: 0.9rem;
    text-align: center;

 }

.nav .tab {
  position: fixed;
  top: 3.2rem;
  left: 0;
  width: 100%;
  z-index: 5;
  display: flex;
  background: #fff;
}
.nav .select {
  text-align: center; 
  height: 1.9rem;
  flex: 1;
  color: #fff;
  line-height: 1.95rem;
  font-size: 0.75rem;
  color:#000000;
  margin: 0 1%;

}

.nav .active { 
  background: url("../../icon/bottom_line@2x.png") bottom center no-repeat;
 }

.order .box { 
  margin-top: 5.1rem;
  background: #e9e9e9;
  padding-bottom: 0.5rem;
  
}

</style>

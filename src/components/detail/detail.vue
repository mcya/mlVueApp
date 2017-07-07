<template>
  <div class="detail">
    <div class="nav">
      <div class="header">
          <div class="back" @click='back()'>返回</div>
          <h1 class="headerCon">订单详情</h1>
      </div>
    </div>

    <div class="source">
      <p class="sourceDate">旅行社来源：<span class="dataDetail">中国国旅</span></p>
      <p class="sourceDate">订单编号：<span class="dataDetail">12345678</span></p>
      <p class="sourceDate">官方电话：<span class="dataDetail">012345678910</span></p>
    </div>
    <div class="progress">
      <h1 class="header">
        订单进度
      </h1>
      <div class="progressCon">
        <div class="progressList">
            <span class="leftCon">提交成功</span>
            <span class="rightCon time">11:18</span>
            <span class="rightCon day">星期三</span> 
            <span class="rightCon date">2016-01-13</span>          
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'detail',
  data () {
    return {
      // 假数据
      data: [],
    }
  },
  created() { 


    
  },
  mounted() { 
   
  },
  computed: {

  },
  methods: {
    back: function() { 
      this.$router.go(-1);
      // 相当于location.hash="#/dingdan";
    }
  },
  components: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" >
 // 使用rem适配  即64px = 64/20(html fontsize) = 3.2rem
.nav { 
  width: 100%;
  color:#fff;
   .header {
      height: 3.2rem;
      font-size: 0.9rem;
      color: #fff;
      background: #636363;
      padding-top: 1.5rem;
      box-sizing: border-box;
      text-align: center;
      letter-spacing: 0;
      text-align: center;
      position: relative;
      .headerCon { 
          color: #fff;
          font-size: 0.9rem;
          text-align: center;
       }
      .back { 
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
    }
}

.source {
  width: 17.55rem;
  margin: 0.6rem auto;
  box-sizing: border-box;
  background: #e3e3e3;
  border-radius: 0.2rem;
  height: 4.6rem;
  padding-left: 1.15rem;
  padding-top: 0.55rem;
  .sourceDate { 
    font-size:0.75rem;
    color:#000000;
    letter-spacing:0;
    line-height: 1.2rem;
    text-align:left;
      .dataDetail { 
        color: #B8B8B8;
        font-size: 0.75rem;
      }
  }    
}
.progress {
  width: 17.55rem; 
  background: #f5f5f5;
  border-radius: 0.2rem;
  height: 29.6rem;
  margin: auto;
  box-sizing: border-box;
  padding: 0 1.15rem;
  .header { 
    font-size: 0.75rem;
    color:#000000;
    letter-spacing:-0.00475rem;
    text-align: left;
    line-height: 1.9rem;
    border-bottom: 0.05rem solid #e4e4e4;
  }
  .progressCon{
    padding: 0 0.3rem;
    line-height: 0.9rem;   
  }
}
.progressList { 
  line-height: 0.9rem;
  padding-top: 0.25rem;
  height: 0.9rem;
  font-size: 0;
  .leftCon { 
    background: url("../../icon/grey_icon@2x.png") left center no-repeat;
    background-size: 0.9rem 0.9rem;
    text-align: left;
    color: #ff5b14;
    font-size: 0.75rem;
    padding-left: 1.25rem;
  }
  .rightCon { 
    float: right;
    font-size: 0.6rem;
    color: #b8b8b8;
    margin-left: 0.5rem;
  }
}

</style>

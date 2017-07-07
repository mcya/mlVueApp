<template>
  <div v-show="isShow" class="alert_p">
    <div class="body-alert">
      <div class="alert-content">
        <p class="title">{{ title }}</p>
        <p v-show="!!tips" class="tips">{{ tips }}</p>
      </div>
      <div class="alert-btns">
        <!--<a :href="primaryUrl" class="btn btn-primary">确 定</a>-->
        <!--<a @click="cancelClick" class="btn btn-cancel">取 消</a>-->
        <a @click="cancelClick(eventName)" class="btn btn-primary">确 定</a>
        <!--这里先注释掉，将来拓展动态设置按钮的功能-->
        <!--<a v-for="item in this.btns" @click="{cancelClick:item.isCanCel}" :class="['btn',{'btn-primary':item.isRed,btn-cancel:!item.isRed}]">-->
          <!--{{item.name}}-->
        <!--</a>-->
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    data:function(){
      return{
//        btns:[
//          {
//            name:"确定",
//            isRed:true,
//            isCanCel:false,
//            href:""
//          },
//          {
//            name:"取消",
//            isRed:false,
//            isCanCel:true,
//            href:"http://static.mlxing.com/zhaotuan/index.html#/guider_me"
//          }
//        ]
      }
    },
    props:{
      isShow:{  //控制弹窗显示
        type:Boolean,
        default:false,
        required:true
      },
      title:{   //标题
        type:String,
        default:"",
        required:true
      },
      tips:{  //提示
        type:String,
        default:""
      },
      primaryUrl:{  //点击后跳转的地址
        type:String,
        defalut:"http://static.mlxing.com/index.html#/players_list"
      },
      eventName:{   //点击后触发的取消事件的事件名
        type:String,
      }
    },
    methods:{
      //点击取消时，触发自定义事件
      cancelClick: function (eventName) {
        this.$emit(eventName);
      }
    }
  }
</script>
<style lang='scss'>
  .alert_p{
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.4);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
    .body-alert{
      width: 13.0rem;
      height: 5.7rem;
      position: absolute;
      top: 10.6rem;
      left: 3.05rem;
      border-radius: 0.6rem;
      overflow: hidden;
      background-color: #ececec;
      .alert-content{
        width: 100%;
        height: 3.5rem;
        line-height: 4.0rem;
        text-align: center;
        font-size: 1.0rem;
        .title{
          width: 100%;
          height: 3.0rem;
          line-height: 3.3rem;
          font-size: 1.3rem;
          color: #1d1d1d;
        }
        .tips{
          width: 100%;
          height: 1.5rem;
          line-height: 0.2rem;
          font-size: 0.6rem;
        }
      }
      .alert-btns{
        width: 100%;
        height: 2.3rem;
        line-height: 2.0rem;
        text-align: center;
          .btn{
            display: inline-block;
            width: 3.5rem;
            height: 1.7rem;
            margin: 0 0.6rem;
            border-radius: 0.4rem;
            background-color: #919191;
            color: #ffffff;
            line-height: 1.7rem;
            text-align: center;
            font-size: 0.7rem;
          }
          .btn-primary{
            background-color: #e4393c;
          }
          .btn-cancel{

          }
      }

    }

  }
</style>

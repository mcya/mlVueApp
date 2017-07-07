<template>
  <div class="hotCity">
    <div class="localCity">
      <p>{{title1}}</p>
      <div class="cityBox">
        <div class="nameBox"  @click="clickItem(title1Box,eventName,provinceName)">{{title1Box}}</div>
      </div>
    </div>
    <div class="hotCityItems">
      <p>{{title2}}</p>
      <div class="cityBox">
        <div class="nameBox" v-for="item in hotCityItems" @click="clickItem(item.name,eventName)">{{item.name}}</div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data: function () {
      return {

      }
    },
    props:{
      title1:{  //第一行标题
        type:String,
        default:""
      },
      title1Box:{ //第一行盒子的内容
        type:String,
        default:""
      },
      title2:{  //第二行标题
        type:String,
        default:""
      },
      hotCityItems:{  //第二行盒子内容的列表
        type:Array,
        default:[]
      },
      isOnBlur:{  //父组件的输入框是否获取焦点
        type:Boolean
      },
      eventName:{   //点击后触发的取消事件的事件名
        type:String,
      },
      provinceName:{  //省名
        type:String,
        default:""
      }
    },
    methods:{
      clickItem: function (name,eventName,provinceName) {
        //防止点击取消搜索框焦点时，误点击其他按钮时，页面跳转
        if(this.isOnBlur==false){
          this.$emit(eventName);
          return;
        };
        if(!!provinceName)return; //第一行内容为省名时，不跳转
        //得到的地址保存在store中
        this.$store.commit("saveLocCity",name);

        //这里做跳转↓
         location.hash="guider_me";

      }
    },
    mounted: function () {


    }
  }
</script>
<style lang="scss">
  .hotCity{
    width: 18.05rem;
    min-height: 17.2rem;
    margin-left: 0.7rem;
    padding-top: 0.35rem;
    .nameBox{
      display: inline-block;
      min-width: 4.2rem;
      height: 1.75rem;
      line-height: 1.75rem;
      text-align: center;
      font-size: 0.7rem;
      color: #707070;
      background-color: #ffffff;
      border: 0.05rem solid #e7e7e7;
      border-radius: 0.2rem;
      margin: 0 0.8rem 0.55rem 0;
      padding: 0 0.4rem 0 0.4rem;
    }
    p{
      height: 1.4rem;
      font-size: 0.65rem;
      color: #808080;
    }
  }
</style>

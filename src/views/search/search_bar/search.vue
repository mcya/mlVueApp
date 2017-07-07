<template>
  <div class="vux-search-box" :class="{'vux-search-fixed':isFixed}" :style="{top: isFixed ? top : ''}">
    <div class="weui_search_bar" id="search_bar" :class="{weui_search_focusing: !isCancel}">
      <form class="weui_search_outer" @submit.prevent="$emit('on-submit', value)">
        <div class="vux-search-mask" @click="touch" v-show="!isFixed && autoFixed"></div>
        <div class="weui_search_inner">
          <i class="weui_icon_search"></i>
          <input type="search" class="weui_search_input" id="search_input" :placeholder="placeholder" autocomplete="off" :required="required" v-model="currentValue" ref="input"
          @focus="isFocus = true"
          @blur="isFocus = false"/>
          <a href="javascript:" class="weui_icon_clear" id="search_clear" @click="clear"></a>
        </div>
        <label for="search_input" class="weui_search_text" id="search_text" v-show="!isFocus && !value">
          <i class="weui_icon_search"></i>
          <span>{{placeholder || $t('placeholder')}}</span>
        </label>
      </form>
      <a href="javascript:" class="weui_search_cancel" id="search_cancel" @click="cancel">{{cancelText || $t('cancel_text')}}</a>
    </div>
    <div class="weui_cells weui_cells_access vux-search_show" id="search_show" v-show="isFixed">
      <slot></slot>
      <div class="weui_cell" v-for="item in results" @click="handleResultClick(item)" v-on:touchmove.prevent>
        <div class="weui_cell_bd weui_cell_primary">
          <p>{{item.title}}</p>
        </div>
      </div>
    </div>
  </div>
  <!--name	      type	  default	      description-->
  <!--placeholder	String	搜索(search)	  提示文字-->
  <!--cancelText	String	取消(cancel)	  取消文字-->
  <!--value	      String	表单值，       v-model绑定-->
  <!--results	    Array		              指定搜索结果-->
  <!--autoFixed	  Boolean	true	        是否自动固定在顶端-->
  <!--top	        String	0px	          自动固定时距离顶部的距离-->
  <!--position	  String	fixed	        自动固定时的定位，一些布局下可能需要使用其他定位，比如absolute-->
  <!--auto-scroll-to-top	-->
              <!--Boolean	false	        Safari下弹出键盘时可能会出现看不到input，需要手动滚动，启用该属性会在fix时滚动到顶端-->
</template>

<i18n>
cancel_text:
  en: cancel
  zh-CN: 取消
placeholder:
  en: Search
  zh-CN: 搜索
</i18n>

<script>
export default {
  props: {
    required: {
      type: Boolean,
      default: false
    },
    placeholder: String,
    cancelText: String,
    value: {
      type: String,
      default: ''
    },
    results: {
      type: Array,
      default () {
        return []
      }
    },
    autoFixed: {
      type: Boolean,
      default: true
    },
    top: {
      type: String,
      default: '0px'
    }
  },
  created () {
    if (this.value) {
      this.currentValue = this.value
    }
  },
  methods: {
    clear () {
      this.currentValue = ''
      this.isFocus = true
      this.setFocus()
    },
    cancel () {
      this.currentValue = ''
      this.isCancel = true
      this.isFixed = false
      this.$emit('on-cancel')
    },
    handleResultClick (item) {
      this.$emit('result-click', item)
      this.isCancel = true
      this.isFixed = false
    },
    touch () {
      this.isCancel = false
      if (this.autoFixed) {
        this.isFixed = true
      }
      this.$emit('on-touch')
    },
    setFocus () {
      this.$refs.input.focus()
    }
  },
  data () {
    return {
      currentValue: '',
      isCancel: true,
      isFocus: false,
      isFixed: false
    }
  },
  watch: {
    isFixed (val) {
      if (val === true) {
        this.setFocus()
        this.isFocus = true
      } else {
      }
    },
    value (val) {
      this.currentValue = val
    },
    currentValue (val) {
      this.$emit('on-change', val)
      this.$emit('input', val)
    },
    isFocus(val){
      this.$emit('is-focus-change',val)
    }
  }
}
</script>

<style lang="less">
  /*@import '../../styles/weui/icon/weui_icon_font';*/
  /*@import '../../styles/weui/widget/weui_searchbar/weui_searchbar';*/

.weui_search_bar {
  position: relative;
  padding: 8px 10px;
  display: flex;
  box-sizing: border-box;
  background-color: #EFEFF4;
  &.weui_search_focusing{
    .weui_search_cancel{
      display: block;
    }
    .weui_search_text{
      display: none;
    }
  }
}
.weui_search_outer {
  position: relative;
  flex: auto;
  background-color: #EFEFF4;
  &:after{
     content: '';
     position: absolute;
     left: 0;
     top:0;
     width: 200%;
     height: 200%;
     transform: scale(.5);
     transform-origin: 0 0;
     border-radius: 10px;
     border: 1px solid #E6E6EA;
     box-sizing: border-box;
     background: #FFFFFF;
   }
}
.weui_search_inner {
  position: relative;
  padding-left: 30px;
  padding-right: 30px;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  z-index: 1;
  .weui_search_input {
    padding: 4px 0;
    width: 100%;
    height: 20/14em;
    border: 0;
    font-size: 14px;
    line-height: 20/14em;
    box-sizing: content-box;
    background: transparent;
    &:focus {
       outline: none;
     }
  }
  .weui_icon_search {
    position: absolute;
    left: 10px;
    top: -2px;
    line-height: 28px;
  }
  .weui_icon_clear {
    position: absolute;
    top: -2px;
    right: 0;
    padding: 0 10px;
    line-height: 28px;
  }
}
.weui_search_text {
  position: absolute;
  top: 1px;
  right: 1px;
  bottom: 1px;
  left: 1px;
  z-index: 2;
  border-radius: 3px;
  text-align: center;
  color: #9B9B9B;
  background: #FFFFFF;
  span {
    display: inline-block;
    font-size: 14px;
    vertical-align: middle;
  }
  .weui_icon_search {
    margin-right: 5px;
  }
}
.weui_search_cancel {
  display: none;
  margin-left: 10px;
  line-height: 28px;
  white-space: nowrap;
  color: #09BB07;
}
.weui_search_input:not(:valid) ~ .weui_icon_clear {
  display: none;
}

/*干掉input[search]默认的clear button*/
  input[type="search"]::-webkit-search-decoration,
  input[type="search"]::-webkit-search-cancel-button,
  input[type="search"]::-webkit-search-results-button,
  input[type="search"]::-webkit-search-results-decoration {
    display: none;
  }

.vux-search-fixed {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 5;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(5px);
}
.vux-search-box {
  width: 100%;
}
.weui_cells.vux-search_show {
  margin-top: 0;
  overflow-y: auto;
}
.vux-search-mask {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
}
.vux-search-box .weui_cells:after {
  display: none;
}
</style>

<template>
  <div>
    <search @result-click="resultClick" @on-change="getResult" :results="results" v-model="value" position="absolute" auto-scroll-to-top top="46px"></search>
    <br>
    <group>
      <cell title="static position demo" is-link link="/component/search-static"></cell>
    </group>
  </div>
</template>

<script>
  import { Search, Group, Cell } from 'vux'

  export default {
    components: {
      Search,
      Group,
      Cell
    },
    methods: {
      resultClick (item) {
        window.alert('you click the result item: ' + JSON.stringify(item))
      },
      getResult (val) {
        console.log(val);
//        this.results = val ? getResult(this.value) : []
      }
    },
    data () {
      return {
        results: [],
        value: ''
      }
    }
  }

//  function getResult (val) {
//    let rs = []
//    console.log(val)
//    for (let i = 0; i < 8; i++) {
//      rs.push({
//        title: `${val} `,
//      other: i
//    })
//  }
//  return rs
//  }
</script>
<style>

</style>

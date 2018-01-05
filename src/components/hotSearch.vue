<template>
  <div class="hotSearch">
      <div class="hot-search-header">
          最近热门
      </div>
      <div class="hot-content">
        <ul>
            <li v-for="hot in hotName" v-on:click='search(hot.keyword)'>
                {{hot.keyword}}
            </li>
        </ul>
      </div>
  </div>
</template>

<script>
import middle from '../assets/middle'
export default {
    name: 'hotSearch',
    data() {
    return{
        hotName:''
        }
    },
    mounted(){
        this.$http.get('/hotlist?format=json&plat=0&count=30').then(({data})=>{
            this.hotName=data.data.info
        })
    },
    methods:{
        search(keyword){
            this.$http.get('/searchSong?format=json&keyword='+keyword+'&page=1&pagesize=20&showtype=1').then(({data})=>{
                middle.$emit('searchResult',data)
            })
            this.$router.push({path:'/searchResult'});
            middle.$emit('keyword',keyword);
        }
    }
}
</script>


<style>
    .hot-search-header{
        height: 5rem;
        line-height: 5rem;
        padding-left: 1.5rem;
        font-size: 1.4rem;
        border-bottom: 1px solid #ccc;
        color: #2ca3f5;
        text-align: left;
    }
    .hot-content{
        margin-left: 1.5rem;
    }
    .hot-content ul{
        list-style-type: none;
    }
    .hot-content ul li{
        height: 6.5rem;
        line-height: 6.5rem;
        display: block;
        border-bottom: 1px solid #e5e5e5;
        color: #333;
        font-size: 2rem;
        text-indent: 0.3rem;
        text-decoration: none;
    }
</style>

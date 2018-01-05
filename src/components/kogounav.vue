<template>
  <div class="kogounav">
      <ul>
          <li class="nav-li"  :class="{select:type=='/'}" @click="navChange('/')"><router-link to='/'>新歌</router-link></li>
          <li class="nav-li" :class="{select:type=='/rank'}" @click="navChange('/rank')"><router-link to='/rank' >排行</router-link></li>
          <li class="nav-li" :class="{select:type=='/songSheet'}" @click="navChange('/songSheet')"><router-link to='/songSheet'>歌单</router-link></li>
          <li class="nav-li" :class="{select:type=='/singer'}" @click="navChange('/singer')"><router-link to='/singer'>歌手</router-link></li>
      </ul>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
    name: 'kogounav',
    data(){
        return{
            type:this.$route.path || '/',
        }
    },
    methods:{
        navChange:function($type){
        this.type=$type;
        }
    },
}
</script>

<style scoped>
    .kogounav ul{
        width: 100%;
        list-style: none;
        position: fixed;
        top: 5.4rem;
        box-shadow: 0px 0.1rem 1rem #ccc;
        box-sizing: border-box;
        background: white;
        display: flex;
        justify-content: space-around;
        z-index: 3;
    }
    .kogounav li{
        font-size: 1.7rem;
        line-height:  5.3rem;
    }
    .kogounav li a{
        color: black;
        text-decoration: none;
    }
    .select{
        border-bottom: 0.4rem solid #33a3f5;
    }
</style>

<template>
  <div class="kugou-header">
    <!-- <a href="/" class="home"> -->
    <router-link to='/' class="home">
      <img src="../assets/images/kugou-logo.png" alt="logo">
    </router-link>
    <!-- </a> -->
    <!-- <div class="search">
      <img src="../assets/images/search.png" alt="seacrh">
    </div> -->
    <router-link to='search' class="searchimg">
      <img src="../assets/images/search.png" alt="seacrh">
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'kugou-header',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .kugou-header{
    width: 100%;
    height: 5.4rem;
    background: #2ca2f9;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    top: 0;
    z-index: 3;
  }
  
  .home img{
    width: 12rem;
    /* margin-top: 1.4rem; */
    margin-left: 1.4rem;
    display: inline-block;
  }
  .searchimg img{
    width: 2.2rem;
    height: 2.2rem;
    margin-right: 1.4rem;
  }
</style>

<template>
    <div class="index">
        <kugouHeader></kugouHeader>
        <router-view></router-view>
        <audioBar></audioBar>
    </div>
</template>

<script>
import kugouHeader from './header'
import audioBar from './audioBar'
export default {
  name:'index',
  components:{
      kugouHeader,
      audioBar
  }
}
</script>


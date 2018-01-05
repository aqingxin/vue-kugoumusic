<template>
    <div class="singer">
        <div class="singer-content">
            <ul>
                <li>
                    <router-link to='/singerClass/88'>
                        热门歌手
                        <i></i>
                    </router-link>
                </li>
            </ul>
            <ul>
                <li v-for="chinaList in china">
                    <router-link :to="'/singerClass/'+chinaList.path">
                        {{chinaList.name}}
                        <i></i>
                    </router-link>
                </li>
            </ul>
            <ul>
                <li v-for="eastAsiaList in eastAsia">
                    <router-link :to="'/singerClass/'+eastAsiaList.path">
                        {{eastAsiaList.name}}
                        <i></i>
                    </router-link>
                </li>
            </ul>
            <ul>
                <li v-for="occidentList in occident">
                    <router-link :to="'/singerClass/'+occidentList.path">
                        {{occidentList.name}}
                        <i></i>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>


<script>
export default {
  name:'singer',
  data(){
      return{
          china:[
              {name:'华语男歌手',path:'1'},
              {name:'华语女歌手',path:'2'},
              {name:'华语组合',path:'3'},
          ],
          eastAsia:[
              {name:'日韩男歌手',path:'4'},
              {name:'日韩女歌手',path:'5'},
              {name:'华语组合',path:'6'},
          ],
          occident:[
              {name:'欧美男歌手',path:'7'},
              {name:'欧美女歌手',path:'8'},
              {name:'欧美组合',path:'9'},
          ]
      }
  }
}
</script>


<style>
    .singer-content{
        margin-top: 11.8rem;
    }
    .singer-content ul{
        margin: 1.7rem 0.7rem 1.7rem;
        background: #fbfbfb;
        border: 1px solid #e4e4e4;
        border-radius: 5px;
    }
    .singer-content ul li a{
        padding: 1.4rem;
        display: block;
        font-size: 1.7rem;
        color: #333;
        text-decoration: none;
    }
    .singer-content ul li{
        border-bottom: 1px solid #e4e4e4;
    }
    .singer-content ul li:last-child{
         border-bottom: none;
    }
    .singer-content ul li a i{
        width: 1.3rem;
        height: 2.3rem;
        margin-top: .4rem;
        background: url(../assets/images/arrow_icon.png) no-repeat;
        float: right;
        display: block;
    }
</style>

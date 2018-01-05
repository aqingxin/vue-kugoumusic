<template>
    <div class="songSheet">
        <div class="sheet-content">
            <ul>
                <li v-for="list in sheetList" class="sheet-li">
                    <router-link :to="'/sheetdetail/'+list.specialid">
                        <div class="img-left">
                            <img v-bind:src="list.imgurl.replace(/{[^}]+}/g,'400')" alt="sheetimg">
                        </div>
                        <div class="img-content">
                            <p>{{list.specialname}}</p>
                            <p>
                                <i class="icon-music"></i>
                                {{list.playcount}}
                            </p>
                        </div>
                        <div class="img-right">
                            <i class="img-arrow"></i>
                        </div>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>


<script>
export default {
    name: 'songSheet',
    data(){
        return{
            sheetList:'',
        }
    },
    mounted(){
        this.$http.get('/songSheet&json=true').then(({data})=>{
            this.sheetList=data.plist.list.info
        })
    }
}
</script>


<style>
    .sheet-content{
        margin-top: 10.6rem;
    }
    .sheet-li a{
        display: block;
        position: relative;
        margin-left: 1rem;
        padding: 1rem 3.5rem 1rem 10rem;
        border-bottom: 1px solid #e5e5e5;
        text-decoration: none;
    }
    .img-left{
        position: absolute;
        top: 1rem;
        left: 0;
        width: 8.9rem;
        height: 8.9rem;
    }
    .img-left img{
        width: 100%;
    }
    .img-content{
        min-height: 8rem;
        display: block;
        color: #333;
        line-height: 1.5;
        font-size: 1.7rem;
    }
    .img-content p:first-child{
        padding-top: 2.4rem;
    }
    .img-content p:last-child{
        font-size: 1.4rem;
        color: #9b9b9b;
    }
    .icon-music{
        width: 1.2rem;
        height: 1.2rem;
        margin-top: 0.2rem;
        margin-right: 0.4rem;
        display: inline-block;
        background: url(../assets/images/icon_music.png) no-repeat;
        background-size: 100% 100%;
    }
    .img-right{
        position: absolute;
        top: 0;
        right: 0;
        width: 3rem;
        height: 100%;
        text-align: center;
        display: block;
    }
    .img-arrow{
        width: 1.5rem;
        height: 1.5rem;
        margin-top: -.5rem;
        position: absolute;
        top: 50%;
        right: 1rem;
        display: block;
        background: url(../assets/images/arrow_icon.png);
        background-size: 100% 100%;
    }
</style>

<template>
  <div class="home">
    <div class="home-left">
      <div class="home-body">
        <router-view></router-view>
      </div>
      <div class="home-alert">{{warnText}}</div>
    </div>
    <div  class="home-right"><SideView/></div>
  </div>
</template>

<script>
import {  mapState,mapMutations } from 'vuex';
import SideView from "../components/SideView";
export default {
  name: 'Home',
  mounted(){
  },
  computed:{
    ...mapState({
      warnText: state => state.common.warnText,
    }),
  },
  components: {
    SideView
  }
}
</script>

<style scoped lang="scss">
.home{
  height: 100%;
  display: flex;
  justify-content: space-between;
  .home-left{
    width: 676px;
    height: 100%;
    .home-body{
      height: 90%;
      border-radius: 2px;
      border-radius: 2px;
      position: relative;
      // p{
      //   width: 5.3rem;
      //   height: 2px;
      //   background: #13253C;
      //   border-radius: 2px;
      //   border-radius: 2px;
      //   position: relative;
      //   left: -.726rem;
      //   top: -.15rem;
      //   span{
      //     font-family: Helvetica;
      //     font-size: .32rem;
      //     width: .65rem;
      //     height: .47rem;
      //     color: #C5D1E1;
      //     position: absolute;
      //     left: 50%;
      //     top: 50%;
      //     transform: translate(-50%,-50%);
      //     background: #283B52;
      //     text-align: center;
      //   }
      // }
      // .v-btn.v-size--default{
      //   font-size: 20px;
      //   width: 100%;
      //   height: .85rem;
      // }
    }
    .home-alert{
      height: 8%;
      background: #283B52;
      margin-top: 10px;
      text-align: center;
      color: red;
      font-size: 30px;
      line-height: 50px;
    }
  }
  .home-right{
    width: 296px;;
  }
}
</style>

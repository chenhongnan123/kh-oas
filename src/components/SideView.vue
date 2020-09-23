<template>
  <div class="side-view">
    <p>生产计划</p>
    <div class="right-body">
    </div>
    <div class="right-footer">
      <!-- <ul>
        <li @click="$router.push('/home/paint-mixing'), active = 0, setTitle('调漆')">
          <v-icon large :color="active === 0 ? 'white' : 'blue'">mdi-home</v-icon>
          <p>调漆</p>
        </li>
        <li @click="$router.push('/home/paint-book-in'), active = 1, setTitle('入库')">
          <v-icon large :color="active === 1 ? 'white' : 'blue'">mdi-alert-circle-check-outline</v-icon>
          <p>入库</p>
        </li>
        <li @click="$router.push('/home/paint-book-out'), active = 2, setTitle('出库')">
          <v-icon large :color="active === 2 ? 'white' : 'blue'">mdi-database-export</v-icon>
          <p>出库</p>
        </li>
      </ul> -->
      <ul>
        <li @click="$router.push('/home/production'), active = 0, setTitle('生产')">
          <v-icon large color="white">mdi-home</v-icon>
          <p>生产</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
  name: 'SideView',
  data() {
    return {
      planList:[
      ],
      active:0,
    }
  },
  methods:{
    ...mapMutations({
      setTitle: 'common/SET_TITLE',
    }),
  }
}
</script>

<style scoped lang="scss">
 .side-view{
   height: 100%;
   >p{
      background: #038F33;
      border-radius: 2px;
      border-radius: 2px;
      height: 48px;
      line-height: 48px;
      font-family: HelveticaNeue;
      font-size: 24px;
      color: #FFFFFF;
      text-indent: 15px;
   }
   .right-body{
      height: 427px;
      background: #283B52;
      padding: 13px 16px;
      margin-top: 8px;
      overflow: scroll;
      border-radius: 2px;
      border-radius: 2px;
      .row{
        font-family: HelveticaNeue;
        font-size: 20px;
        // line-height: .44rem;
        color: #64FE00;
        .col:nth-child(3){
          color: #fff;
        }
      }
      .row:nth-child(1){
        .col{
          font-family: HelveticaNeue;
          font-size: 14px;
          color: #C5D1E1;
        }
      }
   }
   .right-footer{
      height: 99px;
      background: #283B52;
      padding: 10px 10px;
      margin-top: 20px;
      border-radius: 2px;
      border-radius: 2px;
      ul{
        display: flex;
        flex-wrap: wrap;
        padding: 0;
        li{
          text-align: center;
          width: 30%;
        }
      }
    }
 }
</style>

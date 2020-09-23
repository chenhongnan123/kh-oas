<template>
    <v-app>
      <Header/>
      <div class="view-body">
       <router-view></router-view>
      </div>
    </v-app>
</template>

<script>
import "../src/assets/css/common.css";
import Header from './components/Header'
export default {
  name: 'app',
  components:{
    Header,
  }
}
</script>

<style lang='scss'>

html,body{
  height: 100%;
}
.v-application{
  height: 695px;
  .v-application--wrap {
    font-family: Arial-BoldMT;
    height: 100%;
    box-sizing:border-box;
    background-color: #13253C;
    .view-body{
      padding:76px 16px 16px 16px;
      height: 695px;
    }
    p{
      margin: 0;
      padding: 0;
    }
  }
  .row{
    margin: 0;
  }
  .col{
    padding: 0;
  }
}


</style>

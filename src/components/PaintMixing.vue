<template>
  <div class="paint-mixing">
    <div class="bucket-barcode">
      <v-row>
        <v-col cols="6">
          <v-row>
            <v-col cols="6">
              <v-text-field
              v-model="bucketNumber"
              :disabled="isBucketWeightConfirm"
              label="桶条码"
              type="number"
              outlined
              height="64"
              >
              </v-text-field>
            </v-col>
            <!-- <v-col cols="3" class="mx-4">
              <p class="weight-sign">00.00</p>
            </v-col> -->
            <v-col cols="3">
              <v-text-field
              v-model="bucketWeight"
              :disabled="isBucketWeightConfirm"
              label="重量"
              type="number"
              outlined
              height="64"
              >
              </v-text-field>
            </v-col>
          </v-row>
        </v-col>
        <v-col class="d-flex flex-row-reverse">
          <v-btn color="info" :disabled="!bucketWeight && !bucketWeight" @click="handleBucketReset">重置</v-btn>
          <v-btn color="primary" class="mr-4" @click="handleBucket" :disabled="!bucketNumber || !bucketWeight">提交</v-btn>
          <v-btn color="primary" class="ml-5 mr-4" disabled>读取</v-btn>
        </v-col>
      </v-row>
    </div>
    <div class="slelect-recipe mt-3">
      <v-row>
        <v-col cols="8">  
          <v-row>
            <v-col cols="5">
              <v-text-field
              v-model="recipe"
              @change="handleChangeRecipe"
              :disabled="isRecipeConfirm"
              label="输入配方号"
              outlined
              height="64"
              >
              </v-text-field>
            </v-col>
            <v-col cols="3">
              <v-select
                v-model="version"
                :items="versionList"
                label="版本号"
                outlined
                height="64"
                :disabled="isRecipeConfirm"
              ></v-select>
            </v-col>
            <v-col cols="2">
              <v-text-field
              v-model="recipeWeight"
              :disabled="isRecipeConfirm"
              label="重量"
              type="number"
              outlined
              height="64"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="4"  class="d-flex flex-row-reverse">
          <v-btn color="info" :disabled="!version && !version && !recipeWeight" @click="handleRecipeReset">重置</v-btn>
          <v-btn color="primary"  :disabled="!recipe || !version || !recipeWeight" class="mr-4" @click="handleRecipe">提交</v-btn>
        </v-col>
      </v-row>
    </div>
    <p class="mt-5 mb-5"></p>
    <div class="table">
      <v-row class="title">
        <v-col>物料号</v-col>
        <v-col>配方比例</v-col>
        <v-col>需求重量(kg)</v-col>
        <v-col>实际比例</v-col>
        <v-col>实际重量(kg)</v-col>
      </v-row>
      <v-row
      class="body"
      v-for="(item, key) in materialNumberList"
      :key="key"
      @click="handleRow(item, key)"
      :style="{background: key === rowKey ? '#13253C' : 'unset'}"
      >
        <v-col>{{item.mtlpartnum}}</v-col>
        <v-col>{{item.recipeRate ? item.recipeRate*100+'%' : 0}}</v-col>
        <v-col>{{item.requireWeight}}</v-col>
        <v-col>{{item.acturalRate ? parseInt(item.acturalRate*100)+'%' : 0}}</v-col>
        <v-col>{{item.acturalWeight}}</v-col>
      </v-row>
    </div>
    <div class="material-barcode mt-3">
      <v-row>
        <v-col cols="6">
          <v-row>
            <v-col cols="6">
              <v-text-field
              label="批号"
              v-model="lotNumber"
              :disabled="typeof(rowKey) !== 'number' || islotWeightConfirm"
              @change="handleChangeLotNumber"
              type="number"
              outlined
              width="50"
              height="64"
              >
              </v-text-field>
            </v-col>
            <!-- <v-col cols="3" class="mx-4">
              <p class="weight-sign">00.00</p>
            </v-col> -->
            <v-col cols="3">
              <v-text-field
              v-model="lotWeight"
              :disabled="typeof(rowKey) !== 'number' || islotWeightConfirm"
              label="重量"
              type="number"
              outlined
              width="50"
              height="64"
              >
              </v-text-field>
            </v-col>
          </v-row>
        </v-col>
        <v-col class="d-flex flex-row-reverse">
          <v-btn color="info" :disabled="!lotWeight" @click="handleLotReset">重置</v-btn>
          <v-btn color="primary" class="mr-4" @click="handleLot" :disabled="!lotWeight">提交</v-btn>
          <v-btn color="primary" class="ml-5 mr-4" disabled>读取</v-btn>
        </v-col>
      </v-row>
      <div class="mt-3">
        <v-row>
          <v-col cols="8"></v-col>
          <v-col cols="4"  class="d-flex flex-row-reverse">
            <v-btn
            color="primary"
            class="ml-4"
            @click="completeDialog = true"
            :disabled="materialNumberList.length === 0 || !this.operateNumber">
            完成
            </v-btn>
            <v-text-field
            v-model="operateNumber"
            label="工号"
            type="number"
            outlined
            style="width:200px;"
            height="64"
            >
            </v-text-field>
          </v-col>
        </v-row>
      </div>
      <v-dialog
        v-model="materialDialog"
        max-width="290"
        persistent
        light
      >
        <v-card>
          <v-card-title class="headline">该物料不适用于当前配方。是否要继续使用？</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="green darken-1"
              text
              @click="handleSuitConfirm"
            >
              <v-btn color="primary">是</v-btn>
            </v-btn>
            <v-btn
              color="green darken-1"
              text
              @click="lotNumber = '', materialDialog = false"
            >
              <v-btn color="primary">否</v-btn>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog
        v-model="dateDialog"
        max-width="290"
        persistent
        light
      >
        <v-card>
          <v-card-title class="headline">该物料已过期。是否要继续使用</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="green darken-1"
              text
              @click="handleExpire"
            >
              <v-btn color="primary">是</v-btn>
            </v-btn>
            <v-btn
              color="green darken-1"
              text
              @click="lotNumber = '', dateDialog = false"
            >
              <v-btn color="primary">否</v-btn>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog
        v-model="completeDialog"
        max-width="290"
        persistent
        light
      >
        <v-card>
          <v-card-title class="headline">是否确认完工？</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="green darken-1"
              text
              @click="handleComplete"
            >
              <v-btn color="primary">是</v-btn>
            </v-btn>
            <v-btn
              color="green darken-1"
              text
              @click="completeDialog = false"
            >
              <v-btn color="primary">否</v-btn>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <auth-login :loginDialog="loginDialog" @handleDialog="loginDialog = false"></auth-login>
  </div>
</template>

<script>
import moment from "moment";
import {  mapState,mapMutations,mapActions } from 'vuex';
import reportService from '@/service/reportsService';
import AuthLogin from './AuthLogin'
export default {
  name: 'PaintMixing',
  components: {
    'auth-login': AuthLogin
  },
  data() {
    return {
      bucketNumber: null,
      bucketWeight: null,
      isBucketWeightConfirm: false,
      recipe: '',
      versionList:[],
      recipeWeight:'',
      version: '',
      isRecipeConfirm: false,
      materialNumberList: [],
      materialObj: {},
      qtytypetotal: 0,
      rowKey: null,
      lotNumber: '',
      lotWeight: '',
      operateNumber: '',
      islotWeightConfirm: false,
      materialDialog: false,
      dateDialog: false,
      completeDialog: false,
      loginDialog: false,
    }
  },
  computed:{
    ...mapState({
      warnText: state => state.common.warnText,
      loginStatus: state => state.common.loginStatus,
    }),
  },
  watch: {
    loginStatus(loginStatus) {
      if (loginStatus) {
        this.materialDialog = false;
        this.dateDialog = false;
      }
    }
  },
  mounted(){
    this.setWarntext('');
  },
  methods:{
    ...mapMutations({
      setWarntext: 'common/SET_WARN_TEXT',
      setLoginStatus: 'common/SET_LOGIN_STATUS'
    }),
    async handleBucket() {
      console.log(this.bucketWeight, 'bucketWeight');
      const bucketNumber = this.bucketNumber;
      this.setWarntext('');
      if (!bucketNumber) return;
      const { data } = await reportService.getElement(
        'bucketrecord',
        1,
        1,
        `&query=bucketnumber=="${this.bucketNumber}"`
      );
      const { results } = data;
      if (results && results.length > 0) {
        this.setWarntext('该桶号已存在');
        this.bucketNumber = null;
      } else {
         if (this.bucketWeight <= 0) {
          this.setWarntext('重量必须大于0');
          return;
        };
        this.setWarntext('');
        this.isBucketWeightConfirm = true;
      }
    },
    handleBucketReset() {
      this.bucketWeight = '';
      this.bucketNumber = '';
      this.setWarntext('');
      this.isBucketWeightConfirm = false;
    },
    async handleChangeRecipe(recipe) {
      const { data } = await reportService.getElement(
        'recipe',
        1,
        1,
        `&query=partnum=="${recipe}"`
      );
      const { results } = data;
      if (results && results.length > 0) {
        const revisionnumList = results.map(i => i.revisionnum);
        const versionList = [...new Set(revisionnumList)];
        console.log(versionList, 'versionList');
        this.versionList = versionList;
      }
    },
    async handleRecipe() {
      const { data } = await reportService.getElement(
        'recipe',
        1,
        1,
        `&query=partnum=="${this.recipe}"%26%26revisionnum=="${this.version}"`
      );
      const { results } = data;
      if (results && results.length > 0) {
        console.log(results, 'results');
        let materialNumberList = results.filter(i => parseInt(i.mtlpartnum) >= 51 && parseInt(i.mtlpartnum) <= 54);
        const qtytypetotal = materialNumberList.reduce((p, i) => i.qtyper + p, 0);
        materialNumberList = materialNumberList.map(i => {
          const recipeRate = (i.qtyper*1000000/(qtytypetotal*1000000)).toFixed(2);
          const { mtlpartnum } = i;
          const requireWeight = (this.recipeWeight*recipeRate).toFixed(2);
          return {...i, recipeRate, requireWeight, acturalRate: 0, acturalWeight: 0}
        });
        console.log(materialNumberList, 'materialNumberList');
        this.materialNumberList = materialNumberList;
        this.qtytypetotal = qtytypetotal*1000000;
        console.log(this.qtytypetotal, 'qtytypetotal');
        this.isRecipeConfirm = true;
      }
    },
    handleRecipeReset() {
      this.recipe = '';
      this.version = '';
      this.recipeWeight = '';
      this.isRecipeConfirm = false;
    },
    handleRow(item, key) {
      console.log(key);
      this.rowKey = key;
      this.materialObj = item;
      this.islotWeightConfirm = false;
      this.lotNumber = null;
      this.lotWeight = '';
    },
    async handleChangeLotNumber(lotNumber) {
      if (!lotNumber) return;
      const { data } = await reportService.getElement(
        'material',
        1,
        1,
        `&query=partnum=="${this.materialObj.mtlpartnum}"%26%26lotnum=="${lotNumber}"`
      );
      const { results } = data;
      if (results && results.length > 0) {
        console.log(results, 'results');
        if (results[0].expirationdate) {
          this.materialNumberList[this.rowKey].expirationdate = results[0].expirationdate;
          if (new Date(results[0].expirationdate).getTime() < new Date().getTime()) {
            this.dateDialog = true;
          }
        }
      } else {
        this.materialDialog = true;
      }
    },
    handleLot() {
      if (this.lotWeight <= 0) {
        this.setWarntext('重量必须大于0');
        return;
      };
      this.setWarntext('');
      this.materialNumberList[this.rowKey].acturalWeight = this.lotWeight;
      this.materialNumberList[this.rowKey].lotNumber = this.lotNumber;
      const weighttotal = this.materialNumberList.reduce((p, i) => Number(i.acturalWeight) + p, 0);
      this.materialNumberList.forEach(item => {
        console.log(item.acturalWeight, weighttotal, 'weighttotal');
        item.acturalRate = (item.acturalWeight/weighttotal).toFixed(2);
      });
      this.islotWeightConfirm = true;
    },
    handleLotReset() {
      this.lotNumber = '';
      this.lotWeight = '';
      this.setWarntext('');
      this.islotWeightConfirm = false;
    },
    handleSuitConfirm() {
      // if (this.loginStatus) {
      //   this.materialDialog = false;
      //   this.setLoginStatus(false);
      // } else {
        this.setLoginStatus(false);
        this.loginDialog = true;
      // }
    },
    handleExpire() {
      // if (this.loginStatus) {
      //   this.dateDialog = false;
      //   this.setLoginStatus(false);
      // } else {
        this.setLoginStatus(false);
        this.loginDialog = true;
      // }
    },
    async handleComplete() {
      const { 
        materialNumberList,
        bucketNumber, 
        bucketWeight, 
        recipe, 
        recipeWeight,
        version,
        lotNumber,
        lotWeight,
        operateNumber,
      } = this;
      const weighttotal = materialNumberList.reduce((p, i) => Number(i.acturalWeight) + p, 0);
      const payloadRecord = materialNumberList.map(item => {
        return {
          bucketnumber: bucketNumber,
          recipenumber: recipe, 
          bucketweight: bucketWeight, 
          totalpaintweight: weighttotal, 
          operator: operateNumber, 
          materialnumber: item.mtlpartnum, 
          materialname: '', 
          materialweight: item.acturalWeight, 
          materialpercentage: item.acturalRate, 
          lotnum: item.lotNumber, 
          expirationdate: item.expirationdate,
          siteName: 'kh'
        }
      });
      const payloadStock = {
        bucketnumber: bucketNumber,
        recipenumber: recipe,
        bucketweight: bucketWeight,
        totalpaintweight: weighttotal,
        status: '在库',
        bookindate: moment().format('YYYY-MM-DD HH:mm:ss'),
        bookoutdate: '',
        operator: operateNumber,
        siteName: 'kh'
      };
      const { data } = await reportService.postElementBulk(
        'bucketrecord',
        1,
        1,
        payloadRecord
      );
      const { results } = data;
      const bucketData = await reportService.postElement(
        'bucketstock',
        1,
        1,
        payloadStock
      );
      const bucketResults = data.results;
      if (results && bucketResults) {
        this.completeDialog = false;
        this.bucketNumber = null;
        this.bucketWeight = null;
        this.isBucketWeightConfirm = false;
        this.recipe = '';
        this.versionList = [];
        this.recipeWeight = [];
        this.version = [];
        this.isRecipeConfirm = false;
        this.materialNumberList = [];
        this.materialObj = {};
        this.qtytypetotal = 0;
        this.rowKey = null;
        this.lotNumber = '';
        this.lotWeight = '';
        this.operateNumber = '';
        this.islotWeightConfirm = false;
      } else {
        this.setWarntext('网络错误');
      }
    }
  }
}
</script>

<style  lang="scss">
.paint-mixing{
  >p{
    border: 1px solid #979797;
    height: 0;
  }
  .v-text-field__details{
    display: none;
  }
  .v-text-field__slot{
    input{
      padding: 0;
      font-size: 20px;
    }
  }
  .v-input .v-label {
    font-size: 20px;
    color: #C5D1E1;
    height: 30px;
    line-height: 30px;
  }
  .v-btn.v-size--default{
    height: 64px!important;
    font-size: 18px!important;
  }
  .v-select__selection{
    margin: 0;
    font-size: 18px;
    line-height: 64px;
  }
  .v-input__slot{
    margin: 0;
  }
  .weight-sign{
    height: 64px;
    color: #C5D1E1;
    background: #038F33;
    text-align: center;
    border-radius: 5px;
    border-radius: 5px;
    border:1px solid #fff;
    font-size: 28px;
    line-height: 64px;
  }
  .table{
    width: 100%;
    background: #5F6D7E;
    text-align: center;
    border-radius: 5px;
    padding: 10px 0;
    max-height: 204px;
    overflow: scroll;
    .body{
      font-size: 20px;
      line-height: 40px;
    }
  }
}
</style>

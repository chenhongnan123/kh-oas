<template>
  <div class="paint-book-in">
    <div class="bucket-barcode">
      <v-row>
        <v-col cols="4">
          <v-text-field
          v-model="bucketNumber"
          label="桶条码"
          type="number"
          :disabled="bucketNumberConfirm"
          outlined
          height="64"
          >
          </v-text-field>
        </v-col>
        <v-col class="d-flex flex-row-reverse">
          <v-btn color="info" :disabled="!bucketNumber" @click="bucketNumber = '',bucketNumberConfirm = false">重置</v-btn>
          <v-btn color="primary" class="mr-4" :disabled="!bucketNumber" @click="handleChangeBucketNumber">提交</v-btn>
        </v-col>
      </v-row>
    </div>
    <ul class="ul mt-3">
      <li>
        <h3>桶条码</h3>
        <p>{{bucketRecord.bucketnumber || ''}}</p>
      </li>
      <li>
        <h3>配方号</h3>
        <p>{{bucketRecord.recipenumber || ''}}</p>
      </li>
      <li class="mt-3">
        <h3>桶重量</h3>
        <p>{{bucketRecord.bucketweight}}</p>
      </li>
      <li class="mt-3">
        <h3>油漆重量</h3>
        <p>{{bucketRecord.materialweight}}</p>
      </li>
    </ul>
    <div class="material-barcode mt-3">
      <div class="mt-3">
        <v-row>
          <v-col cols="6">
            <v-row>
              <v-col cols="8">
                <v-text-field
                v-model="netWeight"
                :disabled="netWeightConfirm"
                label="总重量"
                type="number"
                outlined
                height="64"
                >
                </v-text-field>
              </v-col>
            </v-row>
          </v-col>
          <v-col class="d-flex flex-row-reverse">
            <v-btn color="info" :disabled="!netWeight" @click="handleBucketReset">重置</v-btn>
            <v-btn color="primary" class="mr-4" :disabled="!netWeight" @click="handleNetWeight">提交</v-btn>
            <v-btn color="primary" class="mr-4" disabled>读取</v-btn>
          </v-col>
        </v-row>
      </div>
      <div class="mt-3">
        <v-row>
          <v-col cols="8"></v-col>
          <v-col cols="4"  class="d-flex flex-row-reverse">
            <v-btn
            color="primary"
            class="ml-4"
            @click="completeDialog = true"
            :disabled="!bucketRecord.bucketnumber || !netWeight || !operateNumber"
            >
            入库
            </v-btn>
            <v-text-field
            v-model="operateNumber"
            label="工号"
            type="text"
            outlined
            style="width:200px;"
            height="64"
            >
            </v-text-field>
          </v-col>
        </v-row>
      </div>
      <v-dialog
        v-model="completeDialog"
        max-width="290"
        persistent
        light
      >
        <v-card>
          <v-card-title class="headline">是否确认入库？</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="green darken-1"
              text
              @click="handleSubmit"
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
  </div>
</template>

<script>
import moment from "moment";
import {  mapState,mapMutations } from 'vuex';
import reportService from '@/service/reportsService';
export default {
  name: 'PaintBookIn',
  data() {
    return {
      bucketNumber: null,
      bucketNumberConfirm: false,
      netWeight: null,
      netWeightConfirm: false,
      bucketRecord: {},
      operateNumber: '',
      completeDialog: false
    }
  },
  mounted(){
    this.setWarntext('');
  },
  methods: {
    ...mapMutations({
      setWarntext: 'common/SET_WARN_TEXT',
    }),
    async handleChangeBucketNumber() {
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
        const bucketstockData = await reportService.getElement(
          'bucketstock',
          1,
          1,
          `&query=bucketnumber=="${this.bucketNumber}"`
        );
        const bucketstockResults = bucketstockData.data.results;
        if (bucketstockResults && bucketstockResults.length > 0) {
          if (bucketstockResults.some(i => i.status === '在库')) {
            this.setWarntext('该桶已入库');
            this.bucketNumber = null;
            return;
          }
        }
        this.bucketRecord = results[0];
        this.bucketNumberConfirm = true;
      } else {
        this.setWarntext('该桶号不存在');
        this.bucketNumber = null;
      }
    },
    handleNetWeight() {
      if (this.netWeight <= 0) {
        this.setWarntext('重量必须大于0');
        return;
      };
      this.setWarntext('');
      this.netWeightConfirm = true;
    },
    handleBucketReset() {
      this.netWeight = '';
      this.setWarntext('');
      this.netWeightConfirm = false;
    },
    async handleSubmit() {
      const {
        bucketnumber, 
        recipenumber,
        bucketweight,
        totalpaintweight,
      } = this.bucketRecord;
      const payloadStock = {
        bucketnumber,
        recipenumber,
        bucketweight,
        totalpaintweight: this.netWeight - bucketweight,
        status: '在库',
        bookindate: moment().format('YYYY-MM-DD HH:mm:ss'),
        bookoutdate: '',
        operator: this.operateNumber,
        siteName: 'kh'
      };
      const { data } = await reportService.postElement(
        'bucketstock',
        1,
        1,
        payloadStock
      );
      console.log(data, 'results');
      const { id } = data;
      if (id) {
        this.completeDialog = false;
        this.bucketNumber = null;
        this.netWeight = null;
        this.bucketRecord = {};
        this.operateNumber = '';
      } else {
        this.setWarntext('网络错误');
      }
    }
  }
}
</script>

<style scope lang="scss">
.paint-book-in{
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
  .v-input__slot{
    margin: 0;
  }
  >ul{
    width: 450px;
    height: 150px;
    background: #283B52;
    border: 1px solid #FFFFFF;
    border-radius: 4px;
    border-radius: 4px;
    display: flex;
    flex-wrap: wrap;;
    padding: 6px 10px;
    li{
      width: 200px;
      h3{
        font-family: HelveticaNeue;
        font-size: 20px;
        line-height: 25px;
        color: #C5D1E1;
      }
      p{
        font-family: HelveticaNeue;
        font-size: 22px;
        line-height: 25px;
        color: #FFFFFF;
        margin-top: 5px!important;
      }
    }
  }
}
</style>

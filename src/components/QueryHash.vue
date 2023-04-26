<template>
  <div>
    <h3 class="topic">搜索交易</h3>
    <el-switch
      v-model="cache"
      size="small"
      active-text="使用缓存"
      inactive-text="不使用缓存"
    />
    <div id="search-bar">
      <el-input
        v-model="this.input"
        class="w-50 m-2"
        placeholder="Please Input a Transaction Hash"
        :suffix-icon="Search"
      />
      <el-button type="primary" @click="findTransaction">搜索</el-button>
    </div>
  </div>
  <div id="card">
    <el-card :body-style="{padding: '3%'}" shadow="always" v-show=true id="elcard"> 
        <span :title="this.transaction.hash" class="limited">hash:{{ this.transaction.hash}}</span><br/>
        <span class="limited">timestamp: {{ this.transaction.timestamp }}</span><br/>
        <span :title="this.transaction.signature" class="limited">signature: {{ this.transaction.signature }}</span>&emsp;&emsp;&emsp;&emsp;
    </el-card>
  </div>
</template>

<script>

import axios from "axios";
import { ElMessageBox } from "element-plus";
export default {
  name: "QueryHash",
  data() {
    return {
      cache: false,
      input: "",
      transaction: {
        data: "sender:xiaoming, reciever:xiyuan",
        timestamp: "83674892374",
        signature: "123234343545",
        hash: "f38ac18ddcecc804a401fdb7426b02d40e110bb27a56adda866ea1f95bdf38e6",
        // time:"3ms"
      },
      searched:false,
    };
  },
  methods: {
    findTransaction: function () {
      if (this.input == "") {
        ElMessageBox.alert("<strong>请输入交易的哈希值！</strong>", "提示", {
          dangerouslyUseHTMLString: true,
        });
      } else if(this.cache == false){
        axios.get("/findSlowly", {
                params: {
                    hash: this.input
                },
            }).then((res) => {
          if (res.status == 200 && res.data.data!=null) {
            console.log(res)
            this.transaction = res.data
            this.searched = true
            ElMessageBox.alert("<strong>查询成功</strong>", "成功", {
              dangerouslyUseHTMLString: true,
            });
          } else {
            ElMessageBox.alert("<strong>查询失败！请重试！</strong>", "提示", {
              dangerouslyUseHTMLString: true,
            });
          }
        });
      }else{
        axios.get("/findFast",{
          params:{
            hash: this.input
          },
        }).then((res)=>{
          if (res.status == 200 && res.data.data!=null) {
            console.log(res)
            this.transaction = res.data
            this.searched = true
            ElMessageBox.alert("<strong>查询成功</strong>", "成功", {
              dangerouslyUseHTMLString: true,
            });
          } else {
            ElMessageBox.alert("<strong>查询失败！请重试！</strong>", "提示", {
              dangerouslyUseHTMLString: true,
            });
          }
        })
      }
    },
  },
};
</script>

<style scoped>
#search-bar {
  display: flex;
  flex-direction: row;
  width: 100%;
}
#card {
  margin-top: 3%;
}
#limited{
  display: block;
  white-space: normal;
  width: 100px;
  overflow: hidden;
  text-overflow: ellipsis; 
}
</style>
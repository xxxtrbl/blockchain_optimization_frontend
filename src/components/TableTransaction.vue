<template>
  <div id="outline">
    <el-table :data="transactionData" stripe style="width: 100%">
      <el-table-column :formatter="stateFormat" prop="hash" label="hash" />
      <el-table-column prop="timestamp" label="timestamp" />
      <el-table-column :formatter="stateFormat" prop="data" label="data" />
    </el-table>
    <el-button
      style="width: 100%; cursor: pointer"
      @click="$router.push('/transactions')"
      v-if="this.getAll"
    >
      查看所有交易
    </el-button>
  </div>
</template>

<script>
import axios from "axios";
import { ElMessageBox } from "element-plus";
export default {
  props: {
    getAll: Boolean,
  },
  name: "TableTransaction",
  data() {
    return {
      transactionData: [
      {
            hash:"7721dc25f52984b9136cdb358c525a9574ad87dad30e8030044fc79198cf0f23",
            timestamp:16874620489,
            blockHash:6,
        },
        {
            hash:"7d60a1d2fb40d29024591421803395537d5c8320b498e833795f53f8f8b8c2dc",
            timestamp:16874620313,
            blockHash:6,
        },
        {
            hash:"e2bcbe547cc7e326c24dff62cd166c247ef68b090f94f1b96a2158d0f9e58b83",
            timestamp:16874618920,
            blockHash:6,
        },
      ],
    };
  },
  methods: {
    stateFormat(row, column, cellValue) {
      // console.log(row , column , cellValue)
      if (!cellValue) return "";
      if (cellValue.length > 15) {
        //最长固定显示4个字符
        return cellValue.slice(0, 15) + "...";
      }
      return cellValue;
    },
  },
  beforeCreate: function () {
    axios.get("/latestTransactions").then((out) => {
      if (out.status == 200) {
        this.transactionData = out.data;
      } else {
        ElMessageBox.alert("<strong>服务器错误！请重试！</strong>", "提示", {
          dangerouslyUseHTMLString: true,
        });
      }
    });
  },
};
</script>

<style scoped>
#outline{
  margin: 2%;
}

</style>
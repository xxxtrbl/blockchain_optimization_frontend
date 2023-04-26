<template>
  <div id="outline">
    <el-table :data="blockData" stripe style="width: 100%">
      <el-table-column :formatter="stateFormat" prop="hash" label="hash" />
      <el-table-column prop="timestamp" label="timestamp" width="180" />
      <el-table-column prop="index" label="index" width="180" />
    </el-table>
    <el-button
      style="width: 100%; cursor: pointer"
      @click="$router.push('/blocks')"
      v-if="this.getAll"
    >
      查看所有区块
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
  name: "TableBlock",
  data() {
    return {
      blockData: [
        {
            hash:"7721dc25f52984b9136cdb358c525a9574ad87dad30e8030044fc79198cf0f23",
            timestamp:16874620483,
            blockHash:6,
        },
        {
            hash:"7721dc25f52984b9136cdb358c525a9574ad87dad30e8030044fc79198cf0f23",
            timestamp:16874620483,
            blockHash:6,
        },
        {
            hash:"7721dc25f52984b9136cdb358c525a9574ad87dad30e8030044fc79198cf0f23",
            timestamp:16874620483,
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
    axios.get("/latestBlocks").then((out) => {
      if (out.status == 200) {
        this.blockData = out.data;
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
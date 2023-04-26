<template>
  <h3 class="topic">模拟交易</h3>
  <el-form :model="transaction" label-width="20%">
    <el-form-item label="交易昵称" prop="sender">
      <el-input class="formBlank" v-model="transaction.sender" />
    </el-form-item>
    <el-form-item label="交易金额" prop="value">
      <el-input-number class="formBlank" v-model="transaction.value" />
    </el-form-item>
    <el-form-item label="交易对象">
      <el-select
        class="formBlank"
        v-model="transaction.reciever"
        placeholder="请选择模拟交易对象"
      >
        <el-option label="Tony" value="Tony" />
        <el-option label="Cindy" value="Cindy" />
        <el-option label="Mike" value="Mike" />
      </el-select>
    </el-form-item>
    <el-form-item label-width="75%">
      <el-button type="primary" @click="sendTransaction">交易</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import axios from "axios";
import { ElMessageBox } from "element-plus";
export default {
  name: "TransactionMock",
  data: function () {
    return {
      transaction: {
        sender: "",
        reciever: "",
        value: "",
      },
      hash: "",
    };
  },
  methods: {
    sendTransaction: function () {
      if (
        this.transaction.sender == "" ||
        this.transaction.reciever == "" ||
        this.transaction.value == ""
      ) {
        ElMessageBox.alert("<strong>请输入完整的信息！</strong>", "提示", {
          dangerouslyUseHTMLString: true,
        });
      } else {
        axios.post("/add", this.transaction).then((res) => {
          if (res.status == 200) {
            this.hash = res.data;
            console.log(this.hash);
            ElMessageBox.alert("<strong>交易已发送</strong>", "成功", {
              dangerouslyUseHTMLString: true,
            });
          } else {
            ElMessageBox.alert(
              "<strong>交易出问题，请重试！</strong>",
              "失败",
              {
                dangerouslyUseHTMLString: true,
              }
            );
          }
        });
      }
    },
  },
};
</script>

<style scoped>
.formBlank {
  width: 70%;
}
</style>
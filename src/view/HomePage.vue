<template>
  <el-container class="common-layout">
    <el-header id="header" class="topic" height="5%">
      <el-icon><WalletFilled /></el-icon>
      <span id="title">区块链交易模拟系统</span>
    </el-header>
    <el-container>
      <el-aside width="35%" id="aside">
        <div class="form">
          <transaction-mock />
        </div>
        <div class="form">
          <query-hash />
        </div>
      </el-aside>
      <el-divider id="dividerBetweenMain" direction="vertical" />
      <el-main>
        <div class="table">
          <el-icon><DataAnalysis /></el-icon>
          <span> 交易统计 </span>
          <table-statistic></table-statistic>
        </div>
        <div class="table">
          <el-icon><List /></el-icon>
          <span> 最近交易 </span>
          <table-transaction :getAll="true" />
        </div>
        <div class="table">
          <el-icon><Coin /></el-icon>
          <span> 最近区块 </span>
          <table-block :getAll="true" />
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import TransactionMock from "@/components/TransactionMock.vue";
import QueryHash from "@/components/QueryHash.vue";
import TableTransaction from "@/components/TableTransaction.vue";
import TableBlock from "@/components/TableBlock.vue";
import TableStatistic from "@/components/TableStatistic.vue";
export default {
  components: {
    TransactionMock,
    QueryHash,
    TableTransaction,
    TableBlock,
    TableStatistic,
  },
  name: "HomePage",
  data: function () {
    return {
      transaction: {
        sender: "",
        reciever: "",
        value: "",
      },
      input: "",
    };
  },
  methods: {},
};
</script>

<style scoped>
#header {
  padding-top: 1%;
}
.common-layout {
  height: 100%;
}
#dividerBetweenMain {
  height: auto;
}
#title {
  font-size: large;
}
#aside {
  margin: 1%;
  display: flex;
  flex-direction: column;
}
.el-main {
  padding: 0;
}
.el-container {
  height: 97%;
}
::-webkit-scrollbar {
  width: 0 !important;
}
::-webkit-scrollbar {
  width: 0 !important;
  height: 0;
}
</style>
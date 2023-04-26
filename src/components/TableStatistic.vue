<template>
  <el-row>
    <el-col :span="8">
      <el-statistic title="Daily transactions" :value=statisticData.daily />
    </el-col>
    <el-col :span="8">
      <el-statistic title="Total Transactions" :value=statisticData.total />
    </el-col>
    <el-col :span="8">
      <el-statistic title="Transaction to Block" :value=statisticData.ratio />
    </el-col>
  </el-row>
  <div ref="chart" style="width: 100%; height: 200px"></div>
</template>

<script>
import axios from 'axios';
import echarts from "echarts";
import { ElMessageBox } from "element-plus";
export default {
  name: "TableStatistic",
  data() {
    return {
      statisticData:{
        daily:6,
        total:50,
        ratio:5,
      },
      week: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      weeklyData:[

      ],
    };
  },
  mounted() {
    axios.get("/weeklyData").then((out)=>{
      if(out.status == 200){
        this.weeklyData = out.data;
      } else{
        ElMessageBox.alert("<strong>服务器错误！无法获取统计数据! 请重试！</strong>", "提示", {
          dangerouslyUseHTMLString: true,
        });
      }
    })
    // 基于准备好的dom，初始化echarts实例
    const myChart = echarts.init(this.$refs.chart);
    // 绘制图表
    myChart.setOption({
      grid:{
        top:35,
        bottom:20
      },
      title: {
        show: true,
        text: "Transaction history in 7 days:",
        textStyle: {
          fontSize: 15,
          fontWeight: "normal",
        },
      },
      xAxis: {
        type: "category",
        data: this.week,
        show: true,
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
      },
      yAxis: {
        type: "value",
        show: true,
      },
      series: {
        type: "line",
        // data:this.weeklyData,
        data: [
          {
            value: 2,
            name: "Mon",
          },
          {
            value: 5,
            name: "Tue",
          },
          {
            value: 1,
            name: "Wed",
          },
          {
            value: 3,
            name: "Thu",
          },
          {
            value: 9,
            name: "Fri",
          },
          {
            value: 6,
            name: "Sat",
          },
          {
            value: 3,
            name: "Sun",
          },
        ],
        tooltip: {
          trigger: "axis",
          formatter: function (params) {
            // 获取当前鼠标所在的数据项
            var data = params[0].data;
            // 返回数据项的名称
            return data.value;
          },
        },
        itemStyle: {
          normal: {
            color: "#007AFF",
          },
        },
        emphasis: {
          itemStyle: {
            borderWidth: 3,
            borderColor: "#007AFF",
            color: "#007AFF",
          },
        },
      },
      label: {
        show: true,
      },
    });
  },
  created(){
    axios.get("/statistic").then((out) => {
      if (out.status == 200) {
        this.statisticData = out.data;
      } else {
        ElMessageBox.alert("<strong>服务器错误！无法获取统计数据! 请重试！</strong>", "提示", {
          dangerouslyUseHTMLString: true,
        });
      }
    });
  },
};
</script>

<style scoped>
.el-row {
  margin: 1%;
  height: 30%;
}
</style>
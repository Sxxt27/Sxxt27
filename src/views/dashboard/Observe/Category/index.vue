<template>
  <el-card>
    <div slot="header" class="header">
      <div class="category-header">
        <span>销售额类别占比</span>
        <el-radio-group v-model="value">
          <el-radio-button label="全部渠道"></el-radio-button>
          <el-radio-button label="线上"></el-radio-button>
          <el-radio-button label="门店"></el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <div class="charts" ref="charts"></div>
  </el-card>
</template>
<script>
import * as echarts from "echarts";
export default {
  name: "Category",
  data() {
    return {
      value: "全部渠道",
    };
  },
  mounted() {
    let myChart = echarts.init(this.$refs.charts);
    myChart.setOption({
      tooltip: {
        trigger: "item",
      },
      title: {
        text: "视频广告",
        subtext: 1048,
        left: "center",
        top: "center",
      },
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: "#fff",
            borderWidth: 2,
          },
          label: {
            show: true,
            position: "outside",
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 40,
              fontWeight: "bold",
            },
          },
          labelLine: {
            show: true,
          },
          data: [
            { value: 1048, name: "视频广告" },
            { value: 735, name: "联盟广告" },
            { value: 580, name: "邮件营销" },
            { value: 484, name: " 搜索引擎" },
            { value: 300, name: "直接访问" },
          ],
        },
      ],
    });
    // 绑定事件
    myChart.on("mouseover", (params) => {
      //获取鼠标移上去那条数据
      const { name, value } = params.data;
      //重新设置标题
      myChart.setOption({
        title: {
          text: name,
          subtext: value,
        },
      });
    });
  },
};
</script>
<style scoped>
.category-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header {
  border-bottom: 1px solid #eee;
  padding: 5px 0;
}
.charts {
  width: 100%;
  height: 300px;
}
</style>

<template>
  <div class="charts" ref="charts"></div>
</template>
<script>
import * as echarts from "echarts";
export default {
  name: "barCharts",
  mounted() {
    // 初始化echarts实例
    let lineCharts = echarts.init(this.$refs.charts);
    // 配置数据
    lineCharts.setOption({
      xAxis: {
        //隐藏x轴
        show: false,
        //最小值与最大值的设置
        min: 0,
        max: 100,
      },
      yAxis: {
        //隐藏y轴
        show: false,
        // 均分
        type: "category",
      },
      //文本标签
      label: {
        show: true,
        //改变文本内容
        formatter: "|",
        //文本标签位置调试
        position: "right",
      },
      series: [
        {
          // 图标的形状-柱状图
          type: "bar",
          data: [78],
          barWidth: 10,
          color: "yellowgreen",
          showBackground: true,
          //设置背景颜色
          backgroundStyle: {
            color: "#eee",
          },
        },
      ],
      //布局调试
      grid: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      },
    });
  },
};
</script>
<style scoped>
.charts {
  width: 100%;
  height: 100%;
}
</style>

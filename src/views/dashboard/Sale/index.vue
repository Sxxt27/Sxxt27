<template>
  <div>
    <el-card class="box-card" style="margin: 10px, 0px">
      <div slot="header" class="clearfix">
        <!-- 头部左侧 -->
        <el-tabs class="tab" v-model="activeName">
          <el-tab-pane label="销售额" name="Sale"></el-tab-pane>
          <el-tab-pane label="访问量" name="Visit"></el-tab-pane>
        </el-tabs>
        <!-- 头部右侧 -->
        <div class="right">
          <span @click="setDay">今日</span>
          <span @click="setWeek">本周</span>
          <span @click="setMonth">本月</span>
          <span @click="setYear">本年</span>
          <el-date-picker
            v-model="date"
            class="date"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </div>
      </div>
      <!-- 内容区 -->
      <div>
        <el-row :gutter="10">
          <el-col :span="18">
            <div class="charts" ref="charts"></div>
          </el-col>
          <el-col :span="6" class="rightBox">
            <h3>门店{{ title }}排名</h3>
            <ul>
              <li>
                <span class="rindex">1</span>
                <span>肯德基</span>
                <span class="rvalue">123456</span>
              </li>
              <li>
                <span class="rindex">2</span>
                <span>汉堡王</span>
                <span class="rvalue">123456</span>
              </li>
              <li>
                <span class="rindex">3</span>
                <span>肯德基</span>
                <span class="rvalue">123456</span>
              </li>
              <li>
                <span>4</span>
                <span class="rtext">肯德基</span>
                <span class="rvalue">123456</span>
              </li>
              <li>
                <span>5</span>
                <span class="rtext">重庆老火锅</span>
                <span class="rvalue">123456</span>
              </li>
              <li>
                <span>6</span>
                <span class="rtext">肯德基</span>
                <span class="rvalue">123456</span>
              </li>
              <li>
                <span>7</span>
                <span class="rtext">老潼关</span>
                <span class="rvalue">123456</span>
              </li>
            </ul>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>
<script>
import * as echarts from "echarts";
import dayjs from "dayjs";
export default {
  name: "Sale",
  data() {
    return {
      activeName: "Sale",
      myCharts: null,
      // 收集日历
      date: [],
    };
  },
  mounted() {
    // 初始化实例
    this.myCharts = echarts.init(this.$refs.charts);
    // 配置数据
    this.myCharts.setOption({
      title: {
        text: this.title + "趋势",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: [
            "一月",
            "二月",
            "三月",
            "四月",
            "五月",
            "六月",
            "七月",
            "八月",
            "九月",
            "十月",
            "十一月",
            "十二月",
          ],
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "Direct",
          type: "bar",
          barWidth: "60%",
          data: [10, 52, 200, 334, 390, 330, 220, 110, 98, 320, 140, 180],
        },
      ],
    });
  },
  computed: {
    title() {
      return this.activeName == "Sale" ? "销售额" : "访问量";
    },
  },
  //监听属性
  watch: {
    title() {
      this.myCharts.setOption({
        title: {
          text: this.title,
        },
        // xAxis: {
        //   data:
        //     this.title == "销售额"
        //       ? this.listState.orderFullYearAxis
        //       : this.listState.userFullYearAxis,
        // },
        // series: [
        //   {
        //     name: "Direct",
        //     type: "bar",
        //     barWidth: "60%",
        //     data:
        //       this.title == "销售额"
        //         ? this.listState.orderFullYear
        //         : this.listState.userFullYear,
        //     color: "yellowgreen",
        //   },
        // ],
      });
    },
  },
  methods: {
    setDay() {
      const day = dayjs().format("YYYY-MM-DD");
      this.date = [day, day];
    },
    setWeek() {
      const start = dayjs().day(1).format("YYYY-MM-DD");
      const end = dayjs().day(7).format("YYYY-MM-DD");
      this.date = [start, end];
    },
    setMonth() {
      const start = dayjs().startOf("month").format("YYYY-MM-DD");
      const end = dayjs().endOf("month").format("YYYY-MM-DD");
      this.date = [start, end];
    },
    setYear() {
      const start = dayjs().startOf("year").format("YYYY-MM-DD");
      const end = dayjs().endOf("year").format("YYYY-MM-DD");
      this.date = [start, end];
    },
  },
};
</script>
<style scoped>
.clearfix {
  position: relative;
  display: flex;
  justify-content: space-between;
}
.tab {
  width: 100%;
}
.right {
  position: absolute;
  right: 0px;
}
.right span {
  margin: 0px 8px;
}
.date {
  width: 250px;
  margin: 0px 20px;
}
.charts {
  width: 100%;
  height: 300px;
}
ul {
  list-style: none;
  width: 100%;
  height: 300px;
  padding: 0;
}
ul li {
  height: 8%;
  margin: 10px 0px;
}
.rindex {
  float: left;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: black;
  color: white;
  text-align: center;
}
.rvalue {
  float: right;
}
.rtext {
  margin: 0 10px;
}
</style>

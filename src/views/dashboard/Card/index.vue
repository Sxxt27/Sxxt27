<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="6">
        <el-card>
          <!-- 第一个card -->
          <Detail title="总销售额" count="¥ 126560">
            <template slot="charts">
              <span>周同比&nbsp;&nbsp;56.67%</span>
              <svg
                t="1674202603414"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="9100"
                width="16"
                height="16"
              >
                <path
                  d="M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z"
                  fill="#d81e06"
                  p-id="9101"
                ></path>
              </svg>
              &nbsp;&nbsp;
              <span>日同比&nbsp;&nbsp;19.96% &nbsp;</span>
              <svg
                t="1674202547515"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="8043"
                width="16"
                height="16"
              >
                <path
                  d="M232 392L512 672l280-280z"
                  fill="#1afa29"
                  p-id="8044"
                ></path>
              </svg>
            </template>
            <template slot="footer">
              <span>日销售额￥ 12423</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <Detail title="访问量" count="88460">
            <template slot="charts">
              <lineCharts></lineCharts>
            </template>
            <template slot="footer">
              <span>日访问量￥ 1243</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <Detail title="支付笔款" count="88460">
            <template slot="charts">
              <bar-charts></bar-charts>
            </template>
            <template slot="footer">
              <span>转化率65%</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <Detail title="运营活动效果" count="78%">
            <template slot="charts">
              <progressCharts></progressCharts>
            </template>
            <template slot="footer">
              <span>周同比&nbsp;&nbsp;12%</span>
              <svg
                t="1674202603414"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="9100"
                width="16"
                height="16"
              >
                <path
                  d="M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z"
                  fill="#d81e06"
                  p-id="9101"
                ></path>
              </svg>
              &nbsp;&nbsp;
              <span>日同比&nbsp;&nbsp;11% &nbsp;</span>
              <svg
                t="1674202547515"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="8043"
                width="16"
                height="16"
              >
                <path
                  d="M232 392L512 672l280-280z"
                  fill="#1afa29"
                  p-id="8044"
                ></path>
              </svg>
            </template>
          </Detail>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import Detail from "./Detail";
import lineCharts from "./lineCharts";
import barCharts from "./barCharts";
import progressCharts from "./progressCharts";
export default {
  name: "Card",
  components: {
    Detail,
    lineCharts,
    barCharts,
    progressCharts,
  },
};
</script>
<style scoped></style>

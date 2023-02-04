<template>
  <div>
    <el-card style="margin: 20px 0px">
      <cartgorySelect
        @getCategoryId="getCategoryId"
        :show="scene != 0"
      ></cartgorySelect>
    </el-card>
    <el-card>
      <!-- 展示spu列表 -->
      <div v-show="scene == 0">
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!category3Id"
          @click="addSpu"
          :disable="!category3Id"
          >添加SPU</el-button
        >
        <el-table :data="records" style="width: 100%" border>
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>
          <el-table-column prop="spuName" label="spu名称" width="width">
          </el-table-column>
          <el-table-column prop="description" label="spu描述" width="width">
          </el-table-column>
          <el-table-column prop="address" label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <hint-button
                type="success"
                icon="el-icon-plus"
                size="mini"
                title="添加sku"
                @click.native="addSku(row)"
              ></hint-button>
              <hint-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                title="修改spu"
                @click.native="updateSpu(row)"
              ></hint-button>
              <hint-button
                type="info"
                icon="el-icon-info"
                size="mini"
                title="查看当前spu的全部sku列表"
                @click.native="viewSku(row)"
              ></hint-button>
              <el-popconfirm
                title="这是一段内容确定删除吗？"
                @onConfirm="deleteSpu(row)"
              >
                <hint-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  title="删除spu"
                  slot="reference"
                ></hint-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          style="text-align: center"
          :current-page="page"
          :page-sizes="[3, 5, 10]"
          :page-size="limit"
          layout="prev, pager, next,jumper,->,sizes,total"
          :total="total"
          @current-change="getSpuList"
          @size-change="handleSizeChange"
        >
        </el-pagination>
      </div>
      <!-- 添加spu或修改spu -->
      <SpuForm
        v-show="scene == 1"
        @changeScene="changeScene"
        ref="spu"
      ></SpuForm>
      <!-- 添加sku -->
      <SkuForm
        v-show="scene == 2"
        ref="sku"
        @changeScenes="changeScenes"
      ></SkuForm>
    </el-card>
    <!-- 对话框 -->
    <el-dialog
      :title="`${spu.spuName}的sku列表`"
      :visible.sync="dialogTableVisible"
      :before-close="close"
    >
      <el-table :data="skuList" v-loading="loading">
        <el-table-column
          property="skuName"
          label="名称"
          width="150"
        ></el-table-column>
        <el-table-column
          property="price"
          label="价格"
          width="200"
        ></el-table-column>
        <el-table-column property="weight" label="重量"></el-table-column>
        <el-table-column label="默认图片">
          <template slot-scope="{ row, $index }">
            <img
              :src="row.skuDefaultImg"
              alt=""
              style="width: 100px; height: 100px"
            />
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
<script>
import SkuForm from "./SkuForm";
import SpuForm from "./SpuForm";
export default {
  name: "Spu",
  components: {
    SpuForm,
    SkuForm,
  },
  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      page: 1,
      limit: 3,
      records: [], //spu列表的数据
      total: 0, //总共的条数
      scene: 0, //0:展示spu数据 1：添加spu或者修改spu 2：添加sku
      dialogTableVisible: false, //控制对话框的显示与隐藏
      spu: {},
      // sku列表的数据
      skuList: [],
      loading: true,
    };
  },
  methods: {
    // 三级联动，将子组件相应的id传递给父组件
    getCategoryId({ categoryId, level }) {
      // console.log(categoryId);
      // 区分三级分类相应的id
      if (level == 1) {
        this.category1Id = categoryId;
      } else if (level == 2) {
        this.category2Id = categoryId;
      } else {
        this.category3Id = categoryId;
        // 发请求获取平台属性
        this.getSpuList();
      }
    },
    // 获取SPU列表数据
    async getSpuList(pages = 1) {
      this.page = pages;
      const { page, limit, category3Id } = this;
      let result = await this.$API.Spu.reqSpuList(page, limit, category3Id);
      // console.log(result);
      if (result.code == 200) {
        this.total = result.data.total;
        this.records = result.data.records;
      }
    },
    handleSizeChange(limit) {
      this.limit = limit;
      this.getSpuList();
    },
    // 添加spu
    addSpu() {
      this.scene = 1;
      //通知子组件spuForm发请求---两个
      this.$refs.spu.addSpuData(this.category3Id);
    },
    // 修改某一个spu
    updateSpu(row) {
      this.scene = 1;
      // console.log(this.$refs.spu);
      this.$refs.spu.initSpuData(row);
    },
    // 自定义事件回调
    changeScene({ scene, flag }) {
      // console.log(scene);
      this.scene = scene;
      // 获取spu数据/更新数据
      // this.getSpuList(this.page);
      if (flag == "修改") {
        this.getSpuList(this.page);
      } else {
        this.getSpuList();
      }
    },
    // 删除spu按钮
    async deleteSpu(row) {
      let result = await this.$API.Spu.reqDeleteSpu(row.id);
      // console.log(result);
      if (result.code == 200) {
        this.$message({ type: "success", message: "删除成功！" });
        // 获取列表数据
        // spu列表的数据如果大于1停留在当前页否则返回到上一页
        this.getSpuList(this.records.length > 1 ? this.page : this.page - 1);
      }
    },
    // 添加sku回调
    addSku(row) {
      // 切换场景2
      this.scene = 2;
      // 父组件调用子组件的方法，让子组件发请求，
      this.$refs.sku.getData(this.category1Id, this.category2Id, row);
    },
    //
    changeScenes(scene) {
      this.scene = scene;
    },
    // 查看sku
    async viewSku(spu) {
      this.dialogTableVisible = true;
      this.spu = spu;
      // 发请求
      let result = await this.$API.Spu.reqSkuAttrList(spu.id);
      // console.log(result);
      if (result.code == 200) {
        this.skuList = result.data;
        this.loading = false;
      }
    },
    // 关闭对话框回调
    close(done) {
      this.loading = true;
      this.skuList = [];
      done();
    },
  },
};
</script>
<style lang="less" scoped></style>

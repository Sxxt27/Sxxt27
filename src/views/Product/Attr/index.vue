<template>
  <div>
    <el-card style="margin: 20px 0px">
      <cartgorySelect
        @getCategoryId="getCategoryId"
        :show="!isShowTable"
      ></cartgorySelect>
    </el-card>
    <div v-show="isShowTable">
      <el-card>
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!category3Id"
          @click="addAttr"
          >添加属性</el-button
        >
        <el-table :data="attrList" style="width: 100%" border>
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>
          <el-table-column prop="attrName" label="属性名称" width="150">
          </el-table-column>
          <el-table-column prop="address" label="属性值列表">
            <template slot-scope="{ row, $index }">
              <el-tag
                style="margin: 0px 20px"
                type="success"
                v-for="attrValue in row.attrValueList"
                :key="attrValue.id"
                >{{ attrValue.valueName }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column prop="address" label="操作" width="150">
            <template slot-scope="{ row, $index }">
              <el-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                @click="updateAttr(row)"
              ></el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
    <!-- 添加属性/修改属性的结构 -->
    <div v-show="!isShowTable">
      <el-form :inline="true" label-width="80px" :model="attrInfo">
        <el-form-item label="属性名">
          <el-input
            placeholder="请输入属性名"
            v-model="attrInfo.attrName"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-button
        type="primary"
        icon="el-icon-plus"
        @click="AddAttrValue"
        :disabled="!attrInfo.attrName"
        >添加属性值</el-button
      >
      <el-button @click="isShowTable = true">取消</el-button>
      <el-table
        border
        style="width: 100%; margin: 20px 0"
        :data="attrInfo.attrValueList"
      >
        <el-table-column
          prop="date"
          label="序号"
          width="80"
          type="index"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="date" label="属性值名称" width="width">
          <template slot-scope="{ row, $index }">
            <!-- input和span进行来回切换 -->
            <el-input
              placeholder="请输入属性值名称"
              v-model="row.valueName"
              size="mini"
              v-if="row.flag"
              @blur="toLook(row)"
              @keyup.native.enter="toLook(row)"
              :ref="$index"
            ></el-input>
            <span v-else @click="toEdit(row, $index)">{{ row.valueName }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="操作">
          <template slot-scope="{ row, $index }">
            <el-popconfirm
              :title="`确定要删除${row.valueName}吗？`"
              @onConfirm="deleteValue($index)"
            >
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                slot="reference"
              ></el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-button
        type="primary"
        @click="addOrUpdateAttr"
        :disabled="attrInfo.attrValueList.length < 1"
        >保存</el-button
      >
      <el-button @click="isShowTable = true">取消</el-button>
    </div>
  </div>
</template>
<script>
// 按需引入lodash当中的深拷贝
import cloneDeep from "lodash/cloneDeep";
export default {
  name: "Attr",
  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      attrList: [],
      // table的显示与隐藏
      isShowTable: true,
      // 收集新增属性/修改属性
      attrInfo: {
        attrName: "", //属性名
        attrValueList: [
          //属性值
        ],
        categoryId: 0,
        categoryLevel: 0,
      },
    };
  },
  methods: {
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
        this.getAttrList();
      }
    },
    // 获取平台属性
    async getAttrList() {
      // console.log(11);
      const { category1Id, category2Id, category3Id } = this;
      let result = await this.$API.Attr.reqGetAttrList(
        category1Id,
        category2Id,
        category3Id
      );
      // console.log(result);
      if (result.code == 200) {
        this.attrList = result.data;
      }
    },
    // 添加属性值
    AddAttrValue() {
      // 向属性值的数组里面添加元素
      this.attrInfo.attrValueList.push({
        attrId: this.attrInfo.id,
        valueName: "",
        flag: true, //用来切换查看模式还是编辑模式
      });
      // this.$nextTick(() => {
      //   this.$refs[this.attrInfo.attrValueList.length - 1].focus();
      // });
    },
    // 添加属性按钮的回调
    addAttr() {
      this.isShowTable = false;
      this.attrInfo = {
        attrName: "", //属性名
        attrValueList: [
          //属性值
        ],
        categoryId: this.category3Id,
        categoryLevel: 0,
      };
    },
    // 修改属性值
    updateAttr(row) {
      this.isShowTable = false;
      // 使用深拷贝解决
      this.attrInfo = cloneDeep(row);
    },
    toLook(row) {
      // console.log(row);
      if (row.valueName.trim() == "") {
        this.$message("请输入一个正常的属性值");
        return;
      }
      // 新增属性不能与已有属性重复
      let isRepat = this.attrInfo.attrValueList.some((item) => {
        if (row !== item) {
          return row.valueName == item.valueName;
        }
      });
      // console.log(isRepat);
      if (isRepat) return;
      row.flag = false;
    },
    toEdit(row, index) {
      row.flag = true;
      //获取input节点，实现自动聚焦
      //需要注意：点击span的时候，切换为input变为编辑模式，但是需要注意，对于浏览器而言，页面重绘与重拍耗时间的
      //点击span的时候，重绘重拍一个input它是需要耗费事件，因此我们不可能一点击span立马获取到input
      //$nextTick,当节点渲染完毕了，会执行一次
      this.$nextTick(() => {
        //获取相应的input表单元素实现聚焦
        this.$refs[index].focus();
      });
    },
    // 气泡确认框
    deleteValue(index) {
      console.log(index);
      this.attrInfo.attrValueList.splice(index, 1);
    },
    // 添加或者更新属性
    async addOrUpdateAttr() {
      // 提交给服务器的数据当中不应该有flag字段
      this.attrInfo.attrValueList = this.attrInfo.attrValueList.filter(
        (item) => {
          if (item.valueName != "") {
            delete item.flag;
            return true;
          }
        }
      );
      try {
        // 发请求
        await this.$API.Attr.reqAddAttr(this.attrInfo);
        this.$message({ type: "success", message: "保存成功" });
        this.isShowTable = true;
        //  刷新数据(获取表单属性)
        this.getAttrList();
      } catch (error) {
        this.$message("保存失败");
      }
    },
  },
};
</script>
<style lang="less" scoped></style>

<template>
  <el-form :inline="true" class="demo-form-inline" :model="cForm">
    <el-form-item label="一级分类">
      <el-select
        placeholder="请选择"
        v-model="cForm.category1Id"
        @change="handel1()"
        :disabled="show"
      >
        <el-option
          :label="c1.name"
          :value="c1.id"
          v-for="(c1, index) in list1"
          :key="index"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="二级分类">
      <el-select
        placeholder="请选择"
        @change="handel2()"
        v-model="cForm.category2Id"
        :disabled="show"
      >
        <el-option
          :label="c2.name"
          :value="c2.id"
          v-for="(c2, index) in list2"
          :key="index"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="三级分类">
      <el-select
        placeholder="请选择"
        v-model="cForm.category3Id"
        @change="handel3()"
        :disabled="show"
      >
        <el-option
          :label="c3.name"
          :value="c3.id"
          v-for="c3 in list3"
          :key="c3.id"
        ></el-option>
      </el-select>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  name: "cartgorySelect",
  data() {
    return {
      // 一级分类的数据
      list1: [],
      props: ["show"],
      cForm: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
      },
      list2: [],
      list3: [],
    };
  },
  mounted() {
    // 获取一级分类
    this.getCarthory1List();
  },
  methods: {
    // 获取一级分类数据
    async getCarthory1List() {
      let result = await this.$API.Attr.reqCartgorylist1();
      if (result.code == 200) {
        this.list1 = result.data;
      }
    },
    // 数据发生变化时触发二级分类
    async handel1() {
      // 清除数据
      this.list2 = [];
      this.list3 = [];
      this.cForm.category2Id = "";
      this.cForm.category3Id = "";
      const { category1Id } = this.cForm;
      this.$emit("getCategoryId", { categoryId: category1Id, level: 1 });
      let result = await this.$API.Attr.reqCartgorylist2(category1Id);
      //   console.log(result);
      if (result.code == 200) {
        this.list2 = result.data;
      }
    },
    // 数据发生变化触发三级分类
    async handel2() {
      // 清除数据
      this.list3 = [];
      this.cForm.category3Id = "";
      const { category2Id } = this.cForm;
      this.$emit("getCategoryId", { categoryId: category2Id, level: 2 });
      let result = await this.$API.Attr.reqCartgorylist3(category2Id);
      //   console.log(result);
      if (result.code == 200) {
        this.list3 = result.data;
      }
    },
    handel3() {
      // 解构
      const { category3Id } = this.cForm;
      this.$emit("getCategoryId", { categoryId: category3Id, level: 3 });
    },
  },
};
</script>
